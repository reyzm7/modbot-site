# -*- coding: utf-8 -*-
"""
Aucun nom lu qui ne soit declare quelque part.

Le bug que ce fichier verrouille, et qu'aucun autre test n'avait vu :

    if (departureMessage && welcome.departure_message) ...

`departureMessage` n'etait declaree dans aucun fichier, et aucun element
ne portait cet identifiant. Lire une variable qui n'existe pas leve un
ReferenceError — pas un avertissement, pas une valeur vide : une
exception. applyDashboardConfig s'arretait donc LA, a chaque chargement,
sur chaque serveur, et tout ce qui suivait n'a jamais tourne : le pays,
la langue, les messages recurrents, les roles-reactions, les roles
automatiques, l'assistant IA, les vocaux, les evenements, les relais
reseaux, la moderation, les statistiques, la bienvenue.

Le navigateur ne dit rien tant que la ligne n'est pas atteinte, et le
dashboard se contentait d'afficher « une rubrique n'a pas pu
s'afficher ». Trois caracteres de trop dans un fichier de 7 700 lignes.

Ce test relit chaque script du site, releve tout ce qui y est declare,
et signale ce qui est lu sans l'etre. Il ne remplace pas un vrai
analyseur de portee : il ne cherche que les noms ABSENTS du fichier, ce
qui suffit a attraper la faute de frappe et le nom disparu au fil d'un
remaniement.

Lancement, depuis le dossier du site :
    python test_declarations.py
"""
import io
import os
import re
import sys

SITE = os.path.dirname(os.path.abspath(__file__))
SCRIPTS = ("script.js", "translations.js", "icons.js", "devserver.js")

resultats = []


def verifier(nom, condition, detail=""):
    resultats.append((nom, bool(condition), detail))
    etat = "OK  " if condition else "ECHEC"
    print(f"  {etat} {nom}" + (f"  [{detail}]" if detail else ""))


# ══════════════════════════════════════════════════════════════════════
#  Retirer ce qui n'est pas du code
# ══════════════════════════════════════════════════════════════════════
def sans_litteraux(src):
    """
    Remplace par des blancs tout ce qui n'est pas du code : chaines,
    texte des gabarits, expressions regulieres, commentaires. Les
    longueurs et les retours a la ligne sont conserves pour que les
    numeros de ligne restent justes.

    Le texte d'un gabarit est neutralise, mais ses `${...}` sont du CODE
    et sont gardes — et ce code peut lui-meme contenir un gabarit, avec
    du texte a neutraliser a son tour. Une premiere version se contentait
    de recopier les `${...}` tels quels : tout le HTML des gabarits
    imbriques passait pour du code, et des dizaines de mots — « compact »,
    « danger », « Voir » — etaient signales comme des variables absentes.

    D'ou une pile : CODE et GABARIT s'empilent l'un dans l'autre aussi
    profond qu'il le faut.
    """
    sortie = []
    espace = lambda t: "".join("\n" if c == "\n" else " " for c in t)
    # Chaque etage : ("code", profondeur d'accolades) ou ("gabarit", 0).
    # On demarre dans du code.
    pile = [["code", 0]]
    i, n = 0, len(src)
    while i < n:
        etat, profondeur = pile[-1]
        c = src[i]

        if etat == "gabarit":
            if c == "\\":
                sortie.append(espace(src[i:i + 2]))
                i += 2
                continue
            if c == "`":                      # fin du gabarit
                sortie.append(" ")
                pile.pop()
                i += 1
                continue
            if c == "$" and i + 1 < n and src[i + 1] == "{":
                sortie.append("  ")
                pile.append(["code", 0])      # on repasse dans du code
                i += 2
                continue
            sortie.append("\n" if c == "\n" else " ")
            i += 1
            continue

        # --- etat "code" ---
        if c == "/" and i + 1 < n and src[i + 1] == "/":
            fin = src.find("\n", i)
            fin = n if fin == -1 else fin
            sortie.append(" " * (fin - i))
            i = fin
            continue
        if c == "/" and i + 1 < n and src[i + 1] == "*":
            fin = src.find("*/", i + 2)
            fin = n if fin == -1 else fin + 2
            sortie.append(espace(src[i:fin]))
            i = fin
            continue
        if c in "\'\"":
            j = i + 1
            while j < n and src[j] != c:
                j += 2 if src[j] == "\\" else 1
            j = min(j + 1, n)
            sortie.append(espace(src[i:j]))
            i = j
            continue
        if c == "`":
            sortie.append(" ")
            pile.append(["gabarit", 0])
            i += 1
            continue
        if c == "{":
            pile[-1][1] += 1
            sortie.append(c)
            i += 1
            continue
        if c == "}":
            if profondeur == 0 and len(pile) > 1:
                # L'accolade qui referme un `${...}` : retour au gabarit.
                pile.pop()
                sortie.append(" ")
            else:
                pile[-1][1] = max(0, profondeur - 1)
                sortie.append(c)
            i += 1
            continue
        if c == "/":
            # Division ou expression reguliere ? Une regex ne peut se
            # trouver que la ou une VALEUR est attendue.
            avant = "".join(sortie).rstrip()[-8:]
            if avant and (avant[-1] in "=(,:[!&|?{};+*%<>~^"
                          or avant.endswith("return") or avant.endswith("case")):
                j, classe = i + 1, False
                while j < n and (classe or src[j] != "/") and src[j] != "\n":
                    if src[j] == "\\":
                        j += 2
                        continue
                    if src[j] == "[":
                        classe = True
                    elif src[j] == "]":
                        classe = False
                    j += 1
                # Le « / » de fermeture, PUIS les drapeaux : ils font
                # partie du litteral. Les oublier laissait « gi »,
                # « gu » et « i » passer pour des variables absentes.
                j = min(j + 1, n)
                while j < n and src[j] in "dgimsuvy":
                    j += 1
                sortie.append(" " * (j - i))
                i = j
                continue
        sortie.append(c)
        i += 1
    return "".join(sortie)

# ══════════════════════════════════════════════════════════════════════
#  Ce qui est declare, et ce qui est lu
# ══════════════════════════════════════════════════════════════════════
MOTS_CLES = {
    "await", "break", "case", "catch", "class", "const", "continue", "debugger",
    "default", "delete", "do", "else", "export", "extends", "false", "finally",
    "for", "function", "get", "if", "import", "in", "instanceof", "let", "new",
    "null", "of", "return", "set", "static", "super", "switch", "this", "throw",
    "true", "try", "typeof", "undefined", "var", "void", "while", "with", "yield",
    "async", "arguments", "from", "as",
}

# Ce que le navigateur fournit. Liste volontairement large : le but est
# de trouver les noms du PROJET qui manquent, pas de recenser le DOM.
NAVIGATEUR = {
    "window", "document", "console", "location", "history", "navigator",
    "localStorage", "sessionStorage", "fetch", "Headers", "Request", "Response",
    "FormData", "URL", "URLSearchParams", "Blob", "File", "FileReader",
    "Image", "Audio", "Option", "Node", "Element", "HTMLElement", "Event",
    "CustomEvent", "AbortController", "IntersectionObserver", "MutationObserver",
    "ResizeObserver", "DOMParser", "XMLHttpRequest", "WebSocket", "Worker",
    "setTimeout", "clearTimeout", "setInterval", "clearInterval",
    "requestAnimationFrame", "cancelAnimationFrame", "queueMicrotask",
    "alert", "confirm", "prompt", "getComputedStyle", "matchMedia",
    "scrollTo", "scrollBy", "atob", "btoa", "structuredClone", "crypto",
    "performance", "screen", "frames", "parent", "top", "self", "globalThis",
    "Object", "Array", "String", "Number", "Boolean", "Symbol", "BigInt",
    "Math", "JSON", "Date", "RegExp", "Error", "TypeError", "RangeError",
    "ReferenceError", "SyntaxError", "Map", "Set", "WeakMap", "WeakSet",
    "Promise", "Proxy", "Reflect", "Intl", "Function", "parseInt", "parseFloat",
    "isNaN", "isFinite", "encodeURIComponent", "decodeURIComponent",
    "encodeURI", "decodeURI", "NaN", "Infinity", "CSS", "Notification",
    "OffscreenCanvas", "Uint8Array", "ArrayBuffer", "TextEncoder", "TextDecoder",
    # Node, pour devserver.js
    "require", "module", "exports", "process", "Buffer", "__dirname",
    "__filename", "global",
}

DECLARATIONS = [
    # const/let/var suivi d'un nom
    re.compile(r"\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)"),
    # function nom(...)  et  class Nom
    re.compile(r"\bfunction\s*\*?\s*([A-Za-z_$][\w$]*)"),
    re.compile(r"\bclass\s+([A-Za-z_$][\w$]*)"),
    # catch (err)
    re.compile(r"\bcatch\s*\(\s*([A-Za-z_$][\w$]*)"),
    # for (const x of ...) est deja couvert ; les destructurations le sont
    # par le releve des noms entre accolades et crochets ci-dessous.
]

# Destructurations et parametres : on prend TOUS les noms qui apparaissent
# entre les delimiteurs d'une declaration ou d'une liste de parametres.
DESTRUCTURATIONS = re.compile(
    r"\b(?:const|let|var)\s*[\[{]([^\]}]*)[\]}]"
    r"|\bfunction\s*\*?\s*[A-Za-z_$][\w$]*\s*\(([^)]*)\)"
    r"|\bfunction\s*\(([^)]*)\)"
    r"|(?:^|[=,(\[{:;])\s*(?:async\s+)?\(([^)]*)\)\s*=>"
    r"|(?:^|[=,(\[{:;])\s*(?:async\s+)?([A-Za-z_$][\w$]*)\s*=>"
    r"|\b([A-Za-z_$][\w$]*)\s*\(([^)]*)\)\s*\{",
    re.M)

NOM = re.compile(r"[A-Za-z_$][\w$]*")
# Un nom precede d'un point ou suivi d'un deux-points est une propriete,
# pas une variable : `a.b` et `{ b: 1 }`.
#
# `(?![\w$])` n'est pas decoratif : sans lui, « target: » ne satisfait
# pas `(?!\s*:)`, le moteur rend un caractere et fait correspondre
# « targe » — qui, lui, n'est suivi d'aucun deux-points. On se retrouvait
# avec des dizaines de noms tronques signales comme introuvables.
LECTURE = re.compile(r"(?<![.\w$])([A-Za-z_$][\w$]*)(?![\w$])(?!\s*:)")


def noms_declares(code):
    trouves = set()
    for motif in DECLARATIONS:
        trouves |= set(motif.findall(code))
    for groupes in DESTRUCTURATIONS.findall(code):
        for groupe in groupes:
            trouves |= set(NOM.findall(groupe))
    # Les proprietes raccourcies d'objet et les methodes de classe
    trouves |= set(re.findall(r"^\s*(?:async\s+)?([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{",
                              code, re.M))
    # Les etiquettes de boucle
    trouves |= set(re.findall(r"^\s*([A-Za-z_$][\w$]*)\s*:\s*(?:for|while)\b",
                              code, re.M))
    return trouves


print("--- Noms lus mais declares nulle part ---")

declares_partout = set()
codes = {}
for fichier in SCRIPTS:
    chemin = os.path.join(SITE, fichier)
    if not os.path.exists(chemin):
        continue
    code = sans_litteraux(io.open(chemin, encoding="utf-8", newline="").read())
    codes[fichier] = code
    declares_partout |= noms_declares(code)

connus = declares_partout | MOTS_CLES | NAVIGATEUR

inconnus = {}
for fichier, code in codes.items():
    for numero, ligne in enumerate(code.split("\n"), 1):
        for nom in LECTURE.findall(ligne):
            if nom in connus:
                continue
            inconnus.setdefault(nom, []).append(f"{fichier}:{numero}")

for nom in sorted(inconnus):
    verifier(f"« {nom} » est declare quelque part", False,
             ", ".join(inconnus[nom][:3]))

verifier("aucun nom lu sans etre declare", not inconnus,
         f"{len(inconnus)} nom(s)")


# ══════════════════════════════════════════════════════════════════════
#  Le cas precis, pour qu'il ne revienne pas sous un autre nom
# ══════════════════════════════════════════════════════════════════════
print("\n--- La bienvenue n'est posee qu'une fois ---")

brut = io.open(os.path.join(SITE, "script.js"), encoding="utf-8", newline="").read()
corps = brut[brut.index("function applyDashboardConfig"):]
corps = corps[:re.search(chr(10) + r"  (?:async )?function ", corps[10:]).start()]

verifier("applyDashboardConfig delegue la bienvenue",
         "applyWelcomeState(welcome)" in corps)
# Le doublon visait ses interrupteurs par leur RANG dans le panneau :
# inserer une ligne dans le HTML deplacait silencieusement les reglages.
verifier("et ne pose plus aucun champ de bienvenue lui-meme",
         "welcomeToggles" not in corps and "welcomeDmMessage" not in corps)
verifier("plus aucun interrupteur vise par son rang",
         not re.search(r"Toggles\[\d\]", corps),
         str(re.findall(r"\w+Toggles\[\d\]", corps)[:3]))


# ══════════════════════════════════════════════════════════════════════
print("\n" + "=" * 62)
rates = [nom for nom, ok, _ in resultats if not ok]
if rates:
    print(f"RESULTAT : {len(resultats) - len(rates)}/{len(resultats)} — echecs :")
    for nom in rates:
        print(f"  - {nom}")
    sys.exit(1)
print(f"RESULTAT : {len(resultats)}/{len(resultats)} verifications passees")
print("Un nom lu sans etre declare leve un ReferenceError : la fonction")
print("s'arrete la, et tout ce qui suit ne tourne jamais.")
