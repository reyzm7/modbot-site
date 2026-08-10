# -*- coding: utf-8 -*-
"""
Verifie que le site est traduisible en entier, dans les trois langues.

Ce test existe parce qu'une traduction se degrade en silence : une clef
absente retombe sur le francais, un texte oublie dans le HTML reste en
francais, et rien ne casse. Personne ne s'en apercoit avant qu'un membre
arabophone ouvre le dashboard.

    python test_i18n.py

Aucune dependance : uniquement la bibliotheque standard.
"""
import io
import os
import re
import sys
from html.parser import HTMLParser

SITE = os.path.dirname(os.path.abspath(__file__))
PAGES = ["index.html", "dashboard.html", "admin.html", "wiki.html"]
LANGUES = ["fr", "en", "ar"]

# Balises dont le contenu n'est pas du texte affiche
IGNOREES = {"script", "style", "title", "svg", "path", "canvas", "option"}
AUTO_FERMANTES = {"img", "br", "hr", "input", "meta", "link", "source"}

# Ce qui reste identique dans toutes les langues : la marque, les commandes
# slash du bot, les noms de plateformes.
INTRADUISIBLE = re.compile(
    r"^(ModBot|Twitch|TikTok|Instagram|Discord|/[\w-]+.*|!\w+|APP)$")

erreurs = []
succes = []


def verifier(condition, message):
    (succes if condition else erreurs).append(message)


# ─────────────────────────────────────────────────────────────────────
#  Lecture de translations.js
# ─────────────────────────────────────────────────────────────────────
def charger_traductions():
    """Relit translations.js sans moteur JavaScript."""
    src = io.open(f"{SITE}/translations.js", encoding="utf-8").read()
    blocs = dict(re.findall(r"^  (\w+): \{(.*?)^  \},?$", src, re.S | re.M))
    ligne = re.compile(r'^\s*"([^"]+)":\s*"(.*?)",?\s*$', re.M)
    return {lg: dict(ligne.findall(bloc)) for lg, bloc in blocs.items()}


# ─────────────────────────────────────────────────────────────────────
#  Lecture des pages
# ─────────────────────────────────────────────────────────────────────
class Page(HTMLParser):
    """Releve les clefs citees et les textes restes sans clef."""

    def __init__(self):
        super().__init__(convert_charrefs=False)
        self.pile = []
        self.citees = set()
        self.non_traduits = []

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        for marqueur in ("data-i18n", "data-i18n-html", "data-i18n-placeholder",
                         "data-i18n-title", "data-i18n-aria"):
            if d.get(marqueur):
                self.citees.add(d[marqueur])
        if tag in AUTO_FERMANTES:
            return
        self.pile.append({"tag": tag, "clef": d.get("data-i18n"),
                          "riche": bool(d.get("data-i18n-html")), "vus": 0})

    def handle_endtag(self, tag):
        while self.pile:
            if self.pile.pop()["tag"] == tag:
                break

    def handle_data(self, data):
        net = data.strip()
        if not self.pile or len(net) < 3 or not re.search(r"[A-Za-zÀ-ÿ]{3}", net):
            return
        element = self.pile[-1]
        element["vus"] += 1
        if any(p["tag"] in IGNOREES for p in self.pile):
            return
        if any(p["riche"] for p in self.pile):
            return          # data-i18n-html traduit tout le sous-arbre
        if element["clef"] and element["vus"] == 1:
            return          # le moteur remplace le premier texte non vide
        if INTRADUISIBLE.match(net):
            return
        self.non_traduits.append((self.getpos()[0], net[:60]))


def lire_pages():
    citees, restants = set(), {}
    for page in PAGES:
        analyseur = Page()
        analyseur.feed(io.open(f"{SITE}/{page}", encoding="utf-8", newline="").read())
        analyseur.close()
        citees |= analyseur.citees
        restants[page] = analyseur.non_traduits
    return citees, restants


def lire_script():
    """Clefs citees par t(), tp() et tn() dans script.js."""
    src = io.open(f"{SITE}/script.js", encoding="utf-8", newline="").read()
    clefs = set(re.findall(r'\bt[pn]?\(\s*"([a-zA-Z][\w.]*)"', src))
    for un, plusieurs in re.findall(r'\btn\(\s*"([\w.]+)"\s*,\s*"([\w.]+)"', src):
        clefs.update((un, plusieurs))
    # Clefs rangees dans une table puis resolues par t(variable)
    clefs |= set(re.findall(r'"(js\.[\w.]+)"', src))
    return clefs


# ─────────────────────────────────────────────────────────────────────
#  Verifications
# ─────────────────────────────────────────────────────────────────────
def main():
    traductions = charger_traductions()
    verifier(set(traductions) == set(LANGUES),
             f"les langues du fichier sont {sorted(traductions)}")

    # 1. Les trois langues portent exactement les memes clefs.
    reference = set(traductions.get("fr", {}))
    verifier(bool(reference), f"le bloc francais contient {len(reference)} clefs")
    for langue in LANGUES:
        clefs = set(traductions.get(langue, {}))
        manquantes = reference - clefs
        surnumeraires = clefs - reference
        verifier(not manquantes,
                 f"{langue} : {len(manquantes)} clef(s) absente(s)"
                 + (f" -> {sorted(manquantes)[:5]}" if manquantes else ""))
        verifier(not surnumeraires,
                 f"{langue} : {len(surnumeraires)} clef(s) en trop"
                 + (f" -> {sorted(surnumeraires)[:5]}" if surnumeraires else ""))

    # 2. Toute clef citee par le HTML ou le JS est definie.
    citees_html, restants = lire_pages()
    citees_js = lire_script()
    for origine, citees in (("HTML", citees_html), ("script.js", citees_js)):
        inconnues = citees - reference
        verifier(not inconnues,
                 f"{origine} : {len(inconnues)} clef(s) citee(s) sans traduction"
                 + (f" -> {sorted(inconnues)[:5]}" if inconnues else ""))

    # 3. Aucune clef definie ne dort sans emploi.
    employees = citees_html | citees_js
    inutilisees = reference - employees
    verifier(not inutilisees,
             f"{len(inutilisees)} clef(s) definie(s) mais jamais utilisee(s)"
             + (f" -> {sorted(inutilisees)[:5]}" if inutilisees else ""))

    # 4. Aucun texte visible n'echappe au moteur.
    for page, textes in restants.items():
        verifier(not textes,
                 f"{page} : {len(textes)} texte(s) sans data-i18n"
                 + (f" -> l.{textes[0][0]} {textes[0][1]!r}" if textes else ""))

    # 5. Les substitutions {x} sont les memes dans les trois langues : une
    #    valeur oubliee afficherait « {n} » a l'ecran.
    jetons = re.compile(r"\{(\w+)\}")
    divergentes = []
    for clef in reference:
        vus = {lg: set(jetons.findall(traductions[lg].get(clef, "")))
               for lg in LANGUES if clef in traductions.get(lg, {})}
        if len({frozenset(v) for v in vus.values()}) > 1:
            divergentes.append((clef, vus))
    verifier(not divergentes,
             f"{len(divergentes)} clef(s) aux substitutions divergentes"
             + (f" -> {divergentes[0]}" if divergentes else ""))

    # 6. L'arabe ne doit pas se contenter de recopier le francais.
    recopies = [c for c in reference
                if traductions["ar"].get(c) == traductions["fr"].get(c)
                and not INTRADUISIBLE.match(traductions["fr"].get(c, ""))]
    verifier(len(recopies) <= 12,
             f"arabe : {len(recopies)} valeur(s) identiques au francais"
             + (f" -> {recopies[:5]}" if len(recopies) > 12 else ""))

    print(f"\n{len(succes)} verification(s) passees")
    for message in succes:
        print(f"  ✅ {message}")
    if erreurs:
        print(f"\n{len(erreurs)} probleme(s) :")
        for message in erreurs:
            print(f"  ❌ {message}")
    return 1 if erreurs else 0


if __name__ == "__main__":
    sys.exit(main())
