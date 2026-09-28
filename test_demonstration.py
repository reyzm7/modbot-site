# -*- coding: utf-8 -*-
"""
Le tableau de bord de démonstration.

« À quoi ça ressemble ? » est la question qu'on se pose AVANT d'inviter
un bot, et la seule réponse qu'on avait était des captures d'écran. Le
bouton « Voir une démonstration » ouvre le vrai tableau de bord, rempli
de données inventées.

Ce que cette suite verrouille, dans l'ordre d'importance :

  * RIEN NE PART. Le mode démonstration ne doit jamais toucher au bot :
    ni pour lire, ni — surtout — pour écrire. Le garde est posé à
    l'endroit où tout passe, et les trois gestes qui enregistrent le
    disent au lieu d'essayer.
  * PERSONNE NE S'Y TROMPE. Un bandeau sur chaque écran, et un
    identifiant de serveur qui ne peut appartenir à personne.
  * TOUT SE LIT. Les textes de la démonstration passent par les
    traductions, comme le reste du site.

Lancement, depuis le dossier du site :
    python test_demonstration.py
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
demo = lire("demo-dashboard.js")


# ══════════════════════════════════════════════════════════════════════
#  1. Rien ne part
# ══════════════════════════════════════════════════════════════════════
print("\n=== Rien ne part ===")

garde = script[script.index("async function modbotApiFetch"):][:400]
verifier("le garde est posé là où tous les appels passent",
         "if (window.MODBOT_DEMO)" in garde)
verifier("et avant que l'adresse du bot ne soit lue",
         garde.index("window.MODBOT_DEMO") < garde.index("getModbotApiBase()"))

for nom, fonction in (("enregistrer", "async function saveCurrentChanges"),
                      ("enregistrer au bot", "async function saveDashboardConfigToApi"),
                      ("poser un modèle", "async function appliquerModele"),
                      ("revenir à une version", "async function restaurerVersion")):
    corps = script[script.index(fonction):][:700]
    verifier(f"« {nom} » se refuse en démonstration", "enDemo()" in corps)

ouverture = script[script.index("function openPanel(panelName)"):][:1200]
verifier("les panneaux n'interrogent pas le bot en démonstration",
         "if (enDemo()) return;" in ouverture)
verifier("et le garde vient AVANT le premier chargement",
         ouverture.index("if (enDemo()) return;")
         < ouverture.index('if (panelName === "search")'))

verifier("le serveur de démonstration ne reste pas dans le navigateur",
         'localStorage.removeItem("modbot-selected-guild")' in script)


# ══════════════════════════════════════════════════════════════════════
#  2. Personne ne s'y trompe
# ══════════════════════════════════════════════════════════════════════
print("\n=== Personne ne s'y trompe ===")

verifier("le bouton existe sur l'écran de connexion",
         "data-dashboard-demo" in page)
verifier("le bandeau existe, et il est traduit",
         "data-demo-bandeau" in page and 'data-i18n="demo.bandeau"' in page)
verifier("il porte un bouton pour en sortir", "data-demo-quitter" in page)
verifier("le bandeau vit dans le tableau de bord, pas ailleurs",
         page.index("data-demo-bandeau") > page.index("data-dashboard-app"))
verifier("il est masqué tant qu'on n'est pas en démonstration",
         re.search(r'data-demo-bandeau hidden', page) is not None)
verifier("le fichier des données est chargé par la page",
         '<script src="demo-dashboard.js"></script>' in page)
verifier("et avant le script qui s'en sert",
         page.index("demo-dashboard.js") < page.index("script.js"))

identifiants = re.findall(r'id:\s*"(\d{6,})"', demo)
verifier("le serveur de démonstration porte un identifiant impossible",
         any(i.startswith("0") for i in identifiants), str(identifiants[:3]))
verifier("quitter recharge la page plutôt que de démonter la démonstration",
         "window.location.reload()" in script)


# ══════════════════════════════════════════════════════════════════════
#  3. Tout se lit
# ══════════════════════════════════════════════════════════════════════
print("\n=== Tout se lit ===")

# Les noms de salons et de roles restent en clair : ce sont des noms
# Discord, pas des phrases, et on les ecrit pareil dans toutes les
# langues. Les textes de REGLAGE, eux, doivent passer par t().
TEXTUELS = ("author", "title", "description", "message",
            "departure_message", "dm_message", "xp_message",
            "anniv_message", "accueil", "footer",
            "reaction_title", "reaction_description", "persona")
en_dur = []
for champ in TEXTUELS:
    for valeur in re.findall(rf'\b{champ}:\s*"([^"]*)"', demo):
        if valeur.strip():
            en_dur.append(f"{champ} = {valeur[:30]}")
verifier("aucun texte de réglage écrit en dur : tout passe par les traductions",
         not en_dur, " · ".join(en_dur[:3]))

clefs = set(re.findall(r't\("(demo\.[\w.]+)"\)', demo))
verifier("les textes de la démonstration passent par les traductions",
         len(clefs) >= 10, f"{len(clefs)} clefs")

traductions = lire("translations.js")
manquantes = sorted(c for c in clefs if f'"{c}"' not in traductions)
verifier("et chacune existe en français", not manquantes, ", ".join(manquantes))

# Les cinq langues, verifiees par test_i18n.py : on ne refait pas son
# travail, on verifie seulement que le fichier est bien dans sa liste.
i18n = lire("test_i18n.py")
verifier("test_i18n.py lit le fichier de démonstration",
         '"demo-dashboard.js"' in i18n)


# ══════════════════════════════════════════════════════════════════════
#  4. Ce que la démonstration montre
# ══════════════════════════════════════════════════════════════════════
print("\n=== Ce qu'on voit ===")

verifier("des salons et des rôles, sinon chaque liste serait vide",
         demo.count('"text"') >= 8 and demo.count("position:") >= 5)
verifier("un état de sécurité, sinon la vue globale resterait à « Chargement… »",
         "securite:" in demo and "antiraid" in demo)
verifier("la vue globale est redessinée à l'entrée",
         'sansCasser("vue globale", renderOverview)' in script)
verifier("les modèles se rendent depuis les traductions du site",
         "renderModeles(" in script
         and "Object.keys(CLEFS_MODELES).map" in script)
verifier("le bandeau est mesuré une fois le tableau de bord à l'écran",
         script.index("mesurerLeBandeau();")
         > script.index('showDashboardStage("dashboard");'))


# ══════════════════════════════════════════════════════════════════════
rates = [n for n, ok, _ in resultats if not ok]
print("\n" + "=" * 62)
print(f"RESULTAT : {len(resultats) - len(rates)}/{len(resultats)} verifications passees")
for n in rates:
    print("  - " + n)
sys.exit(1 if rates else 0)
