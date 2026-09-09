# -*- coding: utf-8 -*-
"""
Les copies du site collent-elles encore a leur original ?

Le site recopie a la main plusieurs listes que le bot detient : il lui
faut des libelles traduits en cinq langues, ce que l'API ne rend pas. La
copie est deliberee. Sa derive, non.

Elle a coute trois defauts en une semaine :

  * la page Premium annoncait « douze ensembles » et en affichait dix :
    PREMIUM_FONCTIONS n'avait pas suivi FONCTIONNALITES ;
  * les variables de compteur devaient etre ajoutees des deux cotes, et
    une puce que le bot ne connait pas est EFFACEE du nom du salon au
    lieu d'y ecrire un chiffre — sans rien dire ;
  * vingt-trois textes ecrits en dur dans les pages etaient restes a une
    version anterieure de leur traduction, dont deux tarifs faux dans
    les conditions d'utilisation.

Ce fichier est le pendant du croisement wiki/commandes de
`modbot/test_api.py` : meme idee, un cran plus loin.

    python test_derives.py

Les trois premiers croisements demandent le depot du bot a cote — ils
sont sautes s'il est absent, comme le croisement du wiki. Le quatrieme
ne depend que du site et tourne toujours.
"""
import io
import os
import re
import sys

SITE = os.path.dirname(os.path.abspath(__file__))
BOT = os.path.join(os.path.dirname(SITE), "modbot")

erreurs = []
succes = []


def verifier(condition, message):
    (succes if condition else erreurs).append(message)


def lire(nom):
    return io.open(os.path.join(SITE, nom), encoding="utf-8").read()


# ─────────────────────────────────────────────────────────────────────
#  Ce que le site recopie
# ─────────────────────────────────────────────────────────────────────
def bloc_js(source, debut, fin):
    """Le corps d'une declaration JavaScript, du debut a sa fermeture."""
    i = source.find(debut)
    if i < 0:
        return ""
    j = source.find(fin, i)
    return source[i:j] if j > i else ""


def fonctionnalites_du_site(script):
    """Les clefs de PREMIUM_FONCTIONS, dans l'ordre d'affichage."""
    bloc = bloc_js(script, "const PREMIUM_FONCTIONS = [", "\n];")
    return re.findall(r'titreClef:\s*"prem\.f\.([a-z_]+)\.titre"', bloc)


def variables_du_site(script):
    bloc = bloc_js(script, "const COMPTEUR_VARIABLES = [", "\n  ];")
    return re.findall(r'token:\s*"\{([a-z_]+)\}"', bloc)


def modeles_du_site(script):
    bloc = bloc_js(script, "const COMPTEUR_MODELES = [", "\n  ];")
    return re.findall(r'gabarit:\s*"([^"]+)"', bloc)


# ─────────────────────────────────────────────────────────────────────
#  Le repli HTML, celui qu'on voit avant que le JavaScript ne passe
# ─────────────────────────────────────────────────────────────────────
PAGES = ["index.html", "dashboard.html", "admin.html", "wiki.html",
         "premium.html", "partenaires.html",
         "confidentialite.html", "conditions.html"]

# `applySiteLanguage` ne remplace le textContent ENTIER que d'un element
# sans balise interne. Un element qui en contient ne voit remplacer que
# son premier noeud de texte : son repli n'a pas a etre identique, et
# l'aligner casserait la mise en forme.
ELEMENT = re.compile(
    r'<(h[1-4]|p|span|strong|small|li|button|a|label|em|td|th)\b[^>]*'
    r'\bdata-i18n="([^"]+)"[^>]*>([^<]*)</\1>', re.S)


def francais():
    """Le bloc francais de translations.js, sans moteur JavaScript."""
    src = lire("translations.js")
    bloc = re.search(r"^  fr: \{(.*?)^  \},?$", src, re.S | re.M)
    if not bloc:
        return {}
    return dict(re.findall(r'^\s*"([^"]+)":\s*"(.*?)",?\s*$', bloc.group(1), re.M))


def normaliser(texte):
    for avant, apres in (("&nbsp;", " "), ("&amp;", "&"), ("&lt;", "<"),
                         ("&gt;", ">"), ("&#39;", "'"),
                         ("&rsquo;", "’"), ("&#8217;", "’")):
        texte = texte.replace(avant, apres)
    return " ".join(texte.split())


def main():
    script = lire("script.js")

    # ── 1 a 3 : les copies, face a leur original ──────────────────────
    if not os.path.isdir(BOT):
        print(f"  (depot du bot absent de {BOT}, trois croisements ignores)")
    else:
        sys.path.insert(0, BOT)
        # `premium_core` et `compteurs` ne dependent que de la
        # bibliotheque standard : on les importe pour de vrai plutot que
        # de relire leur source a coups d'expressions rationnelles.
        import premium_core
        import compteurs

        du_site = fonctionnalites_du_site(script)
        du_bot = list(premium_core.FONCTIONNALITES)
        verifier(sorted(du_site) == sorted(du_bot),
                 "la page Premium montre les memes fonctionnalites que le bot"
                 + (f" -> site {len(du_site)}, bot {len(du_bot)} ; "
                    f"absentes du site : {sorted(set(du_bot) - set(du_site))}"
                    if sorted(du_site) != sorted(du_bot) else ""))

        variables = variables_du_site(script)
        connues = {fr for fr, _ in compteurs.VARIABLES}
        inconnues = [v for v in variables if v not in connues]
        # Une puce que le bot ne sait pas remplir n'ecrit pas « {truc} »
        # dans le nom du salon : elle est effacee. L'administrateur
        # croit avoir pose un chiffre, et il a pose du vide.
        verifier(not inconnues,
                 "aucune puce de compteur n'est inconnue du bot"
                 + (f" -> {inconnues}" if inconnues else ""))
        oubliees = [v for v in connues if v not in variables]
        verifier(not oubliees,
                 "aucune variable de compteur ne manque au dashboard"
                 + (f" -> {sorted(oubliees)}" if oubliees else ""))

        gabarits_site = modeles_du_site(script)
        gabarits_bot = [m["gabarit"] for m in compteurs.MODELES]
        verifier(gabarits_site == gabarits_bot,
                 "les modeles de compteur proposes sont ceux du bot"
                 + (f" -> site {gabarits_site} / bot {gabarits_bot}"
                    if gabarits_site != gabarits_bot else ""))

    # ── 4 : le repli HTML contre la valeur francaise ──────────────────
    fr = francais()
    verifier(bool(fr), f"le bloc francais contient {len(fr)} clefs")
    perimes = []
    compares = 0
    for page in PAGES:
        for _, clef, dedans in ELEMENT.findall(lire(page)):
            attendu = fr.get(clef)
            if attendu is None:
                perimes.append(f"{page} : clef inconnue {clef}")
                continue
            ecrit = normaliser(dedans)
            if not ecrit:
                continue          # rempli par le JavaScript
            compares += 1
            if ecrit != normaliser(attendu):
                perimes.append(f"{page} ({clef}) : {ecrit[:60]!r}")
    verifier(not perimes,
             f"les {compares} textes ecrits en dur disent la meme chose "
             "que leur traduction"
             + (f" -> {perimes[:3]}" if perimes else ""))

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
