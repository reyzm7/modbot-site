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
