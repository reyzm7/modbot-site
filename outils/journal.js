// Le journal des modifications.
//
// Une page d'annonces qu'on remplit a la main cesse d'etre remplie au
// bout de trois semaines. Celle-ci se construit a partir de ce qui a
// REELLEMENT ete livre : l'historique des deux depots. Rien n'y entre
// qui n'ait ete pousse, et rien n'y est redige pour l'occasion — les
// messages de commit de ce projet sont ecrits en francais lisible, et
// c'est cela qu'on affiche.
//
// Ce qui suit est volontairement sans dependance : node, git, et deux
// fichiers. Un generateur de page d'accueil n'a pas a tomber parce
// qu'un paquet a change de version.
//
//   node outils/journal.js              le jour ecoule
//   node outils/journal.js --jours 30   les trente derniers jours
//   node outils/journal.js --verifier   ne rien ecrire, dire ce qui changerait

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const SITE = path.resolve(__dirname, "..");
// Le depot du bot, quand il est pose a cote — c'est ce que fait la CI.
const BOT = path.resolve(SITE, "..", "modbot");
const DONNEES = path.join(SITE, "outils", "journal.json");
const GABARIT = path.join(SITE, "outils", "journal-gabarit.html");
const PAGE = path.join(SITE, "nouveautes.html");

// Combien la page affiche. Le fichier de donnees garde tout ; la page
// ne montre que le recent, sinon elle devient illisible — une premiere
// generation sur trente jours pesait 185 ko, avec quarante-quatre
// entrees le meme jour.
const JOURS_AFFICHES = 14;
const ENTREES_PAR_JOUR = 10;

const args = process.argv.slice(2);
const VERIFIER = args.includes("--verifier");
const iJours = args.indexOf("--jours");
const DEPUIS_JOURS = iJours >= 0 ? parseInt(args[iJours + 1], 10) : 2;
if (!Number.isFinite(DEPUIS_JOURS) || DEPUIS_JOURS < 1) throw new Error("--jours attend un nombre");

// ── La date du jour a Paris ───────────────────────────────────────────
// GitHub fait tourner ses crons en UTC et ne connait pas les fuseaux.
// Une entree datee en UTC apparaitrait la veille pendant deux heures
// chaque soir d'ete.
function jourParis(iso) {
  const d = new Date(iso);
  // « en-CA » rend « 2026-10-01 », qui se trie comme il s'ecrit.
  return d.toLocaleDateString("en-CA", { timeZone: "Europe/Paris" });
}

const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet",
  "août", "septembre", "octobre", "novembre", "décembre"];
function enFrancais(jour) {
  const [a, m, j] = jour.split("-").map(Number);
  return `${j === 1 ? "1er" : j} ${MOIS[m - 1]} ${a}`;
}

// ── Les etiquettes ────────────────────────────────────────────────────
// Deduites des fichiers touches, jamais du texte du message : un sujet
// peut parler de n'importe quoi, les chemins ne mentent pas.
const RANGEMENT = [
  [/^(article|wiki)[-.].*\.html$/, "Guides"],
  [/^(index|articles|boutique|statut|conditions|confidentialite|mentions)\.html$/, "Site"],
  [/^dashboard\.(html|css)$/, "Tableau de bord"],
  [/^(translations|traductions-\w+)\.js$/, "Traductions"],
  [/^(sitemap\.xml|robots\.txt)$/, "Référencement"],
  [/^(style\.css|icons\.js)$/, "Affichage"],
  [/^script\.js$/, "Site"],
  [/^test_.*\.py$/, "Tests"],
  [/^\.github\//, "Outillage"],
  [/^outils\//, "Outillage"],
  [/\.py$/, "Bot"],
];

function etiquettes(fichiers, depot) {
  const compte = new Map();
  for (const f of fichiers) {
    let nom = null;
    for (const [motif, e] of RANGEMENT) if (motif.test(f)) { nom = e; break; }
    if (!nom) nom = depot === "bot" ? "Bot" : "Site";
    compte.set(nom, (compte.get(nom) || 0) + 1);
  }
  // « Site » et « Bot » disent d'ou vient la modification, et l'entree
  // le montre deja dans son badge : repete en etiquette, cela donnait
  // « SITE · GUIDES · SITE ».
  const repli = depot === "bot" ? "Bot" : "Site";
  // Deux au plus : au-dela, l'etiquette ne renseigne plus sur rien.
  return [...compte.entries()].sort((a, b) => b[1] - a[1])
    .map((e) => e[0]).filter((e) => e !== repli).slice(0, 2);
}

// ── Lire un depot ─────────────────────────────────────────────────────
const SEP = "\u0001";
// Ce marqueur OUVRE chaque commit, il ne le ferme pas. « --name-only »
// imprime les fichiers APRES le format : un marqueur de fin les
// renvoyait dans le bloc suivant, dont le debut n'etait alors plus le
// SHA mais un nom de fichier. Les sept premiers caracteres de
// « style.css » servaient d'identifiant a tous les commits qui le
// touchaient, et le dedoublonnage en ecartait les neuf dixiemes.
const DEBUT = "\u0002";

function commits(racine, depot, depuis) {
  if (!fs.existsSync(path.join(racine, ".git"))) {
    console.log(`  ${depot} : pas de depot git a ${racine}, ignore`);
    return [];
  }
  let brut;
  try {
    brut = execFileSync("git", ["-C", racine, "log",
      "--no-merges", `--since=${depuis} days ago`,
      `--pretty=format:${DEBUT}%H${SEP}%cI${SEP}%s${SEP}%b`, "--name-only"],
      { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
  } catch (e) {
    console.log(`  ${depot} : git log a echoue (${e.message.split("\n")[0]}), ignore`);
    return [];
  }

  const out = [];
  for (const bloc of brut.split(DEBUT)) {
    const t = bloc.split(SEP);
    if (t.length < 4) continue;
    const sha = t[0].trim();
    // Un parseur qui se trompe en silence est precisement ce qui a
    // produit la premiere version de cette page : il refuse plutot.
    if (!/^[0-9a-f]{40}$/.test(sha)) throw new Error(depot + " : SHA illisible « " + sha.slice(0, 40) + " »");
    const [iso, sujet] = [t[1], t[2]];
    // Le corps et la liste des fichiers partagent le dernier morceau :
    // les fichiers viennent apres la premiere ligne vide qui suit le
    // corps, et « --name-only » les donne un par ligne.
    const reste = t[3].split("\n");
    const corps = [];
    const fichiers = [];
    for (const ligne of reste) {
      const l = ligne.trim();
      if (!l) { if (corps.length) corps.push(""); continue; }
      // Un chemin de fichier n'a ni espace ni majuscule initiale dans ce
      // projet, et contient toujours un point ou une barre.
      if (/^[\w.\-/]+$/.test(l) && /[./]/.test(l) && !/\s/.test(l)) fichiers.push(l);
      else corps.push(l);
    }
    if (!sujet || /^\[journal\]/.test(sujet)) continue;  // ses propres commits

    // Le premier paragraphe du corps : un patch note n'a pas a reciter
    // cinq paragraphes de justification.
    let detail = "";
    for (const l of corps) { if (!l) break; detail += (detail ? " " : "") + l; }
    if (detail.length > 300) {
      const coupe = detail.slice(0, 300);
      const point = Math.max(coupe.lastIndexOf(". "), coupe.lastIndexOf(" : "));
      detail = (point > 140 ? coupe.slice(0, point + 1) : coupe.replace(/\s\S*$/, "") + "…");
    }

    out.push({ depot, sha: sha.slice(0, 7), jour: jourParis(iso),
      titre: sujet.trim(), detail, etiquettes: etiquettes(fichiers, depot),
      fichiers: fichiers.length });
  }
  return out;
}

// ── Fusionner avec ce qui est deja enregistre ────────────────────────
let donnees = { jours: [] };
if (fs.existsSync(DONNEES)) donnees = JSON.parse(fs.readFileSync(DONNEES, "utf8"));

console.log(`Lecture des ${DEPUIS_JOURS} dernier(s) jour(s) :`);
const trouves = [...commits(SITE, "site", DEPUIS_JOURS), ...commits(BOT, "bot", DEPUIS_JOURS)];
console.log(`  ${trouves.length} commit(s)`);

const parJour = new Map(donnees.jours.map((j) => [j.date, j]));
// Un commit deja enregistre n'est pas ajoute deux fois : le cron peut
// repasser, et une execution a la main aussi.
const connus = new Set(donnees.jours.flatMap((j) => j.entrees.map((e) => e.depot + e.sha)));
let ajoutes = 0;
for (const c of trouves) {
  if (connus.has(c.depot + c.sha)) continue;
  if (!parJour.has(c.jour)) parJour.set(c.jour, { date: c.jour, entrees: [] });
  parJour.get(c.jour).entrees.push({ depot: c.depot, sha: c.sha, titre: c.titre,
    detail: c.detail, etiquettes: c.etiquettes, fichiers: c.fichiers });
  connus.add(c.depot + c.sha);
  ajoutes += 1;
}

donnees.jours = [...parJour.values()].sort((a, b) => (a.date < b.date ? 1 : -1));
donnees.genere = new Date().toISOString();

// ── Ecrire la page ────────────────────────────────────────────────────
const echapper = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Certains messages anciens ont ete ecrits sans apostrophes : « la page
// qu on quitte s en va ». Remettre l'elision est de la typographie, pas
// de la reecriture — le mot est le meme, et la liste des elisions
// francaises devant voyelle ne laisse pas de place a l'interpretation.
// Les accents manquants, eux, ne se devinent pas : on n'y touche pas.
const elisions = (s) => s.replace(/\b(qu|jusqu|lorsqu|puisqu|quelqu|[cdjlmnst])\s+(?=[aeiouéèêëàâäîïôöûüy])/gi,
  (m, mot) => mot + "’");

const NOM_DEPOT = { site: "Site", bot: "Bot" };

const html = donnees.jours.slice(0, JOURS_AFFICHES).map((j) => {
  const entrees = j.entrees.slice(0, ENTREES_PAR_JOUR).map((e) => {
    const etiq = e.etiquettes.map((x) =>
      `<span class="journal-etiquette">${echapper(x)}</span>`).join("");
    const detail = e.detail ? `\n            <p>${echapper(elisions(e.detail))}</p>` : "";
    return `          <li class="journal-entree" data-depot="${e.depot}">
            <p class="journal-etiquettes"><span class="journal-ou">${NOM_DEPOT[e.depot]}</span>${etiq}</p>
            <h3>${echapper(elisions(e.titre))}</h3>${detail}
          </li>`;
  }).join("\n");
  // Le compte exact plutot qu'un silence : une journee tronquee sans le
  // dire laisserait croire qu'il ne s'est rien passe d'autre.
  const reste = j.entrees.length - ENTREES_PAR_JOUR;
  const suite = reste > 0
    ? `\n          <li class="journal-reste">et ${reste} autre${reste > 1 ? "s" : ""} modification${reste > 1 ? "s" : ""} ce jour-là</li>`
    : "";
  return `      <section class="journal-jour">
        <h2><time datetime="${j.date}">${enFrancais(j.date)}</time></h2>
        <ul class="journal-liste">
${entrees}${suite}
        </ul>
      </section>`;
}).join("\n\n");

const total = donnees.jours.reduce((n, j) => n + j.entrees.length, 0);
const montres = donnees.jours.slice(0, JOURS_AFFICHES);
// Le resume parle de ce que la page montre, pas de ce que le fichier
// garde : annoncer trois cents modifications sur une page qui en liste
// quatre-vingts serait faux.
const vus = montres.reduce((n, j) => n + j.entrees.length, 0);
const resume = montres.length
  ? `${vus} modification${vus > 1 ? "s" : ""} depuis le ${enFrancais(montres[montres.length - 1].date)}`
  : "aucune modification enregistrée";

let page = fs.readFileSync(GABARIT, "utf8").replace(/\r\n/g, "\n")
  .replace("@@JOURNAL@@", html || '      <p class="field-help">Rien pour le moment.</p>')
  .replace("@@RESUME@@", echapper(resume))
  .replace("@@DATE@@", donnees.genere.slice(0, 10));

for (const marque of ["@@DATE@@", "@@RESUME@@", "@@JOURNAL@@"]) {
  if (page.includes(marque)) throw new Error(marque + " n'a pas ete remplace");
}

// Le sitemap doit dire que la page a change : sans cela un moteur la
// relit a son rythme, et une page quotidienne relue tous les mois ne
// sert a rien.
let sitemap = fs.readFileSync(path.join(SITE, "sitemap.xml"), "utf8").replace(/\r\n/g, "\n");
const AVANT_SITEMAP = sitemap;
const jourCourant = jourParis(new Date().toISOString());
// On decoupe d'abord les entrees, PUIS on cherche dedans : une regex qui
// part de « <url> » et court jusqu'au nom avale tout ce qui precede.
const entreesSitemap = [...sitemap.matchAll(/ *<url>[\s\S]*?<\/url>\n/g)].map((m) => m[0]);
const laNotre = entreesSitemap.find((e) => e.includes("/nouveautes.html<"));
if (laNotre) {
  sitemap = sitemap.replace(laNotre,
    laNotre.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${jourCourant}</lastmod>`));
} else {
  console.log("  (nouveautes.html n'est pas encore dans le sitemap)");
}

if (VERIFIER) {
  const ancienne = fs.existsSync(PAGE) ? fs.readFileSync(PAGE, "utf8").replace(/\r\n/g, "\n") : "";
  console.log(`\n--verifier : ${ajoutes} entree(s) nouvelle(s), ${total} au total`);
  console.log(`la page ${ancienne === page ? "ne changerait pas" : "changerait"}`);
  console.log(`le sitemap ${AVANT_SITEMAP === sitemap ? "ne changerait pas" : "changerait"}`);
  process.exit(0);
}

fs.writeFileSync(DONNEES, JSON.stringify(donnees, null, 2) + "\n", "utf8");
fs.writeFileSync(PAGE, page.replace(/\n/g, "\r\n"), "utf8");
if (AVANT_SITEMAP !== sitemap) {
  fs.writeFileSync(path.join(SITE, "sitemap.xml"), sitemap.replace(/\n/g, "\r\n"), "utf8");
}
console.log(`\n${ajoutes} entree(s) ajoutee(s), ${total} au total sur ${donnees.jours.length} jour(s)`);
console.log(`nouveautes.html : ${montres.length} jour(s) affiche(s)`);
