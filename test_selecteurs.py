# -*- coding: utf-8 -*-
"""
Plus aucun identifiant a taper a la main.

Le dashboard connait deja les roles et les salons du serveur. Chaque
champ qui redemande un identifiant a 18 chiffres est une occasion de se
tromper sans que rien ne le signale — l'identifiant part au bot, le bot
ne trouve rien, et il ne se passe rien.

Ce fichier verrouille aussi deux lecons apprises a la dure :
  * les champs se lisent par leur NOM, jamais par leur rang ;
  * un gestionnaire de clic vise un bouton NOMME, jamais « le bouton ».

Lancement, depuis le dossier du site :
    python test_selecteurs.py
"""
import io
import re
import sys

NL = chr(10)
CRLF = chr(13) + chr(10)

resultats = []


def verifier(nom, condition, detail=""):
    resultats.append((nom, bool(condition), detail))
    print(("  OK   " if condition else "  ECHEC ") + nom + (f"  [{detail}]" if detail else ""))


html = io.open("dashboard.html", encoding="utf-8").read()
script = io.open("script.js", encoding="utf-8").read()


# ══════════════════════════════════════════════════════════════════════
print("\n--- Aucun champ ne redemande un identifiant ---")

# Un champ libre relie a une liste de suggestions reste un champ libre :
# on peut y coller n'importe quoi.
libres = re.findall(r'<input[^>]*list="dashboard(?:Role|Channel)Options"[^>]*>', html)
verifier("aucun champ libre adosse aux listes de roles/salons",
         not libres, f"{len(libres)} champ(s)")

for attribut, attendu in [
    ("data-autorole-picker", "select"),
    ("data-reaction-channel", "select"),
    ("data-captcha-role", "select"),
    ("data-captcha-channel", "select"),
    ("data-welcome-channel", "select"),
    ("data-welcome-departure-channel", "select"),
]:
    balise = re.search(r"<(\w+)[^>]*\b%s\b" % re.escape(attribut), html)
    verifier(f"« {attribut} » est un <{attendu}>",
             balise is not None and balise.group(1) == attendu,
             balise.group(1) if balise else "absent")

# Le champ des relais reseaux avait echappe au controle precedent : il ne
# portait pas de `list=`, juste un placeholder « ID du salon Discord ».
demandes = re.findall(r'<input[^>]*placeholder="[^"]*\b(?:ID|Identifiant|identifiant)\b[^"]*"[^>]*>', html)
# Chercher un membre par son identifiant Discord est legitime : c'est
# meme le seul moyen sur de designer quelqu'un qui a change de pseudo.
# La regle vise les salons et les roles, qui doivent se choisir dans une
# liste. (Ce test etait muet jusqu'ici : son motif portait deux
# caracteres de controle invisibles a la place des limites de mot, donc
# il ne trouvait jamais rien.)
demandes = [d for d in demandes
            if "data-admin-add-id" not in d
            and "blacklist" not in d
            and "data-search-input" not in d]
verifier("aucun champ ne demande un identifiant de salon ou de role",
         not demandes, str(demandes)[:120])
verifier("les salons de publication sont des listes",
         html.count("<select data-social-channel>") == 4,
         str(html.count("<select data-social-channel>")))

verifier("le champ texte des auto-roles a disparu",
         "data-autorole-list" not in html)
verifier("les auto-roles ont une liste d'ajout et des pastilles",
         "data-autorole-picker" in html and "data-autorole-chips" in html)

# Les lignes de roles-reactions sont fabriquees en JS : c'est la que
# leur <select> doit apparaitre.
verifier("la ligne de role-reaction porte un <select>",
         "<select data-rr-role>" in script)
verifier("elle est fabriquee a un seul endroit",
         script.count("function ligneReactionRole") == 1
         and script.count('<div class="reaction-role-row">') <= 1,
         f'{script.count(chr(60) + "div class=" + chr(34) + "reaction-role-row")} modele(s) en JS')


# ══════════════════════════════════════════════════════════════════════
print("\n--- L'image de ticket se choisit dans la galerie ---")

verifier("plus aucun champ d'URL d'image",
         not re.search(r'<input[^>]*type="url"[^>]*data-option-image', html))
verifier("le champ image est cache et rempli par le televersement",
         'type="hidden" data-option-image' in html)
verifier("un bouton ouvre la galerie", "data-option-image-pick" in html)
verifier("un champ fichier accepte les images",
         re.search(r'<input type="file" accept="image/\*"[^>]*data-option-image-file', html) is not None)
verifier("une vignette montre le resultat", "data-option-thumb" in html)
verifier("l'image est reduite avant l'envoi", "function reduireEmoji" in script)
verifier("elle est recadree en carre pour un emoji",
         "const COTE = 128" in script)
# Discord accepte 256 Ko pour un emoji, mais la sauvegarde porte toutes
# les images a la fois : la borne doit rester nettement en dessous.
plafond = re.search(r"EMOJI_MAX_OCTETS = (\d+) \* 1024", script)
verifier("l'image est bornee avant l'envoi", plafond is not None)
verifier("la borne reste sous les 256 Ko de Discord",
         plafond is not None and int(plafond.group(1)) <= 256,
         (plafond.group(1) + " Ko") if plafond else "-")


# ══════════════════════════════════════════════════════════════════════
print("\n--- Les champs se lisent par leur nom ---")

verifier("aucune lecture par rang ne subsiste",
         not re.search(r"inputs\[\d\]", script))

for nom in ("data-option-emoji", "data-option-label", "data-option-desc",
            "data-rr-emoji", "data-rr-role", "data-rr-label"):
    verifier(f"« {nom} » est lu par son nom",
             f'querySelector("[{nom}]")' in script)

verifier("une seule fabrique de ligne d'option",
         script.count("function ligneOptionTicket") == 1)


# ══════════════════════════════════════════════════════════════════════
print("\n--- Un clic ne supprime que ce qu'il vise ---")

# La cellule d'image contient deux boutons. Un gestionnaire qui prend
# « le bouton le plus proche » supprimait l'option quand on cliquait
# « Image ».
verifier("la suppression d'option vise un bouton nomme",
         'closest("[data-option-remove]")' in script)
verifier("le bouton de suppression porte ce nom dans le HTML",
         html.count("data-option-remove") >= 4,
         f"{html.count('data-option-remove')} bouton(s)")
verifier("la fabrique le nomme aussi",
         "data-option-remove>${escapeHtml(t(" in script)


# ══════════════════════════════════════════════════════════════════════
print("\n--- Le captcha se pilote depuis le dashboard ---")

verifier("le role est choisi dans une liste", "<select data-captcha-role>" in html)
verifier("le salon aussi", "<select data-captcha-channel>" in html)
verifier("les deux sont envoyes a l'installation",
         'role_id: readValue("[data-captcha-role]")' in script
         and 'channel_id: readValue("[data-captcha-channel]")' in script)
verifier("le choix enregistre est relu a l'affichage",
         'setValue("[data-captcha-role]"' in script)


# ══════════════════════════════════════════════════════════════════════
print("\n--- Les listes deroulantes se voient et se lisent ---")

style = io.open("style.css", encoding="utf-8").read()

# Le reset ne couvrait que `button, input` : les listes retombaient sur
# Arial et les zones de texte sur monospace, a cote d'Inter partout
# ailleurs. Trois polices sur la meme page.
reset = "button," + NL + "input," + NL + "select," + NL + "textarea {"
verifier("le reset de police couvre select et textarea",
         reset in style or reset.replace(NL, CRLF) in style)

# Une <option> sans fond propre est peinte par le navigateur avec SA
# couleur — blanche — sous un texte quasi blanc : la liste s'ouvrait sur
# du vide, et on ne pouvait choisir ni salon ni role.
verifier("les options portent un fond explicite",
         "select option," in style and "background-color: #14101f" in style)
verifier("la racine declare un schema sombre",
         "color-scheme: dark" in style)

# Un <select> vide est une boite grise sans rien dedans tant que les
# ressources du serveur ne sont pas arrivees.
vides = [v for v in re.findall(r"<select [^>]*></select>", html)
         if "giveaway" not in v]
verifier("aucune liste n'est vide dans le HTML", not vides, str(vides))

verifier("un bloc « ai » manquant est dit, pas laisse en tirets",
         "js.ia.indisponible" in script)



# ══════════════════════════════════════════════════════════════════════
#  Les icones
#
#  Le sprite vivait en clair dans trois pages et manquait des trois
#  autres : tous leurs <use href="#..."> ne dessinaient rien, en
#  silence — un <use> qui ne resout pas ne leve aucune erreur, il
#  n'affiche simplement rien. Ces deux verifications ferment la porte.
# ══════════════════════════════════════════════════════════════════════
print(chr(10) + "--- Les icones ---")

import glob
import os

sprite = io.open("icons.js", encoding="utf-8", newline="").read()
declarees = set(re.findall(r'<symbol id="([^"]+)"', sprite))
verifier("le sprite declare ses symboles", len(declarees) > 50, str(len(declarees)))

sans_sprite = []
inconnues = {}
for page in sorted(glob.glob("*.html")):
    contenu = io.open(page, encoding="utf-8", newline="").read()
    # Les commentaires HTML citent parfois la forme generale
    # « <use href="#id"> » : ce n'est pas une icone a resoudre.
    sans_commentaires = re.sub(r"<!--.*?-->", "", contenu, flags=re.DOTALL)
    citees = set(re.findall(r'<use href="#([^"]+)"', sans_commentaires))
    if not citees:
        continue
    if "icons.js" not in contenu:
        sans_sprite.append(page)
    manquantes = citees - declarees
    if manquantes:
        inconnues[page] = sorted(manquantes)

verifier("toute page qui dessine des icones charge le sprite",
         not sans_sprite, str(sans_sprite))
verifier("aucune page ne cite une icone qui n'existe pas",
         not inconnues, str(inconnues))

# Le sprite ne doit plus etre recopie dans les pages : c'est la
# duplication qui l'avait laisse diverger.
recopie = [f for f in sorted(glob.glob("*.html"))
           if "<symbol id=" in io.open(f, encoding="utf-8").read()]
verifier("le sprite n'est recopie dans aucune page", not recopie, str(recopie))

# Les icones citees par le JS comptent autant que celles du HTML.
script_js = io.open("script.js", encoding="utf-8", newline="").read()
citees_js = set(re.findall(r'href="#(u-[\w-]+|i-[\w-]+)"', script_js))
verifier("aucune icone inconnue citee par script.js",
         not (citees_js - declarees), str(sorted(citees_js - declarees)))



# ══════════════════════════════════════════════════════════════════════
#  Les selecteurs qui ne visent plus rien
#
#  Le panneau des messages recurrents avait disparu du dashboard alors
#  que le JS qui le pilote etait intact et que le bot les envoyait
#  toujours : une fonctionnalite annoncee sur l'accueil et dans le wiki,
#  que personne ne pouvait activer. Rien ne levait d'erreur — un
#  querySelector qui ne trouve rien renvoie null, et le code teste ce
#  null poliment.
# ══════════════════════════════════════════════════════════════════════
print(chr(10) + "--- Les selecteurs pointent vers du reel ---")

import glob

pages = {f: io.open(f, encoding="utf-8", newline="").read()
         for f in glob.glob("*.html")}
tout_html = "".join(pages.values())

# Les attributs que le JS ecrit lui-meme n'ont pas a figurer dans le
# HTML : on ne verifie que ceux qu'il attend d'y trouver.
poses_par_js = set(re.findall(r'data-([a-z0-9-]+)=', script))
poses_par_js |= {re.sub(r"([A-Z])", lambda m: "-" + m.group(1).lower(), nom)
                 for nom in re.findall(r"dataset\.([A-Za-z][\w]*)", script)}
# Ceux ecrits sans valeur dans un gabarit : `<input data-event-title>`.
# Ou suivis d'une substitution : `data-sanction-minutes${...}`.
poses_par_js |= set(re.findall(r'data-([a-z0-9-]+)[\s>$`]', script))

orphelins = []
for attribut in sorted(set(re.findall(r'\[data-([a-z0-9-]+)[\]=]', script))):
    if attribut in poses_par_js:
        continue
    if ("data-%s" % attribut) in tout_html:
        continue
    orphelins.append(attribut)

verifier("aucun selecteur data-* ne vise un element absent de toutes les pages",
         not orphelins, str(orphelins))

# Chaque onglet du dashboard a son panneau, et reciproquement.
dash = pages.get("dashboard.html", "")
onglets = set(re.findall(r'data-dashboard-tab="([\w-]+)"', dash))
panneaux = set(re.findall(r'data-dashboard-panel="([\w-]+)"', dash))
verifier("chaque onglet du dashboard a son panneau",
         onglets == panneaux, str(sorted(onglets ^ panneaux)))

# Idem pour l'administration.
adm = pages.get("admin.html", "")
onglets_adm = set(re.findall(r'data-admin-tab="([\w-]+)"', adm))
panneaux_adm = set(re.findall(r'data-admin-panel="([\w-]+)"', adm))
verifier("chaque onglet d'administration a son panneau",
         onglets_adm == panneaux_adm, str(sorted(onglets_adm ^ panneaux_adm)))

# Une fonction declaree et jamais appelee est du code mort : il ment sur
# ce que fait le site, et c'est ainsi qu'un commentaire affirmait encore
# « tous les modules sont gratuits » longtemps apres le premium.
declarees = set(re.findall(r"^(?:async\s+)?function ([A-Za-z_$][\w$]*)\s*\(",
                           script, re.MULTILINE))
declarees |= set(re.findall(r"^  (?:async\s+)?function ([A-Za-z_$][\w$]*)\s*\(",
                            script, re.MULTILINE))
jamais_appelees = []
for nom in sorted(declarees):
    # Une reference suffit : passee a addEventListener, elle n'a pas de
    # parentheses.
    if len(re.findall(r"\b%s\b" % re.escape(nom), script)) > 1:
        continue
    if nom in tout_html:
        continue
    jamais_appelees.append(nom)
verifier("aucune fonction declaree n'est laissee sans emploi",
         not jamais_appelees, str(jamais_appelees))


rates = [n for n, ok, _ in resultats if not ok]
print("\n" + "=" * 62)
print(f"RESULTAT : {len(resultats) - len(rates)}/{len(resultats)} verifications passees")
for n in rates:
    print("  - " + n)
sys.exit(1 if rates else 0)
