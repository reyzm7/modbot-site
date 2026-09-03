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



# ══════════════════════════════════════════════════════════════════════
#  Le contrat entre le site et le bot
#
#  Une adresse mal ecrite ne leve rien : le bot repond 404, le
#  navigateur affiche « erreur », et personne ne sait laquelle. C'est
#  exactement le genre de panne qu'on ne trouve qu'en production.
#
#  Ce controle ne s'execute que si le depot du bot est a cote. Il ne
#  fait donc jamais echouer une verification lancee seule.
# ══════════════════════════════════════════════════════════════════════
print(chr(10) + "--- Chaque adresse appelee existe cote bot ---")

import os

racine = os.path.dirname(os.path.abspath(__file__))
# Depuis le depot principal, le bot est le voisin ; depuis un worktree,
# il est quatre niveaux plus haut.
candidats = [
    os.path.join(racine, "..", "modbot", "bot.py"),
    os.path.join(racine, "..", "..", "..", "..", "modbot", "bot.py"),
]
chemin_bot = next((c for c in candidats if os.path.exists(c)), None)

if chemin_bot is None:
    print("  --   depot du bot introuvable : controle passe")
else:
    source_bot = io.open(chemin_bot, encoding="utf-8", newline="").read()

    motifs = []
    chemins = re.findall(
        r'app\.router\.add_(?:get|post|put|delete|patch)\(\s*"([^"]+)"',
        source_bot)
    chemins += re.findall(
        r'app\.router\.add_route\(\s*"[^"]*"\s*,\s*"([^"]+)"', source_bot)
    for chemin in chemins:
        # « {guild_id} » accepte n'importe quel segment.
        motifs.append(re.compile(
            "^" + re.sub(r"\{[^}]+\}", "[^/]+", chemin) + "$"))

    verifier("le bot declare ses routes", len(motifs) > 30, str(len(motifs)))

    appels = set()
    for m in re.finditer(r'modbotApiFetch\(\s*(`[^`]+`|"[^"]+")', script):
        appels.add(m.group(1)[1:-1])
    for m in re.finditer(r'fetch\(\s*`\$\{base\}([^`]+)`', script):
        appels.add(m.group(1))

    # Les segments dynamiques prennent une valeur quelconque. Ceux qui
    # designent une SOUS-ACTION sont enumeres a part, sinon on ne
    # verifierait rien de ce qui suit.
    sous_actions = {"captcha/": ["setup", "panel", "lock", "disable"]}

    def formes(appel):
        chemin = appel.split("?")[0]
        for prefixe, valeurs in sous_actions.items():
            if chemin.endswith(prefixe + "${chemin}"):
                base = chemin[: -len("${chemin}")]
                return [base + v for v in valeurs]
        return [re.sub(r"\$\{[^}]+\}", "1", chemin)]

    orphelines = []
    for appel in sorted(appels):
        for forme in formes(appel):
            if forme == "1":
                continue      # adresse entierement calculee ailleurs
            if not any(motif.match(forme) for motif in motifs):
                orphelines.append(forme)

    verifier("aucune adresse appelee sans route cote bot",
             not orphelines, str(orphelines))



# ══════════════════════════════════════════════════════════════════════
#  Changer de serveur ne doit rien faire perdre
#
#  Trois defauts constates en usage, tous silencieux :
#
#    * les ressources et la configuration partageaient un seul `try`.
#      Une liste de salons qui n'arrivait pas — un 429 au moment de
#      changer de serveur — empechait la configuration d'etre appliquee,
#      et le premium avec : le dashboard annoncait « Reserve a ModBot
#      Premium » sur un serveur qui l'avait ;
#    * changer de serveur emportait les modifications non enregistrees
#      sans rien demander, alors que changer de rubrique prevenait ;
#    * on restait sur la rubrique de l'ancien serveur, a lire des
#      reglages qui n'etaient plus les siens.
# ══════════════════════════════════════════════════════════════════════
print(chr(10) + "--- Changer de serveur ---")

# Le bloc s'arrete a la fonction suivante, pas a un nombre de
# caracteres : une fenetre fixe de 2400 signes se refermait sur le
# premier commentaire ajoute, et le test echouait sans qu'aucun code
# n'ait change.
bloc = script[script.index("async function chargerConfigDuServeur"):]
bloc = bloc[:re.search(chr(10) + r"  (?:async )?function ", bloc[10:]).start()]

verifier("les ressources ont leur propre try",
         bloc.count("try {") >= 3, "%d blocs try" % bloc.count("try {"))
verifier("un echec des ressources n'emporte pas la configuration",
         bloc.index("await loadDashboardResources") <
         bloc.index("const data = await modbotApiFetch"))
verifier("l'echec des ressources est dit sans mentir",
         "js.ressourcesIndisponibles" in bloc)
verifier("une configuration illisible fait quand meme demander le premium",
         "/premium`" in bloc and "appliquerPremium(etat.premium)" in bloc)
# Le premium ne se pose que sur une reponse REELLE du bot. Un catch qui
# appellerait appliquerPremium avec un objet vide affirmerait une perte
# qu'on ne sait pas.
apres_secours = bloc[bloc.index("appliquerPremium(etat.premium)"):]
verifier("si tout echoue, on ne pretend pas que le premium a disparu",
         "appliquerPremium(" not in apres_secours[len("appliquerPremium(etat.premium)"):])

# ── Le premium ne depend d'aucun affichage ────────────────────────────
#
#  `appliquerPremium` etait appele au MILIEU de applyDashboardConfig,
#  apres les tickets, les images et les relais. La moindre exception
#  dans l'un d'eux et le serveur passait pour gratuit, verrous compris.
#  Ce qui coute de l'argent se pose avant ce qui ne fait que s'afficher.
bloc_apply = script[script.index("function applyDashboardConfig"):]
bloc_apply = bloc_apply[:bloc_apply.index(chr(10) + "  function ", 10)]

# Un seuil en caracteres ne veut rien dire — un commentaire le fait
# bouger. Ce qui compte : le premium passe AVANT toute autre section.
premier = bloc_apply.index("appliquerPremium(config.premium)")
autres = [bloc_apply.index(appel) for appel in
          ("setImagePicker(", "applyWelcomeState(", "applyAutoRoles(",
           "renderModerationConfig(", "sansCasser(")
          if appel in bloc_apply]
verifier("le premium passe avant toute autre section",
         autres and premier < min(autres),
         "premium a %d, premiere section a %d" % (premier, min(autres) if autres else -1))
verifier("il n'est applique qu'une fois",
         bloc_apply.count("appliquerPremium(config.premium)") == 1)
verifier("chaque section est isolee",
         bloc_apply.count("sansCasser(") >= 8,
         "%d sections" % bloc_apply.count("sansCasser("))

bloc_secours = script[script.index("async function chargerConfigDuServeur"):][:2800]
verifier("une erreur d'affichage n'est pas dite panne du bot",
         "js.configAffichageErreur" in bloc_secours)
verifier("et le premium est pose meme dans ce cas",
         "appliquerPremium(recue.premium)" in bloc_secours)
verifier("l'erreur reelle part dans la console",
         "console.error(" in bloc_secours)

bloc_switch = script[script.index("switcherList?.addEventListener"):][:700]
verifier("changer de serveur previent avant de perdre des reglages",
         "runWithUnsavedGuard(() => selectGuildFromElement(item))" in bloc_switch)

bloc_select = script[script.index("async function selectGuildFromElement"):][:1800]
verifier("changer de serveur revient a la vue globale",
         'openPanel("overview")' in bloc_select)
verifier("et recharge la configuration du nouveau serveur",
         "await loadSelectedGuildConfig(guildId)" in bloc_select)


# ══════════════════════════════════════════════════════════════════════
#  UNE REPONSE EN RETARD NE PEINT PAS L'ECRAN D'UN AUTRE SERVEUR
#
#  Ouvrir un serveur lance six requetes — ressources, configuration,
#  securite, journal, sauvegardes, giveaways. Rien ne les annulait. En
#  changeant de serveur, celles du precedent continuaient leur route et
#  ecrivaient leur reponse par-dessus la nouvelle : on lisait le journal
#  d'un serveur sous le nom d'un autre, et la liste des membres d'un
#  serveur avec les boutons bannir et expulser a cote.
#
#  La reponse la plus LENTE gagnait. C'est le contraire de ce qu'on veut.
# ══════════════════════════════════════════════════════════════════════
print(chr(10) + "--- Le melange entre serveurs ---")

verifier("le garde de serveur existe",
         "function estEncoreLeServeur(" in script)

for fonction in ("loadDashboardResources", "loadGuildLogs",
                 "loadGuildBackups", "loadGuildSecurity",
                 "loadGiveaways", "runSearch",
                 "chargerConfigDuServeur", "chargerScoreSecurite"):
    depart = script.index("function %s(" % fonction)
    suite = script[depart:]
    suivante = re.search(chr(10) + r"  (?:async )?function ", suite[10:])
    corps = suite[:suivante.start() + 10] if suivante else suite
    verifier("%s verifie le serveur apres l'attente" % fonction,
             "estEncoreLeServeur(" in corps)
    # Le garde n'a de sens qu'APRES un await : pose avant, il verifie une
    # valeur qui n'a pas encore eu le temps de changer.
    if "await modbotApiFetch" in corps:
        verifier("%s ne verifie pas avant d'attendre" % fonction,
                 corps.index("await modbotApiFetch")
                 < corps.rindex("estEncoreLeServeur("))

# Le message qui envoyait chercher la panne au mauvais endroit : « bot
# pas connecte » s'affichait pour un 403, un 429 ou un 500 tout autant
# que pour une vraie coupure — et la raison, que le bot avait pourtant
# envoyee, etait jetee.
verifier("l'echec de configuration donne sa raison",
         "js.configEchec" in script)
verifier("et la raison part aussi dans la console",
         "console.error(`Configuration du serveur" in script)



# On n'enregistre pas les reglages d'un serveur sur un autre : pendant
# que la configuration du nouveau arrive, les champs a l'ecran portent
# encore les valeurs du precedent. Un clic sur Enregistrer a cet instant
# les recopiait.
verifier("le chargement d'un serveur est signale",
         "function serveurEnChargement(" in script)
verifier("et il encadre bien le chargement",
         "chargementServeur += 1" in script and "chargementServeur -= 1" in script)
for enregistrement in ("saveCurrentChanges", "saveGuildSecurity", "saveWelcome"):
    depart = script.index("function %s(" % enregistrement)
    suite = script[depart:]
    suivante = re.search(chr(10) + r"  (?:async )?function ", suite[10:])
    corps = suite[:suivante.start() + 10] if suivante else suite
    verifier("%s refuse d'ecrire pendant le chargement" % enregistrement,
             "serveurEnChargement()" in corps)



# Toute section d'affichage est sous filet, et celle qui echoue est
# NOMMEE. « Une rubrique n'a pas pu s'afficher » obligeait a ouvrir la
# console pour savoir laquelle.
corps_apply = script[script.index("function applyDashboardConfig"):]
corps_apply = corps_apply[:re.search(chr(10) + r"  (?:async )?function ",
                                     corps_apply[10:]).start()]
verifier("applyDashboardConfig rend la liste de ses echecs",
         "return rubriquesEnEchec;" in corps_apply)
verifier("le message nomme les rubriques en echec",
         "js.configRubriquesEchec" in script)

# Chaque section porte un nom distinct : deux sections homonymes se
# confondraient dans le message.
noms = re.findall(r'sansCasser\("([^"]+)"', corps_apply)
verifier("au moins douze sections sous filet", len(noms) >= 12, str(len(noms)))
verifier("aucun nom de section en double",
         len(noms) == len(set(noms)),
         str([n for n in noms if noms.count(n) > 1]))

# Chaque appel d'affichage passe par le filet. Une premiere version de
# ce test comptait les lignes « nues » entre deux sections en suivant la
# profondeur des accolades — mais un gabarit ouvert sur une ligne et
# ferme sur une autre desequilibre ce comptage, la profondeur ne
# redescendait jamais a zero, et le test ne pouvait plus rien detecter.
# Un test qui ne peut pas echouer ne vaut rien : on verifie desormais,
# ligne par ligne, que chaque appel connu est bien sur une ligne
# sansCasser.
APPELS = ("applyWelcomeState(", "renderReactionPreview(",
          "renderModerationConfig(", "renderDashboardStats(",
          "applyAutoRoles(", "applyAiState(", "applyVoiceState(",
          "applyEventsState(")
nues = []
for ligne in corps_apply.split(chr(10)):
    net = ligne.strip()
    if net.startswith("//") or "sansCasser(" in net:
        continue
    for appel in APPELS:
        if appel in net:
            nues.append(net[:60])
verifier("chaque affichage passe par le filet", not nues, str(nues[:3]))


rates = [n for n, ok, _ in resultats if not ok]
print("\n" + "=" * 62)
print(f"RESULTAT : {len(resultats) - len(rates)}/{len(resultats)} verifications passees")
for n in rates:
    print("  - " + n)
sys.exit(1 if rates else 0)
