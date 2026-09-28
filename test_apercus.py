# -*- coding: utf-8 -*-
"""
Les aperçus du tableau de bord.

Un message qu'on écrit dans un champ ne ressemble à rien tant qu'on ne
l'a pas vu dans Discord. On découvrait l'accueil du courrier privé en
écrivant au bot depuis un autre compte, et l'annonce de niveau en
attendant qu'un membre monte de niveau — c'est-à-dire qu'on ne le
relisait jamais.

Ce que cette suite verrouille :

  * CHAQUE MESSAGE A SON APERÇU. Six rubriques écrivent un message que
    des membres liront ; les six le montrent.
  * L'APERÇU NE PEUT PAS BLESSER. Le texte vient de champs libres : il
    est échappé, et la couleur — qui part dans un attribut « style » —
    n'est acceptée que sous sa forme hexadécimale.
  * IL SUIT CE QUE LE BOT FAIT VRAIMENT. Les variables affichées sont
    celles que le bot remplace, et un gabarit que le bot ignorerait
    n'est pas montré comme s'il allait partir.

Lancement, depuis le dossier du site :
    python test_apercus.py
"""
import io
import os
import re
import sys

SITE = os.path.dirname(os.path.abspath(__file__))
resultats = []


def verifier(nom, condition, detail=""):
    resultats.append((nom, bool(condition), detail))
    print(("  OK   " if condition else "  ECHEC ") + nom
          + (f"  [{detail}]" if detail else ""))


def lire(nom):
    return io.open(f"{SITE}/{nom}", encoding="utf-8", newline="").read()


script = lire("script.js")
page = lire("dashboard.html")
style = lire("dashboard.css")


# ══════════════════════════════════════════════════════════════════════
#  1. Chaque message a son aperçu
# ══════════════════════════════════════════════════════════════════════
print("\n=== Chaque message a son aperçu ===")

verifier("la bienvenue garde le sien", "data-welcome-preview" in page)
verifier("les tickets aussi", "data-live-title" in page and "ticket-preview" in page)

for nom in ("roles", "modmail", "niveau", "anniversaire"):
    verifier(f"« {nom} » a le sien", f'data-apercu="{nom}"' in page)
    verifier(f"et quelqu'un sait le dessiner", f"    {nom}()" in script
             or f"{nom}() {{" in script, nom)

apercus = set(re.findall(r'data-apercu="(\w+)"', page))
dessines = set(re.findall(r"^    (\w+)\(\) \{", script, re.M))
verifier("aucun aperçu sans dessin", not (apercus - dessines),
         ", ".join(sorted(apercus - dessines)))
verifier("aucun dessin sans aperçu", not (dessines - apercus),
         ", ".join(sorted(dessines - apercus)))


# ══════════════════════════════════════════════════════════════════════
#  2. L'aperçu ne peut pas blesser
# ══════════════════════════════════════════════════════════════════════
print("\n=== Rien ne passe en clair ===")

corps = script[script.index("function dessinerApercu"):]
corps = corps[:corps.index("const APERCUS")]

# On ne regarde que ce qui part dans le HTML : un gabarit qui sert à
# fabriquer un sélecteur ou une chaîne de texte sera échappé plus loin.
colle = corps[corps.index("hote.innerHTML ="):]
colle = colle[:colle.index("`;")]
morceaux = re.findall(r"\$\{([^}]+)\}", colle)
bruts = [m.strip() for m in morceaux
         if "escapeHtml" not in m and "couleurSure" not in m
         and m.strip() not in ("rangee", 'corps.join("")')]
verifier("tout ce qui part dans le HTML est échappé", not bruts,
         ", ".join(bruts[:3]))

# Les lignes et les boutons sont collés plus haut : eux aussi doivent
# passer par escapeHtml avant d'entrer dans le gabarit.
verifier("les lignes d'une liste sont échappées", "escapeHtml(ligne)" in corps)
verifier("les libellés des boutons aussi", "escapeHtml(libelle)" in corps)

verifier("la couleur est filtrée avant d'entrer dans un attribut style",
         "couleurSure(c.couleur)" in corps
         and "/^#[0-9a-f]{6}$/i" in script)
verifier("et une couleur refusée retombe sur celle du bot",
         'couleurSure(valeur, repli = "#8B5CF6")' in script)


# ══════════════════════════════════════════════════════════════════════
#  3. Il suit ce que le bot fait
# ══════════════════════════════════════════════════════════════════════
print("\n=== Fidèle au bot ===")

variables = script[script.index("function remplirVariables"):][:900]
for jeton in ("{user}", "{membre}", "{membres}", "{server}", "{niveau}",
              "{username}", "{tag}", "{memberCount}"):
    nu = jeton.strip("{}")
    verifier(f"« {jeton} » est remplacé", f"\\{{{nu}\\}}" in variables, jeton)

verifier("un gabarit que le bot ignorerait n'est pas montré comme tel",
         'gabarit.includes("{membre}") || gabarit.includes("{niveau}")' in script)
verifier("le nom d'un rôle est affiché, pas son identifiant",
         "function nomDuRole" in script and "`@${role.name}`" in script)
verifier("les boutons ne paraissent que si le serveur les a choisis",
         'readChecked("[data-reaction-boutons]") ? lignes : []' in script)


# ══════════════════════════════════════════════════════════════════════
#  4. Quand ça se redessine
# ══════════════════════════════════════════════════════════════════════
print("\n=== Quand ça se redessine ===")

verifier("une seule écoute, posée sur le tableau de bord entier",
         script.count('dashboard?.addEventListener("input", planifierApercus)') == 1
         and script.count('dashboard?.addEventListener("change", planifierApercus)') == 1)
verifier("la frappe ne redessine pas à chaque touche",
         "window.clearTimeout(minuteurApercus)" in script
         and "setTimeout(rafraichirApercus, 80)" in script)
verifier("l'arrivée de la configuration les redessine",
         'sansCasser("aperçus", rafraichirApercus)' in script)
verifier("ouvrir une rubrique aussi : un panneau caché ne se redessine pas",
         "rafraichirApercus();" in script[script.index("function openPanel"):][:1400])
verifier("un aperçu raté n'emporte pas les autres",
         "console.warn(`Apercu" in script)


# ══════════════════════════════════════════════════════════════════════
#  5. Ce que ça donne à l'écran
# ══════════════════════════════════════════════════════════════════════
print("\n=== À l'écran ===")

verifier("les aperçus réutilisent le cadre Discord existant",
         page.count('class="discord-preview" data-apercu') == 4)
verifier("les boutons ont leur style", ".apercu-bouton {" in style)
verifier("les lignes d'une liste aussi", ".apercu-ligne {" in style)

for clef in ("apercu.vide", "apercu.roles", "apercu.modmail",
             "apercu.niveau", "apercu.anniversaire"):
    verifier(f"« {clef} » est traduit", f'"{clef}"' in lire("translations.js"))


# ══════════════════════════════════════════════════════════════════════
rates = [n for n, ok, _ in resultats if not ok]
print("\n" + "=" * 62)
print(f"RESULTAT : {len(resultats) - len(rates)}/{len(resultats)} verifications passees")
for n in rates:
    print("  - " + n)
sys.exit(1 if rates else 0)
