# Reprendre le développement du site ModBot

> Ce dépôt ne contient que **le site**. Le projet complet en compte deux.

## Le document de référence est dans l'autre dépôt

L'état complet du projet — architecture, décisions techniques, variables
d'environnement, bugs connus, prochaines étapes — vit dans :

**`modbot/ETAT-DU-PROJET.md`**

```bash
git clone https://github.com/reyzm7/modbot.git
```

Lis-le avant de toucher au code. Il explique pourquoi plusieurs choix qui
paraissent bizarres sont délibérés, et les défaire ferait réapparaître des
bugs déjà corrigés.

---

## L'essentiel pour ce dépôt

### Déploiement

Vercel déploie **`main`**. Pousser une branche de travail ne déploie rien —
c'est le piège qui a déjà coûté un « les changements n'ont pas marché ».

```bash
git checkout main
```

```bash
git merge <branche-de-travail> --no-edit
```

```bash
git push origin main
```

### Aucune dépendance

Pas de framework, pas de bundler, pas de `node_modules`. HTML, CSS et
JavaScript natifs. Node ne sert qu'à l'outillage local :

```bash
node devserver.js
```

Le site est alors sur `http://localhost:4173`.

### Tests

Quatre suites, sans aucune dépendance : uniquement la bibliothèque
standard de Python.

```bash
python test_i18n.py
```

```bash
python test_derives.py
```

`test_i18n.py` vérifie que les cinq langues portent les mêmes clefs,
qu'aucun texte visible n'échappe au moteur, et qu'aucune clef ne dort.
`test_derives.py` croise ce que le site **recopie** du bot — les
fonctionnalités premium, les variables de compteur — avec l'original, et
compare chaque texte écrit en dur dans les pages à sa traduction
française. Les trois premiers croisements demandent le dépôt `modbot` à
côté ; ils se sautent proprement s'il est absent.

Les deux autres, `test_declarations.py` et `test_selecteurs.py`,
attrapent les noms lus sans être déclarés et les sélecteurs qui ne
visent plus rien.

**Tout cela tourne à chaque poussée** : `.github/workflows/tests.yml`.
L'onglet Actions du dépôt dit en deux minutes si un lot a cassé quelque
chose. Vercel, lui, déploie sans attendre le résultat — regarde le rouge
s'il y en a.

### Fichiers

| Fichier | Rôle |
|---|---|
| `script.js` | Auth OAuth2, appels API, rendu des 13 panneaux, moteur i18n |
| `translations.js` | **Tous les textes.** Chargé avant `script.js` |
| `style.css` | Design, construit en couches empilées |
| `dashboard.html` | Le dashboard |
| `index.html` | Accueil, statistiques publiques, dons |

### Trois pièges à connaître

**1. `data-i18n` sur un élément qui contient un champ.**
Le moteur écrit `textContent` : cela supprimerait le champ. Mets la clé sur un
`<span>` interne. Le moteur s'en protège désormais, mais autant l'écrire
correctement.

**2. `requestAnimationFrame` ne se déclenche pas dans un onglet en
arrière-plan.** Pour une animation qui doit aboutir même là, force un reflow
(`void element.offsetHeight`) ou écris la valeur finale avant d'animer.

**3. L'URL de l'API se résout dans cet ordre :**
`window.MODBOT_API_URL` → `localStorage` → balise `<meta name="modbot-api-url">`.
Le `localStorage` passe **avant** la balise, volontairement : une URL déployée
obsolète peut ainsi être corrigée sans redéploiement.

Il passe avant, mais il ne la **masque pas**. Une adresse fausse enregistrée
une fois — le lien du tableau de bord Railway, par exemple — cachait la balise
à tout le reste du code : le site restait cassé sur cet appareil, et sur lui
seul, d'où les « chez moi ça marche ». La balise reste donc toujours candidate,
`normalizeApiBase()` ne garde que l'origine d'une adresse (ni chemin ni
requête), et une adresse enregistrée qui ne répond plus est oubliée dès qu'une
autre répond.

**4. Les statistiques de l'accueil comptent des LANGUES, pas des pays.**
Discord ne communique pas le pays d'un serveur — le point est clos, ne le
rouvre pas. `/api/public/stats` renvoie `languages`, `top_languages` et
`unspecified` ; la dernière entrée de la liste porte `unknown: true` et
regroupe les serveurs dont personne n'a choisi la langue. Détail dans
`modbot/ETAT-DU-PROJET.md` §14.

### Tester le rendu en local

`devserver.js` sert les fichiers, mais la page vise l'API de production. Pour
la brancher sur un bot local, ouvre la console et pose l'URL une fois :

```js
localStorage.setItem("modbot-api-url", "http://127.0.0.1:8080")
```

Le bot peut aussi servir le site lui-même (`MODBOT_SITE_DIR`) : même origine,
plus rien à configurer.
