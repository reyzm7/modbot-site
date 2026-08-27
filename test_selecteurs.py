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
verifier("elle reste sous la limite de Discord",
         "256 * 1024" in script)


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


rates = [n for n, ok, _ in resultats if not ok]
print("\n" + "=" * 62)
print(f"RESULTAT : {len(resultats) - len(rates)}/{len(resultats)} verifications passees")
for n in rates:
    print("  - " + n)
sys.exit(1 if rates else 0)
