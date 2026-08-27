# -*- coding: utf-8 -*-
"""
La charge utile « bienvenue » envoyee par le dashboard.

Ce test existe a cause d'un defaut precis. Le JS contenait DEUX
constructeurs de `welcome_system` : collectWelcomePayload(), complet, et
une copie perimee dans collectDashboardConfig() qui oubliait
`departure_channel_id`, visait des selecteurs disparus, et lisait
`departure_enabled` sur la mauvaise case a cocher.

Comme sanitize_welcome_system() repart des valeurs par defaut, toute
clef absente etait remise a zero : le salon de depart s'effacait a chaque
enregistrement general, et les departs repartaient dans le salon
d'arrivee. Le bot avait l'air de « confondre » les deux salons.

Lancement, depuis le dossier du site :
    python test_bienvenue.py
"""
import io
import re
import sys

resultats = []


def verifier(nom, condition, detail=""):
    resultats.append((nom, bool(condition), detail))
    print(("  OK   " if condition else "  ECHEC ") + nom + (f"  [{detail}]" if detail else ""))


script = io.open("script.js", encoding="utf-8").read()
html = io.open("dashboard.html", encoding="utf-8").read()


# ══════════════════════════════════════════════════════════════════════
print("\n--- Un seul constructeur de welcome_system ---")

constructeurs = re.findall(r"welcome_system:\s*(\w+\(\)|\{)", script)
verifier("welcome_system n'est construit qu'a un seul endroit",
         constructeurs.count("{") == 0,
         f"{constructeurs.count('{')} bloc(s) en dur, "
         f"{len([c for c in constructeurs if c.endswith('()')])} appel(s) de fonction")

verifier("collectDashboardConfig delegue a collectWelcomePayload",
         "welcome_system: collectWelcomePayload()" in script)


# ══════════════════════════════════════════════════════════════════════
print("\n--- Le constructeur envoie les deux salons ---")

debut = script.index("function collectWelcomePayload")
corps = script[debut:script.index("\n  }", debut)]

for clef in ("enabled", "departure_enabled", "dm_enabled", "embed_enabled",
             "channel_id", "departure_channel_id", "title", "message",
             "departure_message", "dm_message"):
    verifier(f"« {clef} » est envoye", f"{clef}:" in corps)

verifier("le salon d'arrivee lit [data-welcome-channel]",
         'channel_id: readValue("[data-welcome-channel]")' in corps)
verifier("le salon de depart lit [data-welcome-departure-channel]",
         'departure_channel_id: readValue("[data-welcome-departure-channel]")' in corps)
verifier("les deux salons ne lisent pas le meme champ",
         corps.count('readValue("[data-welcome-channel]")') == 1
         and corps.count('readValue("[data-welcome-departure-channel]")') == 1)


# ══════════════════════════════════════════════════════════════════════
print("\n--- Chaque selecteur cite existe vraiment dans le HTML ---")

# C'est ce controle qui manquait : [data-departure-message] et
# [data-welcome-bg] etaient cites par un code que personne ne relisait.
selecteurs = set(re.findall(r'readValue\("\[(data-welcome-[a-z-]+)\]"\)', corps))
selecteurs |= set(re.findall(r'readChecked\("\[(data-welcome-[a-z-]+)\]"\)', corps))
absents = sorted(s for s in selecteurs if s not in html)
verifier(f"les {len(selecteurs)} selecteurs du constructeur existent",
         not absents, str(absents))


# ══════════════════════════════════════════════════════════════════════
print("\n--- Les cases a cocher sont lues par leur nom, pas par leur rang ---")

# L'ancien code faisait querySelectorAll(...)[2] : inserer une case en
# amont deplacait silencieusement le reglage lu.
positionnel = re.findall(r"toggle-line input\"\)\[\d\]", script)
verifier("aucune case n'est lue par son rang dans le panneau bienvenue",
         not positionnel, str(positionnel))

for clef, selecteur in [
    ("enabled", "data-welcome-enabled"),
    ("departure_enabled", "data-welcome-departure-enabled"),
    ("dm_enabled", "data-welcome-dm-enabled"),
    ("embed_enabled", "data-welcome-embed-enabled"),
]:
    verifier(f"« {clef} » lit [{selecteur}]",
             f'{clef}: readChecked("[{selecteur}]")' in corps)


# ══════════════════════════════════════════════════════════════════════
print("\n--- Le dashboard previent quand le salon de depart est vide ---")

verifier("un depart active sans salon declenche un avertissement",
         'readChecked("[data-welcome-departure-enabled]")' in script
         and "js.departSansSalon" in script)


# ══════════════════════════════════════════════════════════════════════
print("\n--- Les deux salons sont distincts dans l'interface ---")

verifier("le HTML porte les deux listes deroulantes",
         "data-welcome-channel" in html and "data-welcome-departure-channel" in html)
verifier("chaque liste a son propre libelle traduit",
         'data-i18n="welcome.channel"' in html
         and 'data-i18n="welcome.departureChannel"' in html)


rates = [n for n, ok, _ in resultats if not ok]
print("\n" + "=" * 62)
print(f"RESULTAT : {len(resultats) - len(rates)}/{len(resultats)} verifications passees")
for n in rates:
    print("  - " + n)
sys.exit(1 if rates else 0)
