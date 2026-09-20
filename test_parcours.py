# -*- coding: utf-8 -*-
"""
Le site ouvert pour de vrai, dans un navigateur.

Les autres suites lisent des fichiers : elles comparent des clefs, des
selecteurs, des prix. Aucune n'ouvre une page. Deux pannes ont traverse
tout ce filet sans etre vues :

  * en theme clair, le titre de l'accueil restait peint en blanc sur du
    blanc — un degrade decoupe dans le texte, que rien dans le code ne
    signale comme illisible ;
  * sur une machine reglee sur « reduire les animations », une regle
    universelle ecrasait TOUTE animation du site a un centieme de
    milliseconde. Plus rien ne bougeait, nulle part.

Ce fichier ouvre donc les pages, dans les deux themes, sur telephone et
sur ordinateur, avec et sans la preference de calme, et regarde ce qui
s'affiche vraiment : les pixels du titre, l'opacite des blocs, la
largeur de la page, les erreurs de la console.

Lancement, depuis le dossier du site :
    python -m http.server 8000 &
    python test_parcours.py
"""
import io
import os
import sys

from playwright.sync_api import sync_playwright

BASE = os.environ.get("SITE_BASE", "http://127.0.0.1:8000")

# Les pages qu'un visiteur voit. Le dashboard s'arrete a son ecran de
# connexion sans jeton : c'est deja une page a ne pas casser.
PAGES = [
    ("index.html", "l'accueil"),
    ("premium.html", "la page Premium"),
    ("boutique.html", "la boutique"),
    ("wiki.html", "le wiki"),
    ("statut.html", "l'etat du service"),
    ("partenaires.html", "les partenaires"),
    ("articles.html", "les guides"),
    ("dashboard.html", "le tableau de bord"),
]

resultats = []


def verifier(nom, condition, detail=""):
    resultats.append((nom, bool(condition), detail))
    print(("  OK   " if condition else "  ECHEC ") + nom + (f"  [{detail}]" if detail else ""))


# ══════════════════════════════════════════════════════════════════════
#  Ce qu'on demande a une page
# ══════════════════════════════════════════════════════════════════════

# Le bot n'est pas joignable depuis la CI : ses appels echouent, et
# c'est normal. On ne retient que ce qui vient du site lui-meme.
BRUIT = (
    "railway.app", "Failed to fetch", "net::ERR", "favicon",
    "ERR_INTERNET_DISCONNECTED", "ERR_NAME_NOT_RESOLVED",
    "Statistiques publiques indisponibles", "Decor desactive",
    "the server responded with a status",
)


def ouvrir(navigateur, chemin, theme, mobile, calme):
    """Une page, dans un contexte donne. Rend la page et ses erreurs."""
    contexte = navigateur.new_context(
        viewport={"width": 390, "height": 844} if mobile else {"width": 1280, "height": 900},
        is_mobile=False,
        reduced_motion="reduce" if calme else "no-preference",
    )
    erreurs = []
    contexte.add_init_script(
        "try { localStorage.setItem('modbot-theme', %r); } catch (e) {}" % theme
    )
    page = contexte.new_page()
    page.on("console", lambda m: erreurs.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: erreurs.append("pageerror: " + str(e)))
    page.goto(f"{BASE}/{chemin}", wait_until="load", timeout=30000)
    page.wait_for_timeout(2500)
    propres = [e for e in erreurs if not any(b in e for b in BRUIT)]
    return contexte, page, propres


def titre_visible(page):
    """Le premier grand titre se detache-t-il de son fond ?

    On ne lit pas la couleur declaree : un titre peint dans un degrade
    decoupe au texte a « color: transparent », et toute lecture de
    propriete le dirait parfaitement lisible. On regarde les pixels.
    """
    titre = page.query_selector("h1")
    if not titre:
        return True, "pas de titre"
    boite = titre.bounding_box()
    if not boite or boite["width"] < 40 or boite["height"] < 10:
        return True, "titre sans surface"
    image = titre.screenshot(type="png")
    from PIL import Image
    import io as _io
    photo = Image.open(_io.BytesIO(image)).convert("L")
    pixels = list(photo.getdata())
    if not pixels:
        return False, "capture vide"
    # Le fond domine ; le texte, lui, s'en ecarte franchement. Si moins
    # d'un pixel sur cinquante s'en ecarte, il n'y a rien a lire.
    fond = max(set(pixels), key=pixels.count)
    ecartes = sum(1 for p in pixels if abs(p - fond) > 40)
    part = ecartes / len(pixels)
    return part > 0.02, f"{part * 100:.1f} % des pixels se detachent"


def blocs_invisibles(page):
    """Un bloc dans l'ecran, mais peint a zero d'opacite.

    Rend aussi le nombre de blocs EXAMINES. Un test qui ne trouve rien a
    regarder passe au vert sans rien garantir : c'est arrive ici meme,
    dans une fenetre de hauteur nulle ou plus aucun element n'etait
    "dans l'ecran". On verifie donc que le filet a bien peche.
    """
    return page.evaluate(
        """() => {
          const dedans = (e) => {
            const b = e.getBoundingClientRect();
            return b.height > 8 && b.width > 8 && b.top < innerHeight && b.bottom > 0;
          };
          const vus = [...document.querySelectorAll("main *")].filter(dedans);
          return {
            examines: vus.length,
            caches: vus
              .filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.05
                && e.textContent.trim().length > 12)
              .map((e) => (e.className || e.tagName).toString().slice(0, 40))
              .slice(0, 5),
          };
        }"""
    )


def deborde(page):
    """Une page plus large que l'ecran : le defilement horizontal."""
    return page.evaluate(
        "() => document.documentElement.scrollWidth - document.documentElement.clientWidth"
    )


# ══════════════════════════════════════════════════════════════════════
#  Le parcours
# ══════════════════════════════════════════════════════════════════════
with sync_playwright() as p:
    navigateur = p.chromium.launch()

    for theme in ("dark", "light"):
        print(f"\n--- Le site en theme {'sombre' if theme == 'dark' else 'clair'} ---")
        for chemin, nom in PAGES:
            contexte, page, erreurs = ouvrir(navigateur, chemin, theme, mobile=False, calme=False)
            verifier(f"{nom} : aucune erreur", not erreurs, str(erreurs[:2]))
            lisible, detail = titre_visible(page)
            verifier(f"{nom} : son titre se lit", lisible, detail)
            vu = blocs_invisibles(page)
            verifier(f"{nom} : rien d'invisible a l'ecran",
                     not vu["caches"], str(vu["caches"]))
            verifier(f"{nom} : le test a bien regarde quelque chose",
                     vu["examines"] >= 3, f"{vu['examines']} bloc(s) examines")
            contexte.close()

    print("\n--- Sur un telephone, dans les deux themes ---")
    for theme in ("dark", "light"):
        for chemin, nom in PAGES:
            contexte, page, _ = ouvrir(navigateur, chemin, theme, mobile=True, calme=False)
            trop = deborde(page)
            verifier(f"{nom} ({theme}) : tient dans la largeur", trop <= 1, f"{trop} px de trop")
            contexte.close()

    # ══════════════════════════════════════════════════════════════════
    print("\n--- Quand le systeme demande de reduire les animations ---")
    #
    # « Reduire » n'est pas « supprimer ». Un fondu ne deplace rien : il
    # doit survivre. Une regle universelle avait fige le site entier.
    contexte, page, _ = ouvrir(navigateur, "index.html", "dark", mobile=False, calme=True)

    duree = page.evaluate(
        """() => {
          const e = document.querySelector(".reveal");
          if (!e) return -1;
          e.classList.add("is-visible");
          const d = getComputedStyle(e).transitionDuration.split(",")[0].trim();
          return d.endsWith("ms") ? parseFloat(d) : parseFloat(d) * 1000;
        }"""
    )
    verifier("un bloc qui se revele garde son fondu", duree > 100, f"{duree} ms")

    anims = page.evaluate(
        """async () => {
          document.querySelector("[data-nav-menu-trigger]")?.click();
          await new Promise((f) => setTimeout(f, 80));
          const panneau = document.querySelector("[data-nav-menu-panel]");
          if (!panneau) return { panneau: 0, boutons: 0 };
          return {
            panneau: panneau.getAnimations().length,
            boutons: [...panneau.children].filter((b) => b.getAnimations().length).length,
          };
        }"""
    )
    verifier("le menu « Acces » s'ouvre encore en fondu", anims["panneau"] > 0, str(anims))
    verifier("et ses boutons arrivent un par un", anims["boutons"] >= 3, str(anims))

    glissements = page.evaluate(
        """() => {
          const r = getComputedStyle(document.documentElement);
          return ["--entree-bloc", "--reveal-decalage", "--levee-survol", "--entree-menu"]
            .map((n) => n + "=" + r.getPropertyValue(n).trim())
            .filter((v) => !v.endsWith("=0px"));
        }"""
    )
    verifier("mais plus rien ne glisse", not glissements, str(glissements))
    contexte.close()

    navigateur.close()

rates = [n for n, ok, _ in resultats if not ok]
print("\n" + "=" * 62)
print(f"RESULTAT : {len(resultats) - len(rates)}/{len(resultats)} verifications passees")
for n in rates:
    print("  - " + n)
print("Ce fichier ouvre les pages pour de vrai : il voit ce qu'aucune")
print("lecture de code ne peut voir — un titre blanc sur blanc, un site fige.")
sys.exit(1 if rates else 0)
