if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const discordInvite = "https://discord.gg/CK8CbFtYuv";
const patchDiscordChannel = "https://discord.com/channels/1510421934435729586/1510440693070430324";
const modbotDiscordClientId = String(window.MODBOT_DISCORD_CLIENT_ID || document.querySelector('meta[name="modbot-discord-client-id"]')?.content || "").trim();
const modbotLoginRedirectUri = String(window.MODBOT_LOGIN_REDIRECT_URI || document.querySelector('meta[name="modbot-login-redirect-uri"]')?.content || "").trim();
const modbotInviteRedirectUri = String(window.MODBOT_INVITE_REDIRECT_URI || document.querySelector('meta[name="modbot-invite-redirect-uri"]')?.content || "").trim();
const modbotBotPermissions = String(window.MODBOT_BOT_PERMISSIONS || document.querySelector('meta[name="modbot-bot-permissions"]')?.content || "3124257994829047");
const modbotDefaultLogo = "assets/default_logo.svg";
const modbotDefaultBanner = "assets/default_banner.svg";

// Les traductions vivent dans translations.js, charge avant ce fichier.
// Repli sur un objet vide : une page sans translations.js reste utilisable,
// elle affiche simplement les textes ecrits en dur dans le HTML.
const siteTranslations = window.MODBOT_TRANSLATIONS || { fr: {}, en: {}, ar: {} };

// Les titres sont des clefs de traduction : la demo suit la langue du site.
const commandResponses = {
  // Outils
  panel: { command: "/panel", type: "panel", categorie: "js.demo.catOutils",
    title: "js.demo.panelTitre" },
  aide: { command: "/aide", type: "generique", categorie: "js.demo.catOutils",
    title: "js.demo.aideTitre", lignes: ["js.demo.aideLigne"],
    // Les quatre nombres sont ceux de l'inventaire reel du bot, une ligne
    // par commande : /securite pour la protection, neuf en moderation,
    // cinq en messages, trois en support.
    champs: [["js.demo.catProtection", "1"], ["js.demo.catModeration", "9"],
             ["js.demo.catMessages", "5"], ["js.demo.catSupport", "3"]],
    actions: ["js.demo.actDashboard", "js.demo.actWiki", "js.demo.actSupport"],
    footer: "js.demo.piedOutils", heure: "15:01" },
  infobot: { command: "/info-bot", type: "generique", categorie: "js.demo.catOutils",
    title: "js.demo.infoBotTitre", lignes: ["js.demo.infoBotLigne"],
    champs: [["js.demo.enLigneDepuis", "4 j 06 h"], ["js.demo.latence", "48 ms"],
             ["js.demo.membresProteges", "1 284"], ["js.demo.versionBot", "2.4"]],
    actions: ["js.demo.actDashboard", "js.demo.actWiki"],
    footer: "js.demo.piedOutils", heure: "15:02" },

  // Protection
  securite: { command: "/securite", type: "generique", categorie: "js.demo.catProtection",
    title: "js.demo.securiteTitre", lignes: ["js.demo.securiteLigne"],
    champs: [["Anti-Raid", "js.demo.actif"], ["Anti-Nuke", "js.demo.actif"],
             ["Anti-Spam", "js.demo.actif"], ["js.demo.seuilRaid", "5 / 10 s"]],
    footer: "js.demo.piedProtection", heure: "15:03" },
  // Pas de /captcha ici : la commande a ete retiree du bot, le captcha se
  // regle dans la rubrique Verification du dashboard. Un bouton de demo
  // pour une commande qui n'existe plus envoie le visiteur dans le vide.

  // Moderation
  ban: { command: "/ban", type: "generique", categorie: "js.demo.catModeration",
    title: "js.demo.banTitre", lignes: ["js.demo.banLigne"],
    champs: [["js.demo.membre", "@spammeur"], ["js.demo.raison", "js.demo.raisonPub"],
             ["js.demo.moderateur", "@Buffl"], ["js.demo.messagesSupprimes", "24"]],
    footer: "js.demo.piedModeration", heure: "15:05" },
  warn: { command: "/warn", type: "generique", categorie: "js.demo.catModeration",
    title: "js.demo.warnTitre", lignes: ["js.demo.warnLigne"],
    champs: [["js.demo.membre", "@gimskh"], ["js.demo.avertissements", "2 / 4"],
             ["js.demo.prochain", "mute 1 h"], ["js.demo.raison", "js.demo.raisonInsulte"]],
    footer: "js.demo.piedModeration", heure: "15:06" },
  avert: { command: "/avert-count", type: "avert", categorie: "js.demo.catModeration",
    title: "js.demo.avertTitre" },
  infractions: { command: "/infractions", type: "generique", categorie: "js.demo.catModeration",
    title: "js.demo.infractionsTitre", lignes: ["js.demo.infractionsLigne"],
    champs: [["js.demo.membre", "@gimskh"], ["js.demo.total", "3"],
             ["js.demo.derniere", "12/08 - 14:22"], ["js.demo.statut", "js.demo.sousSurveillance"]],
    footer: "js.demo.piedModeration", heure: "15:07" },

  // Messages
  clear: { command: "/clear-message", type: "generique", categorie: "js.demo.catMessages",
    title: "js.demo.clearTitre", lignes: ["js.demo.clearLigne"],
    champs: [["js.demo.salon", "#general"], ["js.demo.supprimes", "50"],
             ["js.demo.moderateur", "@Buffl"]],
    footer: "js.demo.piedMessages", heure: "15:08" },
  annonce: { command: "/annonce", type: "generique", categorie: "js.demo.catMessages",
    title: "js.demo.annonceTitre", lignes: ["js.demo.annonceLigne"],
    champs: [["js.demo.salon", "#annonces"], ["js.demo.mention", "@everyone"],
             ["js.demo.statut", "js.demo.publiee"]],
    footer: "js.demo.piedMessages", heure: "15:09" },

  // Support
  ticket: { command: "/addticket", type: "generique", categorie: "js.demo.catSupport",
    title: "js.demo.ticketTitre", lignes: ["js.demo.ticketLigne"],
    champs: [["js.demo.salon", "#ticket-042"], ["js.demo.ouvertPar", "@gimskh"],
             ["js.demo.categorie", "js.demo.categorieAide"], ["js.demo.statut", "js.demo.ouvert"]],
    actions: ["js.demo.actFermer", "js.demo.actAssigner"],
    footer: "js.demo.piedSupport", heure: "15:10" },
  suggest: { command: "/suggest", type: "generique", categorie: "js.demo.catSupport",
    title: "js.demo.suggestTitre", lignes: ["js.demo.suggestLigne"],
    champs: [["js.demo.auteur", "@gimskh"], ["js.demo.pour", "12"],
             ["js.demo.contre", "1"], ["js.demo.statut", "js.demo.aLetude"]],
    actions: ["js.demo.actPour", "js.demo.actContre"],
    footer: "js.demo.piedSupport", heure: "15:11" },

  // Communaute
  giveaway: { command: "/giveaway", type: "generique", categorie: "js.demo.catCommunaute",
    title: "js.demo.giveawayTitre", lignes: ["js.demo.giveawayLigne"],
    champs: [["js.demo.lot", "Nitro 1 mois"], ["js.demo.finDans", "2 j 04 h"],
             ["js.demo.participants", "87"], ["js.demo.gagnants", "1"]],
    actions: ["js.demo.actParticiper"],
    footer: "js.demo.piedCommunaute", heure: "15:12" },
  translate: { command: "/translate", type: "generique", categorie: "js.demo.catCommunaute",
    title: "js.demo.translateTitre", lignes: ["js.demo.translateLigne"],
    champs: [["js.demo.detectee", "js.demo.langueAnglais"], ["js.demo.vers", "js.demo.langueFrancais"]],
    footer: "js.demo.piedCommunaute", heure: "15:13" },

  // Sauvegardes
  backup: { command: "/backup", type: "generique", categorie: "js.demo.catSauvegardes",
    title: "js.demo.backupTitre", lignes: ["js.demo.backupLigne"],
    champs: [["js.demo.salonsSauves", "34"], ["js.demo.rolesSauves", "18"],
             ["js.demo.creeeLe", "12/08 - 15:14"], ["js.demo.taille", "42 Ko"]],
    actions: ["js.demo.actRestaurer", "js.demo.actTelecharger"],
    footer: "js.demo.piedSauvegardes", heure: "15:14" },

  // Pas de /ia non plus : l'assistant repond quand on mentionne le bot, et
  // se regle dans la rubrique Assistant IA du dashboard. La commande a ete
  // retiree en meme temps que /captcha.

  // Statistiques
  stats: { command: "/serverstats", type: "stats", categorie: "js.demo.catStatistiques",
    title: "js.demo.statsTitre" },
  modstats: { command: "/modstats", type: "generique", categorie: "js.demo.catStatistiques",
    title: "js.demo.modstatsTitre", lignes: ["js.demo.modstatsLigne"],
    champs: [["js.demo.moderateur", "@Buffl"], ["js.demo.sanctions", "48"],
             ["js.demo.ticketsTraites", "31"], ["js.demo.rang", "#1"]],
    footer: "js.demo.piedStatistiques", heure: "15:16" }
};

const assistantAnswers = {
  obtenir: { question: "home.commentObtenirModbot2", answer: "js.faq.obtenir", link: "js.faq.ouvrirDiscord" },
  tarifs: { question: "home.quelsSontLesTarifs", answer: "js.faq.tarifs" },
  fonctionnalite: { question: "home.commentDemanderUneFonctionnalite", answer: "js.faq.fonctionnalite" },
  support: { question: "home.commentContacterLeSupport", answer: "js.faq.support", link: "js.faq.contacterSupport" },
  patch: { question: "home.ouVoirLesPatch", answer: "js.faq.patch", link: "js.faq.voirDiscord" }
};

function resetInitialScroll() {
  if (window.location.hash) {
    document.documentElement.classList.remove("site-is-loading");
    return;
  }

  const forceTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  forceTop();

  // Plusieurs passages courts empêchent le navigateur de restaurer
  // automatiquement l'ancienne position au milieu ou en bas de la page.
  window.addEventListener("load", forceTop, { once: true });
  window.addEventListener("pageshow", forceTop, { once: true });

  [40, 120, 260, 520].forEach((delay) => {
    window.setTimeout(forceTop, delay);
  });

  window.addEventListener("load", () => {
    window.setTimeout(() => {
      document.documentElement.classList.remove("site-is-loading");
    }, 120);
  }, { once: true });
}

function initStarfield() {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;

  const context = canvas.getContext("2d");
  const stars = [];
  let width = 0;
  let height = 0;
  let pixelRatio = 1;

  function resize() {
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * pixelRatio);
    canvas.height = Math.floor(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    stars.length = 0;
    const amount = Math.min(140, Math.floor((width * height) / 10000));
    for (let index = 0; index < amount; index += 1) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.7 + 0.6,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.18 + 0.04,
        link: Math.random() > 0.74
      });
    }
  }

  function draw() {
    context.clearRect(0, 0, width, height);

    stars.forEach((star, index) => {
      star.y += star.speed;
      if (star.y > height + 12) {
        star.y = -12;
        star.x = Math.random() * width;
      }

      const glow = context.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 5);
      glow.addColorStop(0, `rgba(170, 123, 255, ${star.alpha})`);
      glow.addColorStop(1, "rgba(170, 123, 255, 0)");

      context.fillStyle = glow;
      context.beginPath();
      context.arc(star.x, star.y, star.size * 5, 0, Math.PI * 2);
      context.fill();

      context.fillStyle = `rgba(236, 229, 255, ${star.alpha})`;
      context.beginPath();
      context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      context.fill();

      if (star.link && stars[index + 1]) {
        const next = stars[index + 1];
        const distance = Math.hypot(star.x - next.x, star.y - next.y);
        if (distance < 130) {
          context.strokeStyle = `rgba(139, 92, 246, ${0.16 - distance / 1000})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(star.x, star.y);
          context.lineTo(next.x, next.y);
          context.stroke();
        }
      }
    });

    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
}

/**
 * Rendu d'un embed de demonstration a partir de donnees.
 *
 * Les trois premieres commandes de la demo avaient chacune leur HTML ecrit a
 * la main. C'est ce qui a limite la demo a trois commandes sur cinquante-cinq
 * pendant des mois : en ajouter une demandait d'ecrire un bloc entier.
 *
 * Ici la commande est une donnee. Le HTML, lui, n'existe qu'une fois.
 */
function renderEmbedGenerique(data, thumb) {
  const champs = (data.champs || [])
    .map(([label, valeur]) => `
          <div class="embed-stat">
            <strong>${escapeHtmlValue(tSiClef(label))}</strong>
            <span class="embed-pill">${escapeHtmlValue(tSiClef(valeur))}</span>
          </div>`)
    .join("");

  const lignes = (data.lignes || [])
    .map((ligne) => `<p>${escapeHtmlValue(tSiClef(ligne))}</p>`)
    .join("");

  const actions = (data.actions || [])
    .map((action, index) => {
      const tons = ["action-blue", "action-green", "action-dark", "action-red"];
      return `<span class="${tons[index % tons.length]}">${escapeHtmlValue(tSiClef(action))}</span>`;
    })
    .join("");

  return `
      <div class="discord-embed embed-with-thumb">
        ${thumb}
        <h3>${escapeHtmlValue(tSiClef(data.title))}</h3>
        ${lignes}
        ${champs ? `<div class="embed-grid">${champs}</div>` : ""}
        ${actions ? `<div class="embed-actions">${actions}</div>` : ""}
        <p class="embed-footer">${escapeHtmlValue(tSiClef(data.footer))} - ${escapeHtmlValue(data.heure || "15:00")}</p>
      </div>
  `;
}

/**
 * Traduit une valeur si c'est une clef, la rend telle quelle sinon.
 *
 * Les tableaux de demonstration melangent des libelles traduisibles
 * (« Statut ») et des donnees qui ne se traduisent pas (« #general »,
 * « 48 ms », « @Buffl »). Le prefixe « js. » les distingue sans avoir a
 * baliser chaque valeur.
 */
function tSiClef(valeur) {
  if (typeof valeur !== "string") return "";
  return valeur.startsWith("js.") ? t(valeur) : valeur;
}

function getCommandMarkup(command) {
  const data = commandResponses[command] || commandResponses.panel;
  const inactif = t("js.demo.inactif");
  const thumb = `<span class="embed-thumb"><img src="assets/default_logo.svg" alt="" onerror="this.onerror=null; this.src='logo.png';"></span>`;
  let embedContent = "";

  if (data.type === "generique") {
    embedContent = renderEmbedGenerique(data, thumb);
  }

  if (data.type === "panel") {
    embedContent = `
      <div class="discord-embed embed-with-thumb">
        ${thumb}
        <h3>${t(data.title)}</h3>
        <p>${t("js.demo.panelLigne1")}</p>
        <p>${t("js.demo.panelLigne2")}</p>
        <div class="embed-grid">
          <div class="embed-stat"><strong>${t("js.demo.motsFiltres")}</strong><span class="embed-pill">37</span></div>
          <div class="embed-stat"><strong>Anti-Raid</strong><span class="embed-pill">${inactif}</span></div>
          <div class="embed-stat"><strong>Anti-Invite</strong><span class="embed-pill">${inactif}</span></div>
          <div class="embed-stat"><strong>Anti-Spam</strong><span class="embed-pill">${inactif}</span></div>
          <div class="embed-stat"><strong>Lockdown</strong><span class="embed-pill">${inactif}</span></div>
          <div class="embed-stat"><strong>Staff Alert</strong><span class="embed-pill">${inactif}</span></div>
        </div>
        <div class="embed-actions">
          <span class="action-red">${t("js.demo.insultes")}</span>
          <span class="action-blue">${t("js.demo.securite")}</span>
          <span class="action-green">${t("js.demo.salons")}</span>
          <span class="action-dark">${t("js.demo.statsBans")}</span>
          <span class="action-blue">${t("js.demo.staff")}</span>
          <span class="action-dark">${t("js.demo.personnalisation")}</span>
        </div>
        <p class="embed-footer">${t("js.demo.piedProtection")} - 14:57</p>
      </div>
    `;
  }

  if (data.type === "stats") {
    embedContent = `
      <div class="discord-embed embed-with-thumb">
        ${thumb}
        <h3>${t(data.title)}</h3>
        <div class="embed-grid">
          <div class="embed-stat"><strong>${t("js.demo.membres")}</strong><span class="embed-pill">7</span></div>
          <div class="embed-stat"><strong>${t("js.demo.messagesJour")}</strong><span class="embed-pill">0</span></div>
          <div class="embed-stat"><strong>${t("js.demo.membresAvertis")}</strong><span class="embed-pill">0</span></div>
          <div class="embed-stat"><strong>${t("js.demo.totalBans")}</strong><span class="embed-pill">0</span></div>
          <div class="embed-stat"><strong>${t("js.demo.ticketsJour")}</strong><span class="embed-pill">0</span></div>
        </div>
        <p class="embed-footer">${t("js.demo.piedProtection")} - 14:58</p>
      </div>
    `;
  }

  if (data.type === "avert") {
    embedContent = `
      <div class="discord-embed avert-embed">
        <div class="avert-head">
          <div>
            <h3>gimskh</h3>
            <h4>${t(data.title)}</h4>
          </div>
          <div class="mod-photo" aria-hidden="true"></div>
        </div>

        <div class="avert-main-fields">
          <div class="avert-field member">
            <strong>${t("js.demo.membre")}</strong>
            <span class="embed-pill">@</span>
          </div>
          <div class="avert-field id">
            <strong>ID</strong>
            <span class="embed-pill">000000000000000000</span>
          </div>
          <div class="avert-field joined">
            <strong>${t("js.demo.rejointLe")}</strong>
            <span>30/05/2026<br>à 23:51</span>
          </div>
        </div>

        <div class="avert-secondary-fields">
          <div class="avert-field progress">
            <strong>${t("js.demo.progression")}</strong>
            <div class="progress-line">
              <div class="meter"><span></span></div>
              <span class="embed-pill">0/4</span>
            </div>
          </div>
          <div class="avert-field">
            <strong>${t("js.demo.prochain")}</strong>
            <span>warn</span>
          </div>
          <div class="avert-field">
            <strong>${t("js.demo.statut")}</strong>
            <span>${t("js.demo.aucun")}</span>
          </div>
        </div>

        <p class="embed-footer">${t("js.demo.piedDossier")} - 14:59</p>
      </div>
    `;
  }

  return `
    <div class="discord-command-preview">
      <div class="discord-message">
        <span class="discord-avatar"><img src="assets/default_logo.svg" alt="" onerror="this.onerror=null; this.src='logo.png';">MB</span>
        <div>
          <div class="discord-meta">
            <span class="used-command">${t("js.demo.aUtilise")}</span>
            <span class="slash-chip">${data.command}</span>
          </div>
          <div class="discord-meta">
            <span class="discord-bot">ModBot</span>
            <span class="discord-app">APP</span>
            <span>14:59</span>
          </div>
          ${embedContent}
        </div>
      </div>
    </div>
  `;
}

/* Le rendu en attente, s'il y en a un.

   La reponse parait 260 ms apres l'appel, pour qu'on voie le bot
   repondre plutot que d'avoir tout d'un bloc. Mais trois appels
   rapproches — le dessin initial, le passage de la langue, puis un clic
   — vidaient chacun le fil avant que le premier delai ne soit echu,
   puis y deposaient chacun leur message. On annule donc le rendu
   precedent avant d'en programmer un nouveau. */
let renduDemoEnAttente = 0;

function runDemoCommand(command) {
  const feed = document.getElementById("demoFeed");
  if (!feed) return;

  window.clearTimeout(renduDemoEnAttente);
  feed.innerHTML = "";

  // La commande est deja ecrite dans l'apercu (« LGCY a utilise /panel ») :
  // l'ajouter en plus au-dessus la faisait paraitre deux fois.
  renduDemoEnAttente = window.setTimeout(() => {
    const message = document.createElement("div");
    message.className = "message bot command-demo-message";
    message.innerHTML = getCommandMarkup(command);
    feed.appendChild(message);
    feed.scrollTop = feed.scrollHeight;
  }, 260);
}

function initDemo() {
  const rail = document.getElementById("demoControls");
  if (!rail) return;

  // Les boutons naissent de la table : impossible d'avoir un bouton sans
  // reponse, ou une commande que personne ne peut cliquer.
  const parCategorie = new Map();
  Object.entries(commandResponses).forEach(([clef, data]) => {
    const cat = data.categorie || "js.demo.catOutils";
    if (!parCategorie.has(cat)) parCategorie.set(cat, []);
    parCategorie.get(cat).push([clef, data]);
  });

  rail.innerHTML = Array.from(parCategorie.entries())
    .map(([cat, entrees]) => `
      <p class="demo-group" data-i18n="${escapeHtmlValue(cat)}">${escapeHtmlValue(t(cat))}</p>
      ${entrees.map(([clef, data]) =>
        `<button type="button" class="demo-command" data-command="${escapeHtmlValue(clef)}">${escapeHtmlValue(data.command)}</button>`
      ).join("")}
    `)
    .join("");

  const buttons = rail.querySelectorAll(".demo-command");
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      runDemoCommand(button.dataset.command);
    });
  });

  buttons[0].classList.add("is-active");
  runDemoCommand("panel");

  // L'embed affiche est du HTML deja genere : changer de langue ne le
  // retraduit pas tout seul, il faut le redessiner avec la commande courante.
  document.addEventListener("modbot:language", () => {
    const actif = rail.querySelector(".demo-command.is-active");
    runDemoCommand(actif?.dataset.command || "panel");
  });
}

function addAssistantMessage(type, html) {
  const messages = document.getElementById("assistantMessages");
  if (!messages) return;

  const bubble = document.createElement("div");
  bubble.className = `assistant-msg ${type}`;
  bubble.innerHTML = html;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
}

function askAssistant(key) {
  const data = assistantAnswers[key];
  if (!data) return;

  addAssistantMessage("user", t(data.question));

  window.setTimeout(() => {
    const link = data.link && key !== "patch" ? `<a href="${discordInvite}" target="_blank" rel="noreferrer">${t(data.link)}</a>` : "";
    const patchLinks = key === "patch"
      ? `<a href="${patchDiscordChannel}" target="_blank" rel="noreferrer">${t("home.ouvrirLeSalon")}</a><a href="${discordInvite}" target="_blank" rel="noreferrer">${t("home.rejoindreLeServeur")}</a>`
      : "";
    addAssistantMessage("bot", `${t(data.answer)}${link}${patchLinks}`);
  }, 220);
}

function initAssistant() {
  const assistant = document.getElementById("assistant");
  const overlay = document.getElementById("assistantOverlay");
  const launcher = document.querySelector(".assistant-launcher");
  const close = document.querySelector(".assistant-close");
  const quickQuestions = document.querySelectorAll(".quick-questions button");

  if (!assistant || !launcher) return;

  function setOpen(isOpen) {
    assistant.classList.toggle("is-open", isOpen);
    overlay?.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("assistant-open", isOpen);
    assistant.setAttribute("aria-hidden", String(!isOpen));
    overlay?.setAttribute("aria-hidden", String(!isOpen));
    launcher.setAttribute("aria-expanded", String(isOpen));
  }

  launcher.addEventListener("click", () => {
    const isOpen = !assistant.classList.contains("is-open");
    setOpen(isOpen);
  });

  close?.addEventListener("click", () => setOpen(false));
  overlay?.addEventListener("click", () => setOpen(false));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });

  quickQuestions.forEach((button) => {
    button.addEventListener("click", () => askAssistant(button.dataset.question));
  });

  addAssistantMessage("bot", "Bonjour, je suis l’assistant ModBot. Comment puis-je vous aider ?");
}

function initNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  // Voile cliquable derrière le panneau, créé une seule fois.
  let backdrop = document.querySelector(".nav-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "nav-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    document.body.appendChild(backdrop);
  }

  function setMenuOpen(ouvert) {
    links.classList.toggle("is-open", ouvert);
    backdrop.classList.toggle("is-open", ouvert);
    // Le verrou du défilement évite que la page glisse sous le panneau.
    document.body.classList.toggle("nav-open", ouvert);
    toggle.setAttribute("aria-expanded", String(ouvert));
    toggle.setAttribute("aria-label", ouvert ? t("js.fermerLeMenu") : t("js.ouvrirLeMenu"));
  }

  toggle.addEventListener("click", () => {
    setMenuOpen(!links.classList.contains("is-open"));
  });

  backdrop.addEventListener("click", () => setMenuOpen(false));

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && links.classList.contains("is-open")) {
      setMenuOpen(false);
      toggle.focus();
    }
  });

  // Repasser en grand écran doit remettre la page dans un état sain :
  // sans cela, le verrou de défilement resterait actif.
  // Le seuil suit celui du CSS (le tiroir s'arrête à 980px) : les deux
  // désaccordés, le menu se fermait tout seul entre 901 et 980 px.
  const grandEcran = window.matchMedia("(min-width: 981px)");
  const surChangement = (event) => { if (event.matches) setMenuOpen(false); };
  if (grandEcran.addEventListener) grandEcran.addEventListener("change", surChangement);
  else grandEcran.addListener(surChangement);
}

const LANGUE_PAR_DEFAUT = "fr";
const CLEF_LANGUE = "modbot-site-language";

/** Langue retenue : celle choisie, sinon celle du navigateur, sinon le français. */
function getSiteLanguage() {
  const enregistree = localStorage.getItem(CLEF_LANGUE);
  if (enregistree && siteTranslations[enregistree]) return enregistree;
  const navigateur = (navigator.language || "").slice(0, 2).toLowerCase();
  return siteTranslations[navigateur] ? navigateur : LANGUE_PAR_DEFAUT;
}

/** Texte traduit, avec repli sur le français puis sur la clef elle-même. */
function t(clef, repli = "") {
  const langue = getSiteLanguage();
  return (siteTranslations[langue] || {})[clef]
      || (siteTranslations[LANGUE_PAR_DEFAUT] || {})[clef]
      || repli
      || clef;
}

/**
 * Texte traduit avec substitution : tp(clef, { membre: "Léa" }).
 *
 * Les valeurs se notent {nom} dans la traduction. Une phrase reste ainsi
 * d'un seul tenant, et chaque langue place le nombre ou le pseudo là où sa
 * grammaire l'exige — ce qu'une concaténation de morceaux interdit.
 */
function tp(clef, valeurs = {}, repli = "") {
  return Object.entries(valeurs).reduce(
    (texte, [nom, valeur]) => texte.split(`{${nom}}`).join(String(valeur)),
    t(clef, repli));
}

/**
 * Pluriel : le français et l'anglais basculent à 2, l'arabe a d'autres
 * règles mais « un / plusieurs » suffit pour les compteurs affichés ici.
 */
function tn(clefUn, clefPlusieurs, nombre, valeurs = {}) {
  return tp(nombre > 1 ? clefPlusieurs : clefUn, { n: nombre, ...valeurs });
}

/**
 * Applique une langue à toute la page.
 *
 * Cinq attributs sont pris en charge : le contenu texte, le contenu riche,
 * le placeholder, le title et l'aria-label. Une clef absente laisse le texte
 * du HTML en place plutôt que de vider l'élément.
 */
function applySiteLanguage(language) {
  const dictionnaire = siteTranslations[language] || siteTranslations[LANGUE_PAR_DEFAUT] || {};
  const repli = siteTranslations[LANGUE_PAR_DEFAUT] || {};
  const lire = (clef) => dictionnaire[clef] || repli[clef];

  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const valeur = lire(element.dataset.i18n);
    if (!valeur) return;
    // Un élément qui contient d'autres balises (un <label> avec son champ,
    // par exemple) ne doit surtout pas voir son textContent remplacé : cela
    // supprimerait le champ. On ne remplace alors que son premier texte.
    if (element.children.length) {
      const noeudTexte = [...element.childNodes]
        .find((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
      if (noeudTexte) noeudTexte.textContent = valeur;
      return;
    }
    element.textContent = valeur;
  });
  // Un paragraphe qui mêle du texte et de la mise en forme (« la restauration
  // est <strong>additive</strong> : elle recrée… ») ne peut pas se traduire
  // morceau par morceau : l'ordre des mots change d'une langue à l'autre. On
  // remplace alors tout son contenu.
  //
  // Le HTML injecté vient de translations.js, un fichier du site écrit à la
  // main et livré tel quel : ce n'est jamais une saisie d'utilisateur. Les
  // textes venant du bot ou d'un membre passent, eux, par escapeHtml().
  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const valeur = lire(element.dataset.i18nHtml);
    if (valeur) element.innerHTML = valeur;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const valeur = lire(element.dataset.i18nPlaceholder);
    if (valeur) element.setAttribute("placeholder", valeur);
  });
  document.querySelectorAll("[data-i18n-title]").forEach((element) => {
    const valeur = lire(element.dataset.i18nTitle);
    if (valeur) element.setAttribute("title", valeur);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const valeur = lire(element.dataset.i18nAria);
    if (valeur) element.setAttribute("aria-label", valeur);
  });

  localStorage.setItem(CLEF_LANGUE, language);
  // Les vues rendues en JavaScript doivent pouvoir se redessiner
  document.dispatchEvent(new CustomEvent("modbot:language", { detail: { language } }));
}

function initSiteLanguage() {
  const langue = getSiteLanguage();
  applySiteLanguage(langue);

  // Chaque page peut porter son propre sélecteur ; ils restent synchronisés.
  document.querySelectorAll("#siteLanguage, [data-language-select]").forEach((selecteur) => {
    selecteur.value = langue;
    selecteur.addEventListener("change", () => {
      const choisie = selecteur.value;
      applySiteLanguage(choisie);
      document.querySelectorAll("#siteLanguage, [data-language-select]").forEach((autre) => {
        autre.value = choisie;
      });
    });
  });
}

function getStoredNumber(key, fallback = 0) {
  return Number(localStorage.getItem(key) || fallback) || 0;
}

function setStoredNumber(key, value) {
  localStorage.setItem(key, String(value));
}

/**
 * L'adresse d'une API, reduite a son ORIGINE : protocole, hote, port.
 *
 * Un lien copie depuis le tableau de bord de l'hebergeur porte un chemin
 * et une requete — « railway.com/project/…/variables?environmentId=… ».
 * Colle tel quel dans le champ « adresse du bot », il etait enregistre
 * tel quel, et chaque appel devenait
 * « …/variables?environmentId=…/api/health » : une adresse qui ne peut
 * rien renvoyer d'autre qu'une page 404.
 *
 * On ne garde donc que l'origine, et on refuse ce qui n'est ni http ni
 * https. L'API du bot vit a la racine : un chemin n'a aucun sens ici.
 */
function normalizeApiBase(value) {
  const brut = String(value || "").trim().replace(/\/+$/, "");
  if (!brut) return "";
  const localHote = (hote) => ["localhost", "127.0.0.1", "[::1]", "::1"].includes(hote);
  const avecProtocole = /^[a-z][a-z0-9+.-]*:\/\//i.test(brut);
  try {
    // Sans protocole, https — sauf pour une adresse locale, ou un bot de
    // developpement ecoute en clair.
    const suppose = localHote(brut.split(":")[0]) ? "http://" : "https://";
    const url = new URL(avecProtocole ? brut : suppose + brut);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    // Un hote sans point n'est pas un nom de domaine. On ne l'accepte que
    // s'il est local, ou explicitement demande avec son protocole : sinon
    // une phrase tapee par megarde passerait pour une adresse.
    if (!url.hostname.includes(".") && !localHote(url.hostname) && !avecProtocole) return "";
    return url.origin;
  } catch (erreur) {
    return "";
  }
}

function escapeHtmlValue(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[character]));
}

function initialsFromName(value) {
  const words = String(value || "MB")
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!words.length) return "MB";
  return words.slice(0, 2).map((word) => word[0]).join("").toUpperCase();
}

/**
 * Ordre de résolution de l'API ModBot :
 *   1. window.MODBOT_API_URL (injection serveur, non modifiable côté client)
 *   2. localStorage (saisie manuelle explicite depuis l'écran de connexion)
 *   3. <meta name="modbot-api-url"> (valeur par défaut du déploiement)
 *
 * La saisie manuelle passe AVANT la balise meta : si l'adresse déployée
 * devient obsolète, l'utilisateur doit pouvoir la corriger lui-même sans
 * attendre un redéploiement du site.
 *
 * Elle passe avant, mais elle ne la MASQUE plus : une saisie fausse
 * enregistrée une fois cachait la balise à tout le reste du code, et le
 * site restait cassé sur cet appareil — pour toujours sur les pages qui
 * n'ont pas de champ d'adresse, comme l'accueil. La balise reste donc
 * toujours candidate (voir getModbotApiCandidates).
 */
function getMetaApiBase() {
  return normalizeApiBase(
    document.querySelector('meta[name="modbot-api-url"]')?.content || ""
  );
}

function getConfiguredModbotApiBase() {
  return normalizeApiBase(
    window.MODBOT_API_URL ||
    localStorage.getItem("modbot-api-url") ||
    ""
  ) || getMetaApiBase();
}

function getModbotApiBase() {
  const configured = getConfiguredModbotApiBase();
  if (configured) return configured;
  // Base découverte automatiquement lors d'une visite précédente
  const detected = normalizeApiBase(
    sessionStorage.getItem("modbot-api-base") ||
    localStorage.getItem("modbot-api-base-auto") ||
    ""
  );
  if (detected) return detected;
  // Le bot peut servir le site lui-même : dans ce cas l'API est ici.
  if (location.protocol === "http:" || location.protocol === "https:") {
    return `${location.protocol}//${location.host}`;
  }
  return "";
}

function isLocalHost() {
  return ["localhost", "127.0.0.1", "[::1]", ""].includes(location.hostname);
}

/**
 * Étiquette de locale pour les dates et les nombres.
 *
 * En arabe on force les chiffres latins : le reste de l'écran affiche des
 * identifiants Discord et des compteurs en chiffres latins, et mélanger les
 * deux systèmes dans une même page se lit mal.
 */
function localeAffichage() {
  const langue = getSiteLanguage();
  return langue === "ar" ? "ar-u-nu-latn" : langue;
}

/** Date + heure lisibles, pour les journaux. */
function formatIsoDateTimeFr(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString(localeAffichage(), {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  });
}

/** Mémorise l'URL saisie par l'utilisateur (ou l'efface si vide). */
function setModbotApiBase(url) {
  const clean = normalizeApiBase(url || "");
  if (clean) {
    localStorage.setItem("modbot-api-url", clean);
    sessionStorage.setItem("modbot-api-base", clean);
  } else {
    localStorage.removeItem("modbot-api-url");
    sessionStorage.removeItem("modbot-api-base");
  }
  return clean;
}

function getModbotApiCandidates() {
  const candidates = [
    // 1. Configuration explicite (saisie manuelle) — priorité absolue
    getConfiguredModbotApiBase(),
    // 2. L'adresse livrée avec le site. Elle vient juste après la saisie
    //    manuelle et n'est JAMAIS écartée : c'est elle qui rattrape une
    //    adresse fausse enregistrée dans le navigateur.
    getMetaApiBase(),
    // 3. Base ayant fonctionné précédemment
    normalizeApiBase(sessionStorage.getItem("modbot-api-base") || ""),
    normalizeApiBase(localStorage.getItem("modbot-api-base-auto") || "")
  ];
  // 3. Même origine : le cas idéal, le bot sert le site lui-même
  if (location.protocol === "http:" || location.protocol === "https:") {
    candidates.push(normalizeApiBase(`${location.protocol}//${location.host}`));
  }
  // 4. Adresses locales, uniquement en développement : depuis une page HTTPS
  //    le navigateur bloque le contenu mixte et pollue la console d'erreurs.
  if (isLocalHost() || location.protocol === "file:") {
    candidates.push("http://localhost:8080", "http://127.0.0.1:8080");
  }
  return [...new Set(candidates.filter(Boolean))];
}

/**
 * Mémorise durablement une base d'API validée automatiquement.
 *
 * Et oublie la saisie manuelle si une AUTRE adresse vient de répondre :
 * la saisie est toujours essayée en premier, donc si on est ici avec une
 * adresse différente, c'est qu'elle n'a pas répondu. La garder revenait à
 * réessayer indéfiniment une adresse morte à chaque chargement.
 */
function rememberApiBase(base) {
  if (!base) return;
  sessionStorage.setItem("modbot-api-base", base);
  localStorage.setItem("modbot-api-base-auto", base);

  const manuelle = normalizeApiBase(localStorage.getItem("modbot-api-url") || "");
  if (manuelle && manuelle !== base) {
    localStorage.removeItem("modbot-api-url");
    console.warn(
      `Adresse enregistrée « ${manuelle} » sans réponse : oubliée au profit de « ${base} ».`
    );
  }
}

function forgetAutoApiBase() {
  sessionStorage.removeItem("modbot-api-base");
  localStorage.removeItem("modbot-api-base-auto");
}

/**
 * Le bot répond-il à cette adresse ?
 *
 * Le dashboard a sa propre sonde, à l'intérieur de initDashboard(). Celle-ci
 * sert aux pages qui n'ont pas de dashboard — l'accueil et l'espace
 * d'administration — et qui, sans elle, partaient à l'aveugle sur une
 * adresse enregistrée sans jamais vérifier qu'elle répond.
 */
async function sonderBaseApi(base, delai = 5000) {
  if (!base) return false;
  const controleur = new AbortController();
  const minuterie = window.setTimeout(() => controleur.abort(), delai);
  try {
    const reponse = await fetch(`${base}/api/health`, {
      cache: "no-store",
      signal: controleur.signal
    });
    if (!reponse.ok) return false;
    const data = await reponse.json().catch(() => null);
    return Boolean(data?.ok);
  } catch (erreur) {
    return false;
  } finally {
    window.clearTimeout(minuterie);
  }
}

/**
 * La première adresse candidate qui répond, mémorisée pour la suite.
 * Chaîne vide si aucune ne répond : le bot est vraiment injoignable.
 */
async function trouverBaseApiJoignable() {
  for (const candidate of getModbotApiCandidates()) {
    if (await sonderBaseApi(candidate)) {
      rememberApiBase(candidate);
      return candidate;
    }
  }
  return "";
}

function currentCleanUrl() {
  return `${location.origin}${location.pathname}`;
}

function dashboardReturnUrl() {
  if (location.protocol === "file:") {
    return modbotLoginRedirectUri || currentCleanUrl();
  }
  return currentCleanUrl();
}

function makeOAuthState(prefix = "modbot") {
  const randomPart = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const state = `${prefix}-${randomPart}`;
  sessionStorage.setItem("modbot-oauth-state", state);
  return state;
}

function buildDiscordOAuthUrl(mode = "login", guildId = "") {
  if (!modbotDiscordClientId) return "";
  const params = new URLSearchParams({ client_id: modbotDiscordClientId });
  if (mode === "invite") {
    params.set("permissions", modbotBotPermissions);
    params.set("scope", "bot applications.commands");
    if (guildId) {
      params.set("guild_id", String(guildId));
      params.set("disable_guild_select", "true");
    }
  } else {
    params.set("response_type", "code");
    params.set("redirect_uri", modbotLoginRedirectUri || currentCleanUrl());
    params.set("scope", "identify email guilds");
    params.set("state", makeOAuthState("login"));
  }
  return `https://discord.com/oauth2/authorize?${params.toString()}`;
}

function getModbotSessionToken() {
  return sessionStorage.getItem("modbot-dashboard-session") || localStorage.getItem("modbot-dashboard-session") || "";
}


function discordGuildIconUrl(guild) {
  const guildId = String(guild?.id || "").trim();
  const rawIcon = String(guild?.icon || "").trim();
  const rawLogo = String(guild?.logo || "").trim();
  const explicitHash = String(guild?.icon_hash || "").trim();
  const iconHash = explicitHash || (/^a?_[A-Za-z0-9]+$|^[A-Za-z0-9]{16,}$/i.test(rawIcon) ? rawIcon : "");
  if (guildId && iconHash) {
    const ext = iconHash.startsWith("a_") ? "gif" : "png";
    return `https://cdn.discordapp.com/icons/${guildId}/${iconHash}.${ext}?size=128`;
  }
  const directUrl = [rawIcon, rawLogo].find((value) => /^https?:\/\//i.test(value));
  if (directUrl) return directUrl;
  const localAsset = [rawIcon, rawLogo].find((value) => value === "logo.png" || value.startsWith("assets/"));
  return localAsset || modbotDefaultLogo;
}

function discordGuildBannerUrl(guild) {
  const guildId = String(guild?.id || "").trim();
  const rawBanner = String(guild?.banner || "").trim();
  const explicitHash = String(guild?.banner_hash || "").trim();
  const bannerHash = explicitHash || (/^a?_[A-Za-z0-9]+$|^[A-Za-z0-9]{16,}$/i.test(rawBanner) ? rawBanner : "");
  if (guildId && bannerHash) {
    const ext = bannerHash.startsWith("a_") ? "gif" : "png";
    return `https://cdn.discordapp.com/banners/${guildId}/${bannerHash}.${ext}?size=320`;
  }
  if (/^https?:\/\//i.test(rawBanner)) return rawBanner;
  if (rawBanner && rawBanner.startsWith("assets/")) return rawBanner;
  return modbotDefaultBanner;
}

/**
 * Seuls le propriétaire et les administrateurs pilotent ModBot.
 * « Gérer le serveur » (0x20) ne suffit pas : c'est une permission
 * de modération, pas d'administration du bot.
 */
function canManageDiscordGuild(guild) {
  if (guild?.can_manage === true) return true;
  if (guild?.owner) return true;
  try {
    return Boolean(BigInt(String(guild?.permissions || "0")) & 0x8n);
  } catch (error) {
    return Boolean(Number(guild?.permissions || 0) & 0x8);
  }
}

function normalizeDiscordGuild(guild, installed = false) {
  const icon = discordGuildIconUrl(guild);
  const banner = discordGuildBannerUrl(guild);
  const name = String(guild?.name || t("js.serveurDiscord"));
  return {
    id: String(guild?.id || ""),
    name,
    icon,
    logo: icon,
    icon_hash: String(guild?.icon_hash || ""),
    banner,
    banner_hash: String(guild?.banner_hash || ""),
    initials: String(guild?.initials || initialsFromName(name)),
    member_count: Number(guild?.member_count || 0),
    installed: Boolean(guild?.installed || installed),
    can_manage: canManageDiscordGuild(guild),
    local: Boolean(guild?.local),
    owner: Boolean(guild?.owner),
    permissions: String(guild?.permissions || "0")
  };
}

/**
 * Ne conserve que les serveurs réellement pilotables : ModBot installé
 * ET utilisateur administrateur. Tout le reste est écarté plutôt que
 * d'encombrer la sélection avec des serveurs non configurables.
 */
function normalizeDashboardGuilds(guilds) {
  if (!Array.isArray(guilds)) return [];
  const seen = new Set();
  return guilds
    .filter((guild) => guild && typeof guild === "object")
    .map((guild) => normalizeDiscordGuild(guild, guild.installed))
    .filter((guild) => {
      if (!guild.id || seen.has(guild.id)) return false;
      if (!guild.installed || !guild.can_manage) return false;
      seen.add(guild.id);
      return true;
    })
    .sort((a, b) => a.name.localeCompare(b.name, "fr"));
}

function getModbotApiToken() {
  return sessionStorage.getItem("modbot-api-token") || localStorage.getItem("modbot-api-token") || "";
}

function modbotAuthHeaders() {
  const headers = {};
  const sessionToken = getModbotSessionToken();
  const apiToken = getModbotApiToken();
  if (sessionToken) headers.Authorization = `Bearer ${sessionToken}`;
  if (apiToken) headers["X-ModBot-Api-Token"] = apiToken;
  return headers;
}

async function modbotApiFetch(path, options = {}) {
  const base = getModbotApiBase();
  if (!base) throw new Error("Connexion Discord ModBot non finalisee.");
  const headers = {
    ...modbotAuthHeaders(),
    ...(options.headers || {})
  };
  if (options.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }
  let response;
  try {
    response = await fetch(`${base}${path}`, { ...options, headers });
  } catch (erreur) {
    // `fetch` ne rejette que pour une panne de TRANSPORT : DNS,
    // connexion refusee, ou — le cas le plus trompeur — une reponse
    // bloquee par CORS. Le navigateur n'en dit rien de plus qu'un
    // « Failed to fetch », et l'onglet Reseau montre pourtant un 200.
    // On nomme donc l'adresse appelee : c'est la seule information qui
    // permette de trancher entre un bot injoignable et une origine que
    // le bot n'autorise pas.
    const detail = new Error(tp("js.apiInjoignableAdresse", { base }));
    detail.cause = erreur;
    detail.transport = true;
    console.error(`ModBot API — ${base}${path} injoignable`,
                  { origine: location.origin, erreur });
    throw detail;
  }
  if (!response.ok) {
    let message = tp("js.auth.erreurConnexion", { code: response.status });
    try {
      const text = await response.text();
      if (text) {
        try {
          const data = JSON.parse(text);
          message = data.error || data.detail || data.message || text;
        } catch (error) {
          message = text;
        }
      }
    } catch (error) {
      // message par defaut
    }
    const echec = new Error(message);
    echec.status = response.status;
    throw echec;
  }
  return response.json();
}

function initApiBridgeFromUrl() {
  const hash = new URLSearchParams((location.hash || "").replace(/^#/, ""));
  const query = new URLSearchParams(location.search || "");
  const session = hash.get("session") || query.get("session");
  const accessToken = hash.get("access_token");
  const loginError = hash.get("login_error") || query.get("login_error");
  const oauthCode = query.get("code");
  const oauthState = query.get("state");
  const cleanOAuthUrl = () => {
    const url = new URL(location.href);
    url.hash = "";
    ["session", "access_token", "login_error", "code", "state"].forEach((key) => url.searchParams.delete(key));
    history.replaceState(null, "", `${url.pathname}${url.search}`);
  };

  if (session) {
    localStorage.setItem("modbot-dashboard-session", session);
    cleanOAuthUrl();
  }
  if (accessToken) {
    localStorage.setItem("modbot-discord-access-token", accessToken);
    sessionStorage.removeItem("modbot-oauth-state");
    cleanOAuthUrl();
  }
  if (oauthCode && !session) {
    const expectedState = sessionStorage.getItem("modbot-oauth-state");
    if (expectedState && oauthState && expectedState !== oauthState) {
      console.warn("State OAuth Discord invalide.");
      cleanOAuthUrl();
      return;
    }
    sessionStorage.removeItem("modbot-oauth-state");
    sessionStorage.setItem("modbot-login-error", "oauth_backend_required");
    console.warn("Code OAuth Discord recu sans session. Le dashboard va utiliser le flux navigateur si l'API ModBot n'est pas configuree.");
    cleanOAuthUrl();
  }
  if (loginError) {
    sessionStorage.setItem("modbot-login-error", loginError);
    console.warn(t("js.auth.erreurConnexionCourte"), loginError);
    cleanOAuthUrl();
  }
}

function initDiscordOAuthLinks() {
  const inviteUrl = buildDiscordOAuthUrl("invite");
  const dashboardOfferUrl = (plan) => {
    const url = new URL("dashboard.html", location.href);
    url.searchParams.set("flow", "offer");
    if (plan) url.searchParams.set("plan", plan);
    return url.toString();
  };
  document.querySelectorAll("[data-discord-bot-invite]").forEach((link) => {
    const offerPlan = link.dataset.offerPlan || "";
    if (offerPlan) {
      link.href = dashboardOfferUrl(offerPlan);
      link.target = "_self";
      link.removeAttribute("rel");
      link.addEventListener("click", () => {
      });
      return;
    }
    if (!inviteUrl) return;
    link.href = inviteUrl;
    link.target = "_blank";
    link.rel = "noreferrer";
  });
}

function trackSiteAnalytics() {
  const todayKey = new Date().toISOString().slice(0, 10);
  const storedDay = localStorage.getItem("modbot-analytics-day");

  if (storedDay !== todayKey) {
    localStorage.setItem("modbot-analytics-day", todayKey);
    setStoredNumber("modbot-analytics-today", 0);
  }

  const visitSessionKey = `modbot-analytics-visit-${todayKey}`;
  if (!sessionStorage.getItem(visitSessionKey)) {
    setStoredNumber("modbot-analytics-visits", getStoredNumber("modbot-analytics-visits") + 1);
    setStoredNumber("modbot-analytics-today", getStoredNumber("modbot-analytics-today") + 1);
    sessionStorage.setItem(visitSessionKey, "1");
  }

  const isDashboard = document.body?.classList.contains("dashboard-page");
  const isAdmin = document.body?.classList.contains("admin-page");
  const dashboardSessionKey = `modbot-analytics-dashboard-${todayKey}`;
  if (isDashboard && !isAdmin && !sessionStorage.getItem(dashboardSessionKey)) {
    setStoredNumber("modbot-analytics-dashboard", getStoredNumber("modbot-analytics-dashboard") + 1);
    sessionStorage.setItem(dashboardSessionKey, "1");
  }
}

function initAdminZone() {
  const adminZone = document.getElementById("admin");
  if (!adminZone) return;

  const installs = document.querySelector("[data-admin-stat='installs']");
  const membresProteges = document.querySelector("[data-admin-stat='members']");
  const actionsEnregistrees = document.querySelector("[data-admin-stat='events']");
  const sanctionsTotal = document.querySelector("[data-admin-stat='sanctions']");
  const statsBadge = document.querySelector("[data-admin-stats-badge]");
  const logsBadge = document.querySelector("[data-admin-logs-badge]");
  const adminStatus = document.querySelector("[data-admin-status]");
  const adminGateItems = document.querySelectorAll("[data-admin-gate]");
  const protectedItems = document.querySelectorAll("[data-admin-protected]");
  const toast = document.getElementById("adminToast");
  const adminTabs = document.querySelectorAll("[data-admin-tab]");
  const adminPanels = document.querySelectorAll("[data-admin-panel]");
  let adminToastTimer;


  // Une duree plus longue pour ce qu'il faut lire en entier : un message
  // prive qui n'est pas parti, et pourquoi.
  function showAdminToast(message, duree = 2400) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(adminToastTimer);
    adminToastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), duree);
  }

  function openAdminPanel(panelName) {
    adminTabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.adminTab === panelName));
    adminPanels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.adminPanel === panelName));
    suivreVisites(panelName === "visites");
    if (panelName === "boutique") chargerBoutiqueAdmin();
  }

  function formatStat(value) {
    // Une valeur non chiffree — le tiret affiche quand le bot ne repond pas —
    // sortait en « NaN » : Number("—") ne vaut pas zero, il ne vaut rien.
    const nombre = Number(value);
    if (value === null || value === undefined || value === "" || Number.isNaN(nombre)) {
      return "—";
    }
    return nombre.toLocaleString(localeAffichage());
  }

  function setAdminStats(stats, sourceLabel) {
    if (installs) installs.textContent = formatStat(stats.installs);
    if (membresProteges) membresProteges.textContent = formatStat(stats.members);
    if (actionsEnregistrees) actionsEnregistrees.textContent = formatStat(stats.events);
    if (sanctionsTotal) sanctionsTotal.textContent = formatStat(stats.sanctions);
    if (statsBadge) statsBadge.textContent = sourceLabel;
  }

  /**
   * Message d'echec lisible, a la place des donnees.
   *
   * Ce panneau affichait auparavant des lignes de demonstration figees
   * (« Serveur test », « VPG Belgique », des heures inventees) que rien ne
   * remplacait quand l'appel echouait. On croyait donc lire de vraies
   * donnees, fausses. Mieux vaut dire pourquoi il n'y en a pas.
   */
  function etatAdminIndisponible(erreur) {
    const message = String(erreur?.message || "");
    if (/401|expir|connexion discord/i.test(message)) return t("js.adm.sessionRequise");
    if (/403|refus/i.test(message)) return t("js.adm.pasAdmin");
    return tp("js.adm.botInjoignable", { detail: message.slice(0, 120) });
  }

  function peindreServeursAdmin(guilds) {
    const liste = document.querySelector("[data-admin-server-list]");
    if (!liste) return;
    if (!guilds.length) {
      liste.innerHTML = `<p class="field-help">${escapeHtmlValue(t("js.adm.aucunServeur"))}</p>`;
      return;
    }
    liste.innerHTML = guilds.map((guild) => `
      <div>
        <span class="server-logo-shell" data-initials="${escapeHtmlValue(guild.initials || initialsFromName(guild.name))}">
          <img src="${escapeHtmlValue(guild.icon || modbotDefaultLogo)}" alt="" data-logo-img onerror="if(!this.dataset.logoFallbackTried){this.dataset.logoFallbackTried='1';this.src='assets/default_logo.svg'}else{this.parentElement.classList.add('is-fallback')}" onload="this.parentElement.classList.remove('is-fallback')">
        </span>
        <span><strong>${escapeHtmlValue(guild.name)}</strong><small>${
          tn("js.adm.membreUn", "js.adm.membrePlusieurs",
             Number(guild.member_count || 0),
             { n: Number(guild.member_count || 0).toLocaleString(localeAffichage()) })
        } — ID ${escapeHtmlValue(guild.id)}</small></span>
      </div>
    `).join("");
  }

  function peindreLogsAdmin(logs) {
    const flux = document.querySelector("[data-server-log-feed]");
    if (!flux) return;
    if (!logs.length) {
      flux.innerHTML = `<p class="field-help">${escapeHtmlValue(t("js.adm.aucunLog"))}</p>`;
      if (logsBadge) logsBadge.textContent = t("js.adm.aucuneEntree");
      return;
    }
    flux.innerHTML = logs.map((entree) => {
      // La date arrive en ISO ; on n'affiche l'heure que si elle est lisible.
      const quand = new Date(entree.date || entree.time || 0);
      const heure = Number.isNaN(quand.getTime())
        ? "—"
        : quand.toLocaleString(localeAffichage(),
            { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
      const ou = entree.guild_name || entree.guild_id || t("js.adm.horsServeur");
      const quoi = entree.detail || entree.action || "";
      const qui = entree.actor ? ` — ${entree.actor}` : "";
      return `<div><span>${escapeHtmlValue(heure)}</span><strong>${escapeHtmlValue(ou)}</strong>`
           + `<em>${escapeHtmlValue(quoi)}${escapeHtmlValue(qui)}</em></div>`;
    }).join("");
    if (logsBadge) {
      logsBadge.textContent = tn("js.adm.entreeUne", "js.adm.entreesPlusieurs", logs.length,
                                 { n: logs.length });
    }
  }

  async function loadAdminStats() {
    if (statsBadge) statsBadge.textContent = t("js.adm.chargement");
    if (logsBadge) logsBadge.textContent = t("js.adm.chargement");

    try {
      const data = await modbotApiFetch("/api/admin/stats", { cache: "no-store" });
      setAdminStats({
        installs: data.installs ?? data.servers,
        members: data.members,
        events: data.events_total,
        sanctions: data.sanctions_total
      }, t("js.adm.connexionActive"));
      peindreServeursAdmin(Array.isArray(data.guilds) ? data.guilds : []);
      peindreLogsAdmin(Array.isArray(data.logs) ? data.logs : []);
    } catch (error) {
      const raison = etatAdminIndisponible(error);
      setAdminStats({ installs: "—", members: "—", events: "—", sanctions: "—" }, raison);
      const liste = document.querySelector("[data-admin-server-list]");
      if (liste) liste.innerHTML = `<p class="field-help">${escapeHtmlValue(raison)}</p>`;
      const flux = document.querySelector("[data-server-log-feed]");
      if (flux) flux.innerHTML = `<p class="field-help">${escapeHtmlValue(raison)}</p>`;
      if (logsBadge) logsBadge.textContent = raison;
    }
  }

  function unlockAdmin(utilisateur) {
    adminGateItems.forEach((item) => {
      item.hidden = true;
    });
    protectedItems.forEach((item) => {
      item.hidden = false;
    });
    if (adminStatus) {
      // La pastille passe au vert SEULEMENT ici : elle annoncait « Verrouille »
      // sur fond vert, ce qui disait le contraire de son texte.
      adminStatus.classList.remove("is-locked");
      adminStatus.innerHTML = `<span></span> ${escapeHtmlValue(t("js.adm.adminValide"))}`;
    }
    afficherIdentite(utilisateur);
    loadAdminStats();
    chargerAdministrateurs();
    chargerBoutiqueAdmin();
    showAdminToast(t("js.adm.accesOuvert"));
  }

  /**
   * Ferme l'espace et vide reellement les zones deja chargees : un `hidden`
   * retire a la main dans les devtools ne doit rien laisser voir.
   */
  function verrouiller(niveau, message) {
    adminGateItems.forEach((item) => { item.hidden = false; });
    protectedItems.forEach((item) => {
      item.hidden = true;
      item.querySelectorAll("[data-admin-sensitive]").forEach((zone) => {
        zone.innerHTML = "";
      });
    });
    if (adminStatus) {
      adminStatus.classList.add("is-locked");
      adminStatus.innerHTML = `<span></span> ${escapeHtmlValue(t("adm.verrouille"))}`;
    }
    if (niveau) afficherEtat(niveau, message);
  }

  function afficherEtat(niveau, message) {
    const boite = document.querySelector("[data-admin-gate-state]");
    const point = document.querySelector("[data-admin-gate-dot]");
    const texte = document.querySelector("[data-admin-gate-text]");
    if (!boite) return;
    boite.hidden = false;
    boite.dataset.level = niveau;
    if (point) point.dataset.level = niveau;
    if (texte) texte.textContent = message;
  }

  function afficherIdentite(utilisateur) {
    const boite = document.querySelector("[data-admin-identity]");
    if (!boite || !utilisateur) return;
    boite.hidden = false;
    const nom = boite.querySelector("[data-admin-username]");
    const id = boite.querySelector("[data-admin-userid]");
    const avatar = boite.querySelector("[data-admin-avatar]");
    if (nom) nom.textContent = utilisateur.username || "Discord";
    if (id) id.textContent = `ID ${utilisateur.user_id || "\u2014"}`;
    // `avatar` n'est que l'empreinte Discord ; l'adresse de l'image est
    // `avatar_url`. Prise pour une adresse, l'empreinte donnait une image cassee.
    if (avatar && utilisateur.avatar_url) avatar.src = utilisateur.avatar_url;
  }

  function oublierSession() {
    localStorage.removeItem("modbot-dashboard-session");
    sessionStorage.removeItem("modbot-dashboard-session");
  }

  /**
   * C'est le bot qui decide, pas le navigateur.
   *
   * L'ancienne version comparait un identifiant saisi a une liste ecrite en
   * clair dans ce fichier : l'identifiant etait public, et n'importe qui
   * pouvait s'ajouter a la liste via localStorage. Ici, on demande a l'API
   * « suis-je administrateur ? » et on se contente d'afficher la reponse.
   * Meme forcee, la page reste vide : chaque route /api/admin/ reverifie.
   */
  async function verifierAcces() {
    if (!getModbotSessionToken() && !getModbotApiToken()) {
      verrouiller("attente", t("js.adm.sessionRequise"));
      return;
    }

    afficherEtat("attente", t("js.adm.verificationEnCours"));
    try {
      const data = await modbotApiFetch("/api/me", { cache: "no-store" });
      const utilisateur = data.user || {};

      if (utilisateur.admin === true) {
        unlockAdmin(utilisateur);
        return;
      }

      // Session valide, compte non autorise : on affiche l'identifiant pour
      // que la personne sache quoi faire ajouter.
      afficherIdentite(utilisateur);
      verrouiller("refus", t("js.adm.pasAdmin"));
      showAdminToast(t("js.adm.accesRefuse"));
    } catch (error) {
      const message = String(error?.message || "");
      if (/401|expir|session/i.test(message)) {
        oublierSession();
        verrouiller("attente", t("js.adm.sessionRequise"));
      } else {
        verrouiller("erreur", t("js.adm.botInjoignable").replace("{detail}", message));
      }
    }
  }

  document.querySelector("[data-admin-login]")?.addEventListener("click", async () => {
    // On ne part plus sur l'adresse enregistrée sans l'avoir vérifiée :
    // une adresse fausse envoyait le navigateur sur la page 404 de
    // l'hébergeur, et la connexion Discord n'avait jamais lieu.
    afficherEtat("attente", t("js.adm.verificationEnCours"));
    const base = await trouverBaseApiJoignable();
    if (!base) {
      afficherEtat("erreur", t("js.adm.adresseIntrouvable"));
      return;
    }
    const retour = location.origin + location.pathname;
    location.href = `${base}/api/auth/discord/login?redirect=${encodeURIComponent(retour)}`;
  });

  document.querySelector("[data-admin-logout]")?.addEventListener("click", () => {
    oublierSession();
    const boite = document.querySelector("[data-admin-identity]");
    if (boite) boite.hidden = true;
    verrouiller("attente", t("js.adm.sessionRequise"));
    showAdminToast(t("js.adm.deconnecte"));
  });

  /* ── Achats & paiements ────────────────────────────────────────────
     Les commandes de la boutique, les demandes sur mesure et
     l'assistance. Chaque action passe par le bot, qui previent le client
     en message prive : cette page affiche ce qu'il repond, et dit quand
     un message n'a pas pu partir. */
  const BTQ_STATUTS = {
    payee: { libelleClef: "js.adm.btqStatutPayee" },
    attente: { libelleClef: "js.adm.btqStatutAttente" },
    planifiee: { libelleClef: "js.adm.btqStatutPlanifiee" },
    en_cours: { libelleClef: "js.adm.btqStatutEnCours" },
    livree: { libelleClef: "js.adm.btqStatutLivree" },
    annulee: { libelleClef: "js.adm.btqStatutAnnulee" },
    en_attente: { libelleClef: "js.adm.btqStatutEnAttente" },
  };
  const BTQ_EN_COURS = ["payee", "attente", "planifiee", "en_cours"];
  const BTQ_DEVIS = {
    nouveau: { libelleClef: "js.adm.btqDevisNouveau" },
    propose: { libelleClef: "js.adm.btqDevisPropose" },
    payee: { libelleClef: "js.adm.btqDevisPayee" },
    clos: { libelleClef: "js.adm.btqDevisClos" },
  };
  const BTQ_SAV = {
    ouvert: { libelleClef: "js.adm.btqSavOuvert" },
    repondu: { libelleClef: "js.adm.btqSavRepondu" },
    clos: { libelleClef: "js.adm.btqSavClos" },
  };
  const BTQ_CATEGORIES = {
    bot: { numero: 1, libelleClef: "bq.devisCatBot" },
    site: { numero: 2, libelleClef: "bq.devisCatSite" },
    les_deux: { numero: 3, libelleClef: "bq.devisCatLesDeux" },
    autre: { numero: 4, libelleClef: "bq.devisCatAutre" },
  };
  const BTQ_SUJETS = {
    installation: { libelleClef: "bq.aideSujetInstallation" },
    decouverte: { libelleClef: "bq.aideSujetDecouverte" },
    probleme: { libelleClef: "bq.aideSujetProbleme" },
    autre: { libelleClef: "bq.aideSujetAutre" },
  };
  const btqListe = document.querySelector("[data-btq-liste]");
  let btqDonnees = null;
  let btqOnglet = "en_cours";

  function btqDate(iso, avecHeure = true) {
    const quand = new Date(iso || 0);
    if (!iso || Number.isNaN(quand.getTime())) return "—";
    return quand.toLocaleString(localeAffichage(), avecHeure
      ? { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }
      : { day: "2-digit", month: "2-digit", year: "numeric" });
  }

  // « Commence le 14/09/2026 » : la date seule, prise a midi pour qu'aucun
  // fuseau ne la fasse glisser d'un jour.
  function btqLibelleStatut(statut, debut) {
    if (statut === "planifiee") {
      return tp("js.adm.btqStatutPlanifiee", { date: debut ? btqDate(`${debut}T12:00:00`, false) : "—" });
    }
    return t(BTQ_STATUTS[statut]?.libelleClef || "js.adm.btqStatutEnAttente");
  }

  // Un pseudo tape n'est pas verifie : c'est l'identifiant qui permet au
  // bot d'ecrire en prive. On le montre, pour savoir a quoi s'attendre.
  function btqClient(fiche) {
    const nom = fiche.discord_nom || fiche.discord || "?";
    const morceaux = [`<b>${escapeHtmlValue(nom)}</b>`];
    morceaux.push(fiche.discord_id
      ? `ID ${escapeHtmlValue(fiche.discord_id)}`
      : escapeHtmlValue(t("js.adm.btqPseudoNonVerifie")));
    return morceaux.join(" · ");
  }

  function btqSuivi(entrees, libelle) {
    if (!Array.isArray(entrees) || !entrees.length) return "";
    const lignes = entrees.slice().reverse().map((entree) => {
      const qui = entree.par ? ` — ${escapeHtmlValue(tp("js.adm.btqPar", { nom: entree.par }))}` : "";
      const message = entree.message === true
        ? ` · ${escapeHtmlValue(t("js.adm.btqMessageOk"))}`
        : entree.message === false ? ` · <em>${escapeHtmlValue(t("js.adm.btqMessageEchec"))}</em>` : "";
      return `<li><time>${escapeHtmlValue(btqDate(entree.date))}</time> ${escapeHtmlValue(libelle(entree))}${qui}${message}</li>`;
    }).join("");
    return `<details class="btq-suivi"><summary>${escapeHtmlValue(tp("js.adm.btqSuivi", { n: entrees.length }))}</summary><ol>${lignes}</ol></details>`;
  }

  function ficheCommandeAdmin(commande) {
    const id = escapeHtmlValue(commande.numero);
    const actions = BTQ_EN_COURS.includes(commande.statut) ? `
      <div class="btq-actions">
        <button type="button" class="secondary-btn compact" data-btq-action="statut" data-btq-statut="en_cours" data-btq-id="${id}">${escapeHtmlValue(t("js.adm.btqEnCours"))}</button>
        <span class="btq-jours">
          <label>${escapeHtmlValue(t("js.adm.btqCommenceDans"))}
            <input type="number" min="1" max="180" step="1" value="3" data-btq-jours> ${escapeHtmlValue(t("js.adm.btqJours"))}</label>
          <button type="button" class="secondary-btn compact" data-btq-action="statut" data-btq-statut="planifiee" data-btq-id="${id}">${escapeHtmlValue(t("js.adm.btqProgrammer"))}</button>
        </span>
        <button type="button" class="secondary-btn compact" data-btq-action="statut" data-btq-statut="attente" data-btq-id="${id}">${escapeHtmlValue(t("js.adm.btqAttente"))}</button>
        <button type="button" class="primary-btn compact" data-btq-action="statut" data-btq-statut="livree" data-btq-id="${id}">${escapeHtmlValue(t("js.adm.btqLivree"))}</button>
      </div>` : "";
    const meta = [btqClient(commande)];
    meta.push(escapeHtmlValue(commande.payee_le
      ? tp("js.adm.btqPayeLe", { date: btqDate(commande.payee_le) })
      : tp("js.adm.btqCreeLe", { date: btqDate(commande.creee_le) })));
    if (commande.moyen) meta.push(escapeHtmlValue(t(commande.moyen === "paypal" ? "bq.paypal" : "bq.carte")));
    if (commande.email) meta.push(escapeHtmlValue(commande.email));
    if (commande.devis) meta.push(escapeHtmlValue(tp("js.adm.btqDevisLie", { id: commande.devis })));
    return `
      <article class="btq-fiche">
        <div class="btq-fiche-tete">
          <span class="btq-ident"><code>${id}</code><strong>${escapeHtmlValue(commande.libelle || commande.article || "")}</strong></span>
          <span class="btq-montant">${escapeHtmlValue(boutiquePrix(Number(commande.montant) || 0))}</span>
          <span class="btq-tag" data-statut="${escapeHtmlValue(commande.statut)}">${escapeHtmlValue(btqLibelleStatut(commande.statut, commande.debut_prevu))}</span>
        </div>
        <p class="btq-meta">${meta.join(" · ")}</p>
        ${commande.projet ? `<p class="btq-texte">${escapeHtmlValue(commande.projet)}</p>` : ""}
        ${actions}
        ${btqSuivi(commande.historique, (entree) => btqLibelleStatut(entree.statut, entree.debut))}
      </article>`;
  }

  function ficheDevisAdmin(devis) {
    const id = escapeHtmlValue(devis.id);
    const ouvert = devis.statut === "nouveau" || devis.statut === "propose";
    const categorie = BTQ_CATEGORIES[devis.categorie] || BTQ_CATEGORIES.autre;
    const meta = [btqClient(devis), escapeHtmlValue(tp("js.adm.btqCreeLe", { date: btqDate(devis.creee_le) }))];
    if (devis.budget) meta.push(escapeHtmlValue(tp("js.adm.btqBudget", { budget: devis.budget })));
    if (devis.delai) meta.push(escapeHtmlValue(tp("js.adm.btqDelai", { delai: devis.delai })));
    if (devis.commande) meta.push(escapeHtmlValue(tp("js.adm.btqCommande", { numero: devis.commande })));
    // Le lien reste visible : si le message prive n'est pas parti, c'est
    // lui qu'on transmet au client par un autre moyen.
    const lien = devis.lien ? `
      <p class="btq-lien"><span>${escapeHtmlValue(t("js.adm.btqLienPaiement"))}</span>
        <a href="${escapeHtmlValue(devis.lien)}" target="_blank" rel="noreferrer">${escapeHtmlValue(devis.lien)}</a>
        <button type="button" class="secondary-btn compact" data-btq-action="copier" data-btq-lien="${escapeHtmlValue(devis.lien)}">${escapeHtmlValue(t("js.adm.btqCopierLien"))}</button></p>` : "";
    const prixActuel = Number(devis.prix) || 0;
    const pdf = prixActuel
      ? `<button type="button" class="secondary-btn compact" data-btq-action="pdf" data-btq-id="${id}">${escapeHtmlValue(t("js.adm.btqPdf"))}</button>`
      : "";
    const formulaire = ouvert ? `
      <div class="btq-formulaire">
        <input type="text" inputmode="decimal" maxlength="12" data-btq-prix
               placeholder="${escapeHtmlValue(t("js.adm.btqPrixPlaceholder"))}"
               value="${prixActuel ? escapeHtmlValue(String(prixActuel / 100).replace(".", ",")) : ""}">
        <textarea rows="2" maxlength="1000" data-btq-message placeholder="${escapeHtmlValue(t("js.adm.btqMessagePlaceholder"))}">${escapeHtmlValue(devis.message_prix || "")}</textarea>
        <div class="btq-actions">
          <button type="button" class="primary-btn compact" data-btq-action="prix" data-btq-id="${id}">${escapeHtmlValue(t(devis.statut === "propose" ? "js.adm.btqRenvoyerPrix" : "js.adm.btqProposerPrix"))}</button>
          <button type="button" class="secondary-btn compact" data-btq-action="clore-devis" data-btq-id="${id}">${escapeHtmlValue(t("js.adm.btqClore"))}</button>
        </div>
      </div>` : "";
    const libelleEntree = (entree) => {
      const base = t(BTQ_DEVIS[entree.statut]?.libelleClef || "js.adm.btqDevisNouveau");
      if (entree.prix) return `${base} (${boutiquePrix(Number(entree.prix))})`;
      if (entree.commande) return `${base} (${entree.commande})`;
      return base;
    };
    return `
      <article class="btq-fiche">
        <div class="btq-fiche-tete">
          <span class="btq-ident"><code>${id}</code><strong>${escapeHtmlValue(`${categorie.numero} · ${t(categorie.libelleClef)}`)}</strong></span>
          ${prixActuel ? `<span class="btq-montant">${escapeHtmlValue(boutiquePrix(prixActuel))}</span>` : ""}
          <span class="btq-tag" data-statut="d-${escapeHtmlValue(devis.statut)}">${escapeHtmlValue(t(BTQ_DEVIS[devis.statut]?.libelleClef || "js.adm.btqDevisNouveau"))}</span>
        </div>
        <p class="btq-meta">${meta.join(" · ")}</p>
        <p class="btq-texte">${escapeHtmlValue(devis.description || "")}</p>
        ${lien}
        ${pdf ? `<div class="btq-actions">${pdf}</div>` : ""}
        ${formulaire}
        ${btqSuivi(devis.historique, libelleEntree)}
      </article>`;
  }

  function ficheSavAdmin(demande) {
    const id = escapeHtmlValue(demande.id);
    const meta = [btqClient(demande), escapeHtmlValue(tp("js.adm.btqCreeLe", { date: btqDate(demande.creee_le) }))];
    if (demande.numero) meta.push(escapeHtmlValue(tp("js.adm.btqCommande", { numero: demande.numero })));
    const reponses = (demande.reponses || []).map((reponse) => `
      <li><time>${escapeHtmlValue(btqDate(reponse.date))}</time> <b>${escapeHtmlValue(reponse.par || "")}</b>${
        reponse.message === false ? ` · <em>${escapeHtmlValue(t("js.adm.btqMessageEchec"))}</em>` : ""}
        <p>${escapeHtmlValue(reponse.texte || "")}</p></li>`).join("");
    const formulaire = demande.statut !== "clos" ? `
      <div class="btq-formulaire">
        <textarea rows="3" maxlength="1800" data-btq-reponse placeholder="${escapeHtmlValue(t("js.adm.btqReponsePlaceholder"))}"></textarea>
        <div class="btq-actions">
          <button type="button" class="primary-btn compact" data-btq-action="repondre" data-btq-id="${id}">${escapeHtmlValue(t("js.adm.btqRepondre"))}</button>
          <button type="button" class="secondary-btn compact" data-btq-action="clore-sav" data-btq-id="${id}">${escapeHtmlValue(t("js.adm.btqClore"))}</button>
        </div>
      </div>` : "";
    return `
      <article class="btq-fiche">
        <div class="btq-fiche-tete">
          <span class="btq-ident"><code>${id}</code><strong>${escapeHtmlValue(t(BTQ_SUJETS[demande.sujet]?.libelleClef || "bq.aideSujetAutre"))}</strong></span>
          <span class="btq-tag" data-statut="s-${escapeHtmlValue(demande.statut)}">${escapeHtmlValue(t(BTQ_SAV[demande.statut]?.libelleClef || "js.adm.btqSavOuvert"))}</span>
        </div>
        <p class="btq-meta">${meta.join(" · ")}</p>
        <p class="btq-texte">${escapeHtmlValue(demande.message || "")}</p>
        ${reponses ? `<ol class="btq-reponses">${reponses}</ol>` : ""}
        ${formulaire}
      </article>`;
  }

  function peindreBoutiqueAdmin() {
    // Rien ne se peint dans un espace verrouille, meme sur un changement
    // de langue : un `hidden` retire a la main ne doit rien montrer.
    if (!btqListe || !btqDonnees || btqListe.closest("[data-admin-protected]")?.hidden) return;
    const { commandes, devis, sav } = btqDonnees;
    const enCours = commandes.filter((commande) => BTQ_EN_COURS.includes(commande.statut));
    const historique = commandes.filter((commande) => !BTQ_EN_COURS.includes(commande.statut));
    const encaisse = commandes
      .filter((commande) => commande.statut !== "en_attente" && commande.statut !== "annulee")
      .reduce((total, commande) => total + (Number(commande.montant) || 0), 0);
    // Les demandes ouvertes d'abord : ce sont elles qui attendent.
    const ouvertsDabord = (liste, ouvert) =>
      liste.filter(ouvert).concat(liste.filter((element) => !ouvert(element)));
    const listes = {
      en_cours: enCours,
      devis: ouvertsDabord(devis, (element) => element.statut === "nouveau" || element.statut === "propose"),
      sav: ouvertsDabord(sav, (element) => element.statut !== "clos"),
      historique,
    };

    const compteurs = document.querySelector("[data-btq-compteurs]");
    if (compteurs) {
      compteurs.innerHTML = [
        [enCours.filter((commande) => commande.statut === "payee").length, "js.adm.btqCompteATraiter"],
        [devis.filter((element) => element.statut === "nouveau").length, "js.adm.btqCompteDevis"],
        [sav.filter((element) => element.statut === "ouvert").length, "js.adm.btqCompteSav"],
        [boutiquePrix(encaisse), "js.adm.btqCompteEncaisse"],
      ].map(([valeur, clef]) =>
        `<div><strong>${escapeHtmlValue(String(valeur))}</strong><span>${escapeHtmlValue(t(clef))}</span></div>`).join("");
    }

    document.querySelectorAll("[data-btq-onglet]").forEach((onglet) => {
      const nom = onglet.dataset.btqOnglet;
      onglet.classList.toggle("is-active", nom === btqOnglet);
      onglet.setAttribute("aria-selected", String(nom === btqOnglet));
      const nombre = onglet.querySelector("[data-btq-nombre]");
      if (nombre) nombre.textContent = String((listes[nom] || []).length);
    });

    const fabriques = { en_cours: ficheCommandeAdmin, historique: ficheCommandeAdmin,
                        devis: ficheDevisAdmin, sav: ficheSavAdmin };
    const vides = { en_cours: "js.adm.btqAucuneEnCours", historique: "js.adm.btqAucunHistorique",
                    devis: "js.adm.btqAucunDevis", sav: "js.adm.btqAucunSav" };
    const liste = listes[btqOnglet] || [];
    btqListe.innerHTML = liste.length
      ? liste.map(fabriques[btqOnglet]).join("")
      : `<p class="field-help">${escapeHtmlValue(t(vides[btqOnglet]))}</p>`;
  }

  async function chargerBoutiqueAdmin() {
    if (!btqListe) return;
    try {
      const data = await modbotApiFetch("/api/admin/boutique", { cache: "no-store" });
      btqDonnees = { commandes: data.commandes || [], devis: data.devis || [], sav: data.sav || [] };
      peindreBoutiqueAdmin();
    } catch (erreur) {
      btqListe.innerHTML = `<p class="field-help">${escapeHtmlValue(etatAdminIndisponible(erreur))}</p>`;
    }
  }

  // Le bot dit si le message prive est parti ; on le repete, longtemps
  // quand il ne l'est pas : c'est a l'equipe de prendre le relais.
  async function actionBoutique(requete) {
    try {
      const data = await requete;
      if (data?.message_envoye === false) {
        showAdminToast(tp("js.adm.btqNonPrevenu", { raison: data.raison || "?" }), 7000);
      } else if (data?.message_envoye === true) {
        showAdminToast(t("js.adm.btqPrevenu"));
      } else {
        showAdminToast(t("js.adm.btqFait"));
      }
      await chargerBoutiqueAdmin();
    } catch (erreur) {
      showAdminToast(erreur?.message || t("js.adm.premiumEchec"), 5000);
    }
  }

  btqListe?.addEventListener("click", async (evenement) => {
    const bouton = evenement.target.closest("[data-btq-action]");
    if (!bouton || bouton.disabled) return;
    const fiche = bouton.closest(".btq-fiche");
    const id = bouton.dataset.btqId || "";
    const action = bouton.dataset.btqAction;
    if (action === "copier") {
      try {
        await navigator.clipboard.writeText(bouton.dataset.btqLien || "");
        showAdminToast(t("js.adm.btqLienCopie"));
      } catch (erreur) {
        showAdminToast(bouton.dataset.btqLien || "", 7000);
      }
      return;
    }
    if (action === "pdf") {
      // La route demande la session d'un administrateur : on la joint, puis
      // on enregistre le fichier sous son nom.
      const base = getModbotApiBase();
      try {
        const reponse = await fetch(`${base}/api/admin/boutique/devis/${encodeURIComponent(id)}/pdf`, {
          headers: modbotAuthHeaders(), cache: "no-store" });
        if (!reponse.ok) throw new Error(String(reponse.status));
        const adresse = URL.createObjectURL(await reponse.blob());
        const lienPdf = document.createElement("a");
        lienPdf.href = adresse;
        lienPdf.download = `devis-${id}.pdf`;
        document.body.appendChild(lienPdf);
        lienPdf.click();
        lienPdf.remove();
        window.setTimeout(() => URL.revokeObjectURL(adresse), 60000);
      } catch (erreur) {
        showAdminToast(t("js.adm.btqPdfEchec"), 5000);
      }
      return;
    }
    bouton.disabled = true;
    try {
      if (action === "statut") {
        const statut = bouton.dataset.btqStatut;
        const corps = { statut };
        if (statut === "planifiee") {
          const jours = Number(fiche?.querySelector("[data-btq-jours]")?.value);
          if (!Number.isInteger(jours) || jours < 1 || jours > 180) {
            showAdminToast(t("js.adm.btqJoursInvalides"));
            return;
          }
          corps.jours = jours;
        }
        if (statut === "livree" && !window.confirm(tp("js.adm.btqConfirmerLivree", { numero: id }))) return;
        await actionBoutique(modbotApiFetch(`/api/admin/boutique/commandes/${encodeURIComponent(id)}/statut`, {
          method: "POST", body: JSON.stringify(corps) }));
      } else if (action === "prix") {
        const prix = (fiche?.querySelector("[data-btq-prix]")?.value || "").trim();
        // Le bot revalide ; ce controle evite seulement un aller-retour.
        if (!/^\d{1,5}([.,]\d{1,2})?$/.test(prix.replace(/[\s€]/g, ""))) {
          showAdminToast(t("js.adm.btqPrixInvalide"));
          return;
        }
        if (!window.confirm(tp("js.adm.btqConfirmerPrix", { prix: `${prix} €`, id }))) return;
        await actionBoutique(modbotApiFetch(`/api/admin/boutique/devis/${encodeURIComponent(id)}/prix`, {
          method: "POST",
          body: JSON.stringify({ prix, message: fiche?.querySelector("[data-btq-message]")?.value || "" }) }));
      } else if (action === "clore-devis") {
        if (!window.confirm(tp("js.adm.btqConfirmerClore", { id }))) return;
        await actionBoutique(modbotApiFetch(`/api/admin/boutique/devis/${encodeURIComponent(id)}/clore`, {
          method: "POST" }));
      } else if (action === "repondre") {
        const texte = (fiche?.querySelector("[data-btq-reponse]")?.value || "").trim();
        if (!texte) {
          showAdminToast(t("js.adm.btqReponseVide"));
          return;
        }
        await actionBoutique(modbotApiFetch(`/api/admin/boutique/sav/${encodeURIComponent(id)}/reponse`, {
          method: "POST", body: JSON.stringify({ texte }) }));
      } else if (action === "clore-sav") {
        if (!window.confirm(tp("js.adm.btqConfirmerClore", { id }))) return;
        await actionBoutique(modbotApiFetch(`/api/admin/boutique/sav/${encodeURIComponent(id)}/clore`, {
          method: "POST" }));
      }
    } finally {
      bouton.disabled = false;
    }
  });

  document.querySelectorAll("[data-btq-onglet]").forEach((onglet) => {
    onglet.addEventListener("click", () => {
      btqOnglet = onglet.dataset.btqOnglet || "en_cours";
      peindreBoutiqueAdmin();
    });
  });
  document.querySelector("[data-btq-rafraichir]")?.addEventListener("click", chargerBoutiqueAdmin);
  document.addEventListener("modbot:language", peindreBoutiqueAdmin);

  adminTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const panelName = tab.dataset.adminTab;
      if (!panelName) return;
      openAdminPanel(panelName);
    });
  });


  /**
   * Liste des administrateurs, fournie par le bot et non modifiable ici.
   *
   * L'ancienne version ajoutait l'identifiant au localStorage du visiteur :
   * cela ne donnait aucun droit reel, et laissait croire le contraire. La
   * seule source est DASHBOARD_ADMIN_IDS, cote hebergeur.
   */
  async function chargerAdministrateurs() {
    const liste = document.querySelector("[data-admin-list]");
    if (!liste) return;
    try {
      chargerPremiumAdmin();
      const data = await modbotApiFetch("/api/admin/admins", { cache: "no-store" });
      const admins = data.admins || [];
      liste.innerHTML = admins.map((admin) => {
        // Un fondateur vient de l'hebergeur : le bouton reste, desactive,
        // pour que la raison soit lisible plutot que devinee.
        const details = [`ID ${escapeHtmlValue(admin.id)}`];
        if (admin.is_you) details.push(escapeHtmlValue(t("js.adm.cestToi")));
        if (admin.added_by) {
          details.push(escapeHtmlValue(tp("js.adm.nommePar", { par: admin.added_by })));
        }
        const bouton = admin.removable
          ? `<button type="button" class="danger-btn" data-admin-remove="${escapeHtmlValue(admin.id)}">${escapeHtmlValue(t("js.adm.retirer"))}</button>`
          : `<button type="button" disabled title="${escapeHtmlValue(t("js.adm.fondateurAide"))}">${escapeHtmlValue(t("js.adm.fondateur"))}</button>`;
        return `
        <div>
          <span>
            <strong>${escapeHtmlValue(admin.username || admin.id)}</strong>
            <small>${details.join(" \u2014 ")}</small>
          </span>
          ${bouton}
        </div>`;
      }).join("")
        || `<div><span><strong>${escapeHtmlValue(t("js.adm.aucunAdmin"))}</strong></span></div>`;

      // Le retrait est delegue : la liste est reconstruite a chaque fois.
      liste.querySelectorAll("[data-admin-remove]").forEach((bouton) => {
        bouton.addEventListener("click", async () => {
          const id = bouton.dataset.adminRemove;
          if (!window.confirm(tp("js.adm.confirmerRetrait", { id }))) return;
          try {
            await modbotApiFetch(`/api/admin/admins/${encodeURIComponent(id)}`,
                                 { method: "DELETE" });
            showAdminToast(t("js.adm.adminRetire"));
            chargerAdministrateurs();
          } catch (error) {
            showAdminToast(error?.message || t("js.adm.retraitImpossible"));
          }
        });
      });
    } catch (error) {
      liste.innerHTML = `<p class="field-help">${escapeHtmlValue(error?.message || "")}</p>`;
    }
  }

  /* ── Offrir du premium ──────────────────────────────────────────
     La duree s'AJOUTE a ce que le serveur a deja : c'est le bot qui
     s'en charge, mais le texte du panneau le dit pour qu'on ne croie
     pas ecraser un abonnement en cours. */

  /* ══════════════════════════════════════════════════════════════
     LES VISITES DU SITE

     Le compteur se relit tout seul tant que la rubrique est ouverte, et
     s'arrete des qu'on la quitte : une console laissee ouverte toute la
     nuit n'a pas a interroger le bot toutes les cinq secondes pour
     personne.
     ══════════════════════════════════════════════════════════════ */

  const VISITES_INTERVALLE = 5000;
  let visitesMinuteur = 0;

  async function chargerVisites() {
    const total = document.querySelector("[data-visites-total]");
    const jour = document.querySelector("[data-visites-jour]");
    const histo = document.querySelector("[data-visites-historique]");
    if (!total || !jour) return;

    let data;
    try {
      data = await modbotApiFetch("/api/admin/visites", { cache: "no-store" });
    } catch (erreur) {
      total.textContent = "—";
      jour.textContent = "—";
      if (histo) {
        histo.innerHTML =
          `<p class="admin-hint">${escapeHtmlValue(t("adm.visitesIndisponible"))}</p>`;
      }
      return;
    }

    // On n'ecrit que si le chiffre a bouge : reecrire le meme texte
    // relancerait l'animation a chaque battement.
    const nouveauTotal = formatStat(data.total);
    if (total.textContent !== nouveauTotal) {
      total.textContent = nouveauTotal;
      total.classList.remove("vient-de-changer");
      void total.offsetWidth;
      total.classList.add("vient-de-changer");
    }
    jour.textContent = formatStat(data.aujourdhui);

    if (histo) {
      const jours = Array.isArray(data.historique) ? data.historique : [];
      const sommet = Math.max(1, ...jours.map((j) => Number(j.visites) || 0));
      // Chaque barre est un BOUTON : on clique dessus pour corriger le
      // chiffre du jour. Un compteur d'audience se corrige — une journée
      // passée à tester le site gonfle son chiffre, un redémarrage en
      // perd — mais jamais en silence : la correction part au bot avec
      // son auteur et sa raison, et le jour reste marqué.
      histo.innerHTML = jours.map((entree) => {
        const nombre = Number(entree.visites) || 0;
        const hauteur = Math.max(3, Math.round((nombre / sommet) * 100));
        const etiquette = String(entree.jour || "").slice(5);
        const corrige = entree.corrige === true;
        const bulle = `${etiquette} — ${nombre}` +
          (corrige ? ` (${t("adm.visitesCorrige")})` : "");
        return `<button type="button" class="visite-barre${corrige ? " est-corrige" : ""}"
                      style="--part:${hauteur}%" data-visite-jour="${escapeHtmlValue(entree.jour)}"
                      data-visite-valeur="${escapeHtmlValue(String(nombre))}"
                      title="${escapeHtmlValue(bulle)}">
                  <span class="visite-barre-valeur">${escapeHtmlValue(String(nombre))}</span>
                  <i></i>
                  <span class="visite-barre-jour">${escapeHtmlValue(etiquette)}</span>
                </button>`;
      }).join("");
      histo.querySelectorAll("[data-visite-jour]").forEach((barre) => {
        barre.addEventListener("click", () => ouvrirCorrectionVisite(
          barre.dataset.visiteJour, barre.dataset.visiteValeur));
      });
    }

    peindreCorrectionsVisites(data.corrections);
  }

  /**
   * Le formulaire de correction d'un jour.
   *
   * Il demande une raison, et le bot la refuse si elle est vide : un
   * chiffre qu'on peut changer sans laisser de trace n'est plus une
   * mesure, c'est une opinion. La trace vit dans le fichier du bot et
   * dans le journal, et se relit sous l'histogramme.
   */
  function ouvrirCorrectionVisite(jour, valeur) {
    const hote = document.querySelector("[data-visites-correction]");
    if (!hote || !jour) return;
    hote.hidden = false;
    hote.innerHTML = `
      <h4>${escapeHtmlValue(tp("adm.visitesCorrigerJour", { jour }))}</h4>
      <div class="visite-correction-champs">
        <label class="mini-form"><span>${escapeHtmlValue(t("adm.visitesNouveau"))}</span>
          <input type="number" min="0" max="10000000" step="1"
                 data-visite-nombre value="${escapeHtmlValue(String(valeur || 0))}">
        </label>
        <label class="mini-form"><span>${escapeHtmlValue(t("adm.visitesRaison"))}</span>
          <input type="text" maxlength="200" data-visite-raison
                 placeholder="${escapeHtmlValue(t("adm.visitesRaisonExemple"))}">
        </label>
      </div>
      <div class="search-actions">
        <button class="primary-btn compact" type="button" data-visite-enregistrer>${escapeHtmlValue(t("adm.visitesEnregistrer"))}</button>
        <button class="secondary-btn compact" type="button" data-visite-annuler>${escapeHtmlValue(t("adm.visitesAnnuler"))}</button>
      </div>`;

    const nombre = hote.querySelector("[data-visite-nombre]");
    const raison = hote.querySelector("[data-visite-raison]");
    nombre?.focus();
    nombre?.select();

    hote.querySelector("[data-visite-annuler]")?.addEventListener("click", () => {
      hote.hidden = true;
      hote.innerHTML = "";
    });

    hote.querySelector("[data-visite-enregistrer]")?.addEventListener("click", async () => {
      const motif = String(raison?.value || "").trim();
      if (motif.length < 3) {
        showAdminToast(t("js.adm.visitesRaisonCourte"));
        raison?.focus();
        return;
      }
      try {
        await modbotApiFetch("/api/admin/visites", {
          method: "POST",
          body: JSON.stringify({
            day: jour,
            visits: Number(nombre?.value || 0),
            reason: motif
          })
        });
        hote.hidden = true;
        hote.innerHTML = "";
        showAdminToast(t("js.adm.visitesCorrigee"));
        // La reponse porte deja le nouvel etat, mais on relit : c'est le
        // meme chemin que l'affichage normal, donc un seul a maintenir.
        await chargerVisites();
      } catch (erreur) {
        showAdminToast(erreur?.message || t("js.actionRefusee"));
      }
    });
  }

  /** La liste des corrections, sous l'histogramme. */
  function peindreCorrectionsVisites(liste) {
    const hote = document.querySelector("[data-visites-corrections]");
    if (!hote) return;
    const corrections = Array.isArray(liste) ? liste : [];
    if (!corrections.length) {
      hote.innerHTML = `<p class="admin-hint">${escapeHtmlValue(t("adm.visitesAucuneCorrection"))}</p>`;
      return;
    }
    hote.innerHTML = corrections.map((c) => `
      <div class="visite-correction-ligne">
        <strong>${escapeHtmlValue(String(c.jour || ""))}</strong>
        <span>${escapeHtmlValue(String(c.avant ?? "?"))} → ${escapeHtmlValue(String(c.apres ?? "?"))}</span>
        <small>${escapeHtmlValue(String(c.auteur || "?"))} · ${escapeHtmlValue(String(c.raison || ""))}</small>
      </div>`).join("");
  }

  function suivreVisites(actif) {
    window.clearInterval(visitesMinuteur);
    visitesMinuteur = 0;
    if (!actif) return;
    chargerVisites();
    visitesMinuteur = window.setInterval(chargerVisites, VISITES_INTERVALLE);
  }

  async function chargerPremiumAdmin() {
    const liste = document.querySelector("[data-premium-list]");
    if (!liste) return;
    try {
      chargerAcheteursPremium();
      const data = await modbotApiFetch("/api/admin/premium", { cache: "no-store" });
      const lignes = data.guilds || [];
      liste.innerHTML = lignes.map((ligne) => {
        const nom = ligne.guild_name || ligne.guild_id;
        const details = [`ID ${escapeHtmlValue(ligne.guild_id)}`];
        if (ligne.active) {
          details.push(escapeHtmlValue(tp("js.adm.premiumRestant", {
            jours: ligne.days_left, date: (ligne.until || "").slice(0, 10) })));
          if (ligne.source) details.push(escapeHtmlValue(ligne.source));
          // Un serveur premium sans nom derriere ne s'explique plus six
          // mois apres, quand quelqu'un demande pourquoi.
          if (ligne.activated_by) {
            details.push(escapeHtmlValue(tp("js.adm.premiumActivePar", {
              qui: ligne.activated_by })));
          }
        } else {
          details.push(escapeHtmlValue(t("js.adm.premiumExpire")));
        }
        // « Litige » ne s'affiche que pour un serveur ouvert par une
        // licence : sur un cadeau direct, il n'y a aucune place a
        // rendre, et le bouton ne ferait qu'echouer.
        const litige = ligne.active && ligne.licence
          ? `<button type="button" class="secondary-btn compact" data-premium-litige="${escapeHtmlValue(ligne.guild_id)}">${escapeHtmlValue(t("js.adm.premiumLitige"))}</button>`
          : "";
        const bouton = ligne.active
          ? `${litige}<button type="button" class="danger-btn" data-premium-revoke="${escapeHtmlValue(ligne.guild_id)}">${escapeHtmlValue(t("js.adm.premiumRetirer"))}</button>`
          : "";
        return `<div><span><strong>${escapeHtmlValue(nom)}</strong><small>${details.join(" \u2014 ")}</small></span>${bouton}</div>`;
      }).join("") || `<div><span><strong>${escapeHtmlValue(t("js.adm.premiumAucun"))}</strong></span></div>`;

      liste.querySelectorAll("[data-premium-litige]").forEach((bouton) => {
        bouton.addEventListener("click", async () => {
          const gid = bouton.dataset.premiumLitige;
          if (!window.confirm(tp("js.adm.premiumLitigeConfirmer", { id: gid }))) return;
          try {
            const data = await modbotApiFetch(
              `/api/admin/premium/${encodeURIComponent(gid)}/litige`,
              { method: "POST" });
            showAdminToast(tp("js.adm.premiumLitigeFait", {
              places: data?.licence?.free ?? 1 }));
            chargerPremiumAdmin();
          } catch (erreur) {
            showAdminToast(erreur?.message || t("js.adm.premiumEchec"));
          }
        });
      });

      liste.querySelectorAll("[data-premium-revoke]").forEach((bouton) => {
        bouton.addEventListener("click", async () => {
          const gid = bouton.dataset.premiumRevoke;
          if (!window.confirm(tp("js.adm.premiumConfirmerRetrait", { id: gid }))) return;
          try {
            await modbotApiFetch(`/api/admin/premium/${encodeURIComponent(gid)}`,
                                 { method: "DELETE" });
            showAdminToast(t("js.adm.premiumRetire"));
            chargerPremiumAdmin();
          } catch (erreur) {
            showAdminToast(erreur?.message || t("js.adm.premiumEchec"));
          }
        });
      });
    } catch (erreur) {
      liste.innerHTML = `<p class="field-help">${escapeHtmlValue(erreur?.message || "")}</p>`;
    }
  }

  /**
   * Les acheteurs, avec leur pseudo et leur avatar.
   *
   * Un identifiant Discord ne dit rien a personne. Une licence payee et
   * jamais posee non plus, tant qu'on ne voit pas qui est derriere :
   * c'est pourtant celle-la qu'il faut aller aider.
   */
  async function chargerAcheteursPremium() {
    const hote = document.querySelector("[data-premium-buyers]");
    if (!hote) return;
    let data;
    try {
      data = await modbotApiFetch("/api/admin/premium/acheteurs",
                                  { cache: "no-store" });
    } catch (erreur) {
      hote.innerHTML =
        `<p class="field-help">${escapeHtmlValue(erreur?.message || "")}</p>`;
      return;
    }

    const acheteurs = data.buyers || [];
    if (!acheteurs.length) {
      hote.innerHTML = `<div class="admin-buyer"><span><strong>${
        escapeHtmlValue(t("js.adm.premiumAucunAcheteur"))}</strong></span></div>`;
      return;
    }

    hote.innerHTML = acheteurs.map((acheteur) => {
      const nom = acheteur.name || acheteur.id;
      const offres = (acheteur.licences || [])
        .filter((licence) => licence.active)
        .map((licence) => {
          const offre = PREMIUM_OFFRES.find((o) => o.key === licence.plan);
          return offre ? t(offre.labelClef) : licence.plan;
        });
      const serveurs = acheteur.servers || [];
      const etiquette = acheteur.dormant
        ? `<span class="admin-tag is-dormant">${escapeHtmlValue(t("js.adm.premiumDormant"))}</span>`
        : acheteur.active
          ? `<span class="admin-tag is-live">${escapeHtmlValue(tn(
              "js.adm.premiumPoseeUne", "js.adm.premiumPoseesPlusieurs",
              serveurs.length, { nombre: serveurs.length }))}</span>`
          : `<span class="admin-tag">${escapeHtmlValue(t("js.adm.premiumExpire"))}</span>`;

      const lignes = [`ID ${escapeHtmlValue(acheteur.id)}`];
      if (offres.length) lignes.push(escapeHtmlValue(offres.join(", ")));
      if (acheteur.libres > 0) {
        lignes.push(escapeHtmlValue(tn(
          "js.adm.premiumLibreUne", "js.adm.premiumLibresPlusieurs",
          acheteur.libres, { nombre: acheteur.libres })));
      }

      return `
        <div class="admin-buyer">
          <span class="admin-buyer-avatar">${
            acheteur.avatar
              ? `<img src="${escapeHtmlValue(acheteur.avatar)}" alt="" loading="lazy">`
              : escapeHtmlValue(initialsFromName(nom))
          }</span>
          <span class="admin-buyer-texte">
            <strong>${escapeHtmlValue(nom)}</strong>
            <small>${lignes.join(" — ")}</small>
            ${serveurs.length
              ? `<small class="admin-buyer-serveurs">${serveurs
                  .map((serveur) => escapeHtmlValue(serveur.name)).join(" · ")}</small>`
              : ""}
          </span>
          ${etiquette}
        </div>`;
    }).join("");
  }

  // Le champ ne demande pas la meme chose selon la cible : le dire
  // evite de coller un identifiant de serveur dans un champ qui attend
  // une personne.
  document.querySelector("[data-premium-target]")?.addEventListener("change", (evenement) => {
    const champ = document.querySelector("[data-premium-guild]");
    if (!champ) return;
    champ.placeholder = evenement.target.value === "user"
      ? t("js.adm.premiumIdUtilisateur")
      : t("js.adm.premiumIdServeur");
    champ.value = "";
  });

  document.querySelector("[data-premium-grant]")?.addEventListener("click", async () => {
    const champ = document.querySelector("[data-premium-guild]");
    const duree = document.querySelector("[data-premium-duration]")?.value || "1mois";
    const cible = document.querySelector("[data-premium-target]")?.value || "guild";
    const id = (champ?.value || "").trim();
    // Un identifiant Discord fait 17 a 20 chiffres, serveur ou personne :
    // le bot revalide, ce controle evite seulement un aller-retour.
    if (!/^\d{17,20}$/.test(id)) {
      showAdminToast(t("js.adm.premiumIdInvalide"));
      return;
    }
    if (!window.confirm(tp("js.adm.premiumConfirmer", { id, duree }))) return;
    try {
      const data = await modbotApiFetch("/api/admin/premium", {
        method: "POST",
        body: JSON.stringify(cible === "user"
          ? { target: "user", user_id: id, duration: duree }
          : { target: "guild", guild_id: id, duration: duree }),
      });
      if (champ) champ.value = "";
      showAdminToast(cible === "user"
        ? tp("js.adm.premiumOffertUtilisateur", {
            id, places: data?.licence?.places ?? 1, duree })
        : tp("js.adm.premiumOffert", { nom: data?.guild_name || id, duree }));
      chargerPremiumAdmin();
    } catch (erreur) {
      showAdminToast(erreur?.message || t("js.adm.premiumEchec"));
    }
  });

  document.querySelector("[data-admin-add]")?.addEventListener("click", async () => {
    const champ = document.querySelector("[data-admin-add-id]");
    const id = (champ?.value || "").trim();
    // Le bot revalide : ce controle evite seulement un aller-retour.
    if (!/^\d{17,20}$/.test(id)) {
      showAdminToast(t("js.adm.idInvalide"));
      return;
    }
    if (!window.confirm(tp("js.adm.confirmerAjout", { id }))) return;
    try {
      await modbotApiFetch("/api/admin/admins", {
        method: "POST",
        body: JSON.stringify({ user_id: id }),
      });
      if (champ) champ.value = "";
      showAdminToast(t("js.adm.adminAjoute"));
      chargerAdministrateurs();
    } catch (error) {
      showAdminToast(error?.message || t("js.adm.ajoutImpossible"));
    }
  });

  document.querySelector("[data-blacklist-add]")?.addEventListener("click", async () => {
    const memberInput = document.querySelector("[data-blacklist-member]");
    const reasonInput = document.querySelector("[data-blacklist-reason]");
    const list = document.querySelector("[data-blacklist-list]");
    const member = memberInput?.value.trim();
    const reason = reasonInput?.value.trim() || t("js.adm.aucuneRaison");
    if (!member || !list) {
      showAdminToast(t("js.adm.ajouteUnMembre"));
      return;
    }
    const emptyRow = list.querySelector("[data-i18n='adm.aucunMembreBlackliste']")?.closest("div");
    emptyRow?.remove();
    const item = document.createElement("div");
    item.innerHTML = `
      <span><strong>${escapeHtmlValue(member)}</strong><small>${escapeHtmlValue(reason)}</small></span>
      <button type="button" data-blacklist-remove>${escapeHtmlValue(t("js.retirer"))}</button>
    `;
    list.prepend(item);
    memberInput.value = "";
    if (reasonInput) reasonInput.value = "";
    try {
      await modbotApiFetch("/api/admin/blacklist", {
        method: "POST",
        body: JSON.stringify({ member, reason })
      });
      showAdminToast(tp("js.adm.blacklisteBot", { membre: member }));
    } catch (error) {
      showAdminToast(tp("js.adm.blacklisteLocal", { membre: member }));
    }
  });

  document.querySelector("[data-blacklist-list]")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-blacklist-remove]");
    if (!button) return;
    button.closest("div")?.remove();
    showAdminToast(t("js.adm.retireBlacklist"));
  });

  // Rafraichir relit vraiment le bot. Le bouton se contentait auparavant de
  // reecrire le sous-titre des lignes deja affichees : rien n'etait recharge.
  document.querySelector("[data-refresh-servers]")?.addEventListener("click", async () => {
    await loadAdminStats();
    showAdminToast(t("js.adm.listeRafraichie"));
  });

  // Le bot tranche a l'ouverture, et au retour d'une connexion Discord.
  // L'adresse est d'abord verifiee : sinon une adresse fausse enregistree
  // dans ce navigateur faisait echouer /api/me et l'espace annoncait « bot
  // injoignable » alors que le bot tournait.
  (async () => {
    if (getModbotSessionToken() || getModbotApiToken()) await trouverBaseApiJoignable();
    verifierAcces();
  })();
}

let revealObserver;

function observeReveals() {
  const revealItems = document.querySelectorAll(".reveal:not(.is-visible)");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });
  }

  revealItems.forEach((item) => revealObserver.observe(item));
}

/* ══════════════════════════════════════════════════════════════════
   LE MOUVEMENT

   Le systeme d'exploitation peut demander qu'on se taise : « reduire
   les animations » n'est pas un gout, c'est un reglage d'accessibilite.
   Tout ce qui suit le respecte, et le CSS aussi.
   ══════════════════════════════════════════════════════════════════ */

function mouvementReduit() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;
}

/**
 * L'onde qui part du point clique.
 *
 * UN SEUL ecouteur, pose sur le document. La version precedente en
 * accrochait un par bouton, au chargement, et seulement sur le
 * dashboard : les sept autres pages n'en avaient aucune, et tout ce que
 * le JavaScript cree ensuite — une ligne de compteur, un giveaway, le
 * formulaire de correction des visites — naissait sans onde. La
 * delegation les couvre tous, y compris ceux qui n'existent pas encore.
 */
function initOndeAuClic() {
  const CIBLES = [
    ".primary-btn", ".secondary-btn", ".nav-action-btn",
    ".dash-nav", ".admin-nav", ".demo-command", ".variable-chip"
  ].join(",");

  document.addEventListener("click", (evenement) => {
    if (mouvementReduit()) return;
    const hote = evenement.target.closest?.(CIBLES);
    // La pastille de couleur EST sa couleur : une onde blanche par
    // dessus la ferait passer pour une autre.
    if (!hote || hote.disabled || hote.classList.contains("color-swatch")) return;

    const bornes = hote.getBoundingClientRect();
    const onde = document.createElement("span");
    onde.className = "button-ripple";
    // Un clic au clavier n'a pas de coordonnees : `detail` vaut alors 0
    // et l'onde partirait du coin haut-gauche. On la part du centre.
    const auClavier = evenement.detail === 0;
    onde.style.left = auClavier ? "50%" : `${evenement.clientX - bornes.left}px`;
    onde.style.top = auClavier ? "50%" : `${evenement.clientY - bornes.top}px`;
    hote.appendChild(onde);
    window.setTimeout(() => onde.remove(), 620);
  });
}

/**
 * La lueur du fond suit le pointeur, avec du retard.
 *
 * Le retard fait tout : suivre le curseur exactement colle le decor au
 * doigt et donne le mal de mer. On s'approche de la cible par
 * fractions, et le fond semble poser derriere la page.
 *
 * Ici, on ne fait que POSER DEUX NOMBRES sur la racine. Le deplacement
 * lui-meme est compose dans la keyframe `glowMove`, en CSS : une
 * animation en cours l'emporte sur toute declaration, et poser un
 * `transform` sur l'element n'aurait rien fait.
 */
function initParallaxeFond() {
  // Rien a piloter la ou la lueur est eteinte : le dashboard et
  // l'espace d'administration gardent leur fond immobile.
  if (!document.querySelector("body:not(.dashboard-page) .page-glow")) return;
  if (mouvementReduit()) return;
  // Sur un ecran tactile il n'y a pas de survol : le fond sauterait
  // d'un point a l'autre a chaque appui. On s'abstient.
  if (!window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches) return;

  const racine = document.documentElement;
  const cible = { x: 0, y: 0 };
  const courant = { x: 0, y: 0 };
  let enCours = false;

  const pas = () => {
    courant.x += (cible.x - courant.x) * 0.08;
    courant.y += (cible.y - courant.y) * 0.08;
    racine.style.setProperty("--parallaxe-x", courant.x.toFixed(3));
    racine.style.setProperty("--parallaxe-y", courant.y.toFixed(3));
    if (Math.abs(cible.x - courant.x) > 0.0015 ||
        Math.abs(cible.y - courant.y) > 0.0015) {
      requestAnimationFrame(pas);
      return;
    }
    enCours = false;   // arrive : on rend la main jusqu'au prochain mouvement
  };

  window.addEventListener("pointermove", (evenement) => {
    cible.x = evenement.clientX / window.innerWidth - 0.5;
    cible.y = evenement.clientY / window.innerHeight - 0.5;
    if (!enCours) {
      enCours = true;
      requestAnimationFrame(pas);
    }
  }, { passive: true });
}

/**
 * LE FOND VIVANT — ce que fait le bot, raconte en lumiere.
 *
 * Tout ce qui s'y dessine vient du metier de ModBot — proteger,
 * surveiller, valider — et du code qui le fait tourner.
 *
 * En permanence, derriere la page :
 *   * des SENTINELLES patrouillent, reliees en reseau quand elles se
 *     croisent, et des PAQUETS de donnees courent le long des fils ;
 *   * des GLYPHES de code et de securite derivent vers le haut — `</>`,
 *     `0xFF`, `sha256`, `verify()`, `2FA` — puis s'effacent ;
 *   * des CADENAS flottent, s'ouvrent, et se referment dans un eclat
 *     vert ;
 *   * de temps en temps une MENACE apparait, point rouge qui palpite : la
 *     sentinelle la plus proche fond dessus, la vise, et la neutralise en
 *     une coche verte.
 *
 * Le fond ne reagit plus au clic : le bouclier et les eclats qui en
 * jaillissaient surprenaient plus qu'ils n'amusaient, et un clic a cote
 * d'un bouton semblait avoir declenche quelque chose. Le decor vit seul.
 *
 * LA LISIBILITE D'ABORD. Tout est derriere le contenu. Ce qui derive en
 * permanence reste faible, et deux fois plus faible encore dans la
 * colonne du texte, au milieu de l'ecran. Glyphes et cadenas naissent la
 * ou l'on voit, jamais en amas, et s'estompent en passant derriere un
 * texte, un bouton, une carte ou l'en-tete ; les sentinelles s'y font
 * plus discretes. Le spectaculaire est bref : il ne dure que le temps
 * d'un geste.
 *
 * Une seule toile, une seule boucle d'images. Les halos sont peints une
 * fois pour toutes dans de petites toiles hors ecran : `shadowBlur` a
 * chaque image couterait cher, un `drawImage` ne coute presque rien.
 *
 * Sur toutes les pages, dashboard et administration compris : le voile
 * y protege les panneaux comme il protege le texte ailleurs.
 *
 * Sous « animations reduites », un MODE CALME plutot que rien : aucun
 * deplacement, tout apparait et s'efface en fondu. C'est ce que
 * recommandent les guides d'accessibilite — remplacer un mouvement par
 * un fondu. Sous Windows, ce reglage suit « Effets d'animation » ; coupe,
 * le decor se taisait entierement, et l'ecran d'un PC restait vide la ou
 * un telephone le montrait.
 */
function initFondVivant() {
  let calme = mouvementReduit();

  const toile = document.createElement("canvas");
  const ctx = toile.getContext("2d");
  if (!ctx) return;
  toile.className = "fond-vivant";
  toile.setAttribute("aria-hidden", "true");
  document.body.appendChild(toile);

  const COULEURS = {
    violet: [177, 92, 255],
    pourpre: [139, 92, 246],
    cyan: [98, 230, 255],
    lavande: [214, 198, 255],
    vert: [74, 222, 128],
    rouge: [255, 92, 122]
  };
  const teinte = (nom, alpha) => {
    const rvb = COULEURS[nom];
    return `rgba(${rvb[0]}, ${rvb[1]}, ${rvb[2]}, ${alpha})`;
  };
  const hasard = (min, max) => min + Math.random() * (max - min);
  const auHasard = (liste) => liste[Math.floor(Math.random() * liste.length)];

  // Sans survol fin — un ecran tactile — tout est moins nombreux, et
  // les sentinelles ne suivent pas le doigt : la batterie compte, et un
  // petit ecran se charge vite.
  const tactile = !window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches;
  const POLICE = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

  let largeur = 0;
  let hauteur = 0;
  function dimensionner() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    largeur = window.innerWidth;
    hauteur = window.innerHeight;
    toile.width = Math.round(largeur * ratio);
    toile.height = Math.round(hauteur * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  dimensionner();
  let attenteRedimension = 0;
  window.addEventListener("resize", () => {
    window.clearTimeout(attenteRedimension);
    attenteRedimension = window.setTimeout(() => {
      dimensionner();
      zonesPerimees = true;
    }, 120);
  }, { passive: true });

  const halos = {};
  for (const [nom, rvb] of Object.entries(COULEURS)) {
    const petite = document.createElement("canvas");
    petite.width = 64;
    petite.height = 64;
    const pinceau = petite.getContext("2d");
    const degrade = pinceau.createRadialGradient(32, 32, 0, 32, 32, 32);
    degrade.addColorStop(0, `rgba(${rvb[0]}, ${rvb[1]}, ${rvb[2]}, 0.9)`);
    degrade.addColorStop(0.35, `rgba(${rvb[0]}, ${rvb[1]}, ${rvb[2]}, 0.35)`);
    degrade.addColorStop(1, `rgba(${rvb[0]}, ${rvb[1]}, ${rvb[2]}, 0)`);
    pinceau.fillStyle = degrade;
    pinceau.fillRect(0, 0, 64, 64);
    halos[nom] = petite;
  }

  function halo(nom, x, y, rayon, alpha) {
    ctx.globalAlpha = alpha;
    ctx.drawImage(halos[nom], x - rayon, y - rayon, rayon * 2, rayon * 2);
    ctx.globalAlpha = 1;
  }

  // La colonne du texte : au milieu de l'ecran, de la largeur du contenu.
  // Ce qui derive en permanence y est deux fois plus discret.
  function discretion(x) {
    const colonne = Math.min(1180, largeur - 40);
    return Math.abs(x - largeur / 2) < colonne / 2 ? 0.5 : 1;
  }

  // Ce que le contenu occupe a l'ecran : les textes, les boutons, les
  // cartes, l'en-tete. Un glyphe ou un cadenas qui passe derriere s'y
  // efface. Un bout de code lu a travers un bouton presque transparent
  // — le bouton secondaire n'est opaque qu'a 5,5 % — ou sous la barre de
  // navigation aurait l'air d'un defaut d'affichage, pas d'un decor.
  const SELECTEUR_CONTENU = [
    "h1", "h2", "h3", "h4", "p", "li", "a", "button", "label", "input",
    "textarea", "select", ".eyebrow", ".site-header", ".feature-card",
    ".partner-card", ".main-partner-inner", ".price-card", ".premium-offer",
    ".premium-feature", ".faq-box", ".stat", ".stats-big", ".integration",
    ".wiki-toc", ".premium-note", ".discord-window", ".demo-controls",
    ".boutique-carte", ".boutique-rayons a", ".boutique-atouts-grille article",
    ".boutique-devis-inner", ".home-boutique-inner",
    ".boutique-exemple", ".boutique-preuve", ".boutique-aide-grille article",
    ".boutique-aide-formulaire", ".boutique-ton-devis-boite", ".boutique-compte",
    // La rangee de boutons du hero, d'un seul tenant : entre deux boutons,
    // un glyphe n'est derriere rien, mais il colle aux controles. Les
    // autres blocs d'en-tete ne sont plus exclus en entier : ils avalaient
    // la place libre des pages chargees, et le decor n'apparaissait plus
    // que sur l'accueil. Leurs lignes de texte restent protegees.
    ".hero-actions",
    // Le dashboard et l'administration : panneaux, cartes, barres.
    ".dashboard-topbar", ".dashboard-sidebar", ".dashboard-banner",
    ".dash-panel", ".tool-panel", ".metric-card", ".social-card",
    ".auth-card", ".server-picker-card", ".server-card", ".admin-panel",
    ".admin-topbar", ".ai-launcher", ".ai-assistant", ".dashboard-toast"
  ].join(", ");
  let zonesContenu = [];
  let zonesPerimees = true;
  let imagesDepuisReleve = 0;

  // Releve a chaque defilement, et toutes les demi-secondes : une carte
  // qui apparait en glissant, un logo qui se charge, deplacent le contenu
  // sans qu'on ait defile.
  function releverContenu() {
    zonesContenu = [];
    for (const el of document.querySelectorAll(SELECTEUR_CONTENU)) {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      if (r.bottom < 0 || r.top > hauteur || r.right < 0 || r.left > largeur) continue;
      zonesContenu.push([r.left - 22, r.top - 16, r.right + 22, r.bottom + 16]);
    }
    zonesPerimees = false;
    imagesDepuisReleve = 0;
  }
  window.addEventListener("scroll", () => {
    zonesPerimees = true;
  }, { passive: true });

  function sousLeContenu(x, y) {
    for (const z of zonesContenu) {
      if (x > z[0] && x < z[2] && y > z[1] && y < z[3]) return true;
    }
    return false;
  }

  // Le voile monte et descend par petites touches : ce qui entre sous un
  // bouton s'estompe, sans disparaitre d'un coup.
  function voiler(objet) {
    const cible = sousLeContenu(objet.x, objet.y) ? 0.08 : 1;
    objet.voile += (cible - objet.voile) * 0.1;
    return objet.voile;
  }

  // Faire naitre ce qui derive la ou l'on voit. Le voile seul effacait
  // tout ce qui naissait derriere le contenu : sur un petit ecran plein
  // de texte, il ne restait presque rien. Quelques essais au hasard hors
  // du contenu ; faute de place, le dernier point tire fera l'affaire,
  // et le voile s'en chargera. Jamais au ras du bord : centre la-dessus,
  // un glyphe y serait coupe.
  function placerLibrement(objet) {
    // Ni au ras d'un bord, ni tout en haut : un glyphe centre au bord y
    // serait coupe, et la bande au-dessus de l'en-tete n'en laisse voir
    // que la moitie.
    const tirer = () => {
      objet.x = hasard(30, Math.max(31, largeur - 30));
      objet.y = hasard(24, Math.max(25, hauteur - 24));
    };
    tirer();
    for (let essai = 0; essai < 12 && (sousLeContenu(objet.x, objet.y) || tropPres(objet)); essai++) {
      tirer();
    }
  }

  // Pas d'amas. Sur un petit ecran, les rares places libres attiraient
  // tout au meme endroit : cinq mots empiles a cote d'un bouton.
  function tropPres(objet) {
    for (const liste of [glyphes, cadenas]) {
      for (const autre of liste) {
        if (autre !== objet && Math.abs(autre.x - objet.x) < 70
            && Math.abs(autre.y - objet.y) < 34) return true;
      }
    }
    return false;
  }

  // ── Les formes ──────────────────────────────────────────────────────
  function tracerBouclier(taille) {
    ctx.beginPath();
    ctx.moveTo(0, -taille);
    ctx.quadraticCurveTo(taille * 0.9, -taille * 0.75, taille * 0.85, -taille * 0.1);
    ctx.quadraticCurveTo(taille * 0.7, taille * 0.7, 0, taille);
    ctx.quadraticCurveTo(-taille * 0.7, taille * 0.7, -taille * 0.85, -taille * 0.1);
    ctx.quadraticCurveTo(-taille * 0.9, -taille * 0.75, 0, -taille);
    ctx.closePath();
  }

  function tracerCoche(taille) {
    ctx.beginPath();
    ctx.moveTo(-taille * 0.6, 0);
    ctx.lineTo(-taille * 0.15, taille * 0.5);
    ctx.lineTo(taille * 0.7, -taille * 0.5);
  }

  function tracerHexagone(x, y, rayon, rotation) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = rotation + Math.PI / 6 + (i * Math.PI) / 3;
      const px = x + Math.cos(angle) * rayon;
      const py = y + Math.sin(angle) * rayon;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  }

  // Un cadenas centre en 0,0. `ouverture` va de 0 (ferme) a 1 (ouvert) :
  // l'anse se souleve, et sa branche droite quitte le corps. La branche
  // gauche, elle, reste toujours engagee — c'est ainsi qu'un vrai
  // cadenas s'ouvre.
  function tracerCadenas(taille, ouverture) {
    const demi = taille * 0.7;
    const base = -taille * 0.05;
    const rayonAnse = taille * 0.42;
    const leve = ouverture * taille * 0.38;
    const haut = base - taille * 0.2 - leve;
    ctx.beginPath();
    ctx.rect(-demi, base, demi * 2, taille * 1.05);
    ctx.moveTo(-rayonAnse, base);
    ctx.lineTo(-rayonAnse, haut);
    ctx.arc(0, haut, rayonAnse, Math.PI, Math.PI * 2);
    ctx.lineTo(rayonAnse, base - leve);
    ctx.moveTo(taille * 0.09, taille * 0.45);
    ctx.arc(0, taille * 0.45, taille * 0.09, 0, Math.PI * 2);
  }

  function ecrire(texte, x, y, taille, couleur, alpha) {
    ctx.font = `600 ${taille}px ${POLICE}`;
    ctx.fillStyle = teinte(couleur, alpha);
    ctx.fillText(texte, x, y);
  }

  // ── Ce qui vit sur la toile ─────────────────────────────────────────
  const eclats = [];
  const ondes = [];
  const sentinelles = [];
  const glyphes = [];
  const cadenas = [];
  const menaces = [];
  const paquets = [];
  const MAX_ECLATS = 300;
  const pointeur = { x: -10000, y: -10000, vu: -10000 };
  let confinementJusqua = 0;
  let cibleConfinement = null;
  let prochaineMenace = performance.now() + hasard(1800, 3200);

  // Rien n'est place tant que la fenetre n'a pas de taille : un onglet
  // ouvert en arriere-plan, ou prerendu, peut naitre a 0 × 0. Tout se
  // regroupait alors dans le coin haut-gauche.
  let place = false;

  const JETONS_CODE = [
    "{ }", "</>", "=>", "&&", "!==", "0x1F", "0xFF", "01", "10", "[ ]",
    "fn()", "async", "await", "const", "null", "return", "try { }",
    "0b1010", "git push", "/api", "200 OK"
  ];
  const JETONS_SECURITE = [
    "sha256", "HMAC", "AES-256", "TLS", "2FA", "RSA", "nonce", "salt",
    "token", "401", "403", "verify()", "encrypt()", "lock()", "ban()",
    "warn()", "if (raid)", "/securite"
  ];

  for (let i = 0; i < (tactile ? 7 : 13); i++) {
    sentinelles.push({
      x: 0,
      y: 0,
      vx: calme ? 0 : hasard(-0.15, 0.15),
      vy: calme ? 0 : hasard(-0.15, 0.15),
      phase: Math.random() * Math.PI * 2,
      couleur: i % 3 === 0 ? "cyan" : "violet",
      proie: null,
      voile: 1,
      presence: 1
    });
  }

  function nouveauGlyphe(g, depart) {
    const securite = Math.random() < 0.5;
    g.texte = auHasard(securite ? JETONS_SECURITE : JETONS_CODE);
    g.couleur = securite ? auHasard(["cyan", "vert", "lavande"])
                         : auHasard(["violet", "lavande", "cyan"]);
    placerLibrement(g);
    g.vx = hasard(-0.06, 0.06);
    if (g.voile === undefined) g.voile = 1;
    g.vy = hasard(-0.28, -0.08);
    if (calme) {
      g.vx = 0;
      g.vy = 0;
    }
    g.taille = Math.round(hasard(10, 14));
    g.duree = hasard(480, 960);
    // Au depart, chacun est deja a un point different de sa vie : sans
    // cela ils apparaitraient tous ensemble, puis s'eteindraient ensemble.
    g.age = depart ? hasard(0, g.duree) : 0;
    g.intensite = hasard(0.13, 0.24);
    return g;
  }
  for (let i = 0; i < (tactile ? 12 : 32); i++) glyphes.push(nouveauGlyphe({}, true));

  for (let i = 0; i < (tactile ? 3 : 7); i++) {
    cadenas.push({
      x: 0,
      y: 0,
      vx: calme ? 0 : hasard(-0.12, 0.12),
      vy: calme ? 0 : hasard(-0.12, 0.12),
      taille: hasard(6, 9),
      ouverture: 1,
      visee: 1,
      bascule: performance.now() + hasard(1500, 6000),
      eclat: 0,
      voile: 1
    });
  }

  function toutPlacer() {
    for (const s of sentinelles) {
      s.x = hasard(0, largeur);
      s.y = hasard(0, hauteur);
    }
    for (const c of cadenas) placerLibrement(c);
    for (const g of glyphes) placerLibrement(g);
  }

  // Sortie d'un bord, entree par l'autre.
  function boucler(objet, marge) {
    if (objet.x < -marge) objet.x = largeur + marge;
    else if (objet.x > largeur + marge) objet.x = -marge;
    if (objet.y < -marge) objet.y = hauteur + marge;
    else if (objet.y > hauteur + marge) objet.y = -marge;
  }

  // Trois tailles d'onde. Seule la petite sert encore, a la
  // neutralisation d'une menace ; les autres restent pour memoire.
  const GENRES_ONDE = {
    grande: { vitesse: 14, usure: 0.011, lueur: 240, aura: 0.45, epaisseur: 2.2 },
    normale: { vitesse: 5.5, usure: 0.022, lueur: 95, aura: 0.35, epaisseur: 1.6 },
    petite: { vitesse: 2.6, usure: 0.03, lueur: 38, aura: 0.3, epaisseur: 1.2 }
  };
  // En mode calme, l'onde ne s'etend pas : elle apparait a sa taille, et
  // s'efface sur place.
  const RAYON_CALME = { grande: 300, normale: 70, petite: 26 };

  function lancerOnde(x, y, genre) {
    const reglage = GENRES_ONDE[genre];
    ondes.push({
      x: x,
      y: y,
      genre: genre,
      rayon: calme ? RAYON_CALME[genre] : 6,
      vie: 1,
      vitesse: calme ? 0 : reglage.vitesse,
      usure: reglage.usure,
      lueur: reglage.lueur,
      aura: reglage.aura,
      epaisseur: reglage.epaisseur,
      rotation: Math.random() * Math.PI
    });
  }

  // Une menace neutralisee : un petit bouclier, une coche, des points verts.
  function neutraliser(x, y) {
    lancerOnde(x, y, "petite");
    if (eclats.length >= MAX_ECLATS) return;
    eclats.push({
      x: x, y: y, vx: 0, vy: calme ? 0 : -0.45, fixe: calme, vie: 1, usure: 0.013, taille: 4.5,
      rotation: 0, spin: 0, forme: "coche", couleur: "vert", texte: ""
    });
    for (let i = 0; i < 6 && eclats.length < MAX_ECLATS; i++) {
      const angle = Math.random() * Math.PI * 2;
      eclats.push({
        x: x + (calme ? hasard(-14, 14) : 0),
        y: y + (calme ? hasard(-14, 14) : 0),
        vx: calme ? 0 : Math.cos(angle) * hasard(0.6, 1.8),
        vy: calme ? 0 : Math.sin(angle) * hasard(0.6, 1.8),
        fixe: calme,
        vie: 1, usure: hasard(0.02, 0.035), taille: hasard(1.6, 2.6),
        rotation: 0, spin: 0, forme: "point", couleur: "vert", texte: ""
      });
    }
  }

  if (!tactile) {
    window.addEventListener("pointermove", (evenement) => {
      pointeur.x = evenement.clientX;
      pointeur.y = evenement.clientY;
      pointeur.vu = performance.now();
    }, { passive: true });
  }

  // ── Les glyphes de code et de securite ──────────────────────────────
  function dessinerGlyphes() {
    for (const g of glyphes) {
      g.age += 1;
      if (g.age >= g.duree) nouveauGlyphe(g, false);
      g.x += g.vx;
      g.y += g.vy;
      // Ils naissent et meurent en fondu : jamais d'apparition seche.
      const alpha = Math.sin(Math.PI * (g.age / g.duree)) * g.intensite
        * discretion(g.x) * voiler(g);
      if (alpha > 0.01) ecrire(g.texte, g.x, g.y, g.taille, g.couleur, alpha);
    }
  }

  // ── Les sentinelles, leur reseau, et les paquets qui y circulent ────
  function dessinerSentinelles(temps) {
    const confine = temps < confinementJusqua && cibleConfinement;
    const pointeurRecent = temps - pointeur.vu < 1500;
    for (const s of sentinelles) {
      s.phase += 0.03;
      if (calme) {
        // Elles ne bougent pas : elles respirent, par l'eclat seulement.
        s.presence = 0.35 + 0.65 * voiler(s);
        continue;
      }
      if (s.proie) {
        // En chasse : elle fond sur la menace qu'on lui a confiee.
        const dx = s.proie.x - s.x;
        const dy = s.proie.y - s.y;
        const distance = Math.hypot(dx, dy) || 1;
        s.vx += (dx / distance) * 0.06;
        s.vy += (dy / distance) * 0.06;
      } else if (confine) {
        s.vx += (cibleConfinement.x - s.x) * 0.0012;
        s.vy += (cibleConfinement.y - s.y) * 0.0012;
      } else if (pointeurRecent) {
        // Curieuses, pas collantes : attirees jusqu'a quarante pixels,
        // elles tournent autour du pointeur sans jamais s'y poser.
        const dx = pointeur.x - s.x;
        const dy = pointeur.y - s.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 260 && distance > 40) {
          s.vx += (dx / distance) * 0.018;
          s.vy += (dy / distance) * 0.018;
        }
      }
      s.vx = (s.vx + (Math.random() - 0.5) * 0.03) * 0.985;
      s.vy = (s.vy + (Math.random() - 0.5) * 0.03) * 0.985;
      const vitesse = Math.hypot(s.vx, s.vy);
      const plafond = s.proie ? 2.8 : confine ? 5 : 1.4;
      if (vitesse > plafond) {
        s.vx *= plafond / vitesse;
        s.vy *= plafond / vitesse;
      }
      s.x += s.vx;
      s.y += s.vy;
      boucler(s, 30);
      // Derriere le contenu, une sentinelle ne s'efface pas — c'est un
      // point, pas un mot — mais elle descend a quarante pour cent.
      s.presence = 0.35 + 0.65 * voiler(s);
    }

    // Le reseau : un fil entre deux sentinelles qui se croisent, et de
    // temps en temps un paquet qui le parcourt.
    ctx.lineWidth = 1;
    for (let i = 0; i < sentinelles.length; i++) {
      for (let j = i + 1; j < sentinelles.length; j++) {
        const a = sentinelles[i];
        const b = sentinelles[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        if (distance >= 180) continue;
        ctx.strokeStyle = teinte("pourpre",
          (1 - distance / 180) * 0.18 * Math.min(a.presence, b.presence));
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        if (!calme && paquets.length < 24 && Math.random() < 0.003) {
          paquets.push({
            a: a, b: b, t: 0,
            vitesse: hasard(0.012, 0.03),
            couleur: Math.random() < 0.5 ? "cyan" : "lavande"
          });
        }
      }
    }
    for (let i = paquets.length - 1; i >= 0; i--) {
      const p = paquets[i];
      p.t += p.vitesse;
      // Le fil s'est rompu, ou le paquet est arrive : il disparait.
      if (p.t >= 1 || Math.hypot(p.a.x - p.b.x, p.a.y - p.b.y) > 200) {
        paquets.splice(i, 1);
        continue;
      }
      halo(p.couleur, p.a.x + (p.b.x - p.a.x) * p.t, p.a.y + (p.b.y - p.a.y) * p.t, 6,
        0.6 * Math.min(p.a.presence, p.b.presence));
    }

    for (const s of sentinelles) {
      // En mode calme, le souffle passe par l'eclat, pas par la taille.
      const souffle = calme ? 0.75 : 0.6 + Math.sin(s.phase) * 0.25;
      const eclatCalme = calme ? 0.7 + Math.sin(s.phase) * 0.3 : 1;
      halo(s.couleur, s.x, s.y, 16 * souffle, 0.5 * s.presence * eclatCalme);
      ctx.fillStyle = teinte("lavande", 0.85 * s.presence);
      ctx.beginPath();
      ctx.arc(s.x, s.y, 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ── Les cadenas ─────────────────────────────────────────────────────
  // Le plus souvent fermes. Ils s'ouvrent un instant, puis se referment
  // dans un eclat vert.
  function dessinerCadenas(temps) {
    ctx.lineWidth = 1.3;
    for (const c of cadenas) {
      c.x += c.vx;
      c.y += c.vy;
      boucler(c, 20);
      if (temps >= c.bascule) {
        c.visee = c.visee ? 0 : 1;
        c.bascule = temps + (c.visee ? hasard(1500, 3500) : hasard(3500, 7500));
      }
      const avant = c.ouverture;
      c.ouverture += (c.visee - c.ouverture) * 0.12;
      if (avant > 0.05 && c.ouverture <= 0.05) c.eclat = 1;
      c.eclat *= 0.94;
      const d = discretion(c.x) * voiler(c);
      if (c.eclat > 0.02) halo("vert", c.x, c.y, c.taille * 5, c.eclat * 0.5 * d);
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.strokeStyle = teinte(c.ouverture < 0.2 ? "vert" : "lavande", 0.38 * d);
      tracerCadenas(c.taille, c.ouverture);
      ctx.stroke();
      ctx.restore();
    }
  }

  // ── Les menaces, et leur neutralisation ─────────────────────────────
  function nouvelleMenace() {
    // Plutot dans les marges : la neutralisation se voit mieux la ou le
    // texte ne passe pas.
    const colonne = Math.min(1180, largeur - 40);
    const marge = (largeur - colonne) / 2;
    // Jamais derriere le contenu : on essaie quelques points, et si
    // l'ecran est plein de texte, la menace attendra la fois suivante.
    let x = 0;
    let y = 0;
    let trouve = false;
    for (let essai = 0; essai < 12 && !trouve; essai++) {
      x = hasard(40, largeur - 40);
      if (marge > 80 && Math.random() < 0.75) {
        x = Math.random() < 0.5 ? hasard(20, marge - 20) : hasard(largeur - marge + 20, largeur - 20);
      }
      y = hasard(hauteur * 0.15, hauteur * 0.85);
      trouve = !sousLeContenu(x, y);
    }
    if (!trouve) return;
    let chasseur = null;
    let meilleure = Infinity;
    for (const s of sentinelles) {
      if (s.proie) continue;
      const distance = Math.hypot(s.x - x, s.y - y);
      if (distance < meilleure) {
        meilleure = distance;
        chasseur = s;
      }
    }
    const menace = { x: x, y: y, age: 0, capture: -1, chasseur: chasseur };
    if (chasseur) chasseur.proie = menace;
    menaces.push(menace);
  }

  function dessinerMenaces(temps) {
    if (temps >= prochaineMenace && largeur > 0) {
      if (menaces.length < 2) nouvelleMenace();
      prochaineMenace = temps + (tactile ? hasard(6000, 10000) : hasard(3500, 7000));
    }
    for (let i = menaces.length - 1; i >= 0; i--) {
      const m = menaces[i];
      const s = m.chasseur;
      const d = discretion(m.x);
      m.age += 1;
      // La capture commence a portee de la sentinelle, ou au bout de trois
      // secondes : une menace ne reste jamais sans reponse.
      if (m.capture < 0 && (!s || Math.hypot(s.x - m.x, s.y - m.y) < 90 || m.age > 180)) {
        m.capture = 0;
      }
      if (m.capture < 0) {
        const pulsation = 0.6 + Math.sin(m.age * 0.25) * 0.4;
        halo("rouge", m.x, m.y, 14 * pulsation, 0.55 * d);
        ctx.fillStyle = teinte("rouge", 0.9 * d);
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        continue;
      }
      m.capture += 1;
      const reste = 1 - m.capture / 26;
      // En mode calme la sentinelle ne s'est pas approchee : un trait la
      // relierait a la menace d'un bout a l'autre de l'ecran.
      if (s && !calme) {
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = teinte("cyan", (0.55 * reste + 0.15) * d);
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
        halo("cyan", s.x, s.y, 14, 0.4 * d);
      }
      halo("rouge", m.x, m.y, 12 * reste + 2, 0.55 * reste * d);
      if (m.capture >= 26) {
        neutraliser(m.x, m.y);
        if (s) s.proie = null;
        menaces.splice(i, 1);
      }
    }
  }

  // ── Le confinement : une ruche s'allume sur le passage de l'onde ────
  function dessinerRuche(onde) {
    const rayon = 22;
    const pasX = Math.sqrt(3) * rayon;
    const pasY = 1.5 * rayon;
    ctx.lineWidth = 1;
    for (let ligne = -1; ligne * pasY < hauteur + pasY; ligne++) {
      const decalage = ligne % 2 === 0 ? 0 : pasX / 2;
      for (let colonne = -1; colonne * pasX < largeur + pasX; colonne++) {
        const cx = colonne * pasX + decalage;
        const cy = ligne * pasY;
        const ecart = Math.abs(Math.hypot(cx - onde.x, cy - onde.y) - onde.rayon);
        if (ecart < 70) {
          ctx.strokeStyle = teinte("pourpre", (1 - ecart / 70) * onde.vie * 0.5);
          tracerHexagone(cx, cy, rayon * 0.92, 0);
          ctx.stroke();
        }
      }
    }
  }

  // ── Les boucliers qui s'etendent ────────────────────────────────────
  function dessinerOndes() {
    for (let i = ondes.length - 1; i >= 0; i--) {
      const onde = ondes[i];
      // L'onde ralentit en s'eteignant : elle se pose, elle ne file pas.
      onde.rayon += onde.vitesse * (0.4 + onde.vie * 0.8);
      onde.vie -= onde.usure;
      if (onde.vie <= 0) {
        ondes.splice(i, 1);
        continue;
      }
      halo("violet", onde.x, onde.y, onde.lueur * (1.2 - onde.vie * 0.4), onde.vie * onde.aura);
      if (onde.genre === "grande") dessinerRuche(onde);
      ctx.lineWidth = onde.epaisseur;
      ctx.strokeStyle = teinte("lavande", onde.vie * 0.75);
      tracerHexagone(onde.x, onde.y, onde.rayon, onde.rotation);
      ctx.stroke();
      ctx.strokeStyle = teinte("cyan", onde.vie * 0.35);
      tracerHexagone(onde.x, onde.y, onde.rayon * 0.82, onde.rotation + 0.26);
      ctx.stroke();
    }
  }

  // ── Les eclats qui retombent ────────────────────────────────────────
  function dessinerEclats() {
    for (let i = eclats.length - 1; i >= 0; i--) {
      const e = eclats[i];
      if (!e.fixe) {
        e.vx *= 0.965;
        e.vy = e.vy * 0.965 + 0.035;   // un soupcon de gravite
        e.x += e.vx;
        e.y += e.vy;
        e.rotation += e.spin;
      }
      e.vie -= e.usure;
      if (e.vie <= 0) {
        eclats.splice(i, 1);
        continue;
      }
      halo(e.couleur, e.x, e.y, e.taille * 5, e.vie * 0.6);
      if (e.forme === "point") {
        ctx.fillStyle = teinte(e.couleur, e.vie);
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.taille * 0.45, 0, Math.PI * 2);
        ctx.fill();
        continue;
      }
      ctx.save();
      ctx.translate(e.x, e.y);
      ctx.rotate(e.rotation);
      if (e.forme === "code") {
        ecrire(e.texte, 0, 0, Math.round(e.taille * 3), e.couleur, e.vie);
        ctx.restore();
        continue;
      }
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = teinte(e.couleur, e.vie);
      if (e.forme === "bouclier") tracerBouclier(e.taille * 1.3);
      else if (e.forme === "cadenas") tracerCadenas(e.taille * 1.2, 0);
      else tracerCoche(e.taille * 1.3);
      ctx.stroke();
      ctx.restore();
    }
  }

  // ── La boucle ───────────────────────────────────────────────────────
  // Elle s'arrete d'elle-meme quand l'onglet est cache : c'est ce que
  // fait requestAnimationFrame, et c'est ce qu'on veut ici.
  function image(temps) {
    // Le releve d'abord : c'est lui qui dit ou placer librement.
    imagesDepuisReleve += 1;
    if (zonesPerimees || imagesDepuisReleve > 30) releverContenu();
    if (!place && largeur > 0) {
      toutPlacer();
      place = true;
    }
    ctx.clearRect(0, 0, largeur, hauteur);
    ctx.globalCompositeOperation = "lighter";
    // Redimensionner la toile remet ces reglages a zero : on les repose
    // a chaque image plutot que de courir apres.
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    dessinerGlyphes();
    dessinerSentinelles(temps);
    dessinerCadenas(temps);
    dessinerMenaces(temps);
    dessinerOndes();
    dessinerEclats();
    ctx.globalCompositeOperation = "source-over";
    requestAnimationFrame(image);
  }
  requestAnimationFrame(image);

  // Si le reglage change en cours de visite, on bascule aussitot : en
  // mode calme tout s'immobilise sur place ; en mode normal, le mouvement
  // reprend a la naissance suivante de chaque element.
  const reduit = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  reduit?.addEventListener?.("change", () => {
    calme = reduit.matches;
    if (!calme) return;
    for (const liste of [sentinelles, glyphes, cadenas]) {
      for (const objet of liste) {
        objet.vx = 0;
        objet.vy = 0;
      }
    }
    paquets.length = 0;
  });
}

function initRevealAnimations() {
  const selectors = [
    ".stat",
    ".feature-card",
    ".price-card",
    ".faq-box",
    ".partner-card",
    ".discord-window",
    ".demo-controls"
  ];

  document.querySelectorAll(selectors.join(",")).forEach((element) => {
    element.classList.add("reveal");
  });

  observeReveals();
}

function initDashboard() {
  const dashboard = document.querySelector(".dashboard-page");
  if (!dashboard) return;

  const dashboardUrlParams = new URLSearchParams(location.search || "");
  const requestedFlow = dashboardUrlParams.get("flow") || "";  const requiresLiveDiscordFlow = true;
  const tabs = document.querySelectorAll("[data-dashboard-tab]");
  const panels = document.querySelectorAll("[data-dashboard-panel]");
  const toast = document.getElementById("dashboardToast");
  const authScreen = document.querySelector("[data-auth-screen]");
  const authTitle = authScreen?.querySelector("h1");
  const authCopy = authScreen?.querySelector(".auth-card > p:not(.eyebrow):not(.oauth-note)");
  const authNote = authScreen?.querySelector(".oauth-note");
  const dashboardLoginButton = document.querySelector("[data-dashboard-login]");
  const serverScreen = document.querySelector("[data-server-screen]");
  const serverSearchInput = document.querySelector("[data-server-search]");
  const serverCountLabel = document.querySelector("[data-server-count-label]");
  const refreshDashboardServersButton = document.querySelector("[data-refresh-dashboard-servers]");
  const dashboardApp = document.querySelector("[data-dashboard-app]");
  const currentServerTargets = document.querySelectorAll("[data-current-server], [data-current-server-label]");
  const currentServerLogoTargets = document.querySelectorAll("[data-current-server-logo], [data-current-server-logo-inline]");
  const currentServerLogoShells = document.querySelectorAll("[data-current-server-logo-shell]");
  const unsavedModal = document.querySelector("[data-unsaved-modal]");
  const publishTicketButton = document.querySelector("[data-publish-ticket]");
  const ticketChannelInput = document.querySelector("[data-ticket-channel]");
  let activePanelName = "overview";
  let hasUnsavedChanges = false;
  let dirtyPanelName = null;
  // Le dernier etat confirme par le bot (en JSON), pour « Reset » et
  // « Abandonner ». Repris a chaque chargement, import et enregistrement.
  let derniereConfigEnregistree = null;
  let ticketNeedsPublish = false;
  let pendingNavigation = null;
  let toastTimer;
  let selectedServer = {
    id: "",
    name: "",
    logo: modbotDefaultLogo,
    initials: "HB",
    installed: false
  };
  let dashboardGuilds = [];
  let dernierConfig = null;   // derniere config reçue, pour le redessin
  let dashboardResources = { channels: [], roles: [], voice_channels: [], categories: [] };

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }

  function showDashboardStage(stage) {
    if (authScreen) authScreen.hidden = stage !== "auth";
    if (serverScreen) serverScreen.hidden = stage !== "servers";
    if (dashboardApp) dashboardApp.hidden = stage !== "dashboard";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function setOfferInviteFallbackCopy() {
    if (!requiresLiveDiscordFlow) return;
    if (authTitle) authTitle.textContent = t("dash.connecteToiAvecDiscord");
    if (authCopy) {
      authCopy.textContent = t("js.auth.chargeraServeurs");
    }
    if (authNote) {
      authNote.textContent = t("js.auth.apresConnexion");
    }
    if (dashboardLoginButton) {
      dashboardLoginButton.innerHTML = `<span></span> ${escapeHtml(t("dash.seConnecterAvecDiscord"))}`;
    }
  }

  function openDiscordInviteSelector() {
    const inviteUrl = buildDiscordOAuthUrl("invite");
    if (!inviteUrl) {
      showToast(t("js.auth.clientIdManquant"));
      return false;
    }
    window.location.href = inviteUrl;
    return true;
  }

  function markLogoFallback(img) {
    const shell = img.closest(".server-logo-shell");
    shell?.classList.add("is-fallback");
  }

  function setupLogoFallbacks() {
    document.querySelectorAll("[data-logo-img]").forEach((img) => {
      const checkImage = () => {
        if (!img.complete || img.naturalWidth > 0) return;
        markLogoFallback(img);
      };
      img.addEventListener("error", () => {
        if (!img.dataset.logoFallbackTried) {
          img.dataset.logoFallbackTried = "1";
          img.src = modbotDefaultLogo;
          return;
        }
        markLogoFallback(img);
      });
      img.addEventListener("load", () => img.closest(".server-logo-shell")?.classList.remove("is-fallback"));
      checkImage();
    });
  }






  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    }[character]));
  }

  function channelLabel(channel) {
    return channel?.name ? `# ${channel.name}` : tp("js.salonNumero", { id: channel?.id || "" });
  }

  function roleLabel(role) {
    return role?.name ? `@${role.name}` : tp("js.roleNumero", { id: role?.id || "" });
  }

  function setInputState(input) {
    const row = input.closest(".channel-row");
    const state = row?.querySelector(".state");
    if (!state) return;
    const active = Boolean(input.value.trim());
    state.classList.toggle("active", active);
    state.classList.toggle("inactive", !active);
    state.textContent = t(active ? "js.actif" : "js.inactif");
  }

  /* ══════════════════════════════════════════════════════════════
     SELECTEURS DE ROLES ET DE SALONS
     Le serveur est deja connu : ses roles et ses salons arrivent de
     /resources, deja filtres. Personne n'a donc a coller un identifiant
     a 18 chiffres — et personne ne peut plus en coller un faux.
     ══════════════════════════════════════════════════════════════ */

  function optionsRoles(choisi = "", libelleVide = null) {
    const tete = libelleVide === null ? ""
      : `<option value="">${escapeHtml(libelleVide)}</option>`;
    return tete + dashboardResources.roles.map((role) => (
      `<option value="${escapeHtml(role.id)}"${String(role.id) === String(choisi) ? " selected" : ""}>${escapeHtml(roleLabel(role))}</option>`
    )).join("");
  }

  function optionsSalonsVocaux(choisi = "", libelleVide = null) {
    const tete = libelleVide === null ? ""
      : `<option value="">${escapeHtml(libelleVide)}</option>`;
    // Tous les salons vocaux paraissent, y compris ceux que le bot ne
    // voit pas encore : une liste trouee se lit comme un bug. Ceux-la
    // sont annonces comme tels plutot que passes sous silence.
    return tete + (dashboardResources.voice_channels || [])
      .map((salon) => {
        const categorie = salon.category ? `${salon.category} / ` : "";
        const alerte = salon.visible === false ? ` ${t("js.voc.salonInvisible")}` : "";
        const libelle = `${categorie}${salon.name || salon.id}${alerte}`;
        return `<option value="${escapeHtml(salon.id)}"${String(salon.id) === String(choisi) ? " selected" : ""}>${escapeHtml(libelle)}</option>`;
      }).join("");
  }

  function optionsCategories(choisi = "", libelleVide = null) {
    const tete = libelleVide === null ? ""
      : `<option value="">${escapeHtml(libelleVide)}</option>`;
    return tete + (dashboardResources.categories || [])
      .map((salon) => (
        `<option value="${escapeHtml(salon.id)}"${String(salon.id) === String(choisi) ? " selected" : ""}>${escapeHtml(channelLabel(salon))}</option>`
      )).join("");
  }

  function optionsSalons(choisi = "", libelleVide = null) {
    const tete = libelleVide === null ? ""
      : `<option value="">${escapeHtml(libelleVide)}</option>`;
    return tete + dashboardResources.channels.map((salon) => (
      `<option value="${escapeHtml(salon.id)}"${String(salon.id) === String(choisi) ? " selected" : ""}>${escapeHtml(channelLabel(salon))}</option>`
    )).join("");
  }

  /**
   * Remplit un <select> sans perdre la valeur deja posee.
   *
   * Les ressources arrivent parfois APRES la configuration : ecraser le
   * contenu ferait retomber le champ sur sa premiere option, et le
   * reglage enregistre disparaitrait de l'ecran.
   */
  function remplirSelect(selecteur, options, libelleVide) {
    const champ = typeof selecteur === "string"
      ? document.querySelector(selecteur) : selecteur;
    if (!champ) return null;
    const voulu = champ.value || champ.dataset.attendu || "";
    champ.innerHTML = options(voulu, libelleVide);
    if (voulu) champ.value = voulu;
    return champ;
  }

  function renderDashboardResources(resources = {}) {
    dashboardResources = {
      channels: Array.isArray(resources.channels) ? resources.channels : [],
      roles: Array.isArray(resources.roles) ? resources.roles : [],
      // Listes dediees : un salon vocal n'a rien a faire dans un
      // selecteur de salon texte, ni une categorie dans les deux.
      voice_channels: Array.isArray(resources.voice_channels) ? resources.voice_channels : [],
      categories: Array.isArray(resources.categories) ? resources.categories : []
    };

    const channelDatalist = document.getElementById("dashboardChannelOptions");
    if (channelDatalist) {
      channelDatalist.innerHTML = dashboardResources.channels.map((channel) => (
        `<option value="${escapeHtml(channel.id)}" label="${escapeHtml(channelLabel(channel))}"></option>`
      )).join("");
    }

    const roleDatalist = document.getElementById("dashboardRoleOptions");
    if (roleDatalist) {
      roleDatalist.innerHTML = dashboardResources.roles.map((role) => (
        `<option value="${escapeHtml(role.id)}" label="${escapeHtml(roleLabel(role))}"></option>`
      )).join("");
    }

    const supportRole = document.querySelector("[data-ticket-support-role]");
    if (supportRole) {
      const current = supportRole.value;
      supportRole.innerHTML = `<option value="">${escapeHtml(t("js.choisirRoleSupport"))}</option>` + dashboardResources.roles.map((role) => (
        `<option value="${escapeHtml(role.id)}">${escapeHtml(roleLabel(role))}</option>`
      )).join("");
      if (current) supportRole.value = current;
    }

    // Sélecteurs du captcha : ils conservent la valeur déjà chargée, car les
    // ressources arrivent parfois après la configuration sécurité.
    const captchaRole = document.querySelector("[data-captcha-role]");
    if (captchaRole) {
      const current = captchaRole.value;
      captchaRole.innerHTML = `<option value="">${escapeHtml(t("js.aucun"))}</option>` + dashboardResources.roles.map((role) => (
        `<option value="${escapeHtml(role.id)}">${escapeHtml(roleLabel(role))}</option>`
      )).join("");
      if (current) captchaRole.value = current;
    }

    const captchaChannel = document.querySelector("[data-captcha-channel]");
    if (captchaChannel) {
      const current = captchaChannel.value;
      captchaChannel.innerHTML = `<option value="">${escapeHtml(t("js.aucun"))}</option>` + dashboardResources.channels.map((channel) => (
        `<option value="${escapeHtml(channel.id)}">${escapeHtml(channelLabel(channel))}</option>`
      )).join("");
      if (current) captchaChannel.value = current;
    }

    // Salons des messages d'arrivée et de départ.
    // Les ressources arrivent parfois après la configuration : on retombe sur
    // welcomeState, sinon la valeur enregistrée serait perdue à l'affichage.
    [["[data-welcome-channel]", "js.aucun", "channel_id"],
     ["[data-welcome-departure-channel]", "js.memeSalon", "departure_channel_id"]]
      .forEach(([selecteur, vide, clef]) => {
        const champ = document.querySelector(selecteur);
        if (!champ) return;
        const voulu = champ.value || welcomeState[clef] || "";
        champ.innerHTML = `<option value="">${escapeHtml(t(vide))}</option>` +
          dashboardResources.channels.map((channel) => (
            `<option value="${escapeHtml(channel.id)}">${escapeHtml(channelLabel(channel))}</option>`
          )).join("");
        if (voulu) champ.value = voulu;
      });

    fillGiveawaySelects();

    // Salon du panneau de roles-reactions.
    remplirSelect("[data-reaction-channel]", optionsSalons, t("js.aucun"));

    // Une liste par ligne de role-reaction, et la liste d'ajout des
    // auto-roles.
    document.querySelectorAll(".reaction-role-row [data-rr-role]").forEach((champ) => {
      remplirSelect(champ, optionsRoles, t("js.choisirRole"));
    });
    remplirSelect("[data-autorole-picker]", optionsRoles, t("js.ajouterCeRole"));
    redessinerAutoRoles();

    remplirSelect("[data-ticket-channel]", optionsSalons, t("js.aucun"));
    remplirSelect("[data-recurring-channel]", optionsSalons, t("js.aucun"));
    remplirSelect("[data-ia-channel-picker]", optionsSalons, t("js.ia.ajouterSalon"));
    // La porte d'entree est un salon VOCAL, l'accueil une CATEGORIE :
    // le bot renvoie deux listes dediees pour ne pas melanger les types.
    remplirSelect("[data-voice-hub]", optionsSalonsVocaux, t("js.aucun"));
    remplirSelect("[data-voice-category]", optionsCategories, t("js.aucun"));
    document.querySelectorAll("[data-event-channel]").forEach((champ) => {
      remplirSelect(champ, optionsSalons, t("js.aucun"));
    });
    // Les pastilles portent un nom de salon : il faut les redessiner une
    // fois les salons connus, sinon elles resteraient sur « #123456 ».
    redessinerSalonsIa();
    ["tickets", "logs", "suggestions", "reports", "staff_alert"].forEach((clef) => {
      const champ = remplirSelect(`[data-channel="${clef}"]`, optionsSalons, t("js.aucun"));
      if (champ) setInputState(champ);
    });
    document.querySelectorAll("[data-social-ping-picker]").forEach((champ) => {
      remplirSelect(champ, optionsRoles, t("js.ajouterCeRole"));
    });
    document.querySelectorAll("[data-social-channel]").forEach((champ) => {
      remplirSelect(champ, optionsSalons, t("js.aucun"));
    });
    // Les pastilles affichent un nom : il faut les redessiner une fois
    // les roles connus, sinon elles resteraient sur « #123456789 ».
    document.querySelectorAll(".social-card").forEach((carte) => {
      poserRolesDeLaCarte(carte, rolesDeLaCarte(carte));
    });
  }

  function renderModerationConfig(config = {}) {
    dernierConfig = config;
    const moderation = config?.moderation || {};
    const security = config?.security || {};
    const customWords = Array.isArray(moderation.custom_words)
      ? moderation.custom_words
      : (Array.isArray(security.custom_words) ? security.custom_words : []);
    const filteredWords = Array.isArray(moderation.filtered_words)
      ? moderation.filtered_words
      : [
          ...(Array.isArray(security.default_words) ? security.default_words.map((word) => ({ word, source: "default" })) : []),
          ...customWords.map((word) => ({ word, source: "custom" }))
        ];
    const sanctions = Array.isArray(moderation.sanctions)
      ? moderation.sanctions
      : (Array.isArray(moderation.bans) ? moderation.bans : []);

    // Les mots arrivent du bot : ils alimentent les pastilles, qui sont
    // desormais la source de verite a l'enregistrement.
    appliquerMotsFiltres(customWords);

    const wordList = document.querySelector("[data-filtered-word-list]");
    if (wordList) {
      const seen = new Set();
      const words = filteredWords.filter((item) => {
        const word = String(item?.word || item || "").trim();
        const key = word.toLowerCase();
        if (!word || seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      wordList.innerHTML = words.length ? words.map((item) => {
        const word = String(item.word || item).trim();
        const source = item.source === "custom" ? "custom" : "default";
        const label = t(source === "custom" ? "js.personnalise" : "js.parDefaut");
        return `<span class="filtered-word-chip is-${source}"><strong>${escapeHtml(word)}</strong><em>${label}</em></span>`;
      }).join("") : `<div class="dashboard-empty-state"><strong>${escapeHtml(t("js.aucunMotPersonnalise"))}</strong><span>${escapeHtml(t("js.listeChargeeDepuisBot"))}</span></div>`;
    }

    const sanctionList = document.querySelector("[data-sanction-list]");
    if (sanctionList) {
      sanctionList.innerHTML = sanctions.length ? sanctions.slice(0, 30).map((item) => {
        const pseudo = item.pseudo || item.username || t("js.utilisateurInconnu");
        const userId = item.id || item.user_id || t("js.idInconnu");
        const reason = item.reason || item.raison || t("js.aucuneRaisonFournie");
        const duration = item.duration || item.duree || t("js.permanent");
        const date = item.date || item.created_at || t("js.dateInconnue");
        const guildName = item.guild_name || item.server_name || "";
        return `
          <article class="sanction-row">
            <span class="state inactive">${escapeHtml(t("js.ban"))}</span>
            <strong>${escapeHtml(pseudo)}</strong>
            <code>${escapeHtml(userId)}</code>
            <small>${escapeHtml(reason)}</small>
            <small>${escapeHtml(duration)} • ${escapeHtml(date)}${guildName ? ` • ${escapeHtml(guildName)}` : ""}</small>
          </article>
        `;
      }).join("") : `<div class="dashboard-empty-state"><strong>${escapeHtml(t("js.aucunBanEnregistre"))}</strong><span>${escapeHtml(t("js.prochainsBansIci"))}</span></div>`;
    }
  }

  function renderDashboardStats(config = {}) {
    const ratings = config.ratings || {};
    const logs = Array.isArray(config.logs) ? config.logs : [];
    const tickets = config.ticket_stats || {};
    const average = Number(ratings.average ?? ratings.avg ?? 0);
    const safeAverage = Number.isFinite(average) ? average : 0;
    const count = Number(ratings.count || 0);
    const last = Array.isArray(ratings.last) && ratings.last.length ? ratings.last[ratings.last.length - 1] : null;
    const averageTarget = document.querySelector("[data-rating-average]");
    const countTarget = document.querySelector("[data-rating-count]");
    const ticketTarget = document.querySelector("[data-rating-ticket-count]");
    const lastTarget = document.querySelector("[data-rating-last]");
    const labelTarget = document.querySelector("[data-rating-label]");
    const overviewAverageTarget = document.querySelector("[data-overview-rating-average]");
    const overviewCountTarget = document.querySelector("[data-overview-rating-count]");
    if (averageTarget) averageTarget.textContent = `${safeAverage.toFixed(2)}/5`;
    if (countTarget) countTarget.textContent = String(count);
    if (ticketTarget) ticketTarget.textContent = String(tickets.total || 0);
    if (lastTarget) lastTarget.textContent = last ? `${last.note || "?"}/5` : "—";
    if (labelTarget) labelTarget.textContent = t(count ? "js.statsReellesDuBot" : "dash.aucuneNoteReelle");
    if (overviewAverageTarget) overviewAverageTarget.textContent = `${safeAverage.toFixed(2)}/5`;
    if (overviewCountTarget) overviewCountTarget.textContent = String(count);

    const logFeed = document.querySelector("[data-dashboard-log-feed]");
    if (logFeed) {
      if (!logs.length) {
        logFeed.innerHTML = `<div><span>—</span> ${escapeHtml(t("js.aucunLogReel"))}</div>`;
      } else {
        logFeed.innerHTML = logs.slice(0, 20).map((entry) => {
          const date = String(entry.date || entry.created_at || "").slice(11, 16) || "—";
          const action = entry.action || "action";
          const detail = entry.detail || entry.message || "";
          return `<div><span>${escapeHtml(date)}</span> ${escapeHtml(action)} ${escapeHtml(detail)}</div>`;
        }).join("");
      }
    }
  }

  /**
   * Vrai si `guildId` est TOUJOURS le serveur ouvert.
   *
   * Le dashboard lance six requetes par serveur — ressources,
   * configuration, securite, journal, sauvegardes, giveaways — et rien
   * ne les annulait. En changeant de serveur, celles du precedent
   * continuaient leur route et peignaient leur reponse par-dessus la
   * nouvelle : on lisait le journal d'un serveur sous le nom d'un
   * autre. La reponse la plus lente gagnait, ce qui n'a aucun sens.
   *
   * A appeler APRES chaque `await`, jamais avant : c'est pendant
   * l'attente que le serveur change.
   */
  function estEncoreLeServeur(guildId) {
    return String(guildId || "") === String(selectedServer.id || "");
  }

  /**
   * Vrai tant que la configuration du serveur ouvert n'est pas arrivee.
   *
   * Pendant ce temps, les champs a l'ecran portent encore les valeurs du
   * serveur PRECEDENT. Enregistrer a cet instant les recopiait sur le
   * nouveau — le salon de logs de l'un devenait celui de l'autre, en un
   * clic, sans que rien ne le signale.
   */
  let chargementServeur = 0;

  function serveurEnChargement() {
    return chargementServeur > 0;
  }

  async function loadDashboardResources(guildId) {
    if (!guildId) {
      renderDashboardResources({});
      return;
    }
    try {
      const data = await modbotApiFetch(`/api/guilds/${guildId}/resources`, { cache: "no-store" });
      if (!estEncoreLeServeur(guildId)) return;
      renderDashboardResources(data);
    } catch (error) {
      // Vider les listes de salons du serveur COURANT parce que celles
      // d'un autre n'ont pas abouti n'aurait aucun sens.
      if (!estEncoreLeServeur(guildId)) return;
      renderDashboardResources({});
    }
  }

  function emptyGuildMarkup(message = t("js.aucunServeurAdministrable")) {
    return `
      <div class="dashboard-empty-state">
        <strong>${escapeHtml(t("js.serveurIndisponible"))}</strong>
        <span>${escapeHtml(message)}</span>
      </div>
    `;
  }

  function formatMemberCount(value) {
    const count = Number(value || 0);
    if (!Number.isFinite(count) || count <= 0) return "";
    const arrondi = `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}k`;
    if (count >= 1000) return tp("js.membresPluriel", { n: arrondi });
    return tn("js.membreSingulier", "js.membresPluriel", count);
  }

  function guildActionLabel(guild) {
    if (guild.installed) return t("js.ouvrir");
    return t("js.ajouterModbot");
  }

  function guildStatusLabel(guild) {
    if (guild.local) return t("js.ajouterViaDiscord");
    return formatMemberCount(guild.member_count) || t(guild.installed ? "js.modbotInstalle" : "js.botNonInstalle");
  }

  function updateServerCount(guilds) {
    if (!serverCountLabel) return;
    const realGuilds = guilds.filter((guild) => !guild.local);
    if (realGuilds.length) {
      serverCountLabel.textContent = tn("js.rejointUnServeur", "js.rejointDesServeurs", realGuilds.length);
      return;
    }
    serverCountLabel.textContent = t("js.choisisOuAjoute");
  }

  function currentServerSearchTerm() {
    return String(serverSearchInput?.value || "").trim().toLowerCase();
  }

  // Dernier diagnostic renvoyé par /api/health (état OAuth, nb de serveurs...)
  let lastApiHealth = null;

  async function probeApiBase(base) {
    if (!base) return null;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    try {
      const response = await fetch(`${base}/api/health`, {
        cache: "no-store",
        signal: controller.signal
      });
      if (!response.ok) return null;
      const data = await response.json().catch(() => null);
      return data?.ok ? data : null;
    } catch (error) {
      return null;
    } finally {
      window.clearTimeout(timeout);
    }
  }

  /**
   * Découverte automatique de l'API : toutes les adresses candidates sont
   * testées EN PARALLÈLE, la première qui répond gagne. C'est bien plus
   * rapide qu'un essai séquentiel et cela évite toute saisie manuelle.
   */
  let apiDiscovery = null;

  async function findAvailableApiBase(force = false) {
    if (apiDiscovery && !force) return apiDiscovery;

    apiDiscovery = (async () => {
      const candidats = getModbotApiCandidates();
      if (!candidats.length) {
        lastApiHealth = null;
        renderAuthStatus();
        return "";
      }

      // Course parallèle : la première adresse qui répond gagne.
      const courir = (liste) => new Promise((resolve) => {
        let restants = liste.length;
        let resolu = false;
        liste.forEach((candidat) => {
          probeApiBase(candidat).then((health) => {
            if (!resolu && health) {
              resolu = true;
              lastApiHealth = health;
              resolve(candidat);
              return;
            }
            if (--restants === 0 && !resolu) resolve("");
          });
        });
      });

      // L'adresse déjà connue est essayée SEULE en premier : cas normal,
      // une seule requête réseau et aucune erreur dans la console.
      const prefere = candidats[0];
      let gagnant = await courir([prefere]);
      if (!gagnant && candidats.length > 1) {
        gagnant = await courir(candidats.slice(1));
      }

      if (gagnant) {
        rememberApiBase(gagnant);
      } else {
        // La base mémorisée ne répond plus : on l'oublie pour ne pas rester
        // bloqué dessus au prochain chargement.
        forgetAutoApiBase();
        lastApiHealth = null;
      }
      renderAuthStatus();
      return gagnant;
    })();

    const resultat = await apiDiscovery;
    // Un échec n'est pas mis en cache : la prochaine tentative resondera.
    if (!resultat) apiDiscovery = null;
    return resultat;
  }

  /** Affiche l'état de la liaison site bot sur l'écran de connexion. */
  function renderAuthStatus(overrideState) {
    const box = document.querySelector("[data-auth-status]");
    const dot = document.querySelector("[data-auth-status-dot]");
    const text = document.querySelector("[data-auth-status-text]");
    const badge = document.querySelector("[data-api-badge]");
    if (!box || !dot || !text) return;

    let state = overrideState;
    if (!state) {
      if (!lastApiHealth) {
        state = {
          level: "error",
          message: getModbotApiBase()
            ? t("js.apiInjoignable")
            : t("js.apiNonConfiguree")
        };
      } else if (!lastApiHealth.oauth_configured) {
        state = {
          level: "warn",
          message:
            t("js.oauthIncomplet")
        };
      } else {
        const guilds = Number(lastApiHealth.guilds || 0);
        state = {
          level: "ok",
          message: tn("js.botConnecteUnServeur", "js.botConnecteDesServeurs", guilds,
                      { bot: lastApiHealth.bot || "ModBot" })
        };
      }
    }

    box.hidden = false;
    box.dataset.level = state.level;
    dot.className = `auth-status-dot is-${state.level}`;
    text.textContent = state.message;

    if (badge) {
      const labels = { ok: t("js.badgeConnectee"), warn: t("js.badgeAConfigurer"),
                       error: t("js.badgeNonDetectee"), pending: t("js.badgeTest") };
      badge.textContent = labels[state.level] || state.level;
      badge.dataset.level = state.level;
    }
    // Le champ montre l'adresse REELLEMENT utilisée. Il est rempli au
    // chargement, avant que la découverte n'ait pu écarter une adresse
    // morte : sans cette remise à jour, il continuait d'afficher une
    // adresse que plus rien n'appelle.
    const champAdresse = document.querySelector("[data-api-url-input]");
    if (champAdresse && document.activeElement !== champAdresse) {
      const utilisee = getModbotApiBase();
      if (utilisee && champAdresse.value !== utilisee) champAdresse.value = utilisee;
    }

    // Le réglage d'adresse n'apparaît qu'en cas de problème de liaison
    const advanced = document.querySelector("[data-auth-advanced]");
    if (advanced) {
      const enPanne = state.level === "error";
      advanced.hidden = !enPanne;
      if (enPanne && !advanced.dataset.userToggled) advanced.open = true;
    }
  }

  function renderGuildChoices(guilds) {
    // Le menu déroulant de la barre suit la même source de données
    if (typeof renderSwitcherList === "function") renderSwitcherList();
    const serverGrid = document.querySelector(".server-grid");
    if (!serverGrid) return;
    const safeGuilds = normalizeDashboardGuilds(guilds);
    updateServerCount(safeGuilds);
    const term = currentServerSearchTerm();
    const visibleGuilds = term
      ? safeGuilds.filter((guild) => guild.name.toLowerCase().includes(term))
      : safeGuilds;
    if (!safeGuilds.length) {
      serverGrid.innerHTML = emptyGuildMarkup(t("js.connecteApiOuInvitation"));
      return;
    }
    if (!visibleGuilds.length) {
      serverGrid.innerHTML = emptyGuildMarkup(t("js.aucunServeurRecherche"));
      return;
    }
    serverGrid.innerHTML = visibleGuilds.map((guild) => `
      <button class="server-card ${guild.installed ? "is-installed" : "is-uninstalled"} ${guild.local ? "is-local" : ""}" type="button" data-server-name="${escapeHtml(guild.name)}" data-server-id="${escapeHtml(guild.id)}" data-server-logo="${escapeHtml(guild.logo || modbotDefaultLogo)}" data-server-initials="${escapeHtml(guild.initials || "MB")}" data-server-installed="${guild.installed ? "true" : "false"}" data-server-local="${guild.local ? "true" : "false"}" data-server-can-manage="${guild.can_manage ? "true" : "false"}">
        <span class="server-card-banner" style="--server-banner:url('${escapeHtml(guild.banner || modbotDefaultBanner)}')"></span>
        <span class="server-card-body">
          <span class="server-logo-shell" data-initials="${escapeHtml(guild.initials || "MB")}">
            <img class="server-logo" src="${escapeHtml(guild.logo || modbotDefaultLogo)}" alt="" data-logo-img>
          </span>
          <span class="server-card-copy">
            <strong>${escapeHtml(guild.name)}</strong>
            <small>${escapeHtml(guildStatusLabel(guild))}</small>
          </span>
          <span class="server-card-action">${escapeHtml(guildActionLabel(guild))}</span>
        </span>
      </button>
    `).join("");
    setupLogoFallbacks();
  }




  async function loadDashboardGuilds() {
    const data = await modbotApiFetch("/api/guilds", { cache: "no-store" });
    const brut = Array.isArray(data?.guilds) ? data.guilds : [];
    brut.forEach((g) => {
    });
    dashboardGuilds = normalizeDashboardGuilds(brut);
    renderGuildChoices(dashboardGuilds);
    // Les licences arrivent avec les serveurs : le bouton d'activation
    // se decide a partir des deux.
    chargerLicences();
    return dashboardGuilds;
  }

  /* ══════════════════════════════════════════════════════════════
     L'ACTIVATION D'UNE LICENCE PREMIUM

     Ce qu'on achete est une licence : une echeance et un nombre de
     places, qui appartiennent a l'acheteur. Le grand bouton n'apparait
     que s'il reste une place a poser — sans achat detecte, il n'y a
     rien a proposer, donc rien a afficher.

     Une place posee ne se reprend pas. On le dit AVANT le choix, pas
     apres : c'est le genre de decision qu'on ne veut pas decouvrir
     irreversible une fois prise.
     ══════════════════════════════════════════════════════════════ */

  let mesLicences = { licences: [], places_libres: 0, serveurs_actives: [], noms: {} };

  async function chargerLicences() {
    // Sans session, la reponse est connue d'avance : un 401, rouge dans
    // la console de chaque visiteur. On ne la demande pas.
    if (!getModbotSessionToken()) {
      mesLicences = { licences: [], places_libres: 0, serveurs_actives: [], noms: {} };
      majBoutonLicence();
      return;
    }
    try {
      mesLicences = await modbotApiFetch("/api/me/licences", { cache: "no-store" });
    } catch (erreur) {
      // Pas connecte, ou bot injoignable : aucun bouton, et c'est la
      // bonne reponse — mieux vaut rien qu'un bouton qui echoue.
      mesLicences = { licences: [], places_libres: 0, serveurs_actives: [], noms: {} };
    }
    majBoutonLicence();
    return mesLicences;
  }

  function majBoutonLicence() {
    const bloc = document.querySelector("[data-licence-cta]");
    if (!bloc) return;
    const libres = Number(mesLicences.places_libres || 0);
    bloc.hidden = libres <= 0;
    if (libres <= 0) {
      fermerChoixLicence();
      return;
    }
    const detail = bloc.querySelector("[data-licence-cta-detail]");
    if (detail) {
      detail.textContent = tn("lic.ctaDetailUne", "lic.ctaDetailPlusieurs",
                              libres, { places: libres });
    }
  }

  /** La licence qui a encore de la place, la plus proche de l'echeance. */
  function licenceAPoser() {
    return (mesLicences.licences || [])
      .filter((licence) => Number(licence.free || 0) > 0)
      .sort((a, b) => String(a.until).localeCompare(String(b.until)))[0] || null;
  }

  function fermerChoixLicence() {
    const choix = document.querySelector("[data-licence-choix]");
    const grille = document.querySelector(".server-grid");
    const barre = document.querySelector(".server-select-toolbar");
    if (choix) choix.hidden = true;
    if (grille) grille.hidden = false;
    if (barre) barre.hidden = false;
  }

  function ouvrirChoixLicence() {
    const licence = licenceAPoser();
    const choix = document.querySelector("[data-licence-choix]");
    const grille = document.querySelector(".server-grid");
    const barre = document.querySelector(".server-select-toolbar");
    if (!licence || !choix) return;

    const titre = choix.querySelector("[data-licence-choix-titre]");
    if (titre) {
      const offre = PREMIUM_OFFRES.find((o) => o.key === licence.plan);
      titre.textContent = tp("lic.choixTitre", {
        offre: offre ? t(offre.labelClef) : licence.plan,
        places: licence.free,
      });
    }

    const hote = choix.querySelector("[data-licence-grid]");
    const deja = new Set(mesLicences.serveurs_actives || []);
    const candidats = dashboardGuilds.filter((g) => !deja.has(String(g.id)));

    if (hote) {
      hote.innerHTML = candidats.length
        ? candidats.map((guild) => `
            <button class="licence-carte" type="button"
                    data-licence-activer="${escapeHtml(guild.id)}">
              <span class="licence-carte-logo">${
                guild.icon
                  ? `<img src="${escapeHtml(guild.icon)}" alt="">`
                  : escapeHtml(initialsFromName(guild.name))
              }</span>
              <span class="licence-carte-nom">${escapeHtml(guild.name)}</span>
              <span class="licence-carte-action">${escapeHtml(t("lic.activerIci"))}</span>
            </button>`).join("")
        : `<div class="dashboard-empty-state">
             <strong>${escapeHtml(t("lic.aucunServeur"))}</strong>
             <span>${escapeHtml(t("lic.aucunServeurAide"))}</span>
           </div>`;
    }

    choix.hidden = false;
    if (grille) grille.hidden = true;
    if (barre) barre.hidden = true;
  }

  async function activerLicenceSur(gid) {
    const licence = licenceAPoser();
    if (!licence) return;
    const serveur = dashboardGuilds.find((g) => String(g.id) === String(gid));
    // On demande confirmation : la place ne se reprend pas.
    const nom = serveur?.name || gid;
    if (!window.confirm(tp("lic.confirmer", { serveur: nom }))) return;

    try {
      const data = await modbotApiFetch("/api/me/licences/activer", {
        method: "POST",
        body: JSON.stringify({ licence_id: licence.id, guild_id: String(gid) }),
      });
      showToast(tp("lic.active", { serveur: nom }));
      // On relit plutot que de deviner : le serveur peut avoir eu mieux
      // que cette licence, et c'est le bot qui tranche.
      await chargerLicences();
      if (data?.premium) appliquerPremium(data.premium);
      if (mesLicences.places_libres > 0) ouvrirChoixLicence();
      else fermerChoixLicence();
    } catch (erreur) {
      showToast(erreur?.message || t("lic.echec"));
    }
  }

  function initActivationLicence() {
    document.querySelector("[data-licence-open]")
      ?.addEventListener("click", ouvrirChoixLicence);
    document.querySelector("[data-licence-cancel]")
      ?.addEventListener("click", fermerChoixLicence);
    document.querySelector("[data-licence-grid]")
      ?.addEventListener("click", (evenement) => {
        const carte = evenement.target.closest("[data-licence-activer]");
        if (carte) activerLicenceSur(carte.dataset.licenceActiver);
      });
  }

  /** Envoie l'utilisateur vers Discord pour autoriser ModBot. */
  function redirectToDiscordLogin(base) {
    sessionStorage.setItem("modbot-login-redirected", "1");
    window.location.href =
      `${base}/api/auth/discord/login?redirect=${encodeURIComponent(dashboardReturnUrl())}`;
  }

  function forgetSession() {
    // Tout, des deux cotes : une seule trace oubliee et le dashboard se
    // reconnecte sur l'ancien compte sans rien demander.
    ["modbot-dashboard-session", "modbot-discord-access-token",
     "modbot-oauth-state", "modbot-login-redirected"].forEach((clef) => {
      localStorage.removeItem(clef);
      sessionStorage.removeItem(clef);
    });
  }

  /**
   * Ferme la session puis renvoie vers Discord pour en ouvrir une autre.
   *
   * L'ordre compte : on previent d'abord le bot (sinon la session
   * resterait valable de son cote), on efface ensuite localement, et on
   * ne redirige qu'a la fin. Le bot injoignable n'empeche pas de changer
   * de compte — le jeton local, lui, est bien parti.
   *
   * Cote Discord, la route de connexion demande `prompt=consent` : l'ecran
   * d'autorisation s'affiche, avec le lien pour basculer de compte. Sans
   * cela Discord re-autoriserait le meme compte en silence.
   */
  async function changerDeCompte({ reconnecter = true } = {}) {
    const jeton = getModbotSessionToken();
    const base = getModbotApiBase();
    if (jeton && base) {
      try {
        // Le bot expose /api/auth/logout, pas /api/logout : c'est la seule
        // route qui invalide vraiment la session cote serveur.
        const reponse = await fetch(`${base}/api/auth/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${jeton}` },
        });
        // fetch ne leve pas sur un 404 : sans ce controle, une mauvaise route
        // laisserait le jeton vivant sur le bot sans que rien ne le signale.
        if (!reponse.ok) {
          console.warn(`ModBot : le bot a refuse la deconnexion (${reponse.status})`);
        }
      } catch (error) {
        // Bot injoignable : la session locale part quand meme
      }
    }
    forgetSession();
    selectedServer = { id: "", name: "", logo: modbotDefaultLogo, initials: "HB", installed: false };
    dashboardGuilds = [];
    majBlocCompte(null);
    if (!reconnecter) {
      showToast(t("js.compte.deconnecte"));
      showDashboardStage("auth");
      return;
    }
    if (!base) {
      showToast(t("js.auth.clientIdManquant"));
      return;
    }
    showToast(t("js.compte.redirection"));
    redirectToDiscordLogin(base);
  }

  /**
   * Remplit — ou masque — les blocs du compte connecté.
   *
   * Il y en a deux : un dans la barre du dashboard, un sur l'écran de
   * sélection de serveur. Le second compte au moins autant : c'est là
   * qu'on s'aperçoit qu'on est sur le mauvais compte, en ne voyant pas
   * les serveurs attendus.
   */
  function majBlocCompte(utilisateur) {
    const connu = Boolean(utilisateur && (utilisateur.username || utilisateur.user_id));
    document.querySelectorAll("[data-account]").forEach((bloc) => {
      bloc.hidden = !connu;
      if (!connu) return;
      const nom = bloc.querySelector("[data-account-name]");
      if (nom) nom.textContent = utilisateur.username || utilisateur.user_id;
      const image = bloc.querySelector("[data-account-avatar]");
      if (image && utilisateur.avatar_url) image.src = utilisateur.avatar_url;
    });
  }

  /** Demande au bot qui est connecte, pour alimenter le bloc du compte. */
  async function chargerCompteConnecte() {
    if (!getModbotSessionToken()) {
      majBlocCompte(null);
      return null;
    }
    try {
      const data = await modbotApiFetch("/api/me", { cache: "no-store" });
      majBlocCompte(data?.user || null);
      return data?.user || null;
    } catch (error) {
      majBlocCompte(null);
      return null;
    }
  }

  function initBlocCompte() {
    document.querySelectorAll("[data-account]").forEach((bloc) => {
      const declencheur = bloc.querySelector("[data-account-trigger]");
      const menu = bloc.querySelector("[data-account-menu]");
      if (!declencheur || !menu) return;

      /**
       * Recadre le menu pour qu'il reste dans la fenêtre.
       *
       * Il est ancré par sa droite sur la pastille (`right: 0`). Tant que la
       * pastille est au bord droit de l'écran, cela suffit. Mais la barre se
       * replie selon la place : sur une tablette, la pastille se retrouve au
       * milieu d'une ligne, et un menu plus large qu'elle débordait alors par
       * la GAUCHE — jusqu'à sortir de l'écran de plus de cent pixels.
       */
      const recadrer = () => {
        menu.style.right = "";
        menu.style.left = "";
        const boite = menu.getBoundingClientRect();
        const marge = 8;
        if (boite.left >= marge) return;
        // On décale vers la droite du manque constaté, sans jamais dépasser
        // le bord droit de la fenêtre.
        const parent = bloc.getBoundingClientRect();
        const decalage = Math.min(marge - boite.left,
                                  window.innerWidth - marge - boite.right);
        menu.style.right = `${-decalage}px`;
        // Si le menu reste plus large que la fenêtre, on l'y colle a gauche.
        if (menu.getBoundingClientRect().left < marge) {
          menu.style.right = "auto";
          menu.style.left = `${marge - parent.left}px`;
        }
      };

      const ouvrir = (etat) => {
        menu.hidden = !etat;
        declencheur.setAttribute("aria-expanded", String(etat));
        bloc.classList.toggle("is-open", etat);
        if (etat) recadrer();
      };

      declencheur.addEventListener("click", (event) => {
        event.stopPropagation();
        ouvrir(menu.hidden);
      });
      document.addEventListener("click", (event) => {
        if (!bloc.contains(event.target)) ouvrir(false);
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !menu.hidden) {
          ouvrir(false);
          declencheur.focus();
        }
      });

      bloc.querySelector("[data-switch-account]")?.addEventListener("click", () => {
        ouvrir(false);
        changerDeCompte({ reconnecter: true });
      });
      bloc.querySelector("[data-logout-account]")?.addEventListener("click", () => {
        ouvrir(false);
        changerDeCompte({ reconnecter: false });
      });
    });
  }

  /**
   * Tente de reprendre une session existante sans aucune action de
   * l'utilisateur. Retourne "ok", "expired" ou "unavailable".
   */
  async function resumeSession(base) {
    if (!base || !(getModbotSessionToken() || getModbotApiToken())) return "unavailable";
    try {
      await loadDashboardGuilds();
      localStorage.setItem("modbot-has-logged-in", "1");
      chargerCompteConnecte();     // sans attendre : n'empeche pas l'affichage
      showDashboardStage("servers");
      renderAuthStatus();
      return "ok";
    } catch (error) {
      const message = String(error?.message || "");
      if (/401|session|expir/i.test(message)) {
        forgetSession();
        return "expired";
      }
      console.warn(t("js.repriseImpossible"), message);
      return "unavailable";
    }
  }

  async function dashboardLogin({ silencieux = false } = {}) {
    if (!silencieux) {
      renderAuthStatus({ level: "pending", message: "Connexion au bot ModBot…" });
    }
    const base = await findAvailableApiBase();

    // 1. Session déjà valide : on entre directement
    const reprise = await resumeSession(base);
    if (reprise === "ok") {
      if (!silencieux) showToast(t("js.connecteAuBot"));
      return;
    }

    // 2. API injoignable : diagnostic précis, jamais un message vague
    if (!base) {
      showDashboardStage("auth");
      renderAuthStatus();
      if (!silencieux) {
        showToast(getConfiguredModbotApiBase()
          ? t("js.botNeRepondPas")
          : t("js.botIntrouvable"));
      }
      return;
    }

    // 3. OAuth incomplet côté bot : rediriger vers Discord échouerait
    if (lastApiHealth && !lastApiHealth.oauth_configured) {
      showDashboardStage("auth");
      renderAuthStatus();
      if (!silencieux) {
        showToast(t("js.oauthIncompletCourt"));
      }
      return;
    }

    // 4. Session expirée pendant l'usage : on relance Discord sans rien demander
    if (reprise === "expired") {
      showToast(t("js.sessionExpireeReconnexion"));
      redirectToDiscordLogin(base);
      return;
    }

    redirectToDiscordLogin(base);
  }

  /**
   * Reprise automatique au chargement de la page : aucun clic nécessaire si
   * l'utilisateur s'est déjà connecté une fois depuis ce navigateur.
   */
  async function autoConnect() {
    showDashboardStage("auth");
    renderAuthStatus({ level: "pending", message: t("js.rechercheDuBot") });

    const base = await findAvailableApiBase();
    if (!base) {
      renderAuthStatus();
      return;
    }

    if (await resumeSession(base) === "ok") {
      showToast(t("js.reconnecteAuto"));
      return;
    }

    // Reconnexion silencieuse : seulement si une connexion a déjà réussi ici,
    // et une seule fois par onglet pour ne jamais créer de boucle.
    const dejaConnecte = localStorage.getItem("modbot-has-logged-in") === "1";
    const dejaRedirige = sessionStorage.getItem("modbot-login-redirected") === "1";
    if (dejaConnecte && !dejaRedirige && lastApiHealth?.oauth_configured) {
      redirectToDiscordLogin(base);
      return;
    }

    renderAuthStatus();
    if (lastApiHealth?.oauth_configured) {
      showToast(t("js.connecteToiPourVoir"));
    }
  }

  /** Champ « URL de l'API » de l'écran de connexion. */
  function initApiUrlControls() {
    const input = document.querySelector("[data-api-url-input]");
    const saveBtn = document.querySelector("[data-api-url-save]");
    const clearBtn = document.querySelector("[data-api-url-clear]");
    const advanced = document.querySelector("[data-auth-advanced]");
    if (!input) return;

    advanced?.addEventListener("toggle", () => {
      advanced.dataset.userToggled = "1";
    });

    input.value = localStorage.getItem("modbot-api-url") || getConfiguredModbotApiBase() || "";

    const applyUrl = async () => {
      const value = input.value.trim();
      if (!value) {
        showToast(t("js.indiqueAdressePublique"));
        return;
      }
      // `normalizeApiBase` ne garde que l'origine et refuse ce qui n'est
      // ni http ni https : un lien du tableau de bord de l'hebergeur, avec
      // son chemin et sa requete, ne peut plus etre enregistre tel quel.
      const clean = normalizeApiBase(value);
      if (!clean) {
        renderAuthStatus({ level: "error", message: t("js.indiqueAdressePublique") });
        showToast(t("js.indiqueAdressePublique"));
        return;
      }
      input.value = clean;
      renderAuthStatus({ level: "pending", message: t("js.testApiEnCours") });
      const health = await probeApiBase(clean);
      if (!health) {
        renderAuthStatus({
          level: "error",
          message: tp("js.aucuneApiRepondu", { url: `${clean}/api/health` })
        });
        showToast(t("js.apiIntrouvableAdresse"));
        return;
      }
      setModbotApiBase(clean);
      lastApiHealth = health;
      apiDiscovery = null; // force une nouvelle découverte avec cette base
      renderAuthStatus();
      showToast(t("js.botTrouveConnexion"));
      dashboardLogin();
    };

    saveBtn?.addEventListener("click", applyUrl);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        applyUrl();
      }
    });
    clearBtn?.addEventListener("click", () => {
      setModbotApiBase("");
      forgetAutoApiBase();
      input.value = "";
      lastApiHealth = null;
      apiDiscovery = null;
      renderAuthStatus();
      showToast(t("js.adresseReinitialisee"));
      findAvailableApiBase();
    });
  }

  function applyDashboardConfig(config) {
    rubriquesEnEchec = [];
    if (!config) return rubriquesEnEchec;

    // Le premium D'ABORD. Il etait applique au milieu de cette fonction,
    // apres les tickets, les images et les relais : la moindre erreur
    // dans l'un d'eux — un champ absent, une image illisible — et le
    // serveur passait pour non premium, verrous compris. Ce qui coute
    // de l'argent se pose avant ce qui ne fait que s'afficher.
    appliquerPremium(config.premium);

    const tickets = config.tickets || {};
    const channels = config.channels || {};
    const welcome = config.welcome_system || config.welcome || {};
    const security = config.security || {};

    sansCasser("tickets", () => {
    const previewAuthor = document.querySelector("[data-preview-author]");
    const previewTitle = document.querySelector("[data-preview-title]");
    const previewEmoji = document.querySelector("[data-preview-emoji]");
    const previewDesc = document.querySelector("[data-preview-desc]");
    const ticketChannel = document.querySelector("[data-ticket-channel]");    const ticketSupportRole = document.querySelector("[data-ticket-support-role]");
    if (previewAuthor && tickets.author) previewAuthor.value = tickets.author;
    if (previewTitle && tickets.title) previewTitle.value = tickets.title;
    if (previewEmoji && tickets.emoji) previewEmoji.value = tickets.emoji;
    if (previewDesc && tickets.description) previewDesc.value = tickets.description;
    if (ticketChannel && channels.tickets) ticketChannel.value = channels.tickets;
    setImagePicker("ticket-banner", tickets.banner || "");
    setImagePicker("ticket-logo", tickets.logo || "");
    if (ticketSupportRole && tickets.support_role) {
      if (![...ticketSupportRole.options].some((option) => option.value === String(tickets.support_role))) {
        ticketSupportRole.insertAdjacentHTML("beforeend", `<option value="${escapeHtml(tickets.support_role)}">${escapeHtml(tickets.support_role)}</option>`);
      }
      ticketSupportRole.value = String(tickets.support_role);
    }

    const optionList = document.getElementById("ticketOptionList");
    if (optionList && Array.isArray(tickets.options) && tickets.options.length) {
      optionList.innerHTML = tickets.options.map((option, index) => `
        ${ligneOptionTicket(index + 1, option)}
      `).join("");
    }
    });

    // Chaque salon est retrouve par sa clef, plus par son rang dans le
    // panneau : inserer une ligne ne deplace plus les reglages suivants.
    sansCasser("salons", () => {
      ["tickets", "logs", "suggestions", "reports", "staff_alert"].forEach((clef) => {
        const champ = document.querySelector(`[data-channel="${clef}"]`);
        if (!champ) return;
        champ.dataset.attendu = channels[clef] || "";
        remplirSelect(champ, optionsSalons, t("js.aucun"));
        champ.value = channels[clef] || "";
        setInputState(champ);
      });
    });

    sansCasser("interrupteurs de securite", () => {
    const securityToggles = document.querySelectorAll("[data-dashboard-panel='security'] .toggle-line input");
    [
      security.antilink,
      security.insultes_enabled ?? true,
      security.antispam,
      security.antiraid,
      security.staff_alert,
      security.lockdown
    ].forEach((value, index) => {
      if (typeof value === "boolean" && securityToggles[index]) {
        securityToggles[index].checked = value;
        securityToggles[index].closest(".toggle-line")?.classList.toggle("is-on", value);
      }
    });
    });


    // La bienvenue etait posee DEUX fois : ici, et par applyWelcomeState()
    // en fin de fonction. Ce doublon-ci lisait `departureMessage`,
    // `welcomeBg` et `welcomeFont` — trois variables declarees nulle
    // part, et aucun element ne portait ces identifiants. Lire une
    // variable qui n'existe pas leve un ReferenceError : la fonction
    // s'arretait LA, a chaque chargement, sur chaque serveur, et rien
    // de ce qui suit n'a jamais tourne.
    //
    // Il visait en plus ses interrupteurs par leur RANG dans le
    // panneau, et lisait `welcome.color` la ou le bot ecrit
    // `embed_color`. applyWelcomeState() fait tout cela correctement,
    // champ par champ, sous le nom de chacun.

    sansCasser("pays et langue", () => {
      const champPays = document.querySelector("[data-guild-country]");
      if (champPays) {
        remplirSelecteurPays();
        champPays.value = String(config.country || "").toUpperCase();
      }
      const languageSelect = document.querySelector("[data-bot-language]");
      if (languageSelect) {
        // Le code de langue du bot, tel quel : fr, en, es, de, ar. Une
        // langue que le site ne propose pas retombe sur le francais — ce
        // que fait aussi le bot.
        const code = String(config.language || "fr");
        languageSelect.value = [...languageSelect.options].some((o) => o.value === code) ? code : "fr";
      }
    });


    sansCasser("compteurs", () => applyCompteurs(config.compteurs));

    sansCasser("messages recurrents", () => {
    if (Array.isArray(config.recurring_messages)) {
      const recurringList = document.querySelector("[data-recurring-list]");
      if (recurringList) {
        recurringList.innerHTML = "";
        if (!config.recurring_messages.length) {
          const empty = document.createElement("div");
          empty.className = "recurring-empty";
          empty.textContent = t("js.aucunMessageRecurrent");
          recurringList.append(empty);
        }
        config.recurring_messages.forEach((message) => {
          const item = document.createElement("div");
          item.className = "recurring-item";
          item.dataset.name = message.name || t("js.messageRecurrent");
          item.dataset.channel = message.channel_id || "";
          item.dataset.interval = message.interval || "30";
          item.dataset.unit = message.unit || "minutes";
          item.dataset.content = message.content || "";
          item.dataset.mode = message.mode || "repeat";
          item.dataset.lastSent = message.last_sent || "";
          item.innerHTML = `
            <span>
              <strong>${escapeHtml(item.dataset.name)}</strong>
              <small>${escapeHtml(tp("js.rec.resume", { interval: item.dataset.interval, unite: item.dataset.unit, salon: nomDuSalon(item.dataset.channel) }))}</small>
            </span>
            <button class="secondary-btn compact" type="button" data-recurring-remove>Supprimer</button>
          `;
          recurringList.append(item);
        });
      }
    }
    });

    sansCasser("roles-reactions", () => {
    if (Array.isArray(config.reaction_roles)) {
      const reactionTitle = document.querySelector("[data-reaction-title]");
      const reactionDescription = document.querySelector("[data-reaction-description]");
      if (reactionTitle && config.reaction_title) reactionTitle.value = config.reaction_title;
      if (reactionDescription && config.reaction_description) reactionDescription.value = config.reaction_description;
      const reactionRoleList = document.querySelector("[data-reaction-role-list]");
      if (reactionRoleList) {
        reactionRoleList.innerHTML = config.reaction_roles
          .map((role, index) => ligneReactionRole(index + 1, role))
          .join("") || ligneReactionRole(1);
      }
      const reactionChannel = document.querySelector("[data-reaction-channel]");
      const reactionMode = document.querySelector("[data-reaction-mode]");
      if (reactionChannel && config.reaction_roles_channel_id) {
        // Memorise le choix : si les ressources arrivent apres, le select
        // est reconstruit et retomberait sinon sur sa premiere option.
        reactionChannel.dataset.attendu = config.reaction_roles_channel_id;
        remplirSelect(reactionChannel, optionsSalons, t("js.aucun"));
        reactionChannel.value = config.reaction_roles_channel_id;
      }
      if (reactionMode && config.reaction_roles_mode) reactionMode.value = config.reaction_roles_mode;
    }
    });

    sansCasser("roles automatiques", () => applyAutoRoles(config.auto_roles));
    sansCasser("assistant IA", () => applyAiState(config.ai));
    sansCasser("vocaux", () => applyVoiceState(config.voice));
    sansCasser("evenements", () => applyEventsState(config.events));

    sansCasser("relais reseaux", () => {
    if (Array.isArray(config.social_relays)) {
      config.social_relays.forEach((relay) => {
        const card = [...document.querySelectorAll(".social-card")].find((item) => item.dataset.socialPlatform === relay.platform);
        if (!card) return;
        const link = card.querySelector("[data-social-link]");
        const channel = card.querySelector("[data-social-channel]");
        const enabled = card.querySelector("[data-social-enabled]");
        const state = card.querySelector("[data-social-state]");
        if (link) link.value = relay.link || "";
        if (channel) {
          channel.dataset.attendu = relay.channel_id || "";
          remplirSelect(channel, optionsSalons, t("js.aucun"));
          channel.value = relay.channel_id || "";
        }
        if (enabled) enabled.checked = Boolean(relay.enabled);
        // Les rôles à prévenir : relus tels que le bot les a gardés.
        poserRolesDeLaCarte(card, relay.ping_roles || []);
        const everyone = card.querySelector("[data-social-everyone]");
        if (everyone) everyone.checked = Boolean(relay.ping_everyone);
        const message = card.querySelector("[data-social-message]");
        if (message) message.value = relay.message || "";
        if (state) {
          state.classList.toggle("active", Boolean(relay.enabled));
          state.classList.toggle("inactive", !relay.enabled);
          state.textContent = t(relay.enabled ? "js.actif" : "js.inactif");
        }
      });
    }
    });

    sansCasser("apercu du ticket", () => {
    const liveTitle = document.querySelector("[data-live-title]");
    const liveDescription = document.querySelector("[data-live-desc]");
    const liveTicketEmoji = document.querySelector("[data-live-ticket-emoji]");
    if (liveTitle) liveTitle.textContent = tickets.title || t("dash.ouvreTonTicket");
    if (liveDescription) liveDescription.textContent = tickets.description || t("js.merciDeSelectionner");
    if (liveTicketEmoji) liveTicketEmoji.textContent = tickets.emoji || "";
    });

    sansCasser("moderation", () => renderModerationConfig(config));
    sansCasser("statistiques", () => renderDashboardStats(config));
    sansCasser("etat des salons", () => {
      document.querySelectorAll("[data-dashboard-panel='channels'] [data-channel]")
        .forEach(setInputState);
    });
    sansCasser("bienvenue", () => applyWelcomeState(welcome));
    sansCasser("apercu des roles", () => renderReactionPreview());
    return rubriquesEnEchec;
  }

  /**
   * Execute une section d'affichage sans laisser son echec emporter les
   * autres.
   *
   * Le dashboard applique une douzaine de sections a la suite. Une seule
   * exception — un champ absent, une image illisible, une liste qui
   * n'en est pas une — et tout ce qui suivait restait a l'etat
   * precedent, sans que rien ne le dise. L'erreur part dans la console
   * avec le nom de la section : c'est ce qu'on veut lire quand on
   * cherche pourquoi une rubrique ne se remplit pas.
   */
  let rubriquesEnEchec = [];

  function sansCasser(nom, action) {
    try {
      action();
      return true;
    } catch (erreur) {
      console.error(`Dashboard — section « ${nom} » :`, erreur);
      // Retenue pour etre NOMMEE a l'ecran. « Une rubrique n'a pas pu
      // s'afficher » obligeait a ouvrir la console pour savoir
      // laquelle ; peu de gens le font, et c'est justement le moment ou
      // l'on a besoin de le savoir.
      if (!rubriquesEnEchec.includes(nom)) rubriquesEnEchec.push(nom);
      return false;
    }
  }

  async function loadSelectedGuildConfig(guildId) {
    chargementServeur += 1;
    try {
      await chargerConfigDuServeur(guildId);
    } finally {
      chargementServeur -= 1;
    }
  }

  async function chargerConfigDuServeur(guildId) {
    // Les ressources et la configuration sont deux appels distincts :
    // l'echec de l'un ne doit pas emporter l'autre. Ils etaient dans le
    // meme `try`, et une liste de salons qui n'arrivait pas — un 429 au
    // moment ou l'on change de serveur, par exemple — empechait la
    // configuration d'etre appliquee. Le premium avec : le dashboard
    // annoncait alors « Reserve a ModBot Premium » sur un serveur qui
    // l'avait bel et bien.
    try {
      await loadDashboardResources(guildId);
    } catch (erreur) {
      showToast(t("js.ressourcesIndisponibles"));
    }

    let configChargee = false;
    let recue = null;
    let panne = null;
    try {
      const data = await modbotApiFetch(`/api/guilds/${guildId}/config`, { cache: "no-store" });
      if (!estEncoreLeServeur(guildId)) return;
      recue = data?.config || null;
      if (recue) derniereConfigEnregistree = JSON.stringify(recue);
    } catch (error) {
      // Ce message annoncait une panne de connexion pour TOUTE erreur :
      // un 403, un 429, un 500 du bot, tout se lisait « bot pas
      // connecte ». On cherchait donc la panne au mauvais endroit, et
      // la vraie raison — que le bot avait pourtant envoyee — etait
      // jetee. Elle est desormais affichee, et journalisee.
      if (!estEncoreLeServeur(guildId)) return;
      panne = error;
      console.error(`Configuration du serveur ${guildId} :`, error);
      const raison = String(error?.message || "").trim();
      showToast(raison ? tp("js.configEchec", { raison }) : t("js.configLocale"));
    }

    if (recue) {
      // La reponse est arrivee. Si l'affichage echoue, ce n'est PAS une
      // panne du bot — le dire ainsi envoyait chercher au mauvais
      // endroit, et faisait passer un serveur premium pour gratuit.
      try {
        const echecs = applyDashboardConfig(recue) || [];
        configChargee = true;
        // Une section peut echouer sans emporter les autres : on le dit,
        // en la nommant, plutot que de laisser croire que tout est en
        // place.
        showToast(echecs.length
          ? tp("js.configRubriquesEchec", { rubriques: echecs.join(", ") })
          : t("js.configChargee"));
      } catch (erreur) {
        console.error("Affichage de la configuration :", erreur);
        showToast(t("js.configAffichageErreur"));
        // Le premium, lui, ne depend d'aucun affichage : on le pose.
        if (recue.premium) {
          appliquerPremium(recue.premium);
          configChargee = true;
        }
      }
    }

    // La configuration n'a pas pu etre lue : on demande au moins l'etat
    // premium, qui est un appel bien plus leger. Mieux vaut un verrou
    // juste qu'un verrou devine — dans un sens comme dans l'autre.
    if (!configChargee) {
      try {
        const etat = await modbotApiFetch(`/api/guilds/${guildId}/premium`,
                                          { cache: "no-store" });
        if (!estEncoreLeServeur(guildId)) return;
        if (etat?.premium) appliquerPremium(etat.premium);
      } catch (erreur) {
        // Injoignable des deux cotes : on ne touche a rien plutot que
        // d'affirmer une perte de premium qu'on ne sait pas.
      }
    }
    // Les modules sécurité / logs / sauvegardes ont leurs propres endpoints :
    // on les charge en parallèle sans bloquer l'affichage de la configuration.
    Promise.allSettled([
      loadGuildSecurity(guildId),
      loadGuildLogs(guildId),
      loadGuildBackups(guildId),
      loadGiveaways()
    ]);
    // L'assistant repart de zéro : son contexte parlait de l'autre serveur.
    aiHistory = [];
    const salonsAi = document.querySelector("[data-ai-messages]");
    if (salonsAi) salonsAi.innerHTML = "";
  }

  /* ══════════════════════════════════════════════════════════════════
     SÉLECTEURS D'IMAGE (bannière et logo du ticket)
     L'image choisie sur l'appareil est lue en base64 ; le bot l'héberge
     ensuite sur Discord et ne conserve que l'URL définitive.
     ══════════════════════════════════════════════════════════════════ */

  const TAILLE_IMAGE_MAX = 8 * 1024 * 1024; // 8 Mo, marge sous la limite Discord
  const TYPES_IMAGE = ["image/png", "image/jpeg", "image/gif", "image/webp"];

  /** Champ caché qui porte la valeur envoyée à l'API, par sélecteur. */
  function champCache(picker) {
    return picker.querySelector("[data-ticket-banner], [data-ticket-logo]");
  }

  /**
   * Répercute l'image sur l'aperçu Discord, pour voir immédiatement le
   * rendu final sans avoir à enregistrer ni ouvrir Discord.
   */
  function majApercuDiscord(nom, valeur) {
    const cibles = {
      "ticket-banner": { sel: "[data-live-banner]", defaut: "assets/default_banner.svg" },
      "ticket-logo": { sel: "[data-live-logo]", defaut: "assets/default_logo.svg" }
    };
    const cible = cibles[nom];
    if (!cible) return;
    const img = document.querySelector(cible.sel);
    if (!img) return;
    img.src = valeur || cible.defaut;
    img.style.display = "";
    img.onerror = () => { img.src = cible.defaut; };
  }

  /** Met à jour l'aperçu et l'état des boutons d'un sélecteur. */
  function rafraichirApercu(picker, valeur) {
    majApercuDiscord(picker.dataset.imagePicker, valeur);
    const apercu = picker.querySelector("[data-image-preview]");
    const effacer = picker.querySelector("[data-image-clear]");
    if (!apercu) return;

    if (valeur) {
      apercu.innerHTML = `<img src="${escapeHtml(valeur)}" alt="">`;
      apercu.classList.add("has-image");
      // Une image cassée ne doit pas laisser un cadre vide et muet
      apercu.querySelector("img").addEventListener("error", () => {
        apercu.innerHTML = `<span class="image-picker-empty">Image inaccessible</span>`;
        apercu.classList.remove("has-image");
      });
    } else {
      const parDefaut = picker.dataset.imagePicker === "ticket-logo"
        ? t("dash.logoDuServeur") : t("dash.aucuneImage");
      apercu.innerHTML = `<span class="image-picker-empty">${parDefaut}</span>`;
      apercu.classList.remove("has-image");
    }
    if (effacer) effacer.hidden = !valeur;
  }

  /** Applique une valeur (URL ou data URI) à un sélecteur donné. */
  function setImagePicker(nom, valeur) {
    const picker = document.querySelector(`[data-image-picker="${nom}"]`);
    if (!picker) return;
    const champ = champCache(picker);
    if (champ) champ.value = valeur || "";
    const champUrl = picker.querySelector("[data-image-url]");
    if (champUrl) champUrl.value = /^https?:\/\//i.test(valeur || "") ? valeur : "";
    rafraichirApercu(picker, valeur);
  }

  function initImagePickers() {
    document.querySelectorAll("[data-image-picker]").forEach((picker) => {
      const fichier = picker.querySelector("[data-image-file]");
      const champ = champCache(picker);
      const champUrl = picker.querySelector("[data-image-url]");

      picker.querySelector("[data-image-choose]")?.addEventListener("click", () => fichier?.click());

      fichier?.addEventListener("change", () => {
        const image = fichier.files?.[0];
        if (!image) return;

        if (!TYPES_IMAGE.includes(image.type)) {
          showToast(t("js.formatNonAccepte"));
          fichier.value = "";
          return;
        }
        if (image.size > TAILLE_IMAGE_MAX) {
          const mo = (image.size / 1024 / 1024).toFixed(1);
          showToast(`Image trop lourde (${mo} Mo) — 8 Mo maximum`);
          fichier.value = "";
          return;
        }

        const lecteur = new FileReader();
        lecteur.onload = () => {
          if (champ) champ.value = String(lecteur.result || "");
          if (champUrl) champUrl.value = "";
          rafraichirApercu(picker, String(lecteur.result || ""));
          markPanelDirty("tickets");
          showToast(t("js.imagePrete"));
        };
        lecteur.onerror = () => showToast(t("js.lectureImageImpossible"));
        lecteur.readAsDataURL(image);
        fichier.value = ""; // permet de rechoisir le même fichier
      });

      picker.querySelector("[data-image-clear]")?.addEventListener("click", () => {
        if (champ) champ.value = "";
        if (champUrl) champUrl.value = "";
        rafraichirApercu(picker, "");
        markPanelDirty("tickets");
        showToast(t("js.imageRetiree"));
      });

      champUrl?.addEventListener("input", () => {
        const valeur = champUrl.value.trim();
        if (champ) champ.value = valeur;
        rafraichirApercu(picker, valeur);
        markPanelDirty("tickets");
      });
    });
  }

  initImagePickers();

  /* ══════════════════════════════════════════════════════════════════
     SÉLECTEUR DE SERVEUR — menu déroulant animé
     ══════════════════════════════════════════════════════════════════ */

  const switcher = document.querySelector("[data-server-switcher]");
  const switcherTrigger = document.querySelector("[data-server-switcher-trigger]");
  const switcherMenu = document.querySelector("[data-server-switcher-menu]");
  const switcherList = document.querySelector("[data-server-switcher-list]");
  const switcherSearch = document.querySelector("[data-server-switcher-search]");
  let switcherOpen = false;

  function renderSwitcherList(filtre = "") {
    if (!switcherList) return;
    const terme = filtre.trim().toLowerCase();
    const visibles = dashboardGuilds.filter(
      (g) => !terme || g.name.toLowerCase().includes(terme)
    );

    if (!dashboardGuilds.length) {
      switcherList.innerHTML = `<p class="server-switcher-empty">${escapeHtml(t("js.aucunServeurCharge"))}</p>`;
      return;
    }
    if (!visibles.length) {
      switcherList.innerHTML = `<p class="server-switcher-empty">${escapeHtml(tp("js.aucunResultatPour", { terme: filtre }))}</p>`;
      return;
    }

    switcherList.innerHTML = visibles
      .map((guild, index) => {
        const actif = guild.id === selectedServer.id;
        const statut = guild.installed
          ? `${guild.member_count ? tp("js.membresPluriel", { n: guild.member_count.toLocaleString(localeAffichage()) }) : t("js.modbotInstalle")}`
          : t("js.modbotNonInstalle");
        return `
      <button class="server-switcher-item${actif ? " is-current" : ""}${guild.installed ? "" : " is-uninstalled"}"
              type="button" role="option" aria-selected="${actif}"
              style="--i:${index}"
              data-switcher-guild="${escapeHtml(guild.id)}"
              data-server-name="${escapeHtml(guild.name)}"
              data-server-logo="${escapeHtml(guild.logo || modbotDefaultLogo)}"
              data-server-initials="${escapeHtml(guild.initials || "MB")}"
              data-server-installed="${guild.installed ? "true" : "false"}">
        <span class="server-logo-shell" data-initials="${escapeHtml(guild.initials || "MB")}">
          <img src="${escapeHtml(guild.logo || modbotDefaultLogo)}" alt="" data-logo-img>
        </span>
        <span class="server-switcher-item-text">
          <strong>${escapeHtml(guild.name)}</strong>
          <small>${escapeHtml(statut)}</small>
        </span>
        ${actif ? '<span class="server-switcher-check" aria-hidden="true"></span>' : ""}
      </button>`;
      })
      .join("");
    setupLogoFallbacks();
  }

  function openSwitcher() {
    if (!switcher || !switcherMenu || switcherOpen) return;
    switcherOpen = true;
    renderSwitcherList(switcherSearch?.value || "");
    switcherMenu.hidden = false;
    // Force le calcul du style pour que la transition parte de l'état fermé.
    // Un requestAnimationFrame ne conviendrait pas : il ne se déclenche pas
    // quand l'onglet est en arrière-plan, le menu resterait invisible.
    void switcherMenu.offsetHeight;
    switcher.classList.add("is-open");
    switcherTrigger?.setAttribute("aria-expanded", "true");
    setTimeout(() => switcherSearch?.focus(), 120);
  }

  function closeSwitcher() {
    if (!switcher || !switcherMenu || !switcherOpen) return;
    switcherOpen = false;
    switcher.classList.remove("is-open");
    switcherTrigger?.setAttribute("aria-expanded", "false");
    // Attend la fin de la transition de sortie avant de retirer du flux
    setTimeout(() => {
      if (!switcherOpen) switcherMenu.hidden = true;
    }, 180);
  }

  function toggleSwitcher() {
    switcherOpen ? closeSwitcher() : openSwitcher();
  }

  /** Déplace le focus dans la liste au clavier. */
  function moveSwitcherFocus(direction) {
    const items = [...switcherList.querySelectorAll(".server-switcher-item")];
    if (!items.length) return;
    const actuel = items.indexOf(document.activeElement);
    const suivant = actuel === -1
      ? (direction > 0 ? 0 : items.length - 1)
      : (actuel + direction + items.length) % items.length;
    items[suivant].focus();
  }

  switcherTrigger?.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleSwitcher();
  });

  switcherSearch?.addEventListener("input", () => renderSwitcherList(switcherSearch.value));

  switcherList?.addEventListener("click", (event) => {
    const item = event.target.closest("[data-switcher-guild]");
    if (!item) return;
    closeSwitcher();
    // Changer de serveur emportait les modifications non enregistrees
    // sans rien demander, alors que changer de rubrique, lui, prevenait.
    // C'est pourtant le changement le plus couteux des deux.
    runWithUnsavedGuard(() => selectGuildFromElement(item));
  });

  switcher?.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSwitcher();
      switcherTrigger?.focus();
      return;
    }
    if (!switcherOpen) return;
    if (event.key === "ArrowDown") { event.preventDefault(); moveSwitcherFocus(1); }
    if (event.key === "ArrowUp") { event.preventDefault(); moveSwitcherFocus(-1); }
  });

  // Un clic hors du menu le referme
  document.addEventListener("click", (event) => {
    if (switcherOpen && switcher && !switcher.contains(event.target)) closeSwitcher();
  });

  /* ══════════════════════════════════════════════════════════════════
     SÉCURITÉ — anti-raid, anti-nuke, échelle de sanctions
     ══════════════════════════════════════════════════════════════════ */

  const DEFAULT_SANCTION_LADDER = [
    { threshold: 1, action: "warn", minutes: 0, fr: "Avertissement" },
    { threshold: 2, action: "mute", minutes: 60, fr: "Mute 1 heure" },
    { threshold: 3, action: "mute", minutes: 720, fr: "Mute 12 heures" },
    { threshold: 4, action: "kick", minutes: 0, fr: "Expulsion" },
    { threshold: 5, action: "ban", minutes: 0, fr: "Bannissement" }
  ];
  const SANCTION_ACTION_LABELS = {
    warn: "Avertissement",
    mute: "Mute",
    kick: "Expulsion",
    ban: "Bannissement"
  };
  const PERMISSION_LABELS = {
    view_audit_log: t("js.permVoirAudit"),
    ban_members: t("js.permBannir"),
    kick_members: t("js.permExpulser"),
    manage_roles: t("js.permGererRoles"),
    manage_channels: t("js.permGererSalons"),
    moderate_members: "Exclure temporairement (timeout)",
    manage_guild: t("js.permGererServeur")
  };

  let securityState = null;
  let sanctionLadder = DEFAULT_SANCTION_LADDER.map((step) => ({ ...step }));

  const idListToText = (list) => (Array.isArray(list) ? list.join(", ") : "");
  const textToIdList = (text) =>
    String(text || "")
      .split(/[\s,;]+/)
      .map((value) => value.trim())
      .filter((value) => /^\d{5,25}$/.test(value));
  const linesToList = (text) =>
    String(text || "")
      .split(/[\n,]/)
      .map((value) => value.trim())
      .filter(Boolean);

  function setChecked(selector, value) {
    const el = document.querySelector(selector);
    if (!el) return;
    el.checked = Boolean(value);
    el.closest(".toggle-line")?.classList.toggle("is-on", Boolean(value));
  }
  function setValue(selector, value) {
    const el = document.querySelector(selector);
    if (el && value !== undefined && value !== null) el.value = value;
  }
  const readChecked = (selector) => Boolean(document.querySelector(selector)?.checked);
  const readValue = (selector) => document.querySelector(selector)?.value ?? "";
  const readNumber = (selector, fallback) => {
    const value = Number(document.querySelector(selector)?.value);
    return Number.isFinite(value) ? value : fallback;
  };

  function renderSanctionLadder() {
    const host = document.querySelector("[data-sanction-ladder]");
    if (!host) return;
    host.innerHTML = sanctionLadder
      .map(
        (step, index) => `
      <div class="sanction-step" data-sanction-index="${index}">
        <span class="sanction-rank">${index + 1}</span>
        <label class="mini-form">Points
          <input type="number" min="1" max="99" value="${Number(step.threshold) || 1}" data-sanction-threshold>
        </label>
        <label class="mini-form">Sanction
          <select data-sanction-action>
            ${Object.entries(SANCTION_ACTION_LABELS)
              .map(([value, label]) =>
                `<option value="${value}"${step.action === value ? " selected" : ""}>${label}</option>`)
              .join("")}
          </select>
        </label>
        <label class="mini-form">Durée (minutes)
          <input type="number" min="0" max="40320" value="${Number(step.minutes) || 0}"
                 data-sanction-minutes${step.action === "mute" ? "" : " disabled"}>
        </label>
      </div>`
      )
      .join("");

    host.querySelectorAll("[data-sanction-index]").forEach((row) => {
      const index = Number(row.dataset.sanctionIndex);
      const actionSelect = row.querySelector("[data-sanction-action]");
      const minutesInput = row.querySelector("[data-sanction-minutes]");
      row.querySelector("[data-sanction-threshold]")?.addEventListener("input", (event) => {
        sanctionLadder[index].threshold = Math.max(1, Number(event.target.value) || 1);
        markPanelDirty("security");
      });
      actionSelect?.addEventListener("change", (event) => {
        sanctionLadder[index].action = event.target.value;
        if (minutesInput) minutesInput.disabled = event.target.value !== "mute";
        markPanelDirty("security");
      });
      minutesInput?.addEventListener("input", (event) => {
        sanctionLadder[index].minutes = Math.max(0, Number(event.target.value) || 0);
        markPanelDirty("security");
      });
    });
  }

  function renderSecurityPermissions(permissions) {
    const box = document.querySelector("[data-security-permissions]");
    const list = document.querySelector("[data-security-permissions-list]");
    if (!box || !list) return;
    const missing = Object.entries(permissions || {})
      .filter(([, granted]) => !granted)
      .map(([name]) => PERMISSION_LABELS[name] || name);
    box.hidden = missing.length === 0;
    list.innerHTML = missing.map((label) => `<li>${escapeHtml(label)}</li>`).join("");
  }

  function applySecurityState(security) {
    if (!security) return;
    securityState = security;
    const raid = security.antiraid || {};
    const nuke = security.antinuke || {};
    const filter = security.filter || {};
    const autoBackup = security.auto_backup || {};

    setChecked("[data-antiraid-enabled]", raid.enabled);
    setValue("[data-antiraid-threshold]", raid.join_threshold);
    setValue("[data-antiraid-window]", raid.join_window);
    setValue("[data-antiraid-age]", raid.min_account_age_days);
    setValue("[data-antiraid-action]", raid.action);
    setValue("[data-antiraid-release]", raid.auto_release_minutes);
    setChecked("[data-antiraid-quarantine]", raid.quarantine_new);

    setChecked("[data-antinuke-enabled]", nuke.enabled);
    setValue("[data-antinuke-punishment]", nuke.punishment);
    setChecked("[data-antinuke-restore]", nuke.auto_restore);
    setChecked("[data-antinuke-trustowner]", nuke.trust_owner);
    setValue("[data-antinuke-users]", idListToText(nuke.whitelist_users));
    setValue("[data-antinuke-roles]", idListToText(nuke.whitelist_roles));

    setChecked("[data-security-insultes]", filter.enabled);
    setChecked("[data-filter-tolerant]", filter.tolerant);
    setValue("[data-filter-custom-words]", (filter.custom_words || []).join("\n"));
    setValue("[data-filter-allowlist]", (filter.allowlist || []).join("\n"));

    sanctionLadder = Array.isArray(filter.ladder) && filter.ladder.length
      ? filter.ladder.map((step) => ({ ...step }))
      : DEFAULT_SANCTION_LADDER.map((step) => ({ ...step }));
    renderSanctionLadder();

    setChecked("[data-autobackup-enabled]", autoBackup.enabled);
    setValue("[data-autobackup-interval]", autoBackup.interval_hours);
    const lastEl = document.querySelector("[data-autobackup-last]");
    if (lastEl) lastEl.textContent = autoBackup.last ? formatIsoDateTimeFr(autoBackup.last) : t("js.jamais");

    const captcha = security.captcha || {};
    setChecked("[data-captcha-enabled]", captcha.enabled);
    setValue("[data-captcha-role]", captcha.role_id || "");
    setValue("[data-captcha-channel]", captcha.channel_id || "");
    const captchaEtat = document.querySelector("[data-captcha-state]");
    if (captchaEtat) {
      if (!captcha.enabled) {
        captchaEtat.textContent = t("js.inactifSimple");
      } else if (!captcha.role_id) {
        captchaEtat.textContent = t("js.actifSansRole");
      } else {
        const mode = t(captcha.image ? "js.modeImage" : "js.modeTexte");
        captchaEtat.textContent = tp("js.actifEnAttente", { mode, n: captcha.pending || 0 });
      }
    }

    const alerts = security.alerts || {};
    setChecked("[data-alerts-dm]", alerts.dm_admins !== false);
    const adminsEl = document.querySelector("[data-alerts-admins]");
    if (adminsEl) adminsEl.textContent = String(alerts.admins_reachable ?? "—");
    const activesEl = document.querySelector("[data-alerts-active]");
    if (activesEl) {
      activesEl.textContent = alerts.active ? `${alerts.active}` : t("js.aucuneAlerte");
    }

    const safeBadge = document.querySelector("[data-safe-mode-badge]");
    if (safeBadge) safeBadge.hidden = !security.safe_mode_active;

    renderSecurityPermissions(security.permissions);
    renderLogToggles(security.logs_enabled || {});
  }

  /**
   * Alimente la Vue globale avec l'état réel du serveur : protections
   * actives, sauvegardes, volume de journal. Aucune donnée décorative.
   */
  function renderOverview() {
    const txt = (sel, valeur) => {
      const el = document.querySelector(sel);
      if (el) el.textContent = valeur;
    };

    const s = securityState;
    if (s) {
      const protections = [
        [t("js.protAntiRaid"), s.antiraid?.enabled],
        [t("js.protAntiNuke"), s.antinuke?.enabled],
        [t("js.protFiltreLangage"), s.filter?.enabled],
        [t("js.protRestaurationAuto"), s.antinuke?.auto_restore],
        [t("js.protSauvegardeAuto"), s.auto_backup?.enabled]
      ];
      const actives = protections.filter(([, on]) => on).length;
      txt("[data-overview-security]", `${actives}/${protections.length}`);
      txt("[data-overview-security-detail]",
          t(s.safe_mode_active ? "dash.modeSecuriteActif" : "js.modulesProtectionActifs"));

      const liste = document.querySelector("[data-overview-checklist]");
      if (liste) {
        const manquantes = Object.entries(s.permissions || {})
          .filter(([, ok]) => !ok)
          .map(([nom]) => PERMISSION_LABELS[nom] || nom);
        liste.innerHTML =
          protections
            .map(([nom, on]) => `<li>${on ? "" : ""} ${escapeHtml(nom)}</li>`)
            .join("") +
          (manquantes.length
            ? `<li>${escapeHtml(tp("js.permissionsManquantes", { liste: manquantes.join(", ") }))}</li>`
            : `<li>${escapeHtml(t("js.toutesPermissionsAccordees"))}</li>`);
      }
    }

    const nb = backupList.length;
    txt("[data-overview-backups]", String(nb));
    const derniere = backupList[0]?.created_at;
    txt("[data-overview-backups-detail]",
        derniere ? tp("js.derniereSauvegarde", { date: formatIsoDateTimeFr(derniere) }) : t("js.aucuneSauvegarde"));

    txt("[data-overview-logs]", String(currentLogs.length));
  }

  async function loadGuildSecurity(guildId) {
    if (!guildId) return;
    try {
      const data = await modbotApiFetch(`/api/guilds/${guildId}/security`, { cache: "no-store" });
      if (!estEncoreLeServeur(guildId)) return;
      applySecurityState(data.security);
      renderOverview();
    } catch (error) {
      console.warn("Securite indisponible :", error?.message || error);
    }
  }

  function collectSecurityPayload() {
    return {
      antiraid: {
        enabled: readChecked("[data-antiraid-enabled]"),
        join_threshold: readNumber("[data-antiraid-threshold]", 8),
        join_window: readNumber("[data-antiraid-window]", 10),
        min_account_age_days: readNumber("[data-antiraid-age]", 7),
        action: readValue("[data-antiraid-action]") || "lockdown",
        auto_release_minutes: readNumber("[data-antiraid-release]", 15),
        quarantine_new: readChecked("[data-antiraid-quarantine]")
      },
      antinuke: {
        enabled: readChecked("[data-antinuke-enabled]"),
        punishment: readValue("[data-antinuke-punishment]") || "strip",
        auto_restore: readChecked("[data-antinuke-restore]"),
        trust_owner: readChecked("[data-antinuke-trustowner]"),
        whitelist_users: textToIdList(readValue("[data-antinuke-users]")),
        whitelist_roles: textToIdList(readValue("[data-antinuke-roles]"))
      },
      filter: {
        enabled: readChecked("[data-security-insultes]"),
        tolerant: readChecked("[data-filter-tolerant]"),
        ladder: sanctionLadder,
        custom_words: linesToList(readValue("[data-filter-custom-words]")),
        allowlist: linesToList(readValue("[data-filter-allowlist]"))
      },
      captcha: {
        enabled: readChecked("[data-captcha-enabled]"),
        role_id: readValue("[data-captcha-role]") || "",
        channel_id: readValue("[data-captcha-channel]") || ""
      },
      alerts: {
        dm_admins: readChecked("[data-alerts-dm]")
      },
      auto_backup: {
        enabled: readChecked("[data-autobackup-enabled]"),
        interval_hours: readNumber("[data-autobackup-interval]", 24)
      },
      logs_enabled: collectLogToggles()
    };
  }

  async function saveGuildSecurity() {
    if (serveurEnChargement()) return showToast(t("js.chargementEnCours"));
    const guildId = selectedServer.id;
    if (!guildId) {
      showToast(t("js.selectionneDabord"));
      return;
    }
    try {
      const data = await modbotApiFetch(`/api/guilds/${guildId}/security`, {
        method: "PUT",
        body: JSON.stringify(collectSecurityPayload())
      });
      applySecurityState(data.security);
      clearUnsavedChanges();
      showToast(t("js.securiteEnregistree"));
    } catch (error) {
      showToast(`${error?.message || t("js.enregistrementImpossible")}`);
    }
  }

  /* ══════════════════════════════════════════════════════════════════
     BIENVENUE ET DÉPARTS
     ══════════════════════════════════════════════════════════════════ */

  const WELCOME_VARIABLES = [
    { token: "{user}", label: "js.varMention" },
    { token: "{username}", label: "js.varNomMembre" },
    { token: "{userTag}", label: "js.varTag" },
    { token: "{userId}", label: "js.varId" },
    { token: "{server}", label: "js.varNomServeur" },
    { token: "{memberCount}", label: "js.varNombreMembres" },
    { token: "{owner}", label: "js.varProprietaire" },
    { token: "{accountCreated}", label: "js.varCompteCree" },
    { token: "{accountAge}", label: "js.varCompteAge" },
    { token: "{joinedAt}", label: "js.varArriveLe" },
    { token: "{boostCount}", label: "js.varBoosts" },
    { token: "{channelCount}", label: "js.varSalons" },
    { token: "{roleCount}", label: "js.varRoles" }
  ];

  let welcomeState = {};

  /** Remplace les variables par un exemple, pour l'aperçu. */
  function renderWelcomeTemplate(texte) {
    const serveur = selectedServer.name || t("js.monServeur");
    const membres = Number(selectedServer.member_count || 0) || 1248;
    return String(texte || "")
      .replace(/\{user\}/g, "@Lucas")
      .replace(/\{username\}/g, "Lucas")
      .replace(/\{server\}/g, serveur)
      .replace(/\{memberCount\}/gi, membres.toLocaleString(localeAffichage()))
      .replace(/\{member_count\}/g, membres.toLocaleString(localeAffichage()))
      .replace(/\{tag\}/g, "Lucas#0001");
  }

  function renderWelcomePreview() {
    const embedOn = readChecked("[data-welcome-embed-enabled]");
    const conteneur = document.querySelector("[data-welcome-preview-embed]");
    const titre = document.querySelector("[data-welcome-preview-title]");
    const texte = document.querySelector("[data-welcome-preview-text]");
    const image = document.querySelector("[data-welcome-preview-image]");
    const pied = document.querySelector("[data-welcome-preview-footer]");
    const bouton = document.querySelector("[data-welcome-preview-button]");
    if (!conteneur) return;

    const couleur = readValue("[data-welcome-color]") || "#5865F2";
    conteneur.style.borderLeftColor = couleur;
    conteneur.classList.toggle("is-plain", !embedOn);

    if (titre) {
      titre.textContent = renderWelcomeTemplate(readValue("[data-welcome-title]") || t("dash.bienvenue"));
      titre.hidden = !embedOn;
    }
    if (texte) {
      texte.textContent = renderWelcomeTemplate(readValue("[data-welcome-message]"))
        || t("js.ecrisUnMessage");
    }

    const url = readValue("[data-welcome-image]");
    if (image) {
      // data: compte comme valide : c'est desormais la forme normale d'une
      // image choisie depuis la galerie.
      const valide = /^(https?:\/\/|data:image\/)/.test(url);
      image.hidden = !valide || !embedOn;
      if (valide) image.src = url;
    }
    if (pied) {
      const serveur = selectedServer.name || t("js.monServeur");
      const membres = Number(selectedServer.member_count || 0) || 1248;
      pied.textContent = embedOn
        ? tp("js.piedApercu", { serveur, n: membres.toLocaleString(localeAffichage()) })
        : "";
    }

    const lien = readValue("[data-welcome-button-url]");
    const libelle = readValue("[data-welcome-button-label]");
    if (bouton) {
      const actif = /^https?:\/\//.test(lien);
      bouton.hidden = !actif;
      bouton.textContent = libelle || t("js.enSavoirPlus");
    }
  }

  function renderWelcomeVariables() {
    const host = document.querySelector("[data-welcome-variables]");
    if (!host) return;
    host.innerHTML = WELCOME_VARIABLES.map((v) => (
      `<button type="button" class="variable-chip" data-variable="${escapeHtml(v.token)}"
               title="${escapeHtml(v.label)}">${escapeHtml(v.token)}</button>`
    )).join("");

    host.querySelectorAll("[data-variable]").forEach((chip) => {
      chip.addEventListener("click", () => {
        const zone = document.querySelector("[data-welcome-message]");
        if (!zone) return;
        // Insertion à la position du curseur plutôt qu'à la fin
        const debut = zone.selectionStart ?? zone.value.length;
        const fin = zone.selectionEnd ?? zone.value.length;
        const jeton = chip.dataset.variable;
        zone.value = zone.value.slice(0, debut) + jeton + zone.value.slice(fin);
        zone.focus();
        zone.setSelectionRange(debut + jeton.length, debut + jeton.length);
        renderWelcomePreview();
        markPanelDirty("welcome");
      });
    });
  }

  function applyWelcomeState(welcome = {}) {
    welcomeState = welcome;
    setChecked("[data-welcome-enabled]", welcome.enabled);
    setChecked("[data-welcome-departure-enabled]", welcome.departure_enabled);
    setChecked("[data-welcome-dm-enabled]", welcome.dm_enabled);
    setChecked("[data-welcome-embed-enabled]", welcome.embed_enabled !== false);
    setValue("[data-welcome-channel]", welcome.channel_id || "");
    setValue("[data-welcome-departure-channel]", welcome.departure_channel_id || "");
    setValue("[data-welcome-title]", welcome.title || "");
    setValue("[data-welcome-message]", welcome.message || "");
    setValue("[data-welcome-departure-message]", welcome.departure_message || "");
    setValue("[data-welcome-dm-message]", welcome.dm_message || "");
    setValue("[data-welcome-color]", welcome.embed_color || "#5865F2");
    // `background` est l'image de la carte, celle que le bot dessine. On
    // retombe sur l'ancien `image` pour les serveurs configures avant le
    // selecteur de fichier, sinon leur reglage disparaitrait de l'ecran.
    const imageCarte = welcome.background || welcome.image || "";
    setValue("[data-welcome-image]", imageCarte);
    majApercuImage(imageCarte);
    setValue("[data-welcome-button-label]", welcome.button_label || "");
    setValue("[data-welcome-button-url]", welcome.button_url || "");
    renderWelcomePreview();
  }

  function collectWelcomePayload() {
    return {
      enabled: readChecked("[data-welcome-enabled]"),
      departure_enabled: readChecked("[data-welcome-departure-enabled]"),
      dm_enabled: readChecked("[data-welcome-dm-enabled]"),
      embed_enabled: readChecked("[data-welcome-embed-enabled]"),
      channel_id: readValue("[data-welcome-channel]"),
      departure_channel_id: readValue("[data-welcome-departure-channel]"),
      title: readValue("[data-welcome-title]"),
      message: readValue("[data-welcome-message]"),
      departure_message: readValue("[data-welcome-departure-message]"),
      dm_message: readValue("[data-welcome-dm-message]"),
      embed_color: readValue("[data-welcome-color]"),
      // Envoye comme `background` : c'est la cle que lit le dessinateur de
      // carte. `image` n'est pas transmis, et sanitize_welcome_system() repart
      // des valeurs par defaut — l'ancienne URL est donc remise a vide. C'est
      // voulu : le selecteur de fichier remplace le champ URL, une seule
      // source pour l'image evite qu'un ancien lien ressorte tout seul.
      background: readValue("[data-welcome-image]"),
      button_label: readValue("[data-welcome-button-label]"),
      button_url: readValue("[data-welcome-button-url]")
    };
  }

  async function saveWelcome() {
    if (serveurEnChargement()) return showToast(t("js.chargementEnCours"));
    const guildId = selectedServer.id;
    if (!guildId) return showToast(t("js.selectionneDabord"));

    const lien = readValue("[data-welcome-button-url]");
    if (lien && !/^https?:\/\//.test(lien)) {
      return showToast(t("js.lienBoutonHttps"));
    }
    if (readChecked("[data-welcome-enabled]") && !readValue("[data-welcome-channel]")) {
      return showToast(t("js.choisisSalonArrivee"));
    }
    // Laisser le salon de depart vide n'est pas une erreur : c'est le choix
    // « meme salon que l'arrivee ». Mais autant le dire, sinon on croit que
    // le bot confond les deux.
    if (readChecked("[data-welcome-departure-enabled]")
        && !readValue("[data-welcome-departure-channel]")) {
      showToast(t("js.departSansSalon"));
    }

    try {
      await modbotApiFetch(`/api/guilds/${guildId}/config`, {
        method: "PUT",
        body: JSON.stringify({ welcome_system: collectWelcomePayload() })
      });
      clearUnsavedChanges();
      showToast(t("js.bienvenueEnregistree"));
    } catch (error) {
      showToast(`${error?.message || t("js.enregistrementImpossible")}`);
    }
  }

  /* Taille maximale du data: stocké en configuration. Le bot accepte
     400 000 caractères ; on garde une marge pour le reste des réglages. */
  const IMAGE_MAX_CARACTERES = 360000;
  /* Dimensions de la carte dessinée par le bot : inutile de conserver
     davantage de pixels, ils seraient jetés au rendu. */
  const IMAGE_LARGEUR = 1000;
  const IMAGE_HAUTEUR = 380;

  /**
   * Réduit une image choisie par l'utilisateur et la rend en data: URI.
   *
   * Une photo de téléphone pèse plusieurs mégaoctets — impossible à ranger
   * dans la configuration. On la recadre aux dimensions de la carte, puis on
   * baisse la qualité JPEG par paliers jusqu'à passer sous la limite. C'est
   * fait dans le navigateur : rien de lourd ne transite par le bot.
   */
  async function reduireImage(fichier) {
    const source = await new Promise((resoudre, rejeter) => {
      const lecteur = new FileReader();
      lecteur.onload = () => resoudre(lecteur.result);
      lecteur.onerror = () => rejeter(new Error("lecture"));
      lecteur.readAsDataURL(fichier);
    });
    const image = await new Promise((resoudre, rejeter) => {
      const img = new Image();
      img.onload = () => resoudre(img);
      img.onerror = () => rejeter(new Error("decodage"));
      img.src = source;
    });

    const toile = document.createElement("canvas");
    toile.width = IMAGE_LARGEUR;
    toile.height = IMAGE_HAUTEUR;
    const ctx = toile.getContext("2d");
    // Recadrage « cover » : on remplit la carte sans déformer l'image.
    const echelle = Math.max(IMAGE_LARGEUR / image.width, IMAGE_HAUTEUR / image.height);
    const l = image.width * echelle;
    const h = image.height * echelle;
    ctx.drawImage(image, (IMAGE_LARGEUR - l) / 2, (IMAGE_HAUTEUR - h) / 2, l, h);

    for (const qualite of [0.85, 0.72, 0.6, 0.48, 0.36]) {
      const rendu = toile.toDataURL("image/jpeg", qualite);
      if (rendu.length <= IMAGE_MAX_CARACTERES) return rendu;
    }
    return null;
  }

  function majApercuImage(valeur) {
    const apercu = document.querySelector("[data-welcome-image-preview]");
    const retirer = document.querySelector("[data-welcome-image-clear]");
    if (apercu) {
      apercu.hidden = !valeur;
      if (valeur) apercu.src = valeur;
      else apercu.removeAttribute("src");
    }
    if (retirer) retirer.hidden = !valeur;
  }

  function initSelecteurImage() {
    const champ = document.querySelector("[data-welcome-image]");
    const fichier = document.querySelector("[data-welcome-image-file]");
    if (!champ || !fichier) return;

    document.querySelector("[data-welcome-image-pick]")
      ?.addEventListener("click", () => fichier.click());

    fichier.addEventListener("change", async () => {
      const choisi = fichier.files?.[0];
      if (!choisi) return;
      if (!choisi.type.startsWith("image/")) {
        showToast(t("js.image.pasUneImage"));
        fichier.value = "";
        return;
      }
      showToast(t("js.image.traitement"));
      try {
        const reduit = await reduireImage(choisi);
        if (!reduit) {
          showToast(t("js.image.tropLourde"));
          return;
        }
        champ.value = reduit;
        majApercuImage(reduit);
        markPanelDirty("welcome");
        renderWelcomePreview();
        showToast(t("js.image.prete"));
      } catch (error) {
        showToast(t("js.image.illisible"));
      } finally {
        // Remis à zéro : sans cela, rechoisir le même fichier ne
        // déclencherait aucun évènement `change`.
        fichier.value = "";
      }
    });

    document.querySelector("[data-welcome-image-clear]")?.addEventListener("click", () => {
      champ.value = "";
      majApercuImage("");
      markPanelDirty("welcome");
      renderWelcomePreview();
    });
  }

  function initWelcomePanel() {
    if (!document.querySelector("[data-dashboard-panel='welcome']")) return;
    renderWelcomeVariables();
    initSelecteurImage();

    const champs = [
      "[data-welcome-title]", "[data-welcome-message]", "[data-welcome-color]",
      "[data-welcome-image]", "[data-welcome-button-label]", "[data-welcome-button-url]",
      "[data-welcome-embed-enabled]"
    ];
    champs.forEach((selecteur) => {
      const element = document.querySelector(selecteur);
      element?.addEventListener("input", renderWelcomePreview);
      element?.addEventListener("change", renderWelcomePreview);
    });

    document.querySelector("[data-welcome-save]")?.addEventListener("click", saveWelcome);
  }

  /* ══════════════════════════════════════════════════════════════════
     GIVEAWAYS
     ══════════════════════════════════════════════════════════════════ */

  let giveawayList = [];
  let giveawayEditing = null;

  function formatCountdown(secondes) {
    if (secondes <= 0) return t("js.termine");
    const j = Math.floor(secondes / 86400);
    const h = Math.floor((secondes % 86400) / 3600);
    const m = Math.floor((secondes % 3600) / 60);
    if (j) return `${j} j ${h} h`;
    if (h) return `${h} h ${m} min`;
    return `${m} min`;
  }

  // Voit-on les archives ? Un reglage d'affichage, propre a la page :
  // il n'a rien a faire dans la configuration du serveur.
  let archivesVisibles = false;

  function renderGiveaways() {
    const host = document.querySelector("[data-giveaway-list]");
    const compteur = document.querySelector("[data-giveaway-count]");
    if (!host) return;

    // Un giveaway termine reste a l'ecran jusqu'a ce qu'on l'archive :
    // c'est le moment ou l'on relit les gagnants et ou l'on relance. Il
    // ne disparait que sur un geste explicite, jamais tout seul.
    const archives = giveawayList.filter((g) => g.archived);
    const visibles = archivesVisibles ? giveawayList : giveawayList.filter((g) => !g.archived);

    const enCours = giveawayList.filter((g) => !g.ended && !g.archived).length;
    if (compteur) compteur.textContent = giveawayList.length ? tp("js.nEnCours", { n: enCours }) : "";

    const bascule = document.querySelector("[data-giveaway-archives]");
    if (bascule) {
      bascule.hidden = !archives.length;
      bascule.textContent = tp(
        archivesVisibles ? "js.gw.masquerArchives" : "js.gw.voirArchives",
        { n: archives.length });
    }

    if (!visibles.length) {
      host.innerHTML = `
        <div class="dashboard-empty-state">
          <strong>${escapeHtml(t(giveawayList.length ? "js.gw.toutArchive" : "gw.emptyTitle"))}</strong>
          <span>${giveawayList.length ? escapeHtml(t("js.gw.toutArchiveAide")) : t("gw.emptyText")}</span>
        </div>`;
      return;
    }

    host.innerHTML = visibles.map((g) => {
      const conditions = [];
      const req = g.requirements || {};
      if (req.role_id) conditions.push(t("js.condRoleRequis"));
      if (req.min_messages) conditions.push(tp("js.condMessages", { n: req.min_messages }));
      if (req.min_account_days) conditions.push(tp("js.condCompte", { n: req.min_account_days }));

      const gagnants = (g.winners_picked || []).length
        ? `<p class="giveaway-winners">${g.winners_picked.map((u) => `<@${escapeHtml(u)}>`).join(" ")}</p>`
        : "";

      return `
        <article class="giveaway-card ${g.ended ? "is-ended" : ""}${g.archived ? " is-archived" : ""}" data-giveaway-id="${escapeHtml(g.id)}">
          <div class="giveaway-head">
            <div>
              <h3>${escapeHtml(g.prize || "Giveaway")}</h3>
              <p class="field-help">
                #${escapeHtml(g.channel_name || "?")} ·
                ${g.ended ? escapeHtml(t("js.termine")) : escapeHtml(tp("js.finDans", { delai: formatCountdown(g.seconds_left) }))} ·
                ${g.winners} · ${g.participants}
              </p>
            </div>
            <span class="giveaway-state ${g.archived ? "is-archived" : (g.ended ? "is-ended" : "is-live")}">
              ${escapeHtml(t(g.archived ? "js.gw.archive" : (g.ended ? "js.termineMaj" : "js.enCours")))}
            </span>
          </div>
          ${conditions.length ? `<p class="giveaway-conditions">${escapeHtml(conditions.join(" · "))}</p>` : ""}
          ${gagnants}
          <div class="search-actions">
            ${g.url ? `<a class="secondary-btn compact" href="${escapeHtml(g.url)}" target="_blank" rel="noreferrer">${escapeHtml(t("js.gw.voir"))}</a>` : ""}
            ${!g.ended ? `<button class="secondary-btn compact" type="button" data-giveaway-edit>${escapeHtml(t("js.gw.modifier"))}</button>` : ""}
            ${!g.ended ? `<button class="secondary-btn compact" type="button" data-giveaway-end>${escapeHtml(t("js.gw.terminer"))}</button>` : ""}
            ${g.ended && !g.archived ? `<button class="secondary-btn compact" type="button" data-giveaway-reroll>${escapeHtml(t("js.gw.relancer"))}</button>` : ""}
            ${!g.archived ? `<button class="secondary-btn compact" type="button" data-giveaway-archive
                     ${g.ended ? "" : `disabled title="${escapeHtml(t("js.gw.archiverApres"))}"`}
                   >${escapeHtml(t("js.gw.archiver"))}</button>` : ""}
            ${g.archived ? `<button class="secondary-btn compact" type="button" data-giveaway-unarchive>${escapeHtml(t("js.gw.desarchiver"))}</button>` : ""}
            <button class="secondary-btn compact danger" type="button" data-giveaway-delete>${escapeHtml(t("js.gw.supprimer"))}</button>
          </div>
        </article>`;
    }).join("");

    host.querySelectorAll("[data-giveaway-id]").forEach((carte) => {
      const id = carte.dataset.giveawayId;
      carte.querySelector("[data-giveaway-edit]")?.addEventListener("click", () => openGiveawayForm(id));
      carte.querySelector("[data-giveaway-end]")?.addEventListener("click", () => giveawayAction(id, "end"));
      carte.querySelector("[data-giveaway-reroll]")?.addEventListener("click", () => giveawayAction(id, "reroll"));
      carte.querySelector("[data-giveaway-archive]")?.addEventListener("click", () => giveawayAction(id, "archive"));
      carte.querySelector("[data-giveaway-unarchive]")?.addEventListener("click", () => giveawayAction(id, "unarchive"));
      carte.querySelector("[data-giveaway-delete]")?.addEventListener("click", () => deleteGiveaway(id, carte));
    });
  }

  async function loadGiveaways() {
    const guildId = selectedServer.id;
    if (!guildId) return;
    try {
      const data = await modbotApiFetch(`/api/guilds/${guildId}/giveaways`, { cache: "no-store" });
      if (!estEncoreLeServeur(guildId)) return;
      giveawayList = data.giveaways || [];
      renderGiveaways();
    } catch (error) {
      if (!estEncoreLeServeur(guildId)) return;
      const host = document.querySelector("[data-giveaway-list]");
      if (host) {
        host.innerHTML = `
          <div class="dashboard-empty-state">
            <strong>Giveaways indisponibles</strong>
            <span>${escapeHtml(error?.message || t("js.botNaPasRepondu"))}</span>
          </div>`;
      }
    }
  }

  function fillGiveawaySelects() {
    const salon = document.querySelector("[data-giveaway-channel]");
    if (salon) {
      const courant = salon.value;
      salon.innerHTML = dashboardResources.channels.map((c) => (
        `<option value="${escapeHtml(c.id)}">${escapeHtml(channelLabel(c))}</option>`
      )).join("");
      if (courant) salon.value = courant;
    }
    const role = document.querySelector("[data-giveaway-role]");
    if (role) {
      const courant = role.value;
      role.innerHTML = `<option value="">${escapeHtml(t("js.aucun"))}</option>` + dashboardResources.roles.map((r) => (
        `<option value="${escapeHtml(r.id)}">${escapeHtml(roleLabel(r))}</option>`
      )).join("");
      if (courant) role.value = courant;
    }
  }

  function openGiveawayForm(id = null) {
    const form = document.querySelector("[data-giveaway-form]");
    if (!form) return;
    giveawayEditing = id;
    fillGiveawaySelects();

    const titre = document.querySelector("[data-giveaway-form-title]");
    const existant = id ? giveawayList.find((g) => g.id === id) : null;

    if (existant) {
      if (titre) titre.textContent = `Modifier : ${existant.prize}`;
      setValue("[data-giveaway-prize]", existant.prize);
      setValue("[data-giveaway-channel]", existant.channel_id);
      setValue("[data-giveaway-duration]", Math.max(1, Math.round(existant.seconds_left / 60)));
      setValue("[data-giveaway-winners]", existant.winners);
      setValue("[data-giveaway-role]", (existant.requirements || {}).role_id || "");
      setValue("[data-giveaway-min-messages]", (existant.requirements || {}).min_messages || 0);
      setValue("[data-giveaway-min-account]", (existant.requirements || {}).min_account_days || 0);
    } else {
      if (titre) titre.textContent = "Nouveau giveaway";
      form.reset();
      setValue("[data-giveaway-duration]", 60);
      setValue("[data-giveaway-winners]", 1);
      fillGiveawaySelects();
    }

    form.hidden = false;
    form.scrollIntoView({ behavior: "smooth", block: "nearest" });
    document.querySelector("[data-giveaway-prize]")?.focus();
  }

  function closeGiveawayForm() {
    const form = document.querySelector("[data-giveaway-form]");
    if (form) form.hidden = true;
    giveawayEditing = null;
  }

  async function submitGiveaway(event) {
    event.preventDefault();
    const guildId = selectedServer.id;
    if (!guildId) return showToast(t("js.selectionneDabord"));

    const charge = {
      prize: readValue("[data-giveaway-prize]"),
      channel_id: readValue("[data-giveaway-channel]"),
      duration_minutes: readNumber("[data-giveaway-duration]", 60),
      winners: readNumber("[data-giveaway-winners]", 1),
      requirements: {
        role_id: readValue("[data-giveaway-role]"),
        min_messages: readNumber("[data-giveaway-min-messages]", 0),
        min_account_days: readNumber("[data-giveaway-min-account]", 0)
      }
    };
    if (!charge.prize) return showToast(t("js.indiqueRecompense"));
    if (!charge.channel_id) return showToast(t("js.choisisSalonPublication"));

    try {
      if (giveawayEditing) {
        await modbotApiFetch(`/api/guilds/${guildId}/giveaways/${giveawayEditing}`, {
          method: "PUT", body: JSON.stringify(charge)
        });
        showToast(t("js.giveawayModifie"));
      } else {
        await modbotApiFetch(`/api/guilds/${guildId}/giveaways`, {
          method: "POST", body: JSON.stringify(charge)
        });
        showToast(t("js.giveawayPublie"));
      }
      closeGiveawayForm();
      loadGiveaways();
    } catch (error) {
      showToast(`${error?.message || t("js.publicationImpossibleCourt")}`);
    }
  }

  async function giveawayAction(id, action) {
    const guildId = selectedServer.id;
    if (!guildId) return;
    try {
      const data = await modbotApiFetch(`/api/guilds/${guildId}/giveaways/${id}/action`, {
        method: "POST", body: JSON.stringify({ action })
      });
      // Le bot repond en francais : pour les deux actions dont le
      // resultat n'apprend rien de plus qu'un accuse de reception, on
      // prefere la phrase traduite.
      const traduits = { archive: "js.gw.archiveFait", unarchive: "js.gw.desarchiveFait" };
      showToast(traduits[action]
        ? t(traduits[action])
        : `${data.result || t("js.actionAppliquee")}`);
      loadGiveaways();
    } catch (error) {
      showToast(`${error?.message || t("js.actionRefusee")}`);
    }
  }

  /** Suppression en deux temps : le bouton devient une confirmation. */
  async function deleteGiveaway(id, carte) {
    const bouton = carte.querySelector("[data-giveaway-delete]");
    if (bouton && !bouton.dataset.confirming) {
      bouton.dataset.confirming = "1";
      bouton.textContent = t("js.confirmer");
      bouton.classList.add("is-confirming");
      setTimeout(() => {
        if (!bouton.isConnected) return;
        delete bouton.dataset.confirming;
        bouton.textContent = "Supprimer";
        bouton.classList.remove("is-confirming");
      }, 5000);
      return;
    }

    const guildId = selectedServer.id;
    try {
      await modbotApiFetch(`/api/guilds/${guildId}/giveaways/${id}`, { method: "DELETE" });
      showToast(t("js.giveawaySupprime"));
      loadGiveaways();
    } catch (error) {
      showToast(`${error?.message || t("js.suppressionImpossible")}`);
    }
  }

  function initGiveawayPanel() {
    if (!document.querySelector("[data-dashboard-panel='giveaways']")) return;
    document.querySelector("[data-giveaway-new]")?.addEventListener("click", () => openGiveawayForm());
    document.querySelector("[data-giveaway-cancel]")?.addEventListener("click", closeGiveawayForm);
    document.querySelector("[data-giveaway-archives]")?.addEventListener("click", () => {
    archivesVisibles = !archivesVisibles;
    renderGiveaways();
  });

  document.querySelector("[data-giveaway-reload]")?.addEventListener("click", loadGiveaways);
    document.querySelector("[data-giveaway-form]")?.addEventListener("submit", submitGiveaway);
  }

  /* ══════════════════════════════════════════════════════════════════
     ASSISTANT IA
     ══════════════════════════════════════════════════════════════════ */

  let aiHistory = [];
  let aiBusy = false;

  function aiAddMessage(role, texte, panneau = "", libelle = "") {
    const host = document.querySelector("[data-ai-messages]");
    if (!host) return null;

    const bulle = document.createElement("div");
    bulle.className = `ai-message is-${role}`;

    const corps = document.createElement("div");
    corps.className = "ai-bubble";
    // Rendu volontairement minimal : gras, code, sauts de ligne. Pas de HTML
    // brut, la réponse vient d'un modèle et ne doit jamais être injectée.
    corps.innerHTML = escapeHtml(texte)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\n/g, "<br>");
    bulle.appendChild(corps);

    if (panneau) {
      const lien = document.createElement("button");
      lien.type = "button";
      lien.className = "ai-panel-link";
      lien.textContent = `Ouvrir « ${libelle.split("—")[0].trim() || panneau} »`;
      lien.addEventListener("click", () => {
        openPanel(panneau);
        setAiOpen(false);
      });
      bulle.appendChild(lien);
    }

    host.appendChild(bulle);
    host.scrollTop = host.scrollHeight;
    return bulle;
  }

  function setAiOpen(ouvert) {
    const panneau = document.querySelector("[data-ai-panel]");
    const bouton = document.querySelector("[data-ai-launcher]");
    if (!panneau || !bouton) return;

    if (ouvert) {
      panneau.hidden = false;
      void panneau.offsetHeight;  // reflow forcé : rAF ne suffit pas en arrière-plan
      panneau.classList.add("is-open");
      document.querySelector("[data-ai-input]")?.focus();
      if (!aiHistory.length) {
        aiAddMessage("bot", t("js.ai.accueil"));
      }
    } else {
      panneau.classList.remove("is-open");
      setTimeout(() => { if (!panneau.classList.contains("is-open")) panneau.hidden = true; }, 220);
    }
    panneau.setAttribute("aria-hidden", String(!ouvert));
    bouton.setAttribute("aria-expanded", String(ouvert));
    bouton.classList.toggle("is-active", ouvert);
  }

  async function askAI(question) {
    const guildId = selectedServer.id;
    if (!guildId) return showToast(t("js.selectionneDabord"));
    if (aiBusy || !question.trim()) return;

    aiBusy = true;
    const champ = document.querySelector("[data-ai-input]");
    if (champ) champ.value = "";
    aiAddMessage("user", question);

    const attente = aiAddMessage("bot", "…");
    attente?.classList.add("is-thinking");

    try {
      const data = await modbotApiFetch(`/api/guilds/${guildId}/assistant`, {
        method: "POST",
        body: JSON.stringify({ question, history: aiHistory.slice(-10) })
      });
      attente?.remove();
      aiAddMessage("bot", data.answer, data.panel, data.panel_label);
      aiHistory.push({ role: "user", content: question });
      aiHistory.push({ role: "assistant", content: data.answer });
      aiHistory = aiHistory.slice(-20);
    } catch (error) {
      attente?.remove();
      const message = error?.message || t("js.assistantNaPasRepondu");
      aiAddMessage("bot", `${message}`);
    } finally {
      aiBusy = false;
    }
  }

  function initAiAssistant() {
    const bouton = document.querySelector("[data-ai-launcher]");
    if (!bouton) return;

    bouton.addEventListener("click", () => {
      const panneau = document.querySelector("[data-ai-panel]");
      setAiOpen(!panneau?.classList.contains("is-open"));
    });
    document.querySelector("[data-ai-close]")?.addEventListener("click", () => setAiOpen(false));

    document.querySelector("[data-ai-form]")?.addEventListener("submit", (event) => {
      event.preventDefault();
      askAI(readValue("[data-ai-input]"));
    });

    document.querySelectorAll("[data-ai-ask]").forEach((suggestion) => {
      suggestion.addEventListener("click", () => askAI(suggestion.dataset.aiAsk));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setAiOpen(false);
    });
  }

  /* ══════════════════════════════════════════════════════════════════
     RECHERCHE — membres et rôles
     ══════════════════════════════════════════════════════════════════ */

  let searchMode = "members";
  let searchTimer = null;
  let searchSelection = null;
  let searchPendingAction = null;   // action destructive en attente de confirmation

  /** Actions destructives : elles demandent un second clic pour être appliquées. */
  const SEARCH_DANGEROUS = new Set(["kick", "ban", "reset"]);

  function searchEl(selector) {
    return document.querySelector(selector);
  }

  function renderSearchResults(items) {
    const host = searchEl("[data-search-results]");
    const count = searchEl("[data-search-count]");
    if (!host) return;

    if (count) {
      count.textContent = items.length
        ? tn("js.unResultat", "js.desResultats", items.length)
        : "";
    }

    if (!items.length) {
      host.innerHTML = `
        <div class="dashboard-empty-state">
          <strong>${escapeHtml(t("js.aucunResultat"))}</strong>
          <span>${escapeHtml(t("js.essaieUnAutreNom"))}</span>
        </div>`;
      return;
    }

    host.innerHTML = items.map((item, index) => {
      if (searchMode === "roles") {
        return `
          <button class="search-result" type="button" data-search-pick="${index}">
            <span class="search-result-dot" style="background:${escapeHtml(item.color || "#5865F2")}"></span>
            <span class="search-result-body">
              <strong>${escapeHtml(item.name)}</strong>
              <small>${escapeHtml(tn("js.membreSingulier", "js.membresPluriel", item.members))}${item.immune ? ` · ${escapeHtml(t("js.immunise"))}` : ""}</small>
            </span>
          </button>`;
      }
      return `
        <button class="search-result" type="button" data-search-pick="${index}">
          <span class="search-result-avatar">
            <img src="${escapeHtml(item.avatar || "assets/default_logo.svg")}" alt="" loading="lazy">
          </span>
          <span class="search-result-body">
            <strong>${escapeHtml(item.display_name)}</strong>
            <small>@${escapeHtml(item.username)}${item.points ? ` · ${item.points} pt` : ""}${item.immune ? " ·" : ""}</small>
          </span>
        </button>`;
    }).join("");

    host.querySelectorAll("[data-search-pick]").forEach((button) => {
      button.addEventListener("click", () => {
        host.querySelectorAll(".search-result").forEach((el) => el.classList.remove("is-active"));
        button.classList.add("is-active");
        searchPendingAction = null;
        renderSearchDetail(items[Number(button.dataset.searchPick)]);
      });
    });
  }

  /**
   * Les deux notions se confondent facilement — on explique laquelle fait quoi
   * au moment où l'utilisateur s'apprête à cliquer.
   */
  function immunityHelp(item) {
    if (!item.immune && !item.trusted) return "";
    const lignes = [];
    if (item.immune) {
      lignes.push(t("js.aideImmunise"));
    }
    if (item.trusted) {
      lignes.push(t("js.aideConfiance"));
    }
    return `<div class="alert-panel subtle">${lignes.map((l) => `<p>${l}</p>`).join("")}</div>`;
  }

  function actionButton(action, label, style = "") {
    const pending = searchPendingAction === action;
    const classe = pending ? "primary-btn compact is-confirming" : `secondary-btn compact ${style}`;
    const texte = pending ? tp("js.confirmerAction", { action: label }) : label;
    return `<button class="${classe}" type="button" data-search-action="${action}">${escapeHtml(texte)}</button>`;
  }

  function renderSearchDetail(item) {
    searchSelection = item;
    const host = searchEl("[data-search-detail]");
    if (!host || !item) return;

    if (searchMode === "roles") {
      const perms = item.sensitive_permissions || [];
      host.innerHTML = `
        <div class="search-detail-head">
          <span class="search-result-dot large" style="background:${escapeHtml(item.color || "#5865F2")}"></span>
          <div>
            <h3>${escapeHtml(item.name)}</h3>
            <p class="field-help">${escapeHtml(tn("js.membreSingulier", "js.membresPluriel", item.members))} · ${escapeHtml(tp("js.position", { n: item.position }))}</p>
          </div>
        </div>
        <div class="search-detail-facts">
          <div><span>${escapeHtml(t("js.immunite"))}</span><strong>${item.immune ? `${escapeHtml(t("js.activee"))}` : escapeHtml(t("js.non"))}</strong></div>
          <div><span>${escapeHtml(t("js.confianceAntiNuke"))}</span><strong>${item.trusted ? `${escapeHtml(t("js.activee"))}` : escapeHtml(t("js.non"))}</strong></div>
          <div><span>${escapeHtml(t("js.roleGerePar"))}</span><strong>${escapeHtml(t(item.managed ? "js.oui" : "js.non"))}</strong></div>
        </div>
        ${immunityHelp(item)}
        ${perms.length ? `
          <div class="alert-panel subtle">
            <strong>${escapeHtml(t("js.permissionsSensibles"))}</strong>
            <ul>${perms.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
            <p>${escapeHtml(t("js.roleDejaDangereux"))}</p>
          </div>` : ""}
        <div class="search-actions">
          ${item.immune
            ? actionButton("unimmunize", t("js.retirerImmunite"))
            : actionButton("immunize", t("js.immuniser"))}
          ${item.trusted
            ? actionButton("untrust", t("js.retirerConfiance"))
            : actionButton("trust", t("js.donnerConfiance"))}
        </div>`;
    } else {
      const roles = item.roles || [];
      host.innerHTML = `
        <div class="search-detail-head">
          <span class="search-result-avatar large">
            <img src="${escapeHtml(item.avatar || "assets/default_logo.svg")}" alt="">
          </span>
          <div>
            <h3>${escapeHtml(item.display_name)}</h3>
            <p class="field-help">@${escapeHtml(item.username)} · <code>${escapeHtml(item.id)}</code></p>
          </div>
        </div>
        <div class="search-detail-facts">
          <div><span>${escapeHtml(t("js.infractions"))}</span><strong>${item.warns} (${item.points} pt)</strong></div>
          <div><span>${escapeHtml(t("js.arrivee"))}</span><strong>${item.joined_at ? formatIsoDateTimeFr(item.joined_at) : "—"}</strong></div>
          <div><span>${escapeHtml(t("js.compteCree"))}</span><strong>${item.created_at ? formatIsoDateTimeFr(item.created_at) : "—"}</strong></div>
          <div><span>${escapeHtml(t("js.etatMembre"))}</span><strong>${escapeHtml(item.timed_out ? t("js.exclu") : item.owner ? t("js.proprietaire") : item.administrator ? t("js.admin") : t("js.actifSimple"))}</strong></div>
        </div>
        ${immunityHelp(item)}
        ${roles.length ? `<div class="search-role-chips">${roles.map((r) =>
          `<span class="search-role-chip" style="border-color:${escapeHtml(r.color)}">${escapeHtml(r.name)}</span>`
        ).join("")}</div>` : ""}
        ${!item.manageable ? `
          <div class="alert-panel subtle">
            <strong>${escapeHtml(t("js.membreHorsPortee"))}</strong>
            <p>${escapeHtml(t(item.owner ? "js.cestLeProprietaire" : "js.roleTropHaut"))}</p>
          </div>` : ""}
        <label class="mini-form search-reason">${escapeHtml(t("adm.raison"))}
          <input type="text" data-search-reason placeholder="${escapeHtml(t("js.visibleDansLogs"))}" maxlength="400">
        </label>
        <div class="search-actions">
          ${actionButton("warn", t("js.avertir"))}
          ${item.timed_out
            ? actionButton("untimeout", t("js.leverExclusion"))
            : actionButton("timeout", t("js.exclureUneHeure"))}
          ${item.manageable ? actionButton("kick", t("js.expulser"), "danger") : ""}
          ${item.manageable ? actionButton("ban", t("js.bannir"), "danger") : ""}
          ${item.warns ? actionButton("reset", t("js.effacerInfractions")) : ""}
          ${item.immune
            ? actionButton("unimmunize", t("js.retirerImmunite"))
            : actionButton("immunize", t("js.immuniser"))}
          ${item.trusted
            ? actionButton("untrust", t("js.retirerConfiance"))
            : actionButton("trust", t("js.donnerConfiance"))}
        </div>`;
    }

    host.querySelectorAll("[data-search-action]").forEach((button) => {
      button.addEventListener("click", () => runSearchAction(button.dataset.searchAction));
    });
  }

  async function runSearchAction(action) {
    const guildId = selectedServer.id;
    if (!guildId || !searchSelection) return;

    // Deux temps pour tout ce qui est irréversible
    if (SEARCH_DANGEROUS.has(action) && searchPendingAction !== action) {
      searchPendingAction = action;
      renderSearchDetail(searchSelection);
      showToast(t("js.cliqueDeuxFois"));
      return;
    }
    searchPendingAction = null;

    const raison = readValue("[data-search-reason]") || t("js.actionDepuisDashboard");
    const cible = searchMode === "roles"
      ? `/api/guilds/${guildId}/roles/${searchSelection.id}/action`
      : `/api/guilds/${guildId}/members/${searchSelection.id}/action`;

    try {
      const data = await modbotApiFetch(cible, {
        method: "POST",
        body: JSON.stringify({ action, reason: raison, minutes: 60 })
      });
      showToast(`${data.result || t("js.actionAppliquee")}`);
      if (data.member) {
        renderSearchDetail(data.member);
      } else if (data.role) {
        renderSearchDetail(data.role);
      }
      runSearch();               // la liste reflète le nouvel état
      loadGuildSecurity(guildId); // l'immunité modifie la liste blanche anti-nuke
    } catch (error) {
      showToast(`${error?.message || t("js.actionRefusee")}`);
    }
  }

  async function runSearch() {
    const guildId = selectedServer.id;
    const host = searchEl("[data-search-results]");
    if (!guildId || !host) return;

    const terme = readValue("[data-search-input]").trim();
    const clear = searchEl("[data-search-clear]");
    if (clear) clear.hidden = !terme;

    try {
      const url = `/api/guilds/${guildId}/search/${searchMode}?q=${encodeURIComponent(terme)}`;
      const data = await modbotApiFetch(url, { cache: "no-store" });
      // Les membres d'un autre serveur, avec les boutons bannir et
      // expulser a cote : le pire endroit pour un melange.
      if (!estEncoreLeServeur(guildId)) return;
      renderSearchResults(searchMode === "roles" ? (data.roles || []) : (data.members || []));
    } catch (error) {
      if (!estEncoreLeServeur(guildId)) return;
      host.innerHTML = `
        <div class="dashboard-empty-state">
          <strong>Recherche indisponible</strong>
          <span>${escapeHtml(error?.message || t("js.botNaPasRepondu"))}</span>
        </div>`;
    }
  }

  function resetSearchDetail() {
    const host = searchEl("[data-search-detail]");
    if (host) {
      host.innerHTML = `
        <div class="dashboard-empty-state">
          <strong>Aucune sélection</strong>
          <span>Choisis un résultat pour voir sa fiche et agir dessus.</span>
        </div>`;
    }
    searchSelection = null;
    searchPendingAction = null;
  }


  /* ══════════════════════════════════════════════════════════════════
     CAPTCHA — mise en place depuis le dashboard
     Chaque action passe par le bot : c'est lui qui crée le rôle, le
     salon et le panneau. Le navigateur ne fait que demander.
     ══════════════════════════════════════════════════════════════════ */

  async function actionCaptcha(chemin, corps, messageOk) {
    const guildId = selectedServer.id;
    if (!guildId) {
      showToast(t("js.captchaChoisirServeur"));
      return null;
    }
    try {
      const data = await modbotApiFetch(`/api/guilds/${guildId}/captcha/${chemin}`, {
        method: "POST",
        body: JSON.stringify(corps || {})
      });
      showToast(messageOk);
      // L'état affiché vient du bot, pas d'une supposition locale.
      loadGuildSecurity(guildId);
      loadDashboardResources(guildId);
      return data;
    } catch (error) {
      showToast(`${error?.message || t("js.captchaEchec")}`);
      return null;
    }
  }

  function initCaptchaPanel() {
    const bouton = document.querySelector("[data-captcha-setup]");
    if (!bouton) return;

    bouton.addEventListener("click", async () => {
      // Le rôle et le salon déjà choisis sont réutilisés ; laissés vides,
      // le bot les crée.
      const data = await actionCaptcha("setup", {
        role_id: readValue("[data-captcha-role]") || "",
        channel_id: readValue("[data-captcha-channel]") || "",
        publish: true
      }, t("js.captchaInstalle"));
      if (data?.created?.length) {
        showToast(t("js.captchaCree").replace("{quoi}", data.created.join(", ")));
      }
    });

    document.querySelector("[data-captcha-panel]")?.addEventListener("click", () => {
      actionCaptcha("panel", {}, t("js.captchaPublie"));
    });

    document.querySelector("[data-captcha-disable]")?.addEventListener("click", () => {
      actionCaptcha("disable", {}, t("js.captchaCoupe"));
    });

    // Le verrouillage change les permissions de tout le serveur :
    // il demande un second clic, comme les actions irréversibles.
    const verrou = document.querySelector("[data-captcha-lock]");
    verrou?.addEventListener("click", async () => {
      if (!verrou.dataset.confirming) {
        verrou.dataset.confirming = "1";
        verrou.classList.add("is-confirming");
        const libelle = verrou.querySelector("span");
        const avant = libelle?.textContent;
        if (libelle) libelle.textContent = t("js.captchaConfirmer");
        showToast(t("js.captchaAvertissement"));
        setTimeout(() => {
          if (!verrou.isConnected) return;
          delete verrou.dataset.confirming;
          verrou.classList.remove("is-confirming");
          if (libelle && avant) libelle.textContent = avant;
        }, 6000);
        return;
      }
      delete verrou.dataset.confirming;
      verrou.classList.remove("is-confirming");
      const data = await actionCaptcha("lock", {}, t("js.captchaVerrouille"));
      if (data) {
        showToast(t("js.captchaSalonsMasques").replace("{n}", data.locked));
      }
    });
  }

  function initSearchPanel() {
    const input = searchEl("[data-search-input]");
    if (!input) return;

    input.addEventListener("input", () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(runSearch, 220);
    });

    searchEl("[data-search-clear]")?.addEventListener("click", () => {
      input.value = "";
      resetSearchDetail();
      runSearch();
      input.focus();
    });

    document.querySelectorAll("[data-search-mode]").forEach((button) => {
      button.addEventListener("click", () => {
        searchMode = button.dataset.searchMode;
        document.querySelectorAll("[data-search-mode]").forEach((other) => {
          const actif = other === button;
          other.classList.toggle("is-active", actif);
          other.setAttribute("aria-selected", actif ? "true" : "false");
        });
        input.placeholder = searchMode === "roles"
          ? t("js.nomRoleOuId")
          : t("dash.nomPseudoOuIdentifiant");
        resetSearchDetail();
        runSearch();
      });
    });
  }

  /* ══════════════════════════════════════════════════════════════════
     LOGS
     ══════════════════════════════════════════════════════════════════ */

  const LOG_SEVERITY_ICONS = {
    info: "ℹ", success: "", warning: "", danger: "", critical: ""
  };
  let logCategories = [];
  let currentLogCategory = "all";
  let currentLogs = [];

  function renderLogFilters() {
    const host = document.querySelector("[data-log-filters]");
    if (!host) return;
    const buttons = [{ id: "all", label: "Tout", emoji: "" }, ...logCategories.map((c) => ({
      id: c.id, label: c.label, emoji: c.emoji
    }))];
    host.innerHTML = buttons
      .map(
        (item) => `
      <button class="log-filter${item.id === currentLogCategory ? " is-active" : ""}" type="button"
              data-log-category="${escapeHtml(item.id)}" role="tab"
              aria-selected="${item.id === currentLogCategory}">
        ${item.emoji} ${escapeHtml(item.label)}
      </button>`
      )
      .join("");
  }

  function renderLogToggles(enabledMap) {
    const host = document.querySelector("[data-log-toggles]");
    if (!host || !logCategories.length) return;
    host.innerHTML = logCategories
      .map(
        (category) => `
      <label class="toggle-line compact"${category.premium ? ' data-premium-feature="logs_complets"' : ""}>
        <input type="checkbox" data-log-toggle="${escapeHtml(category.id)}"
               ${enabledMap[category.id] !== false ? "checked" : ""}>
        <span></span>
        <strong>${category.emoji} ${escapeHtml(category.label)}</strong>
      </label>`
      )
      .join("");
    host.querySelectorAll("[data-log-toggle]").forEach((input) => {
      input.addEventListener("change", () => {
        input.closest(".toggle-line")?.classList.toggle("is-on", input.checked);
        markPanelDirty("logs");
      });
    });
    // Les cases viennent d'etre redessinees : le verrou doit repasser.
    majCadenas();
  }

  function collectLogToggles() {
    const toggles = {};
    document.querySelectorAll("[data-log-toggle]").forEach((input) => {
      toggles[input.dataset.logToggle] = input.checked;
    });
    return toggles;
  }

  function renderLogFeed() {
    const feed = document.querySelector("[data-dashboard-log-feed]");
    if (!feed) return;
    if (!currentLogs.length) {
      feed.innerHTML = `<div class="log-empty"><span>—</span> ${escapeHtml(t("js.aucunEvenementCategorie"))}</div>`;
      return;
    }
    feed.innerHTML = currentLogs
      .map((entry) => {
        const category = logCategories.find((c) => c.id === entry.category);
        const icon = LOG_SEVERITY_ICONS[entry.severity] || "•";
        const actor = entry.actor ? `<span class="log-actor">${escapeHtml(entry.actor)}</span>` : "";
        const target = entry.target ? `<span class="log-target">${escapeHtml(entry.target)}</span>` : "";
        return `
      <article class="log-entry" data-severity="${escapeHtml(entry.severity || "info")}">
        <header>
          <span class="log-icon">${icon}</span>
          <strong>${escapeHtml(entry.title || t("js.evenement"))}</strong>
          <span class="log-chip">${category ? category.emoji + " " + escapeHtml(category.label) : escapeHtml(entry.category || "")}</span>
          <time>${escapeHtml(formatIsoDateTimeFr(entry.date))}</time>
        </header>
        ${entry.description ? `<p>${escapeHtml(entry.description)}</p>` : ""}
        ${actor || target ? `<footer>${actor}${target}</footer>` : ""}
      </article>`;
      })
      .join("");
  }

  async function loadGuildLogs(guildId, category = currentLogCategory) {
    const targetGuild = guildId || selectedServer.id;
    if (!targetGuild) return;
    try {
      const data = await modbotApiFetch(
        `/api/guilds/${targetGuild}/logs?category=${encodeURIComponent(category)}&limit=150`,
        { cache: "no-store" }
      );
      // Le journal d'un serveur affiche sous le nom d'un autre : c'est
      // le melange le plus visible, et le plus trompeur.
      if (!estEncoreLeServeur(targetGuild)) return;
      logCategories = Array.isArray(data.categories) ? data.categories : [];
      currentLogs = Array.isArray(data.logs) ? data.logs : [];
      currentLogCategory = category;
      renderLogFilters();
      renderLogFeed();
      renderOverview();
    } catch (error) {
      if (!estEncoreLeServeur(targetGuild)) return;
      const feed = document.querySelector("[data-dashboard-log-feed]");
      if (feed) {
        feed.innerHTML = `<div class="log-empty"><span></span> ${escapeHtml(error?.message || "Logs indisponibles")}</div>`;
      }
    }
  }

  function exportLogs() {
    if (!currentLogs.length) {
      showToast(t("js.aucunLogAExporter"));
      return;
    }
    const header = ["date", "categorie", "severite", "titre", "description", "auteur", "cible"];
    const escapeCsv = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const rows = currentLogs.map((entry) =>
      [entry.date, entry.category, entry.severity, entry.title, entry.description, entry.actor, entry.target]
        .map(escapeCsv)
        .join(";")
    );
    const csv = [header.join(";"), ...rows].join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `modbot-logs-${selectedServer.id || "serveur"}-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast(tp("js.logsExportes", { n: currentLogs.length }));
  }

  /* ══════════════════════════════════════════════════════════════════
     SAUVEGARDES
     ══════════════════════════════════════════════════════════════════ */

  let backupList = [];

  function renderBackups() {
    const host = document.querySelector("[data-backup-list]");
    const count = document.querySelector("[data-backups-count]");
    if (count) {
      count.textContent = backupList.length
        ? `${backupList.length} sauvegarde${backupList.length > 1 ? "s" : ""}`
        : "0 sauvegarde";
    }
    if (!host) return;
    if (!backupList.length) {
      host.innerHTML = `<div class="backup-empty">${escapeHtml(t("dash.aucuneSauvegardePourLe"))}</div>`;
      return;
    }
    host.innerHTML = backupList
      .map((entry) => {
        const counts = entry.counts || {};
        return `
      <article class="backup-card">
        <div class="backup-main">
          <strong>${escapeHtml(entry.id)}</strong>
          <small>${escapeHtml(formatIsoDateTimeFr(entry.created_at))} · par ${escapeHtml(entry.author || "ModBot")}</small>
          ${entry.note ? `<em>${escapeHtml(entry.note)}</em>` : ""}
        </div>
        <div class="backup-counts">
          <span>${Number(counts.roles || 0)}</span>
          <span>${Number(counts.categories || 0)}</span>
          <span>${Number(counts.channels || 0)}</span>
        </div>
        <div class="backup-actions">
          <button class="primary-btn compact" type="button" data-backup-restore="${escapeHtml(entry.id)}">Restaurer</button>
          <button class="secondary-btn compact danger" type="button" data-backup-delete="${escapeHtml(entry.id)}"></button>
        </div>
      </article>`;
      })
      .join("");
  }

  async function loadGuildBackups(guildId) {
    const targetGuild = guildId || selectedServer.id;
    if (!targetGuild) return;
    try {
      const data = await modbotApiFetch(`/api/guilds/${targetGuild}/backups`, { cache: "no-store" });
      if (!estEncoreLeServeur(targetGuild)) return;
      backupList = Array.isArray(data.backups) ? data.backups : [];
      renderBackups();
      renderOverview();
    } catch (error) {
      console.warn("Sauvegardes indisponibles :", error?.message || error);
    }
  }

  async function createBackup() {
    const guildId = selectedServer.id;
    if (!guildId) {
      showToast(t("js.selectionneDabord"));
      return;
    }
    showToast("Sauvegarde en cours…");
    try {
      const data = await modbotApiFetch(`/api/guilds/${guildId}/backups`, {
        method: "POST",
        body: JSON.stringify({ note: t("js.creeeDepuisDashboard") })
      });
      await loadGuildBackups(guildId);
      showToast(tp("js.sauvegardeCreee", { id: data.backup?.id || "" }));
    } catch (error) {
      showToast(`${error?.message || t("js.sauvegardeImpossible")}`);
    }
  }

  async function restoreBackup(backupId) {
    const guildId = selectedServer.id;
    if (!guildId) return;
    const entry = backupList.find((item) => item.id === backupId);
    const counts = entry?.counts || {};
    // Confirmation obligatoire avant une opération aussi lourde
    const confirmed = window.confirm(
      tp("js.confirmerRestauration", { id: backupId, serveur: selectedServer.name }) + "\n\n" +
      tp("js.contenuSauvegarde", { roles: counts.roles || 0, categories: counts.categories || 0,
                                   salons: counts.channels || 0 }) + "\n\n" +
      t("js.restaurationAdditive") + "\n" + t("js.operationLongue")
    );
    if (!confirmed) return;

    showToast(t("js.restaurationEnCours"));
    try {
      const data = await modbotApiFetch(`/api/guilds/${guildId}/backups/${backupId}/restore`, {
        method: "POST",
        body: JSON.stringify({ confirm: true })
      });
      const report = data.report || {};
      showToast(
        tp("js.restaurationTerminee", { roles: report.roles || 0,
                                        categories: report.categories || 0,
                                        salons: report.channels || 0 })
      );
      loadGuildLogs(guildId);
    } catch (error) {
      showToast(`${error?.message || t("js.restaurationImpossible")}`);
    }
  }

  async function deleteBackup(backupId) {
    const guildId = selectedServer.id;
    if (!guildId) return;
    if (!window.confirm(tp("js.confirmerSuppressionSauvegarde", { id: backupId }))) return;
    try {
      await modbotApiFetch(`/api/guilds/${guildId}/backups/${backupId}`, { method: "DELETE" });
      await loadGuildBackups(guildId);
      showToast(t("js.sauvegardeSupprimee"));
    } catch (error) {
      showToast(`${error?.message || t("js.suppressionImpossible")}`);
    }
  }

  /* ── Branchements des nouveaux panneaux ─────────────────────────── */

  document.querySelector("[data-security-save]")?.addEventListener("click", saveGuildSecurity);
  document.querySelector("[data-security-reload]")?.addEventListener("click", () => {
    loadGuildSecurity(selectedServer.id);
    showToast(t("js.securiteRechargee"));
  });
  document.querySelector("[data-sanction-reset]")?.addEventListener("click", () => {
    sanctionLadder = DEFAULT_SANCTION_LADDER.map((step) => ({ ...step }));
    renderSanctionLadder();
    markPanelDirty("security");
    showToast(t("js.echelleReinitialisee"));
  });
  document.querySelector("[data-autobackup-save]")?.addEventListener("click", saveGuildSecurity);

  document.querySelector("[data-log-filters]")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-log-category]");
    if (!button) return;
    loadGuildLogs(selectedServer.id, button.dataset.logCategory);
  });
  document.querySelector("[data-logs-reload]")?.addEventListener("click", () => {
    loadGuildLogs(selectedServer.id);
    showToast(t("js.journalRecharge"));
  });
  document.querySelector("[data-logs-export]")?.addEventListener("click", exportLogs);
  document.querySelector("[data-logs-save]")?.addEventListener("click", saveGuildSecurity);

  document.querySelector("[data-backup-create]")?.addEventListener("click", createBackup);
  /* ── Sauvegarde des réglages ───────────────────────────────────────
     Distincte de la sauvegarde de structure juste à côté : celle-ci
     emporte ce que ModBot a retenu du serveur — modules actifs, seuils,
     textes — dans un fichier que tu gardes chez toi. */

  async function exporterReglages() {
    const guildId = selectedServer.id;
    if (!guildId) return showToast(t("js.selectionneDabord"));
    const base = getModbotApiBase();
    if (!base) return showToast(t("js.auth.clientIdManquant"));
    showToast(t("js.reglages.preparation"));
    try {
      const reponse = await fetch(`${base}/api/guilds/${guildId}/config/export`,
                                  { headers: modbotAuthHeaders(), cache: "no-store" });
      if (!reponse.ok) throw new Error(await reponse.text());
      const blob = await reponse.blob();
      // Le nom vient du serveur (Content-Disposition) ; on le reprend pour
      // que le fichier porte la date et l'identifiant du serveur.
      const entete = reponse.headers.get("Content-Disposition") || "";
      const trouve = /filename="([^"]+)"/.exec(entete);
      // Repli daté : si un proxy masque l'en-tête, le fichier reste
      // reconnaissable au milieu d'un dossier de téléchargements.
      const jour = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const lien = document.createElement("a");
      lien.href = URL.createObjectURL(blob);
      lien.download = trouve ? trouve[1] : `modbot-${guildId}-${jour}.json`;
      document.body.appendChild(lien);
      lien.click();
      lien.remove();
      URL.revokeObjectURL(lien.href);
      showToast(t("js.reglages.telecharges"));
    } catch (error) {
      showToast(`${String(error?.message || error).slice(0, 120)}`);
    }
  }

  async function importerReglages(fichier) {
    const guildId = selectedServer.id;
    if (!guildId) return showToast(t("js.selectionneDabord"));
    let contenu;
    try {
      contenu = JSON.parse(await fichier.text());
    } catch (error) {
      return showToast(t("js.reglages.illisible"));
    }
    showToast(t("js.reglages.restauration"));
    try {
      const data = await modbotApiFetch(`/api/guilds/${guildId}/config/import`, {
        method: "POST",
        body: JSON.stringify(contenu),
      });
      // Le serveur dit s'il a dû écarter les salons et rôles d'origine.
      showToast(data?.meme_serveur === false
        ? t("js.reglages.restaureAutreServeur")
        : t("js.reglages.restaure"));
      if (data?.config) {
        applyDashboardConfig(data.config);
        derniereConfigEnregistree = JSON.stringify(data.config);
      }
      clearUnsavedChanges();
    } catch (error) {
      showToast(`${String(error?.message || error).slice(0, 140)}`);
    }
  }

  document.querySelector("[data-config-export]")?.addEventListener("click", exporterReglages);
  document.querySelector("[data-config-import-pick]")?.addEventListener("click", () => {
    document.querySelector("[data-config-import-file]")?.click();
  });
  document.querySelector("[data-config-import-file]")?.addEventListener("change", async (event) => {
    const fichier = event.target.files?.[0];
    if (fichier) await importerReglages(fichier);
    // Remis a zero : sans cela, reprendre le meme fichier ne declencherait
    // aucun evenement `change`.
    event.target.value = "";
  });

  document.querySelector("[data-backups-reload]")?.addEventListener("click", () => {
    loadGuildBackups(selectedServer.id);
    showToast(t("js.sauvegardesRechargees"));
  });
  document.querySelector("[data-backup-list]")?.addEventListener("click", (event) => {
    const restoreBtn = event.target.closest("[data-backup-restore]");
    if (restoreBtn) return restoreBackup(restoreBtn.dataset.backupRestore);
    const deleteBtn = event.target.closest("[data-backup-delete]");
    if (deleteBtn) return deleteBackup(deleteBtn.dataset.backupDelete);
  });

  renderSanctionLadder();

  // ── Auto-roles ──────────────────────────────────────────────────
  // Une saisie libre d'identifiants, comme pour les mentions de relais :
  // le meme filtre, pour la meme raison — n'envoyer au bot que ce qui a
  // une chance d'etre accepte.
  // Les auto-roles choisis, dans l'ordre d'ajout. La source de verite est
  // ce tableau, pas le DOM : une pastille dont le role a ete supprime du
  // serveur doit rester affichee et supprimable, pas disparaitre en
  // silence en emportant le reglage avec elle.
  let autoRolesChoisis = [];
  const AUTOROLE_MAX = 10;

  function nomDuRole(id) {
    const trouve = dashboardResources.roles.find((r) => String(r.id) === String(id));
    return trouve ? roleLabel(trouve) : `#${id}`;
  }

  function redessinerAutoRoles() {
    const hote = document.querySelector("[data-autorole-chips]");
    if (!hote) return;
    if (!autoRolesChoisis.length) {
      hote.innerHTML = `<span class="field-help">${escapeHtml(t("js.aucunAutoRole"))}</span>`;
    } else {
      hote.innerHTML = autoRolesChoisis.map((id) => (
        `<button type="button" class="variable-chip" data-retirer-role="${escapeHtml(id)}"
                 title="${escapeHtml(t("js.retirerCeRole"))}">${escapeHtml(nomDuRole(id))} &times;</button>`
      )).join("");
    }
    const picker = document.querySelector("[data-autorole-picker]");
    if (picker) picker.disabled = autoRolesChoisis.length >= AUTOROLE_MAX;
  }

  function initAutoRoles() {
    const picker = document.querySelector("[data-autorole-picker]");
    const hote = document.querySelector("[data-autorole-chips]");
    if (!picker || !hote) return;

    picker.addEventListener("change", () => {
      const id = picker.value;
      picker.value = "";
      if (!id) return;
      if (autoRolesChoisis.includes(id)) return showToast(t("js.roleDejaChoisi"));
      if (autoRolesChoisis.length >= AUTOROLE_MAX) return showToast(t("js.tropDAutoRoles"));
      autoRolesChoisis.push(id);
      redessinerAutoRoles();
      markPanelDirty("roles");
    });

    hote.addEventListener("click", (evenement) => {
      const chip = evenement.target.closest("[data-retirer-role]");
      if (!chip) return;
      autoRolesChoisis = autoRolesChoisis.filter((x) => x !== chip.dataset.retirerRole);
      redessinerAutoRoles();
      markPanelDirty("roles");
    });
  }

  function collectAutoRoles() {
    const enabled = document.querySelector("[data-autorole-enabled]");
    const apres = document.querySelector("[data-autorole-after-captcha]");
    if (!enabled) return undefined;
    return {
      enabled: Boolean(enabled.checked),
      roles: autoRolesChoisis.slice(0, AUTOROLE_MAX),
      after_captcha: apres ? Boolean(apres.checked) : true,
    };
  }

  function applyAutoRoles(auto) {
    if (!auto || typeof auto !== "object") return;
    const enabled = document.querySelector("[data-autorole-enabled]");
    const apres = document.querySelector("[data-autorole-after-captcha]");
    if (enabled) {
      enabled.checked = Boolean(auto.enabled);
      enabled.closest(".toggle-line")?.classList.toggle("is-on", Boolean(auto.enabled));
    }
    autoRolesChoisis = [...new Set((auto.roles || []).map(String))].slice(0, AUTOROLE_MAX);
    redessinerAutoRoles();
    if (apres) {
      const attendre = auto.after_captcha !== false;
      apres.checked = attendre;
      apres.closest(".toggle-line")?.classList.toggle("is-on", attendre);
    }
  }

  /* ══════════════════════════════════════════════════════════════
     OPTIONS DE TICKET
     Une seule fabrique de ligne. Il en existait deux : celle du serveur
     avait cinq champs, celle du bouton « Ajouter » n'en avait que quatre,
     et le lecteur les prenait par leur rang — la description finissait
     dans le libelle. Les champs portent desormais un nom.
     ══════════════════════════════════════════════════════════════ */

  function ligneOptionTicket(numero, option = {}) {
    const image = option.image || "";
    return `<div class="option-row">
      <span>${String(numero).padStart(2, "0")}</span>
      <input class="emoji-input" data-option-emoji value="${escapeHtml(image ? "" : (option.emoji || ""))}"
             maxlength="3" placeholder="${escapeHtml(t(image ? "js.optionImagePosee" : "js.emoji"))}"
             ${image ? "disabled" : ""}>
      <span class="option-image-pick" data-premium-feature="images">
        <input type="hidden" data-option-image value="${escapeHtml(image)}">
        <img class="option-thumb" data-option-thumb alt=""${image ? ` src="${escapeHtml(image)}"` : " hidden"}>
        <button type="button" class="secondary-btn compact" data-option-image-pick>
          <svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#u-image"/></svg>
          ${escapeHtml(t("js.optionImageChoisir"))}
        </button>
        <button type="button" class="secondary-btn compact" data-option-image-clear${image ? "" : " hidden"}>
          <svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#u-close"/></svg>
        </button>
      </span>
      <input data-option-label value="${escapeHtml(option.label || "")}"
             placeholder="${escapeHtml(t("js.libelleFacultatif"))}">
      <input data-option-desc value="${escapeHtml(option.desc || "")}"
             placeholder="${escapeHtml(t("js.descriptionFacultative"))}">
      <button type="button" data-option-remove>${escapeHtml(t("js.supprimer"))}</button>
    </div>`;
  }

  /**
   * Reduit une image en emoji carre.
   *
   * Discord refuse un emoji au-dela de 256 Ko et l'affiche a 32 px : une
   * image de carte de bienvenue (1000x380) n'a pas la bonne forme. On
   * recadre donc au centre, en carre, et on descend en qualite jusqu'a
   * passer sous la limite.
   */
  async function reduireEmoji(fichier) {
    const source = await new Promise((ok, ko) => {
      const lecteur = new FileReader();
      lecteur.onload = () => ok(lecteur.result);
      lecteur.onerror = () => ko(new Error("lecture"));
      lecteur.readAsDataURL(fichier);
    });
    const image = await new Promise((ok, ko) => {
      const img = new Image();
      img.onload = () => ok(img);
      img.onerror = () => ko(new Error("decodage"));
      img.src = source;
    });

    // Discord accepte 256 Ko pour un emoji, mais la sauvegarde porte
    // toutes les images a la fois : quatre options a 256 Ko faisaient
    // deborder la requete. Un PNG de 128x128 tient largement en 64 Ko.
    const EMOJI_MAX_OCTETS = 64 * 1024;
    const COTE = 128;
    const toile = document.createElement("canvas");
    toile.width = COTE;
    toile.height = COTE;
    const ctx = toile.getContext("2d");
    const echelle = Math.max(COTE / image.width, COTE / image.height);
    const l = image.width * echelle;
    const h = image.height * echelle;
    ctx.drawImage(image, (COTE - l) / 2, (COTE - h) / 2, l, h);

    // PNG d'abord : il garde la transparence, ce qui compte pour un
    // logo pose sur un bouton. On bascule en JPEG s'il est trop lourd.
    const png = toile.toDataURL("image/png");
    if (png.length <= EMOJI_MAX_OCTETS) return png;
    for (const qualite of [0.9, 0.75, 0.6, 0.45]) {
      const rendu = toile.toDataURL("image/jpeg", qualite);
      if (rendu.length <= EMOJI_MAX_OCTETS) return rendu;
    }
    return null;
  }

  /**
   * Reduit une affiche d'evenement.
   *
   * Rien a voir avec un emoji : une affiche est large, on garde donc ses
   * proportions et on plafonne le grand cote. Le poids compte quand meme
   * — l'image voyage dans la sauvegarde du dashboard, puis dans le
   * message Discord.
   */
  async function reduireAffiche(fichier) {
    const source = await new Promise((ok, ko) => {
      const lecteur = new FileReader();
      lecteur.onload = () => ok(lecteur.result);
      lecteur.onerror = () => ko(new Error("lecture"));
      lecteur.readAsDataURL(fichier);
    });
    const image = await new Promise((ok, ko) => {
      const img = new Image();
      img.onload = () => ok(img);
      img.onerror = () => ko(new Error("decodage"));
      img.src = source;
    });

    const AFFICHE_MAX_OCTETS = 900 * 1024;
    const COTE_MAX = 1280;
    const echelle = Math.min(1, COTE_MAX / Math.max(image.width, image.height));
    const toile = document.createElement("canvas");
    toile.width = Math.max(1, Math.round(image.width * echelle));
    toile.height = Math.max(1, Math.round(image.height * echelle));
    toile.getContext("2d").drawImage(image, 0, 0, toile.width, toile.height);

    const png = toile.toDataURL("image/png");
    if (png.length <= AFFICHE_MAX_OCTETS) return png;
    for (const qualite of [0.92, 0.85, 0.75, 0.62, 0.5]) {
      const rendu = toile.toDataURL("image/jpeg", qualite);
      if (rendu.length <= AFFICHE_MAX_OCTETS) return rendu;
    }
    return null;
  }

  /**
   * Une option de ticket affiche UN symbole : un emoji ou une image.
   *
   * Discord n'en pose qu'un seul sur un bouton comme sur une entree de
   * menu. Laisser saisir les deux ne donnait pas le choix a l'auteur du
   * panneau : ca le lui retirait, puisque seul l'un des deux
   * apparaissait, sans dire lequel.
   */
  function accorderEmojiEtImage(ligne) {
    const champEmoji = ligne.querySelector("[data-option-emoji]");
    const image = ligne.querySelector("[data-option-image]")?.value.trim() || "";
    if (!champEmoji) return;
    champEmoji.disabled = Boolean(image);
    champEmoji.placeholder = t(image ? "js.optionImagePosee" : "js.emoji");
    if (image) champEmoji.value = "";
  }

  function initImagesTicket() {
    const liste = document.getElementById("ticketOptionList");
    const fichier = document.querySelector("[data-option-image-file]");
    if (!liste || !fichier) return;
    let ligneVisee = null;

    liste.addEventListener("click", (evenement) => {
      const choisir = evenement.target.closest("[data-option-image-pick]");
      if (choisir) {
        ligneVisee = choisir.closest(".option-row");
        fichier.click();
        return;
      }
      const retirer = evenement.target.closest("[data-option-image-clear]");
      if (retirer) {
        const ligne = retirer.closest(".option-row");
        ligne.querySelector("[data-option-image]").value = "";
        const vignette = ligne.querySelector("[data-option-thumb]");
        vignette.hidden = true;
        vignette.removeAttribute("src");
        retirer.hidden = true;
        accorderEmojiEtImage(ligne);
        markPanelDirty("tickets");
      }
    });

    fichier.addEventListener("change", async () => {
      const choisi = fichier.files?.[0];
      // Le champ est remis a zero dans tous les cas : sans cela,
      // rechoisir le meme fichier ne declencherait aucun evenement.
      const ligne = ligneVisee;
      ligneVisee = null;
      if (!choisi || !ligne) { fichier.value = ""; return; }
      if (!choisi.type.startsWith("image/")) {
        showToast(t("js.image.pasUneImage"));
        fichier.value = "";
        return;
      }
      showToast(t("js.image.traitement"));
      try {
        const reduit = await reduireEmoji(choisi);
        if (!reduit) {
          showToast(t("js.image.tropLourde"));
          return;
        }
        ligne.querySelector("[data-option-image]").value = reduit;
        const vignette = ligne.querySelector("[data-option-thumb]");
        vignette.src = reduit;
        vignette.hidden = false;
        ligne.querySelector("[data-option-image-clear]").hidden = false;
        accorderEmojiEtImage(ligne);
        markPanelDirty("tickets");
        showToast(t("js.image.prete"));
      } catch (erreur) {
        showToast(t("js.image.illisible"));
      } finally {
        fichier.value = "";
      }
    });
  }

  /* ── Mentions des relais reseaux ────────────────────────────────
     Meme geste que pour les auto-roles, mais l'etat vit dans le DOM :
     chaque carte a ses propres pastilles, et aucune n'a besoin de
     savoir ce que font les autres. */

  function pastilleRole(id) {
    return `<button type="button" class="variable-chip" data-role-id="${escapeHtml(id)}"
             title="${escapeHtml(t("js.retirerCeRole"))}">${escapeHtml(nomDuRole(id))} &times;</button>`;
  }

  function rolesDeLaCarte(carte) {
    return [...carte.querySelectorAll("[data-social-ping-chips] [data-role-id]")]
      .map((chip) => chip.dataset.roleId);
  }

  function poserRolesDeLaCarte(carte, ids) {
    const hote = carte.querySelector("[data-social-ping-chips]");
    if (!hote) return;
    hote.innerHTML = [...new Set(ids.map(String))].slice(0, 8).map(pastilleRole).join("");
  }

  function initMentionsRelais() {
    document.querySelectorAll(".social-card").forEach((carte) => {
      const picker = carte.querySelector("[data-social-ping-picker]");
      const hote = carte.querySelector("[data-social-ping-chips]");
      if (!picker || !hote) return;

      picker.addEventListener("change", () => {
        const id = picker.value;
        picker.value = "";
        if (!id) return;
        const deja = rolesDeLaCarte(carte);
        if (deja.includes(id)) return showToast(t("js.roleDejaChoisi"));
        if (deja.length >= 8) return showToast(t("js.tropDeRolesMentionnes"));
        hote.insertAdjacentHTML("beforeend", pastilleRole(id));
        markPanelDirty("socials");
      });

      hote.addEventListener("click", (evenement) => {
        const chip = evenement.target.closest("[data-role-id]");
        if (!chip) return;
        chip.remove();
        markPanelDirty("socials");
      });
    });
  }

  /* ── Cadenas premium ────────────────────────────────────────────
     Un reglage verrouille reste VISIBLE et modifiable : on doit pouvoir
     preparer sa configuration avant de payer et la retrouver telle
     quelle ensuite. Ce qui change, c'est le bandeau qui dit clairement
     que rien ne s'appliquera tant que l'abonnement n'est pas la. */

  let premiumEtat = { active: false, features: {} };

  function appliquerPremium(premium) {
    premiumEtat = premium && typeof premium === "object"
      ? premium
      : { active: false, features: {} };
    majCadenas();
  }

  function majCadenas() {
    const bandeau = document.querySelector("[data-premium-lock]");
    if (!bandeau) return;
    const panneau = document.querySelector("[data-dashboard-panel].is-active");
    const fonction = panneau?.dataset.premiumFeature || "";
    const ouvert = !fonction
      || premiumEtat.active
      || (premiumEtat.features || {})[fonction] === true;

    bandeau.hidden = ouvert;
    if (!ouvert && panneau) {
      // Le bandeau se pose en tete du panneau concerne : un seul
      // element deplace, plutot qu'un par panneau a maintenir.
      panneau.insertBefore(bandeau, panneau.firstElementChild?.nextSibling || null);
    }
    // L'onglet porte une pastille : on doit voir le verrou sans ouvrir.
    document.querySelectorAll("[data-dashboard-panel][data-premium-feature]")
      .forEach((section) => {
        const clef = section.dataset.premiumFeature;
        const libre = premiumEtat.active || (premiumEtat.features || {})[clef] === true;
        const onglet = document.querySelector(
          `[data-dashboard-tab="${section.dataset.dashboardPanel}"]`);
        onglet?.classList.toggle("is-locked", !libre);
        verrouillerPanneau(section, !libre);
      });

    // Les champs premium loges dans une rubrique gratuite : la couleur
    // de l'embed, les images, le message prive, les categories de
    // journal au-dela des cinq de base. Le panneau reste ouvert, le
    // champ non — sinon on reglait une chose que le bot refuserait
    // ensuite d'appliquer, sans que rien ne le dise.
    document.querySelectorAll("[data-premium-feature]:not([data-dashboard-panel])")
      .forEach((bloc) => {
        const clef = bloc.dataset.premiumFeature;
        const libre = premiumEtat.active || (premiumEtat.features || {})[clef] === true;
        verrouillerChamp(bloc, !libre);
      });

    majBandeauPremium();
    // Le score depend du premium : quand le verrou bouge et que la
    // rubrique est ouverte, elle doit suivre sans qu'on la reouvre.
    if (activePanelName === "score") chargerScoreSecurite();
  }

  /**
   * Un champ premium isole dans une rubrique gratuite.
   *
   * Meme regle que pour un panneau entier : on desactive, et on ne
   * reactive que ce que le verrou avait ferme. La pastille dit
   * pourquoi, faute de place pour un bandeau.
   */
  function verrouillerChamp(bloc, ferme) {
    bloc.classList.toggle("is-premium-locked", ferme);
    if (ferme && !bloc.querySelector(":scope > .premium-tag")) {
      const marque = document.createElement("span");
      marque.className = "premium-tag";
      marque.textContent = t("prem.verrouChamp");
      bloc.appendChild(marque);
    } else if (!ferme) {
      bloc.querySelector(":scope > .premium-tag")?.remove();
    }
    bloc.querySelectorAll("input, select, textarea, button").forEach((champ) => {
      if (ferme) {
        if (champ.disabled) return;
        champ.dataset.verrouPremium = "1";
        champ.disabled = true;
      } else if (champ.dataset.verrouPremium === "1") {
        delete champ.dataset.verrouPremium;
        champ.disabled = false;
      }
    });
  }

  /**
   * Le bandeau d'echeance, en tete du dashboard.
   *
   * Quand un administrateur offre le premium, le serveur doit savoir
   * jusqu'a quand il en profite — et que ca s'arretera. Le dire apres
   * coup, quand les fonctionnalites se referment, serait une mauvaise
   * surprise.
   */
  function majBandeauPremium() {
    const bandeau = document.querySelector("[data-premium-banner]");
    if (!bandeau) return;
    const actif = Boolean(premiumEtat.active) && Boolean(premiumEtat.until);
    bandeau.hidden = !actif;
    if (!actif) return;

    const echeance = new Date(premiumEtat.until);
    const lisible = Number.isNaN(echeance.getTime())
      ? String(premiumEtat.until).slice(0, 16).replace("T", " ")
      : echeance.toLocaleString(undefined, {
          dateStyle: "long", timeStyle: "short",
        });

    const titre = bandeau.querySelector("[data-premium-banner-title]");
    const detail = bandeau.querySelector("[data-premium-banner-detail]");
    const source = bandeau.querySelector("[data-premium-banner-source]");
    if (titre) titre.textContent = tp("prem.jusquAu", { date: lisible });
    if (detail) {
      detail.textContent = tp("prem.jusquAuDetail", {
        jours: Number(premiumEtat.days_left ?? 0),
      });
    }
    // Un premium offert par l'equipe n'est pas un abonnement paye : le
    // dire evite qu'on aille chercher un prelevement qui n'existe pas.
    if (source) {
      source.hidden = premiumEtat.source !== "admin";
    }
    bandeau.classList.toggle("is-cadeau", premiumEtat.source === "admin");
  }

  /**
   * Un panneau verrouille se lit, ne se modifie pas.
   *
   * Griser sans desactiver laissait tout cliquable : on reglait, on
   * enregistrait, et le bot refusait — sans que rien ne le dise a
   * l'ecran. Chaque champ neutralise porte une marque, pour ne
   * reactiver a la levee du verrou que ce que le verrou avait ferme :
   * un bouton deja desactive pour une autre raison doit le rester.
   */
  function verrouillerPanneau(section, ferme) {
    section.classList.toggle("is-locked", ferme);
    const champs = section.querySelectorAll(
      "input, select, textarea, button, [contenteditable='true']");
    champs.forEach((champ) => {
      if (champ.closest(".premium-lock")) return;  // le bouton « Voir les offres »
      if (ferme) {
        if (champ.disabled) return;                // deja ferme, pas par nous
        champ.dataset.verrouPremium = "1";
        champ.disabled = true;
        if (champ.isContentEditable) champ.contentEditable = "false";
      } else if (champ.dataset.verrouPremium === "1") {
        delete champ.dataset.verrouPremium;
        champ.disabled = false;
        if (champ.getAttribute("contenteditable") === "false") {
          champ.contentEditable = "true";
        }
      }
    });
  }

  /* ══════════════════════════════════════════════════════════════
     VOCAUX PERSONNALISES
     ══════════════════════════════════════════════════════════════ */

  const VOCAL_VARIABLES = [
    { token: "{username}", label: "js.voc.varPseudo" },
    { token: "{tag}", label: "js.voc.varTag" },
  ];

  function applyVoiceState(voice) {
    if (!voice || typeof voice !== "object") return;
    const actif = document.querySelector("[data-voice-enabled]");
    if (actif) {
      actif.checked = Boolean(voice.enabled);
      actif.closest(".toggle-line")?.classList.toggle("is-on", Boolean(voice.enabled));
    }
    const poser = (selecteur, valeur) => {
      const champ = document.querySelector(selecteur);
      if (!champ) return;
      champ.dataset.attendu = valeur || "";
      champ.value = valeur || "";
    };
    poser("[data-voice-hub]", voice.hub_id);
    poser("[data-voice-category]", voice.category_id);
    const nom = document.querySelector("[data-voice-name]");
    if (nom) nom.value = voice.name_template || "";
    const limite = document.querySelector("[data-voice-limit]");
    if (limite) limite.value = voice.user_limit ?? 0;
  }

  function collectVoiceConfig() {
    const actif = document.querySelector("[data-voice-enabled]");
    if (!actif) return undefined;
    return {
      enabled: Boolean(actif.checked),
      hub_id: document.querySelector("[data-voice-hub]")?.value || "",
      category_id: document.querySelector("[data-voice-category]")?.value || "",
      name_template: document.querySelector("[data-voice-name]")?.value || "",
      user_limit: Number(document.querySelector("[data-voice-limit]")?.value || 0),
      // `temporaires` n'est jamais envoye : c'est au bot de savoir quels
      // salons il a crees. Un client qui l'ecraserait laisserait des
      // salons que plus rien ne supprimerait.
    };
  }

  /* ══════════════════════════════════════════════════════════════
     LE SCORE DE SECURITE

     La note vient du bot, qui l'a calculee sur des reglages qu'il est
     alle lire. Le navigateur ne calcule rien : il affiche, et il trie
     les conseils du plus rentable au moins urgent — le tri vient du
     bot lui aussi, on le respecte.
     ══════════════════════════════════════════════════════════════ */

  const SCORE_TEINTES = {
    excellent: "142 62% 52%",
    solide: "162 68% 52%",
    perfectible: "34 92% 60%",
    fragile: "4 84% 64%",
  };

  /** Un mot dans la zone des conseils, plutot qu'une attente sans fin. */
  function messageScore(titre, detail = "") {
    const valeur = document.querySelector("[data-score-valeur]");
    const rang = document.querySelector("[data-score-rang]");
    const conseils = document.querySelector("[data-score-conseils]");
    if (valeur) valeur.textContent = "—";
    if (rang) rang.textContent = "";
    if (conseils) {
      conseils.innerHTML = `<div class="dashboard-empty-state">
        <strong>${escapeHtml(titre)}</strong>
        ${detail ? `<span>${escapeHtml(detail)}</span>` : ""}</div>`;
    }
  }

  async function chargerScoreSecurite() {
    const valeur = document.querySelector("[data-score-valeur]");
    const conseils = document.querySelector("[data-score-conseils]");
    if (!valeur) return;
    if (!selectedServer.id) {
      messageScore(t("score.choisirServeur"));
      return;
    }
    // Le bot refuserait de toute facon : autant l'expliquer ici plutot
    // que d'afficher une erreur technique.
    const ouvert = premiumEtat.active
      || (premiumEtat.features || {}).security_score === true;
    if (!ouvert) {
      messageScore(t("score.reservePremium"), t("score.reservePremiumAide"));
      return;
    }

    const demande = selectedServer.id;
    let data;
    try {
      data = await modbotApiFetch(
        `/api/guilds/${demande}/security/score`, { cache: "no-store" });
      if (!estEncoreLeServeur(demande)) return;
    } catch (erreur) {
      if (!estEncoreLeServeur(demande)) return;
      messageScore(t("score.indisponible"), erreur?.message || "");
      return;
    }

    const score = data?.score || {};
    peindreScore(score);
  }

  function peindreScore(score) {
    const jauge = document.querySelector("[data-score-jauge]");
    const valeur = document.querySelector("[data-score-valeur]");
    const rang = document.querySelector("[data-score-rang]");
    const general = document.querySelector("[data-score-conseil-general]");
    const familles = document.querySelector("[data-score-familles]");
    const conseils = document.querySelector("[data-score-conseils]");

    const note = Number(score.score || 0);
    const clef = score.rang?.clef || "fragile";
    if (valeur) valeur.textContent = String(note);
    if (jauge) {
      jauge.style.setProperty("--teinte", SCORE_TEINTES[clef] || SCORE_TEINTES.fragile);
      jauge.style.setProperty("--part", `${note}%`);
    }
    if (rang) rang.textContent = score.rang?.libelle || "";
    if (general) general.textContent = score.rang?.resume || "";

    if (familles) {
      familles.innerHTML = (score.familles || []).map((famille) => `
        <div class="score-famille">
          <strong>${escapeHtml(famille.libelle)}</strong>
          <span class="score-barre"><i style="--part:${Number(famille.score) || 0}%"></i></span>
          <small>${escapeHtml(String(famille.obtenus))} / ${escapeHtml(String(famille.total))}</small>
        </div>`).join("");
    }

    if (conseils) {
      const liste = score.conseils || [];
      conseils.innerHTML = liste.length
        ? liste.map((conseil) => `
            <div class="score-conseil">
              <span class="score-gain">+${escapeHtml(String(conseil.gain))}</span>
              <span class="score-conseil-texte">
                <strong>${escapeHtml(conseil.titre)}</strong>
                <small>${escapeHtml(conseil.conseil)}</small>
              </span>
            </div>`).join("")
        : `<div class="dashboard-empty-state">
             <strong>${escapeHtml(t("score.rienAFaire"))}</strong>
             <span>${escapeHtml(t("score.rienAFaireAide"))}</span>
           </div>`;
    }
  }

  function initScorePanel() {
    document.querySelector("[data-score-refresh]")
      ?.addEventListener("click", chargerScoreSecurite);
  }

  function initVoicePanel() {
    const hote = document.querySelector("[data-voice-variables]");
    const champ = document.querySelector("[data-voice-name]");
    if (!hote || !champ) return;
    hote.innerHTML = VOCAL_VARIABLES.map((v) => (
      `<button type="button" class="variable-chip" data-variable="${escapeHtml(v.token)}"
               title="${escapeHtml(t(v.label))}">${escapeHtml(v.token)}</button>`
    )).join("");
    hote.querySelectorAll("[data-variable]").forEach((chip) => {
      chip.addEventListener("click", () => {
        const debut = champ.selectionStart ?? champ.value.length;
        const fin = champ.selectionEnd ?? champ.value.length;
        const jeton = chip.dataset.variable;
        champ.value = champ.value.slice(0, debut) + jeton + champ.value.slice(fin);
        champ.focus();
        champ.setSelectionRange(debut + jeton.length, debut + jeton.length);
        markPanelDirty("voice");
      });
    });
  }

  /* ══════════════════════════════════════════════════════════════
     EVENEMENTS
     L'etat vit dans un tableau, pas dans le DOM : la liste des
     inscrits et le message publie appartiennent au bot, et le
     formulaire ne doit pas pouvoir les ecraser.
     ══════════════════════════════════════════════════════════════ */

  let evenements = [];

  function ligneEvenement(evenement, index) {
    const inscrits = (evenement.participants || []).length;
    const publie = Boolean(evenement.message_id);
    return `
      <article class="event-card" data-event-index="${index}">
        <div class="event-card-head">
          <strong>${escapeHtml(evenement.title || t("js.evt.sansTitre"))}</strong>
          <span class="state ${publie ? "active" : "inactive"}">
            ${escapeHtml(t(publie ? "js.evt.publie" : "js.evt.brouillon"))}
          </span>
        </div>
        <label class="mini-form"><span>${escapeHtml(t("js.evt.titre"))}</span>
          <input type="text" data-event-title maxlength="120"
                 value="${escapeHtml(evenement.title || "")}">
        </label>
        <label class="mini-form"><span>${escapeHtml(t("js.evt.description"))}</span>
          <textarea data-event-desc rows="3" maxlength="1500">${escapeHtml(evenement.description || "")}</textarea>
        </label>
        <div class="dashboard-grid two">
          <label class="mini-form"><span>${escapeHtml(t("js.evt.salon"))}</span>
            <select data-event-channel>${optionsSalons(evenement.channel_id || "", t("js.aucun"))}</select>
          </label>
          <label class="mini-form"><span>${escapeHtml(t("js.evt.date"))}</span>
            <input type="datetime-local" data-event-date
                   value="${escapeHtml(pourChampDate(evenement.starts_at))}">
          </label>
        </div>
        <div class="dashboard-grid two">
          <label class="mini-form"><span>${escapeHtml(t("js.evt.places"))}</span>
            <input type="number" data-event-max min="0" max="5000" step="1"
                   value="${Number(evenement.max || 0)}">
          </label>
          <div class="mini-form">
            <span>${escapeHtml(t("js.evt.inscrits"))}</span>
            <p class="captcha-state-value">${inscrits}</p>
          </div>
        </div>
        <div class="mini-form">
          <span>${escapeHtml(t("js.evt.image"))}</span>
          <div class="event-image-row">
            <span class="event-image-preview" data-event-image-preview>${
              evenement.image
                ? `<img src="${escapeHtml(evenement.image)}" alt="">`
                : `<span class="image-picker-empty">${escapeHtml(t("js.evt.imageAucune"))}</span>`
            }</span>
            <div class="event-image-actions">
              <button class="secondary-btn compact" type="button" data-event-image-pick="${index}">
                ${escapeHtml(t("js.evt.imageChoisir"))}
              </button>
              <button class="secondary-btn compact danger-btn" type="button"
                      data-event-image-clear="${index}"${evenement.image ? "" : " disabled"}>
                ${escapeHtml(t("js.evt.imageRetirer"))}
              </button>
            </div>
          </div>
          <input type="hidden" data-event-image value="${escapeHtml(evenement.image || "")}">
        </div>
        <p class="field-help">${escapeHtml(t("js.evt.imageAide"))}</p>
        <div class="search-actions">
          <button class="primary-btn compact" type="button" data-event-publish="${index}">
            ${escapeHtml(t(publie ? "js.evt.republier" : "js.evt.publier"))}
          </button>
          <button class="secondary-btn compact danger-btn" type="button" data-event-remove="${index}">
            ${escapeHtml(t("js.supprimer"))}
          </button>
        </div>
      </article>`;
  }

  /** ISO -> valeur d'un <input type="datetime-local">, en heure locale. */
  function pourChampDate(iso) {
    if (!iso) return "";
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "";
    const decalage = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - decalage).toISOString().slice(0, 16);
  }

  function redessinerEvenements() {
    const hote = document.querySelector("[data-event-list]");
    if (!hote) return;
    hote.innerHTML = evenements.length
      ? evenements.map(ligneEvenement).join("")
      : `<div class="dashboard-empty-state">
           <strong>${escapeHtml(t("js.evt.aucun"))}</strong>
           <span>${escapeHtml(t("js.evt.aucunAide"))}</span>
         </div>`;
  }

  function lireEvenementsDuDom() {
    document.querySelectorAll("[data-event-index]").forEach((carte) => {
      const index = Number(carte.dataset.eventIndex);
      const evenement = evenements[index];
      if (!evenement) return;
      const date = carte.querySelector("[data-event-date]")?.value || "";
      evenement.title = carte.querySelector("[data-event-title]")?.value || "";
      evenement.description = carte.querySelector("[data-event-desc]")?.value || "";
      evenement.channel_id = carte.querySelector("[data-event-channel]")?.value || "";
      evenement.starts_at = date ? new Date(date).toISOString() : "";
      evenement.max = Number(carte.querySelector("[data-event-max]")?.value || 0);
      evenement.image = carte.querySelector("[data-event-image]")?.value || "";
    });
    return evenements;
  }

  function applyEventsState(liste) {
    evenements = Array.isArray(liste) ? liste.map((e) => ({ ...e })) : [];
    redessinerEvenements();
  }

  function initEventsPanel() {
    const hote = document.querySelector("[data-event-list]");
    if (!hote) return;

    document.querySelector("[data-event-add]")?.addEventListener("click", () => {
      // On relit AVANT d'ajouter : le redessin repart du tableau, et ce
      // qui etait saisi dans les cartes existantes serait perdu.
      lireEvenementsDuDom();
      evenements.push({ title: "", description: "", channel_id: "",
                        starts_at: "", max: 0, image: "", participants: [] });
      redessinerEvenements();
      markPanelDirty("events");
    });

    hote.addEventListener("input", () => markPanelDirty("events"));

    // Un seul champ fichier pour toutes les cartes : on retient a qui il
    // sert le temps du choix. En creer un par carte les multiplierait a
    // chaque redessin.
    const choixFichier = document.createElement("input");
    choixFichier.type = "file";
    choixFichier.accept = "image/*";
    choixFichier.hidden = true;
    document.body.appendChild(choixFichier);
    let carteEnAttente = -1;

    choixFichier.addEventListener("change", async () => {
      const fichier = choixFichier.files?.[0];
      const index = carteEnAttente;
      choixFichier.value = "";
      carteEnAttente = -1;
      if (!fichier || index < 0) return;

      lireEvenementsDuDom();
      let reduite = null;
      try {
        reduite = await reduireAffiche(fichier);
      } catch (erreur) {
        reduite = null;
      }
      if (!reduite) {
        showToast(t("js.evt.imageTropLourde"));
        return;
      }
      if (evenements[index]) {
        evenements[index].image = reduite;
        redessinerEvenements();
        markPanelDirty("events");
      }
    });

    hote.addEventListener("click", async (evenement_clic) => {
      const choisir = evenement_clic.target.closest("[data-event-image-pick]");
      if (choisir) {
        carteEnAttente = Number(choisir.dataset.eventImagePick);
        choixFichier.click();
        return;
      }
      const effacer = evenement_clic.target.closest("[data-event-image-clear]");
      if (effacer) {
        lireEvenementsDuDom();
        const cible = evenements[Number(effacer.dataset.eventImageClear)];
        if (cible) {
          cible.image = "";
          redessinerEvenements();
          markPanelDirty("events");
        }
        return;
      }
      const retirer = evenement_clic.target.closest("[data-event-remove]");
      if (retirer) {
        // Meme raison : supprimer la troisieme carte ne doit pas effacer
        // ce qu'on venait de taper dans la premiere.
        lireEvenementsDuDom();
        evenements.splice(Number(retirer.dataset.eventRemove), 1);
        redessinerEvenements();
        markPanelDirty("events");
        return;
      }
      const publier = evenement_clic.target.closest("[data-event-publish]");
      if (!publier) return;

      lireEvenementsDuDom();
      const cible = evenements[Number(publier.dataset.eventPublish)];
      if (!cible?.title || !cible?.channel_id) {
        showToast(t("js.evt.titreEtSalon"));
        return;
      }
      // On enregistre avant de publier : le bot publie ce qu'il a en
      // base, pas ce qui est a l'ecran.
      const enregistre = await saveCurrentChanges(t("js.evt.enregistre"));
      if (!enregistre) return;
      try {
        await modbotApiFetch(`/api/guilds/${selectedServer.id}/events/publish`, {
          method: "POST",
          body: JSON.stringify({ id: cible.id }),
        });
        showToast(t("js.evt.publieOk"));
        await loadSelectedGuildConfig(selectedServer.id);
      } catch (erreur) {
        showToast(erreur?.message || t("js.evt.publicationImpossible"));
      }
    });
  }

  initVoicePanel();
  initEventsPanel();
  initActivationLicence();
  initScorePanel();

  function collectDashboardConfig() {
    // Le libellé est facultatif depuis que le bot sait publier le panneau
    // en boutons : une option qui porte une image ou un emoji se passe de
    // texte. On n'invente donc plus « Ticket » à sa place.
    const ticketOptions = Array.from(document.querySelectorAll("#ticketOptionList .option-row")).map((row) => {
      const image = row.querySelector("[data-option-image]")?.value.trim() || "";
      return {
        // Une image l'emporte : envoyer les deux laisserait le bot
        // trancher a notre place, et l'ecran ne montrerait pas ce que le
        // panneau publie.
        emoji: image ? "" : (row.querySelector("[data-option-emoji]")?.value.trim() || ""),
        image,
        label: row.querySelector("[data-option-label]")?.value.trim() || "",
        desc: row.querySelector("[data-option-desc]")?.value.trim() || "",
      };
    });
    const compteursEnvoyes = collectCompteurs();
    const salonSysteme = (clef) =>
      document.querySelector(`[data-channel="${clef}"]`)?.value || "";
    const socialRelays = Array.from(document.querySelectorAll(".social-card")).map((card) => ({
      platform: card.dataset.socialPlatform,
      link: card.querySelector("[data-social-link]")?.value || "",
      channel_id: card.querySelector("[data-social-channel]")?.value || "",
      enabled: Boolean(card.querySelector("[data-social-enabled]")?.checked),
      // Le bot revérifie de son côté : ce filtre évite juste d'envoyer
      // du texte qui sera rejeté.
      ping_roles: rolesDeLaCarte(card),
      ping_everyone: Boolean(card.querySelector("[data-social-everyone]")?.checked),
      message: card.querySelector("[data-social-message]")?.value || "",
    }));
    // Le panneau des roles-reactions a longtemps manque au HTML. Le
    // selecteur ne trouvait donc rien, la liste partait vide, et le bot
    // ecrasait la configuration du serveur a chaque enregistrement. On ne
    // renvoie desormais la clef que si le panneau est reellement present.
    const reactionPanelPresent = Boolean(document.querySelector("[data-reaction-role-list]"));
    // Lecture par nom, pas par rang. Un champ insere en amont deplacait
    // silencieusement tous les suivants — c'est ce qui avait fait
    // disparaitre le salon de depart des messages de bienvenue.
    const reactionRoles = Array.from(document.querySelectorAll(".reaction-role-row")).map((row) => {
      const role = row.querySelector("[data-rr-role]")?.value || "";
      return {
        emoji: row.querySelector("[data-rr-emoji]")?.value || "",
        role,
        role_id: role,
        label: row.querySelector("[data-rr-label]")?.value || "",
      };
    });
    const recurringMessages = Array.from(document.querySelectorAll(".recurring-item")).map((item) => ({
      enabled: true,
      name: item.dataset.name || item.querySelector("strong")?.textContent?.replace(/^\s*/, "") || t("js.messageRecurrent"),
      channel_id: item.dataset.channel || "",
      interval: Number(item.dataset.interval || 30),
      unit: item.dataset.unit || "minutes",
      content: item.dataset.content || t("js.exempleMessageRecurrent"),
      mode: item.dataset.mode || "repeat",
      last_sent: item.dataset.lastSent || "",
    }));
    const languageValue = document.querySelector("[data-bot-language]")?.value || "fr";
    const securityToggles = document.querySelectorAll("[data-dashboard-panel='security'] .toggle-line input");
    const customWords = (motsFiltres.length
      ? motsFiltres.join(", ")
      : document.querySelector("[data-custom-words]")?.value || "")
      .split(/[\n,;]+/)
      .map((word) => word.trim().toLowerCase())
      .filter(Boolean)
      .filter((word, index, words) => words.indexOf(word) === index);
    return {
      channels: {
        tickets: document.querySelector("[data-ticket-channel]")?.value || salonSysteme("tickets"),
        logs: salonSysteme("logs"),
        suggestions: salonSysteme("suggestions"),
        reports: salonSysteme("reports"),
        staff_alert: salonSysteme("staff_alert"),
      },
      security: {
        antilink: Boolean(securityToggles[0]?.checked),
        insultes_enabled: Boolean(securityToggles[1]?.checked),
        antispam: Boolean(securityToggles[2]?.checked),
        antiraid: Boolean(securityToggles[3]?.checked),
        staff_alert: Boolean(securityToggles[4]?.checked),
        lockdown: Boolean(securityToggles[5]?.checked),
        custom_words: customWords,
      },
      tickets: {
        author: document.querySelector("[data-preview-author]")?.value || "ModBot Ticket System",
        title: document.querySelector("[data-preview-title]")?.value || "Ouvre ton ticket",
        emoji: document.querySelector("[data-preview-emoji]")?.value || "",
        description: document.querySelector("[data-preview-desc]")?.value || "",
        banner: document.querySelector("[data-ticket-banner]")?.value || "",
        logo: document.querySelector("[data-ticket-logo]")?.value || "",
        support_role: document.querySelector("[data-ticket-support-role]")?.value || "",
        options: ticketOptions,
      },
      // Un seul constructeur pour la bienvenue. Il en existait un second
      // ici, perime : il oubliait `departure_channel_id`, visait
      // des champs disparus depuis, designes par des selecteurs morts,
      // et lisait `departure_enabled` sur la troisieme .toggle-line — la
      // case « message prive ». Comme sanitize_welcome_system() repart des
      // valeurs par defaut, chaque clef absente etait REMISE A ZERO : le
      // salon de depart s'effacait a chaque enregistrement, et les departs
      // repartaient alors dans le salon d'arrivee.
      welcome_system: collectWelcomePayload(),
      ...(reactionPanelPresent ? {
        reaction_title: document.querySelector("[data-reaction-title]")?.value || t("js.choisisTesRoles"),
        reaction_description: document.querySelector("[data-reaction-description]")?.value || "",
        reaction_roles_channel_id: document.querySelector("[data-reaction-channel]")?.value || "",
        reaction_roles_mode: document.querySelector("[data-reaction-mode]")?.value || t("js.plusieursRolesPossibles"),
        reaction_roles: reactionRoles,
      } : {}),
      auto_roles: collectAutoRoles(),
      ai: collectAiConfig(),
      voice: collectVoiceConfig(),
      ...(document.querySelector("[data-event-list]")
        ? { events: lireEvenementsDuDom() } : {}),
      recurring_messages: recurringMessages,
      compteurs: compteursEnvoyes,
      social_relays: socialRelays,
      language: languageValue,
      country: document.querySelector("[data-guild-country]")?.value || "",
      // Les reglages retires ne sont plus envoyes : les omettre evite
    // d ecraser des valeurs gerees ailleurs.
    };
  }

  async function saveDashboardConfigToApi() {
    if (!selectedServer.id || !selectedServer.installed) return false;
    const data = await modbotApiFetch(`/api/guilds/${selectedServer.id}/config`, {
      method: "PUT",
      body: JSON.stringify(collectDashboardConfig())
    });
    // Le bot renvoie ce qu'il a retenu : c'est a cet etat que « Reset »
    // et « Abandonner » ramenent ensuite.
    if (data?.config) derniereConfigEnregistree = JSON.stringify(data.config);
    return true;
  }






  function setCurrentServer(serverName, serverLogo = modbotDefaultLogo, initials = "MB", serverId = "", installed = false) {
    const safeLogo = serverLogo || modbotDefaultLogo;
    selectedServer = {
      id: serverId,
      name: serverName,
      logo: safeLogo,
      initials,
      installed: Boolean(installed)
    };
    // Retenu pour les autres pages : la page Premium doit savoir quel
    // serveur facturer, et elle n'a pas acces a cette variable.
    try {
      if (serverId) localStorage.setItem("modbot-selected-guild", serverId);
      if (serverName) localStorage.setItem("modbot-selected-guild-name", serverName);
    } catch (erreur) {
      // Navigation privee, stockage refuse : la page Premium demandera
      // simplement de passer par le dashboard.
    }
    currentServerTargets.forEach((target) => {
      target.textContent = serverName;
    });
    currentServerLogoShells.forEach((shell) => {
      shell.dataset.initials = initials;
      shell.classList.remove("is-fallback");
    });
    currentServerLogoTargets.forEach((logo) => {
      logo.src = safeLogo;
      logo.alt = serverName;
    });
  }

  function setTicketPublishVisible(isVisible) {
    if (!publishTicketButton) return;
    publishTicketButton.hidden = !isVisible;
  }

  function openBotInviteForGuild(guildId, guildName = t("js.ceServeur")) {
    if (!guildId || String(guildId).startsWith("local-")) {
      return openDiscordInviteSelector();
    }
    const inviteUrl = buildDiscordOAuthUrl("invite", guildId);
    if (!inviteUrl) {
      showToast(t("js.lienInvitationIndisponible"));
      return false;
    }
    window.open(inviteUrl, "_blank", "noreferrer");
    showToast(tp("js.inviteModbotSur", { serveur: guildName }));
    return true;
  }

  function markPanelDirty(panelName = activePanelName) {
    if (!panelName) return;
    hasUnsavedChanges = true;
    dirtyPanelName = panelName;
    dashboard.classList.add("has-unsaved");
    if (panelName === "tickets") {
      ticketNeedsPublish = true;
      setTicketPublishVisible(true);
    }
  }

  function clearUnsavedChanges() {
    hasUnsavedChanges = false;
    dirtyPanelName = null;
    dashboard.classList.remove("has-unsaved");
  }

  async function saveCurrentChanges(message = null) {
    message = message || t("dash.configurationEnregistree");
    if (serveurEnChargement()) {
      showToast(t("js.chargementEnCours"));
      return false;
    }
    if (!hasUnsavedChanges) {
      showToast(t("js.toutDejaEnregistre"));
      return true;
    }
    if (!selectedServer.id || !selectedServer.installed) {
      showToast(t("js.serveurNonRelieReconnecte"));
      return false;
    }
    let savedToApi = false;
    try {
      savedToApi = await saveDashboardConfigToApi();
    } catch (error) {
      showToast(tp("js.sauvegardeImpossibleDetail", { detail: error.message || t("js.connexionBotIndisponible") }));
      return false;
    }
    if (selectedServer.installed && !savedToApi) {
      showToast(t("js.connecteToiPourEnregistrer"));
      return false;
    }
    clearUnsavedChanges();
    showToast(savedToApi ? message : t("js.configGardeeDansPage"));
    return true;
  }

  function showUnsavedModal(action) {
    pendingNavigation = action;
    openPanel(activePanelName);
    if (!unsavedModal) {
      saveCurrentChanges().then((saved) => {
        if (saved) pendingNavigation?.();
        pendingNavigation = null;
      });
      return;
    }
    unsavedModal.hidden = false;
    dashboard.classList.add("is-navigation-blocked");
  }

  function closeUnsavedModal() {
    if (unsavedModal) unsavedModal.hidden = true;
    dashboard.classList.remove("is-navigation-blocked");
  }

  function runWithUnsavedGuard(action) {
    if (hasUnsavedChanges) {
      showUnsavedModal(action);
      return;
    }
    action();
  }

  /* ── Navigation repliable (petits ecrans) ─────────────────────────── */

  const sidebarToggle = document.querySelector("[data-sidebar-toggle]");
  const sidebarMenu = document.querySelector(".dashboard-sidebar");

  function sidebarDeroulante() {
    // La bascule n'est visible que sous 760 px ; au-dessus, la barre est
    // toujours ouverte et « fermer » n'aurait aucun sens.
    return !!sidebarToggle && getComputedStyle(sidebarToggle).display !== "none";
  }

  function ouvrirSidebar(ouvrir) {
    if (!sidebarMenu || !sidebarToggle) return;
    sidebarMenu.classList.toggle("is-open", ouvrir);
    sidebarToggle.setAttribute("aria-expanded", ouvrir ? "true" : "false");
    if (!ouvrir) {
      sidebarMenu.style.maxHeight = "";
      return;
    }
    // Hauteur calculee sur la place reellement disponible sous le bouton.
    // Une valeur en vh ne suffit pas : la barre du haut se replie sur trois
    // lignes en petit ecran, et le bas du menu finissait sous le pli — les
    // dernieres sections devenaient inatteignables sans faire defiler deux
    // fois, la page puis le menu.
    if (sidebarDeroulante()) {
      // Mesure prise sur le menu lui-meme, pas sur le bouton : la grille
      // insere un ecart entre les deux, et partir du bouton laissait
      // depasser le bas du menu d'exactement cet ecart.
      const haut = sidebarMenu.getBoundingClientRect().top;
      const place = Math.max(220, window.innerHeight - haut - 16);
      sidebarMenu.style.maxHeight = `${place}px`;
    }
  }

  function majLibelleSidebar(panelName) {
    const cible = document.querySelector("[data-sidebar-current]");
    const onglet = [...tabs].find((tab) => tab.dataset.dashboardTab === panelName);
    if (!cible || !onglet) return;
    // On passe par la clef, pas par le texte affiche de l'onglet : celui-ci
    // commence par une emoji decorative («Bienvenue ») qui n'a rien a
    // faire dans le libelle.
    const clef = onglet.dataset.i18n
      || onglet.querySelector("[data-i18n]")?.dataset.i18n;
    if (!clef) return;
    // La clef reste posee sur l'element : sans elle, changer de langue
    // rendrait au libelle sa valeur d'origine (« Vue globale »).
    cible.dataset.i18n = clef;
    cible.textContent = t(clef, cible.textContent);
  }

  sidebarToggle?.addEventListener("click", () => {
    ouvrirSidebar(!sidebarMenu?.classList.contains("is-open"));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && sidebarMenu?.classList.contains("is-open")) {
      ouvrirSidebar(false);
      sidebarToggle?.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!sidebarMenu?.classList.contains("is-open")) return;
    if (sidebarMenu.contains(event.target) || sidebarToggle?.contains(event.target)) return;
    ouvrirSidebar(false);
  });

  // Repasse en grand ecran alors que le menu etait ferme : sans ce
  // nettoyage la classe resterait posee et la barre laterale reapparaitrait
  // dans un etat incoherent au retour en petit ecran.
  window.addEventListener("resize", () => {
    if (!sidebarDeroulante()) ouvrirSidebar(false);
  });

  function openPanel(panelName) {
    activePanelName = panelName;
    tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.dashboardTab === panelName));
    panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.dashboardPanel === panelName));
    majLibelleSidebar(panelName);
    // Choisir une section referme le menu : le garder ouvert masquerait le
    // panneau qu'on vient d'ouvrir.
    if (sidebarDeroulante()) ouvrirSidebar(false);
    document.querySelector(".dashboard-content")?.scrollIntoView({ behavior: "smooth", block: "start" });
    // Ces panneaux interrogent Discord en direct : on ne charge qu'à l'ouverture.
    if (panelName === "search") runSearch();
    if (panelName === "giveaways") loadGiveaways();
    if (panelName === "welcome") renderWelcomePreview();
    if (panelName === "score") chargerScoreSecurite();
  }

  document.querySelector("[data-dashboard-login]")?.addEventListener("click", () => {
    dashboardLogin();
  });

  document.querySelector("[data-auth-back]")?.addEventListener("click", () => {
    showDashboardStage("auth");
  });

  serverSearchInput?.addEventListener("input", () => {
    renderGuildChoices(dashboardGuilds);
  });

  refreshDashboardServersButton?.addEventListener("click", async () => {
    if (getModbotSessionToken() || getModbotApiToken()) {
      try {
        await loadDashboardGuilds();
        showToast(t("js.serveursRafraichis"));
        return;
      } catch (error) {
        showToast(t("js.rafraichissementImpossible"));
      }
    }
    showDashboardStage("auth");
    showToast(t("js.connecteToiPourCharger"));
  });

  document.querySelector("[data-change-server]")?.addEventListener("click", () => {
    runWithUnsavedGuard(() => showDashboardStage("servers"));
  });

  /**
   * Ouvre un serveur à partir de n'importe quel élément portant les
   * attributs data-server-*. Partagé par la grille de sélection et le
   * menu déroulant de la barre supérieure.
   */
  async function selectGuildFromElement(element) {
    if (!element) return;
    const logoImg = element.querySelector("[data-logo-img]");
    const logo = logoImg?.currentSrc || logoImg?.src || element.dataset.serverLogo || modbotDefaultLogo;
    const nom = element.dataset.serverName || t("js.serveurModbot");
    const initiales = element.dataset.serverInitials || nom.slice(0, 2).toUpperCase() || "MB";
    const guildId = element.dataset.serverId || element.dataset.switcherGuild || "";
    const installe = element.dataset.serverInstalled === "true";
    const peutGerer = element.dataset.serverCanManage !== "false";

    if (!peutGerer) {
      showToast(t("js.permissionsInsuffisantes"));
      return;
    }
    if (!installe) {
      openBotInviteForGuild(guildId, nom);
      return;
    }
    if (guildId && guildId === selectedServer.id) {
      showDashboardStage("dashboard");
      return; // déjà ouvert : on évite un rechargement inutile
    }

    setCurrentServer(nom, logo, initiales, guildId, installe);
    showDashboardStage("dashboard");
    // Retour a la vue globale : rester sur la rubrique de l'autre
    // serveur donnait a lire des reglages qui n'etaient plus les siens,
    // le temps que la configuration arrive.
    openPanel("overview");
    showToast(`${nom}`);

    if (guildId) {
      await loadSelectedGuildConfig(guildId);
    } else {
      renderDashboardResources({});
    }
    clearUnsavedChanges();
    ticketNeedsPublish = false;
    setTicketPublishVisible(false);
  }

  document.querySelector(".server-picker .server-grid")?.addEventListener("click", (event) => {
    const carte = event.target.closest(".server-card[data-server-name]");
    if (carte) selectGuildFromElement(carte);
  });









  setupLogoFallbacks();
  setOfferInviteFallbackCopy();
  initApiUrlControls();
  initBlocCompte();

  // Clefs de traduction : le message est resolu au moment de l'affichage,
  // donc apres un changement de langue il sort dans la bonne.
  const LOGIN_ERROR_MESSAGES = {
    oauth_backend_required: "js.oauth.backendRequis",
    oauth_not_configured: "js.oauth.nonConfigure",
    oauth_state: "js.oauth.lienExpire",
    oauth_token: "js.oauth.codeRefuse",
    oauth_user: "js.oauth.profilManquant",
    oauth_guilds: "js.oauth.serveursManquants",
    missing_code: "js.oauth.codeManquant"
  };
  const LOGIN_ERROR_DETAILS = {
    oauth_not_configured: "js.oauth.detailNonConfigure",
    oauth_token: "js.oauth.detailCodeRefuse",
    oauth_state: "js.oauth.detailLienExpire"
  };

  const pendingLoginError = sessionStorage.getItem("modbot-login-error");
  if (pendingLoginError) {
    sessionStorage.removeItem("modbot-login-error");
    showDashboardStage("auth");
    const clefErreur = LOGIN_ERROR_MESSAGES[pendingLoginError];
    showToast(clefErreur
      ? t(clefErreur)
      : tp("js.oauth.impossible", { detail: pendingLoginError }));
    if (LOGIN_ERROR_DETAILS[pendingLoginError]) {
      renderAuthStatus({ level: "warn", message: t(LOGIN_ERROR_DETAILS[pendingLoginError]) });
    }
    findAvailableApiBase();
  } else {
    // Connexion automatique : le jeton fraîchement reçu de Discord est déjà
    // enregistré par initApiBridgeFromUrl, la session reprend toute seule.
    autoConnect();
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const panelName = tab.dataset.dashboardTab;
      if (!panelName || panelName === activePanelName) return;
      runWithUnsavedGuard(() => openPanel(panelName));
    });
  });

  initSearchPanel();
  initCaptchaPanel();
  initWelcomePanel();
  initGiveawayPanel();
  initAiAssistant();

  document.querySelectorAll("[data-dashboard-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      const panelName = button.dataset.dashboardJump;
      if (!panelName || panelName === activePanelName) return;
      runWithUnsavedGuard(() => openPanel(panelName));
    });
  });

  document.querySelectorAll("[data-dashboard-save]").forEach((button) => {
    button.addEventListener("click", () => {
      saveCurrentChanges(t("js.configEnregistreeDansBot"));
    });
  });

  // « Reset » et « Abandonner » remettaient seulement a zero le drapeau
  // « non enregistre » : les champs gardaient ce qu'on venait d'y taper,
  // le toast annoncait une section reinitialisee qui ne l'etait pas, et
  // ces valeurs repartaient au bot avec l'enregistrement suivant de
  // n'importe quelle autre rubrique. Ils remettent desormais a l'ecran le
  // dernier etat confirme par le bot.
  function remettreDernierEtat() {
    if (!derniereConfigEnregistree) return false;
    try {
      applyDashboardConfig(JSON.parse(derniereConfigEnregistree));
    } catch (erreur) {
      console.error("Retour au dernier etat enregistre :", erreur);
      return false;
    }
    if (dirtyPanelName === "tickets") {
      ticketNeedsPublish = false;
      setTicketPublishVisible(false);
    }
    clearUnsavedChanges();
    return true;
  }

  document.querySelectorAll("[data-reset-section]").forEach((button) => {
    button.addEventListener("click", () => {
      showToast(remettreDernierEtat() ? t("js.sectionReinitialisee") : t("js.selectionneDabord"));
    });
  });

  document.querySelector("[data-unsaved-save]")?.addEventListener("click", async () => {
    const action = pendingNavigation;
    const saved = await saveCurrentChanges(t("js.configSauvegardee"));
    if (!saved) return;
    closeUnsavedModal();
    pendingNavigation = null;
    action?.();
  });

  document.querySelector("[data-unsaved-discard]")?.addEventListener("click", () => {
    const action = pendingNavigation;
    closeUnsavedModal();
    remettreDernierEtat();
    if (dirtyPanelName === "tickets") {
      ticketNeedsPublish = false;
      setTicketPublishVisible(false);
    }
    clearUnsavedChanges();
    showToast(t("js.modificationsAbandonnees"));
    pendingNavigation = null;
    action?.();
  });

  // Le bandeau de verrouillage suit le panneau qu'on ouvre.
  document.addEventListener("click", (evenement) => {
    if (evenement.target.closest("[data-dashboard-tab]")) setTimeout(majCadenas, 0);
  });

  panels.forEach((panel) => {
    const panelName = panel.dataset.dashboardPanel;
    panel.addEventListener("input", (event) => {
      if (event.target.matches("input, textarea, select")) {
        if (event.target.closest(".channel-row")) setInputState(event.target);
        markPanelDirty(panelName);
      }
    });
    panel.addEventListener("change", (event) => {
      if (event.target.matches("input, textarea, select")) {
        if (event.target.closest(".channel-row")) setInputState(event.target);
        markPanelDirty(panelName);
      }
    });
  });

  document.querySelectorAll(".toggle-line input[type='checkbox']").forEach((checkbox) => {
    const line = checkbox.closest(".toggle-line");
    const syncToggle = () => line?.classList.toggle("is-on", checkbox.checked);
    syncToggle();
    checkbox.addEventListener("change", () => {
      syncToggle();
      markPanelDirty(checkbox.closest("[data-dashboard-panel]")?.dataset.dashboardPanel || activePanelName);
      showToast(t(checkbox.checked ? "js.moduleActive" : "js.moduleDesactive"));
    });
  });

  const previewTitle = document.querySelector("[data-preview-title]");
  const previewDescription = document.querySelector("[data-preview-desc]");
  const previewEmoji = document.querySelector("[data-preview-emoji]");
  const liveTitle = document.querySelector("[data-live-title]");
  const liveDescription = document.querySelector("[data-live-desc]");
  const liveTicketEmoji = document.querySelector("[data-live-ticket-emoji]");

  previewTitle?.addEventListener("input", () => {
    if (liveTitle) liveTitle.textContent = previewTitle.value || t("dash.ouvreTonTicket");
  });

  previewDescription?.addEventListener("input", () => {
    if (liveDescription) liveDescription.textContent = previewDescription.value || t("js.merciDeSelectionner");
  });

  previewEmoji?.addEventListener("input", () => {
    if (liveTicketEmoji) liveTicketEmoji.textContent = previewEmoji.value || "";
  });

  const optionList = document.getElementById("ticketOptionList");
  const addOptionButton = document.querySelector("[data-add-ticket-option]");

  addOptionButton?.addEventListener("click", () => {
    if (!optionList) return;
    const count = optionList.querySelectorAll(".option-row").length + 1;
    const option = document.createElement("div");
    // Cette ligne n'avait que quatre champs quand celle du serveur en a
    // cinq : lus par leur rang, la description finissait dans le libelle.
    optionList.insertAdjacentHTML("beforeend", ligneOptionTicket(count, {
      label: t("js.nouvelleOption"),
      desc: t("js.descriptionOption"),
    }));
    markPanelDirty("tickets");
    showToast(t("js.optionAjoutee"));
  });

  optionList?.addEventListener("click", (event) => {
    // Seul le bouton de suppression supprime. La cellule d'image porte
    // elle aussi des boutons : sans ce filtre, cliquer « Image » effacait
    // l'option entiere.
    const button = event.target.closest("[data-option-remove]");
    if (!button) return;
    const rows = optionList.querySelectorAll(".option-row");
    if (rows.length <= 1) {
      showToast(t("js.garderUneOption"));
      return;
    }
    button.closest(".option-row")?.remove();
    optionList.querySelectorAll(".option-row span").forEach((label, index) => {
      label.textContent = String(index + 1).padStart(2, "0");
    });
    markPanelDirty("tickets");
    showToast(t("js.optionSupprimee"));
  });

  publishTicketButton?.addEventListener("click", async () => {
    const channel = ticketChannelInput?.value.trim() || t("js.salonTicketDesigne");
    if (!selectedServer.id || !selectedServer.installed) {
      showToast(t("js.serveurNonRelie"));
      return;
    }
    if (hasUnsavedChanges) {
      const saved = await saveCurrentChanges(t("js.configTicketEnregistree"));
      if (!saved) return;
    }
    try {
      await modbotApiFetch(`/api/guilds/${selectedServer.id}/tickets/publish`, {
        method: "POST",
        body: JSON.stringify({ channel_id: channel })
      });
    } catch (error) {
      showToast(t("js.publicationImpossible"));
      return;
    }
    ticketNeedsPublish = false;
    setTicketPublishVisible(false);
    if (dirtyPanelName === "tickets") clearUnsavedChanges();
    showToast(tp("js.ticketPublieDans", { salon: channel }));
  });

  // ── Variables du message d'annonce ──────────────────────────────
  // Meme geste que pour les messages de bienvenue : on insere au curseur
  // plutot qu'a la fin, sinon la variable atterrit toujours au mauvais
  // endroit quand on revient corriger une phrase.
  // Memes jetons dans les cinq langues, comme WELCOME_VARIABLES : un
  // exemple copie ailleurs fonctionne quel que soit le reglage de langue.
  const SOCIAL_VARIABLES = [
    { token: "{account}", label: "js.varCompteSocial" },
    { token: "{platform}", label: "js.varPlateformeSociale" },
    { token: "{title}", label: "js.varTitrePublication" },
    { token: "{link}", label: "js.varLienPublication" },
    { token: "{description}", label: "js.varDescriptionPublication" },
    { token: "{server}", label: "js.varServeur" },
    { token: "{kind}", label: "js.varTypePublication" },
    { token: "{date}", label: "js.varDatePublication" },
    // Ces deux-la n'ont de sens que sur un DIRECT : ailleurs elles
    // restent vides, et la ligne qui ne contient qu'elles disparait a
    // l'envoi. Le jeu est propre a Twitch ; les spectateurs valent
    // aussi pour un direct YouTube.
    { token: "{game}", label: "js.varJeu", reseaux: ["twitch"] },
    { token: "{viewers}", label: "js.varSpectateurs", reseaux: ["twitch", "youtube"] },
  ];

  /**
   * Le message propose pour chaque reseau.
   *
   * Le meme texte partout n'avait aucun sens : « est en live » sous une
   * photo Instagram est simplement faux. Ces valeurs doivent rester
   * identiques a MESSAGES_DEFAUT dans reseaux_sociaux.py — c'est le bot
   * qui les applique quand le champ est laisse vide.
   */
  const SOCIAL_MESSAGES_DEFAUT = {
    "Twitter/X": "{account} vient de poster sur X 🐦\n{link}",
    TikTok: "Nouvelle vidéo TikTok de {account} 🎵\n{link}",
    Instagram: "{account} a publié sur Instagram 📸\n{link}",
    Twitch: "🔴 {account} est en live : {title}\nOn joue à {game} — {link}",
    YouTube: "Nouvelle vidéo de {account} ▶️\n{title}\n{link}",
  };

  /* ══════════════════════════════════════════════════════════════
     COMPTEURS DE SERVEUR

     Un chiffre dans un nom de salon. Le navigateur ne compte rien :
     il propose des modeles, montre un apercu, et laisse le bot faire
     le calcul — lui seul connait le serveur.
     ══════════════════════════════════════════════════════════════ */

  // Ces variables doivent rester le miroir de VARIABLES dans
  // compteurs.py : une puce que le bot ne sait pas remplir serait
  // effacée du nom du salon au lieu d'y écrire un chiffre.
  const COMPTEUR_VARIABLES = [
    { token: "{membres}", label: "cpt.varMembres" },
    { token: "{humains}", label: "cpt.varHumains" },
    { token: "{bots}", label: "cpt.varBots" },
    { token: "{en_ligne}", label: "cpt.varEnLigne" },
    { token: "{en_vocal}", label: "cpt.varEnVocal" },
    { token: "{boosts}", label: "cpt.varBoosts" },
    { token: "{niveau_boost}", label: "cpt.varNiveauBoost" },
    { token: "{salons}", label: "cpt.varSalons" },
    { token: "{salons_textuels}", label: "cpt.varSalonsTextuels" },
    { token: "{salons_vocaux}", label: "cpt.varSalonsVocaux" },
    { token: "{categories}", label: "cpt.varCategories" },
    { token: "{roles}", label: "cpt.varRoles" },
    { token: "{emojis}", label: "cpt.varEmojis" },
    { token: "{stickers}", label: "cpt.varStickers" },
  ];

  const COMPTEUR_MODELES = [
    { clef: "membres", gabarit: "📊 Membres : {membres}" },
    { clef: "humains", gabarit: "👥 Joueurs : {humains}" },
    { clef: "enligne", gabarit: "🟢 En ligne : {en_ligne}" },
    { clef: "envocal", gabarit: "🔊 En vocal : {en_vocal}" },
    { clef: "boosts", gabarit: "🚀 Boosts : {boosts}" },
    { clef: "bots", gabarit: "🤖 Bots : {bots}" },
    { clef: "salons", gabarit: "💬 Salons : {salons}" },
    { clef: "roles", gabarit: "🎭 Rôles : {roles}" },
  ];

  let compteurs = [];

  /** L'apercu : des chiffres d'exemple, pas des chiffres inventes du
      serveur — le bot seul les connait, et mentir serait pire. */
  function apercuCompteur(gabarit) {
    const exemples = {
      "{membres}": "4 167", "{humains}": "4 090", "{bots}": "77",
      "{en_ligne}": "812", "{en_vocal}": "23", "{boosts}": "14",
      "{niveau_boost}": "3", "{salons}": "62", "{salons_textuels}": "48",
      "{salons_vocaux}": "9", "{categories}": "7", "{roles}": "41",
      "{emojis}": "120", "{stickers}": "4",
    };
    let texte = String(gabarit || "");
    for (const [jeton, valeur] of Object.entries(exemples)) {
      texte = texte.split(jeton).join(valeur);
    }
    // « {role:123…} » compte les porteurs d'un rôle. Sans cette ligne il
    // restait écrit tel quel dans l'aperçu — la seule variable qu'on
    // voyait en clair au lieu d'un chiffre.
    texte = texte.replace(/\{(?:role|rôle)\s*:\s*\d{15,25}\}/g, "128");
    return texte.replace(/\{[a-zA-Z_]{2,20}\}/g, "").replace(/\s{2,}/g, " ").trim();
  }

  function renderCompteurs() {
    const hote = document.querySelector("[data-compteur-list]");
    const compte = document.querySelector("[data-compteur-count]");
    if (compte) compte.textContent = compteurs.length
      ? tp("cpt.nActifs", { n: compteurs.filter((c) => c.enabled !== false).length })
      : "";
    if (!hote) return;
    if (!compteurs.length) {
      hote.innerHTML = `<div class="recurring-empty">${escapeHtml(t("cpt.aucun"))}</div>`;
      return;
    }
    hote.innerHTML = compteurs.map((c, rang) => `
      <div class="recurring-item" data-compteur-rang="${rang}">
        <span>
          <strong>${escapeHtml(apercuCompteur(c.template))}</strong>
          <small>${escapeHtml(nomDuSalon(c.channel_id))} · ${escapeHtml(c.template)}</small>
        </span>
        <button class="secondary-btn compact danger" type="button" data-compteur-retirer>${escapeHtml(t("js.supprimer"))}</button>
      </div>`).join("");
    hote.querySelectorAll("[data-compteur-rang]").forEach((ligne) => {
      ligne.querySelector("[data-compteur-retirer]")
        ?.addEventListener("click", (evenement) =>
          supprimerCompteur(Number(ligne.dataset.compteurRang), evenement.currentTarget));
    });
  }

  /**
   * Retire un compteur, et son salon avec.
   *
   * Le salon d'un compteur ne sert qu'à porter son chiffre : personne
   * ne peut s'y connecter, il ne dit rien d'autre. En laisser un
   * derrière soi, c'est laisser un nom qui ne bouge plus.
   *
   * Suppression en deux temps, comme les giveaways : supprimer un
   * salon Discord ne se rattrape pas, un clic de trop non plus.
   */
  async function supprimerCompteur(rang, bouton) {
    const compteur = compteurs[rang];
    if (!compteur) return;

    if (bouton && !bouton.dataset.confirming) {
      bouton.dataset.confirming = "1";
      bouton.textContent = t("js.confirmer");
      bouton.classList.add("is-confirming");
      window.setTimeout(() => {
        if (!bouton.isConnected) return;
        delete bouton.dataset.confirming;
        bouton.textContent = t("js.supprimer");
        bouton.classList.remove("is-confirming");
      }, 5000);
      return;
    }

    if (!selectedServer.id) return showToast(t("js.selectionneDabord"));
    try {
      // C'est le bot qui supprime : lui seul a la main sur le salon, et
      // lui seul peut dire si Discord a refusé.
      const data = await modbotApiFetch(
        `/api/guilds/${selectedServer.id}/compteurs/${compteur.channel_id}`,
        { method: "DELETE" });
      applyCompteurs(data?.compteurs || []);
      showToast(data?.detail || t("js.cpt.supprime"));
      loadDashboardResources(selectedServer.id);
    } catch (erreur) {
      showToast(erreur?.message || t("js.suppressionImpossible"));
    }
  }

  function applyCompteurs(liste) {
    compteurs = Array.isArray(liste) ? liste : [];
    renderCompteurs();
  }

  function collectCompteurs() {
    return compteurs;
  }

  function initCompteurs() {
    const gabarit = document.querySelector("[data-compteur-gabarit]");
    const apercu = document.querySelector("[data-compteur-apercu]");
    const modeles = document.querySelector("[data-compteur-modele]");
    const chips = document.querySelector("[data-compteur-variables]");
    if (!gabarit) return;

    const rafraichir = () => {
      if (apercu) apercu.textContent = apercuCompteur(gabarit.value) || "—";
    };

    if (modeles) {
      modeles.innerHTML = COMPTEUR_MODELES
        .map((m) => `<option value="${escapeHtml(m.gabarit)}">${escapeHtml(m.gabarit)}</option>`)
        .join("");
      modeles.addEventListener("change", () => {
        gabarit.value = modeles.value;
        rafraichir();
      });
      gabarit.value = COMPTEUR_MODELES[0].gabarit;
    }

    if (chips) {
      chips.innerHTML = COMPTEUR_VARIABLES.map((v) => (
        `<button type="button" class="variable-chip" data-variable="${escapeHtml(v.token)}"
                 title="${escapeHtml(t(v.label))}">${escapeHtml(v.token)}</button>`
      )).join("");
      chips.querySelectorAll("[data-variable]").forEach((puce) => {
        puce.addEventListener("click", () => {
          const debut = gabarit.selectionStart ?? gabarit.value.length;
          const fin = gabarit.selectionEnd ?? gabarit.value.length;
          const jeton = puce.dataset.variable;
          gabarit.value = gabarit.value.slice(0, debut) + jeton + gabarit.value.slice(fin);
          gabarit.focus();
          gabarit.setSelectionRange(debut + jeton.length, debut + jeton.length);
          rafraichir();
        });
      });
    }

    gabarit.addEventListener("input", rafraichir);
    rafraichir();

    document.querySelector("[data-compteur-creer]")?.addEventListener("click", async () => {
      if (!selectedServer.id) return showToast(t("js.selectionneDabord"));
      const modele = gabarit.value.trim();
      if (!modele) return showToast(t("cpt.modeleVide"));
      try {
        // C'est le BOT qui cree le salon : lui seul peut poser les
        // permissions, et lui seul connait les chiffres du serveur.
        const data = await modbotApiFetch(
          `/api/guilds/${selectedServer.id}/compteurs`,
          { method: "POST", body: JSON.stringify({ template: modele }) });
        applyCompteurs(data?.compteurs || compteurs);
        showToast(tp("cpt.cree", { nom: data?.name || modele }));
        loadDashboardResources(selectedServer.id);
      } catch (erreur) {
        showToast(erreur?.message || t("js.actionRefusee"));
      }
    });
  }

  function initSocialVariables() {
    document.querySelectorAll("[data-social-variables]").forEach((host) => {
      const carte = host.closest(".social-card");
      const zone = carte?.querySelector("[data-social-message]");
      if (!zone) return;
      const reseau = carte.dataset.socialPlatform || "";
      // Le message propose apparait en filigrane : le champ reste vide,
      // et un champ vide vaut « prends celui de la plateforme ». Ecrire
      // le texte dedans obligerait a l'effacer pour revenir au defaut.
      const propose = SOCIAL_MESSAGES_DEFAUT[reseau];
      if (propose) zone.placeholder = propose;
      // Proposer une variable qui restera vide revient a proposer du
      // vide : on ne montre que celles qui ont un sens sur ce reseau.
      const minuscule = reseau.toLowerCase();
      const utiles = SOCIAL_VARIABLES.filter(
        (v) => !v.reseaux || v.reseaux.some((r) => minuscule.includes(r)));
      host.innerHTML = utiles.map((v) => (
        `<button type="button" class="variable-chip" data-variable="${escapeHtml(v.token)}"
                 title="${escapeHtml(t(v.label))}">${escapeHtml(v.token)}</button>`
      )).join("");
      host.querySelectorAll("[data-variable]").forEach((chip) => {
        chip.addEventListener("click", () => {
          const debut = zone.selectionStart ?? zone.value.length;
          const fin = zone.selectionEnd ?? zone.value.length;
          const jeton = chip.dataset.variable;
          zone.value = zone.value.slice(0, debut) + jeton + zone.value.slice(fin);
          zone.focus();
          zone.setSelectionRange(debut + jeton.length, debut + jeton.length);
          markPanelDirty("socials");
        });
      });
    });
  }

  initSocialVariables();
  initCompteurs();
  initAutoRoles();
  initImagesTicket();
  /* ══════════════════════════════════════════════════════════════
     ASSISTANT IA DU SERVEUR
     A ne pas confondre avec l'assistant flottant de cette page, qui
     repond sur la configuration du dashboard. Celui-ci fait repondre
     ModBot aux membres, sur Discord, quand ils le mentionnent.
     ══════════════════════════════════════════════════════════════ */

  let iaSalonsChoisis = [];

  function nomDuSalon(id) {
    const trouve = dashboardResources.channels.find((c) => String(c.id) === String(id));
    return trouve ? channelLabel(trouve) : `#${id}`;
  }

  function redessinerSalonsIa() {
    const hote = document.querySelector("[data-ia-channels]");
    if (!hote) return;
    hote.innerHTML = iaSalonsChoisis.length
      ? iaSalonsChoisis.map((id) => (
          `<button type="button" class="variable-chip" data-retirer-salon="${escapeHtml(id)}"
                   title="${escapeHtml(t("js.ia.retirerSalon"))}">${escapeHtml(nomDuSalon(id))} &times;</button>`
        )).join("")
      : `<span class="field-help">${escapeHtml(t("js.ia.partout"))}</span>`;
  }

  function applyAiState(ai) {
    if (!ai || typeof ai !== "object") {
      // Le bot n'a pas renvoye de bloc « ai » : autant le dire. Trois
      // tirets laissent croire a un chargement qui n'arrivera jamais.
      ["[data-ia-provider]", "[data-ia-model]", "[data-ia-key]"].forEach((sel) => {
        const cible = document.querySelector(sel);
        if (cible) cible.textContent = t("js.ia.indisponible");
      });
      return;
    }

    const actif = document.querySelector("[data-ia-enabled]");
    if (actif) {
      actif.checked = Boolean(ai.enabled);
      actif.closest(".toggle-line")?.classList.toggle("is-on", Boolean(ai.enabled));
    }
    const persona = document.querySelector("[data-ia-persona]");
    if (persona) persona.value = ai.persona || "";

    iaSalonsChoisis = [...new Set((ai.channels || []).map(String))].slice(0, 25);
    redessinerSalonsIa();

    const etat = document.querySelector("[data-ia-state]");
    if (etat) {
      // Actif mais sans clef, c'est un piege : le reglage est vert et rien
      // ne repond. On le distingue donc de « inactif ».
      const enMarche = Boolean(ai.enabled) && Boolean(ai.configured);
      etat.classList.toggle("active", enMarche);
      etat.classList.toggle("inactive", !enMarche);
      etat.textContent = t(
        !ai.configured ? "js.ia.sansClef" : (ai.enabled ? "js.actif" : "js.inactif"));
    }

    const poser = (selecteur, valeur) => {
      const cible = document.querySelector(selecteur);
      if (cible) cible.textContent = valeur || "—";
    };
    poser("[data-ia-provider]", ai.provider);
    poser("[data-ia-model]", ai.model);
    poser("[data-ia-key]", t(ai.configured ? "js.ia.clefPosee" : "js.ia.clefAbsente"));

    // Le conseil de configuration n'a de sens que si quelque chose cloche.
    const conseil = document.querySelector("[data-ia-advice]");
    if (conseil) {
      const aDireQuelqueChose = !ai.configured && Boolean(ai.advice);
      conseil.hidden = !aDireQuelqueChose;
      if (aDireQuelqueChose) {
        poser("[data-ia-advice-title]", ai.advice_title);
        poser("[data-ia-advice-text]", ai.advice);
      }
    }
  }

  function collectAiConfig() {
    const actif = document.querySelector("[data-ia-enabled]");
    if (!actif) return undefined;
    return {
      enabled: Boolean(actif.checked),
      channels: iaSalonsChoisis.slice(0, 25),
      persona: document.querySelector("[data-ia-persona]")?.value || "",
    };
  }

  function initAiPanel() {
    const picker = document.querySelector("[data-ia-channel-picker]");
    const hote = document.querySelector("[data-ia-channels]");
    if (picker && hote) {
      picker.addEventListener("change", () => {
        const id = picker.value;
        picker.value = "";
        if (!id) return;
        if (iaSalonsChoisis.includes(id)) return showToast(t("js.ia.salonDejaChoisi"));
        if (iaSalonsChoisis.length >= 25) return showToast(t("js.ia.tropDeSalons"));
        iaSalonsChoisis.push(id);
        redessinerSalonsIa();
        markPanelDirty("ai");
      });
      hote.addEventListener("click", (evenement) => {
        const chip = evenement.target.closest("[data-retirer-salon]");
        if (!chip) return;
        iaSalonsChoisis = iaSalonsChoisis.filter((x) => x !== chip.dataset.retirerSalon);
        redessinerSalonsIa();
        markPanelDirty("ai");
      });
    }

    document.querySelector("[data-ia-reset]")?.addEventListener("click", async () => {
      if (!selectedServer.id) return showToast(t("js.selectionneDabord"));
      if (!window.confirm(t("js.ia.confirmerOubli"))) return;
      try {
        const data = await modbotApiFetch(`/api/guilds/${selectedServer.id}/ai/reset`, {
          method: "POST",
          body: JSON.stringify({}),
        });
        showToast(tp("js.ia.contexteEfface", { n: data?.cleared ?? 0 }));
      } catch (error) {
        showToast(error?.message || t("js.ia.oubliImpossible"));
      }
    });
  }

  /* ── Mots filtres ───────────────────────────────────────────────
     C'etait une zone de texte enregistree par la sauvegarde generale.
     Sur telephone ce bouton est loin, et dans une zone de texte la
     touche Entree ajoute une ligne au lieu de valider : on croyait avoir
     ajoute le mot, il n'etait nulle part. */

  let motsFiltres = [];

  function redessinerMots() {
    const hote = document.querySelector("[data-word-chips]");
    const cache = document.querySelector("[data-custom-words]");
    if (cache) cache.value = motsFiltres.join(", ");
    if (!hote) return;
    hote.innerHTML = motsFiltres.length
      ? motsFiltres.map((mot) => (
          `<button type="button" class="variable-chip" data-retirer-mot="${escapeHtml(mot)}"
                   title="${escapeHtml(t("js.retirerCeMot"))}">${escapeHtml(mot)} &times;</button>`
        )).join("")
      : `<span class="field-help">${escapeHtml(t("js.aucunMotFiltre"))}</span>`;
  }

  function ajouterMots(saisie) {
    // Une virgule ou un retour a la ligne separe : coller une liste
    // entiere doit marcher aussi bien que taper un mot.
    const candidats = String(saisie || "")
      .split(/[,\n;]+/)
      .map((mot) => mot.trim().toLowerCase())
      .filter(Boolean);
    if (!candidats.length) return 0;
    let ajoutes = 0;
    candidats.forEach((mot) => {
      if (mot.length > 60 || motsFiltres.includes(mot)) return;
      motsFiltres.push(mot);
      ajoutes += 1;
    });
    if (ajoutes) {
      redessinerMots();
      markPanelDirty("moderation");
    }
    return ajoutes;
  }

  function appliquerMotsFiltres(mots) {
    motsFiltres = [...new Set((mots || []).map((m) => String(m).trim().toLowerCase()))]
      .filter(Boolean);
    redessinerMots();
  }

  function initMotsFiltres() {
    const champ = document.querySelector("[data-word-input]");
    const bouton = document.querySelector("[data-word-add]");
    const hote = document.querySelector("[data-word-chips]");
    if (!champ || !bouton || !hote) return;

    const valider = () => {
      const ajoutes = ajouterMots(champ.value);
      if (!ajoutes) {
        showToast(champ.value.trim() ? t("js.motDejaPresent") : t("js.motVide"));
        return;
      }
      champ.value = "";
      champ.focus();
      showToast(tp("js.motsAjoutes", { n: ajoutes }));
    };

    bouton.addEventListener("click", valider);
    champ.addEventListener("keydown", (evenement) => {
      if (evenement.key !== "Enter") return;
      // Sans cela, Entree soumettrait le formulaire environnant et la
      // page se rechargerait sans rien enregistrer.
      evenement.preventDefault();
      valider();
    });

    hote.addEventListener("click", (evenement) => {
      const chip = evenement.target.closest("[data-retirer-mot]");
      if (!chip) return;
      motsFiltres = motsFiltres.filter((m) => m !== chip.dataset.retirerMot);
      redessinerMots();
      markPanelDirty("moderation");
    });

    // Sans ce premier dessin, la zone reste vide au chargement : ni mots,
    // ni message expliquant qu'il n'y en a pas.
    redessinerMots();
  }

  /* ── Choix d'emoji ──────────────────────────────────────────────
     Sur telephone le clavier en propose ; sur ordinateur il faut
     connaitre un raccourci ou ouvrir une table de caracteres. Les
     champs restaient vides. Une palette au clic suffit — le champ
     reste modifiable a la main pour ce qui n'y figure pas. */

  const EMOJIS_COURANTS = [
    "🎫", "📩", "💬", "❓", "❔", "🆘", "🛠️", "⚙️", "🔧", "📌",
    "📝", "📋", "📁", "🔒", "🔓", "🔑", "🛡️", "⚠️", "🚨", "⛔",
    "✅", "❌", "⭐", "🌟", "💡", "🔔", "📢", "📣", "🎁", "🎉",
    "🎮", "🕹️", "🎲", "🎧", "🎵", "🎬", "📺", "📷", "🖼️", "🎨",
    "💰", "💳", "🛒", "📦", "🚀", "🔥", "💎", "👑", "🏆", "🥇",
    "❤️", "💙", "💚", "💜", "🧡", "🤍", "👍", "👎", "👋", "🙏",
    "😀", "😎", "🤔", "😴", "🥳", "😇", "🤖", "👻", "🐱", "🐶",
    "🌍", "🌙", "☀️", "🌈", "⚡", "❄️", "🍀", "🌸", "🍕", "☕",
  ];

  let paletteOuverte = null;

  function fermerPaletteEmoji() {
    paletteOuverte?.remove();
    paletteOuverte = null;
  }

  function ouvrirPaletteEmoji(champ) {
    fermerPaletteEmoji();
    const palette = document.createElement("div");
    palette.className = "emoji-palette";
    palette.innerHTML = EMOJIS_COURANTS
      .map((e) => `<button type="button" data-emoji="${e}">${e}</button>`).join("")
      + `<button type="button" class="emoji-palette-clear" data-emoji="">`
      + `${escapeHtml(t("js.emoji.aucun"))}</button>`;

    // Positionnee sous le champ, ramenee dans la fenetre si elle deborde.
    const boite = champ.getBoundingClientRect();
    palette.style.top = `${boite.bottom + window.scrollY + 6}px`;
    palette.style.left = `${Math.max(8, Math.min(
      boite.left + window.scrollX,
      window.innerWidth - 300))}px`;
    document.body.append(palette);
    paletteOuverte = palette;

    palette.addEventListener("click", (evenement) => {
      const bouton = evenement.target.closest("[data-emoji]");
      if (!bouton) return;
      champ.value = bouton.dataset.emoji;
      champ.dispatchEvent(new Event("input", { bubbles: true }));
      champ.dispatchEvent(new Event("change", { bubbles: true }));
      fermerPaletteEmoji();
    });
  }

  // Delegue : les lignes d'option et de role sont creees en cours de route.
  document.addEventListener("click", (evenement) => {
    const champ = evenement.target.closest(".emoji-input, .emoji-input-wide");
    if (champ) {
      ouvrirPaletteEmoji(champ);
      return;
    }
    if (!evenement.target.closest(".emoji-palette")) fermerPaletteEmoji();
  });

  document.addEventListener("keydown", (evenement) => {
    if (evenement.key === "Escape") fermerPaletteEmoji();
  });

  window.addEventListener("resize", fermerPaletteEmoji);
  window.addEventListener("scroll", fermerPaletteEmoji, true);

  initMotsFiltres();

  initAiPanel();

  initMentionsRelais();

  document.querySelector("[data-publish-reaction-roles]")?.addEventListener("click", async () => {
    const channel = document.querySelector("[data-reaction-channel]")?.value.trim();
    if (!selectedServer.id || !selectedServer.installed) {
      showToast(t("js.serveurNonRelie"));
      return;
    }
    if (!channel) {
      showToast(t("js.choisisSalonRoles"));
      return;
    }
    const saved = await saveCurrentChanges(t("js.rolesReactionsEnregistres"));
    if (!saved) return;
    try {
      await modbotApiFetch(`/api/guilds/${selectedServer.id}/reaction-roles/publish`, {
        method: "POST",
        body: JSON.stringify(collectDashboardConfig())
      });
      showToast(tp("js.rolesReactionsPublies", { salon: channel }));
    } catch (error) {
      showToast(t("js.publicationRolesImpossible"));
    }
  });

  // L'aperçu de bienvenue vit maintenant dans applyWelcomeState() : l'ancien
  // syncWelcomePreview() visait des éléments supprimés avec le panneau
  // précédent (data-welcome-card, data-departure-card…) et n'écrivait plus
  // nulle part.

  const reactionTitleInput = document.querySelector("[data-reaction-title]");
  const reactionDescriptionInput = document.querySelector("[data-reaction-description]");
  const reactionLiveTitle = document.querySelector("[data-reaction-live-title]");
  const reactionLiveDescription = document.querySelector("[data-reaction-live-description]");
  const reactionPreviewList = document.querySelector("[data-reaction-preview-list]");
  const reactionRoleList = document.querySelector("[data-reaction-role-list]");
  const addReactionRoleButton = document.querySelector("[data-add-reaction-role]");

  /** Une ligne de role-reaction, numerotee. Modele unique. */
  function ligneReactionRole(numero, role = {}) {
    const index = numero - 1;
    return `<div class="reaction-role-row"><span>${String(index + 1).padStart(2, "0")}</span><input class="emoji-input" data-rr-emoji value="${escapeHtml(role.emoji || "")}" maxlength="3"><select data-rr-role>${optionsRoles(role.role_id || role.role || "", t("js.choisirRole"))}</select><input data-rr-label value="${escapeHtml(role.label || role.name || "")}" placeholder="${escapeHtml(t("js.libelleFacultatif"))}"><button type="button">${escapeHtml(t("js.supprimer"))}</button></div>`;
  }

  function renderReactionPreview() {
    if (reactionLiveTitle) {
      reactionLiveTitle.textContent = `${reactionTitleInput?.value.trim() || t("js.choisisTesRoles")}`;
    }
    if (reactionLiveDescription) {
      reactionLiveDescription.textContent = reactionDescriptionInput?.value.trim() || t("js.cliqueSurUneReaction");
    }
    if (!reactionPreviewList || !reactionRoleList) return;

    reactionPreviewList.innerHTML = "";
    reactionRoleList.querySelectorAll(".reaction-role-row").forEach((row) => {
      const emoji = row.querySelector("[data-rr-emoji]")?.value.trim() || "";
      const choisi = row.querySelector("[data-rr-role]");
      const label = row.querySelector("[data-rr-label]")?.value.trim()
        || (choisi?.value ? nomDuRole(choisi.value) : "")
        || t("js.role");
      const chip = document.createElement("span");
      chip.textContent = `${emoji} ${label}`;
      reactionPreviewList.append(chip);
    });
  }

  function renumberReactionRoles() {
    reactionRoleList?.querySelectorAll(".reaction-role-row > span").forEach((label, index) => {
      label.textContent = String(index + 1).padStart(2, "0");
    });
  }

  reactionTitleInput?.addEventListener("input", renderReactionPreview);
  reactionDescriptionInput?.addEventListener("input", renderReactionPreview);
  reactionRoleList?.addEventListener("input", renderReactionPreview);

  addReactionRoleButton?.addEventListener("click", () => {
    if (!reactionRoleList) return;
    const count = reactionRoleList.querySelectorAll(".reaction-role-row").length + 1;
    // Une seule fabrique de ligne : deux modeles divergeraient au premier
    // changement, comme l'ont fait les deux constructeurs de bienvenue.
    reactionRoleList.insertAdjacentHTML("beforeend", ligneReactionRole(count));
    renderReactionPreview();
    markPanelDirty("reactionroles");
    showToast(t("js.roleReactionAjoute"));
  });

  reactionRoleList?.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const rows = reactionRoleList.querySelectorAll(".reaction-role-row");
    if (rows.length <= 1) {
      showToast(t("js.gardeUnRoleReaction"));
      return;
    }
    button.closest(".reaction-role-row")?.remove();
    renumberReactionRoles();
    renderReactionPreview();
    markPanelDirty("reactionroles");
    showToast(t("js.roleReactionSupprime"));
  });
  renderReactionPreview();

  document.querySelectorAll("[data-recurring-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-recurring-mode]").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      markPanelDirty("recurring");
      showToast(button.dataset.recurringMode === "target" ? t("js.modeHeureCiblee") : t("js.modeRepetition"));
    });
  });

  document.querySelectorAll(".day-pill-row button, .message-composer-tabs button").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.closest(".message-composer-tabs")) {
        button.closest(".message-composer-tabs")?.querySelectorAll("button").forEach((item) => item.classList.remove("is-active"));
        button.classList.add("is-active");
      } else {
        button.classList.toggle("is-active");
      }
      markPanelDirty(button.closest("[data-dashboard-panel]")?.dataset.dashboardPanel || activePanelName);
    });
  });

  document.querySelector("[data-create-recurring]")?.addEventListener("click", () => {
    const name = document.querySelector("[data-recurring-name]")?.value.trim() || t("js.messageRecurrent");
    const channel = document.querySelector("[data-recurring-channel]")?.value.trim();
    const interval = document.querySelector("[data-recurring-interval]")?.value || "30";
    const unit = document.querySelector("[data-recurring-unit]")?.value || "minutes";
    const list = document.querySelector("[data-recurring-list]");
    if (!channel) {
      showToast(t("js.ajouteIdSalon"));
      return;
    }
    list?.querySelector(".recurring-empty")?.remove();
    const item = document.createElement("div");
    item.className = "recurring-item";
    item.dataset.name = name;
    item.dataset.channel = channel;
    item.dataset.interval = interval;
    item.dataset.unit = unit;
    item.dataset.mode = document.querySelector("[data-recurring-mode].is-active")?.dataset.recurringMode || "repeat";
    item.dataset.content = document.querySelector("[data-recurring-content]")?.value.trim() || t("js.exempleMessageRecurrent");
    item.innerHTML = `
      <span>
        <strong>${escapeHtml(name)}</strong>
        <small>${escapeHtml(tp("js.rec.resume", { interval, unite: unit, salon: nomDuSalon(channel) }))}</small>
      </span>
      <button class="secondary-btn compact" type="button" data-recurring-remove>Supprimer</button>
    `;
    list?.prepend(item);
    markPanelDirty("recurring");
    showToast(tp("js.messageRecurrentCree", { nom: name }));
  });

  document.querySelector("[data-recurring-list]")?.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-recurring-remove]");
    if (!button) return;
    const list = button.closest("[data-recurring-list]");
    button.closest(".recurring-item")?.remove();
    if (list && !list.querySelector(".recurring-item")) {
      const empty = document.createElement("div");
      empty.className = "recurring-empty";
      empty.textContent = t("js.aucunMessageRecurrent");
      list.append(empty);
    }
    markPanelDirty("recurring");
    if (selectedServer.id && selectedServer.installed) {
      await saveCurrentChanges(t("js.messageRecurrentSupprimeBot"));
    } else {
      showToast(t("js.messageRecurrentSupprimeLocal"));
    }
  });

  document.querySelectorAll(".social-card").forEach((card) => {
    const enabled = card.querySelector("[data-social-enabled]");
    const state = card.querySelector("[data-social-state]");
    const linkInput = card.querySelector("[data-social-link]");
    const channelInput = card.querySelector("[data-social-channel]");
    const testButton = card.querySelector("[data-social-test]");
    const platform = card.dataset.socialPlatform || t("js.reseau");

    function syncSocialState() {
      const isActive = Boolean(enabled?.checked);
      if (!state) return;
      state.classList.toggle("active", isActive);
      state.classList.toggle("inactive", !isActive);
      state.textContent = t(isActive ? "js.actif" : "js.inactif");
    }

    syncSocialState();

    enabled?.addEventListener("change", () => {
      syncSocialState();
      markPanelDirty("socials");
      showToast(tp(enabled.checked ? "js.relaisActive" : "js.relaisDesactive", { plateforme: platform }));
    });

    testButton?.addEventListener("click", async () => {
      const link = linkInput?.value.trim();
      const channel = channelInput?.value.trim();
      if (!link || !channel) {
        showToast(tp("js.ajouteLienEtSalon", { plateforme: platform }));
        return;
      }
      if (!selectedServer.id || !selectedServer.installed) {
        showToast(t("js.serveurNonRelie"));
        return;
      }
      if (hasUnsavedChanges && dirtyPanelName === "socials") {
        const saved = await saveCurrentChanges(tp("js.relaisEnregistre", { plateforme: platform }));
        if (!saved) return;
      }
      try {
        await modbotApiFetch(`/api/guilds/${selectedServer.id}/socials/test`, {
          method: "POST",
          body: JSON.stringify({ platform, link, channel_id: channel })
        });
        showToast(tp("js.testEnvoye", { plateforme: platform, salon: channel }));
      } catch (error) {
        showToast(tp("js.testImpossible", { plateforme: platform, detail: error.message || t("js.connexionBotIndisponible") }));
      }
    });
  });

  // Changement de langue : applySiteLanguage ne touche que le HTML statique.
  // Tout ce que le JavaScript a peint doit être redessiné, sinon la moitié de
  // l'écran resterait dans la langue précédente jusqu'au prochain chargement.
  document.addEventListener("modbot:language", () => {
    const redessiner = [
      renderAuthStatus, renderSwitcherList, renderOverview, renderSanctionLadder,
      renderWelcomePreview, renderWelcomeVariables, renderGiveaways,
      renderLogFilters, renderLogFeed, renderBackups, renderReactionPreview,
    ];
    redessiner.forEach((dessine) => {
      try {
        dessine();
      } catch (error) {
        console.warn("Redessin impossible apres changement de langue :", error);
      }
    });
    remplirSelecteurPays();
    renderGuildChoices(dashboardGuilds);
    if (dernierConfig) renderModerationConfig(dernierConfig);
    if (dernierConfig) renderDashboardStats(dernierConfig);
    if (securityState) {
      renderSecurityPermissions(securityState.permissions);
      applySecurityState(securityState);
    }
    if (selectedServer.name) {
      currentServerTargets.forEach((cible) => { cible.textContent = selectedServer.name; });
    }
    if (searchSelection) renderSearchDetail(searchSelection);
    setOfferInviteFallbackCopy();
  });

}

/* ══════════════════════════════════════════════════════════════════
   STATISTIQUES PUBLIQUES — page d'accueil
   Chiffres agrégés servis par le bot sur /api/public/stats.
   Aucune donnée nominative n'est exposée par cette route.
   ══════════════════════════════════════════════════════════════════ */

function formatNombreFr(valeur) {
  return Number(valeur || 0).toLocaleString(localeAffichage());
}

/**
 * Compte progressivement jusqu'à la valeur finale.
 *
 * L'animation n'est qu'un habillage : requestAnimationFrame ne se déclenche
 * pas dans un onglet en arrière-plan, donc le chiffre exact est écrit tout de
 * suite et un filet de sécurité le réaffirme. Sans cela, une page ouverte
 * dans un onglet inactif resterait bloquée sur un tiret.
 */
function animerCompteur(element, cible) {
  if (!element) return;
  const valeurFinale = formatNombreFr(cible);
  element.textContent = valeurFinale;

  const reduit = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (reduit || cible <= 0 || document.hidden) return;

  const duree = 1100;
  const depart = performance.now();
  const etape = (maintenant) => {
    const avancement = Math.min(1, (maintenant - depart) / duree);
    // Décélération : rapide au début, précis à l'arrivée
    const adouci = 1 - Math.pow(1 - avancement, 3);
    element.textContent = formatNombreFr(Math.round(cible * adouci));
    if (avancement < 1) requestAnimationFrame(etape);
  };
  requestAnimationFrame(etape);
  setTimeout(() => { element.textContent = valeurFinale; }, duree + 150);
}

/*
 * Codes ISO-3166 alpha-2. Seuls les codes sont embarqués : le nom du pays
 * est produit par le navigateur dans la langue du visiteur, et le drapeau
 * se calcule à partir des deux lettres. Pas de table de 250 noms à tenir
 * à jour, en trois langues.
 */
const CODES_PAYS = ("AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI "
  + "BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW "
  + "CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH "
  + "GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE "
  + "JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME "
  + "MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR "
  + "NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG "
  + "SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV "
  + "TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW").split(" ");

/** Nom d'un pays dans la langue du visiteur, le code servant de repli. */
function nomDePays(code) {
  if (!code) return code;
  try {
    const noms = new Intl.DisplayNames([getSiteLanguage()], { type: "region" });
    const nom = noms.of(code);
    if (nom && nom !== code) return nom;
  } catch (error) {
    // Intl.DisplayNames absent : on affichera le code
  }
  return code;
}

/**
 * Une ligne de répartition : drapeau, nom, nombre de membres.
 *
 * Les pays et les langues partagent exactement la même présentation ;
 * les écrire deux fois, c'est les voir diverger au premier changement.
 */
function rendreRepartition(liste, entrees, nommer) {
  if (!liste) return false;
  const lignes = (Array.isArray(entrees) ? entrees : []).filter(Boolean);
  if (!lignes.length) return false;
  liste.innerHTML = lignes.map((entree) => `
    <span class="stat-country${entree.unknown ? " is-unknown" : ""}">
      <span class="stat-country-name">${escapeHtmlValue(nommer(entree))}</span>
      <span class="stat-country-count">${formatNombreFr(entree.members)}</span>
    </span>`).join("");
  liste.hidden = false;
  return true;
}

const nommerPays = (e) => nomDePays(e.code);

/** Peint les deux répartitions et le résumé à partir des chiffres reçus. */
function peindreStatsPubliques(stats) {
  if (!stats) return;
  const resume = document.querySelector("[data-stat-summary]");
  if (resume) {
    resume.textContent = tn("js.repartisUnServeur", "js.repartisDesServeurs", stats.servers,
                            { membres: formatNombreFr(stats.members_protected),
                              serveurs: formatNombreFr(stats.servers) });
  }
  const rempli = rendreRepartition(document.querySelector("[data-stat-country-list]"),
                                   stats.top_countries, nommerPays);
  const note = document.querySelector("[data-stat-note]");
  if (note) note.hidden = !rempli;
}

/**
 * Remplit le sélecteur de pays, trié selon la langue affichée.
 *
 * L'ordre alphabétique n'est pas le même en français, en anglais et en
 * arabe : la liste est donc reconstruite à chaque changement de langue.
 * L'option « Non renseigné » est conservée telle quelle, avec sa clef.
 */
function remplirSelecteurPays() {
  const champ = document.querySelector("[data-guild-country]");
  if (!champ) return;
  const choisi = champ.value;
  const vide = champ.querySelector('option[value=""]');
  champ.textContent = "";
  if (vide) champ.appendChild(vide);
  CODES_PAYS
    .map((code) => ({ code, nom: nomDePays(code) }))
    .sort((a, b) => a.nom.localeCompare(b.nom, getSiteLanguage()))
    .forEach(({ code, nom }) => {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = nom;
      champ.appendChild(option);
    });
  champ.value = choisi;
}

let derniersStatsPubliques = null;

async function initPublicStats() {
  const section = document.querySelector("[data-live-stats]");
  if (!section) return;

  const membres = section.querySelector("[data-stat-members]");
  const serveurs = section.querySelector("[data-stat-servers]");
  const pays = section.querySelector("[data-stat-countries]");
  const resume = section.querySelector("[data-stat-summary]");

  // On essaie TOUTES les adresses candidates, pas seulement la première.
  // L'accueil n'a aucun champ pour corriger une adresse : une adresse
  // fausse enregistrée une fois dans ce navigateur rendait ces chiffres
  // indisponibles pour toujours, sur cet appareil et sur lui seul — d'où
  // « ça marche sur mon téléphone ».
  const candidates = getModbotApiCandidates();
  if (!candidates.length) return;

  // Tant que le bot n'a pas repondu, le tiret d'attente est peint en
  // degrade comme un chiffre : il se lisait comme une barre bleue, et on
  // croyait a une image cassee. On le dit en attente, c'est tout.
  section.classList.add("stats-attente");

  let stats = null;
  let derniereErreur = null;
  for (const base of candidates) {
    try {
      const controleur = new AbortController();
      const minuterie = window.setTimeout(() => controleur.abort(), 6000);
      let reponse;
      try {
        reponse = await fetch(`${base}/api/public/stats`, {
          cache: "no-store",
          headers: { Accept: "application/json" },
          signal: controleur.signal
        });
      } finally {
        window.clearTimeout(minuterie);
      }
      if (!reponse.ok) throw new Error(`HTTP ${reponse.status}`);
      const lues = (await reponse.json())?.stats;
      if (!lues) throw new Error(t("js.reponseVide"));
      stats = lues;
      rememberApiBase(base);   // et oublie l'adresse fausse, s'il y en avait une
      break;
    } catch (error) {
      derniereErreur = error;
    }
  }

  if (stats) {
    derniersStatsPubliques = stats;
    section.classList.remove("stats-attente");
    animerCompteur(membres, stats.members_protected);
    animerCompteur(serveurs, stats.servers);
    if (pays) pays.textContent = formatNombreFr(stats.countries);
    peindreStatsPubliques(stats);
    return;
  }

  // Le bot est injoignable : on retire les tirets plutôt que de mentir
  // avec des chiffres inventés, et on garde la page présentable.
  console.warn("Statistiques publiques indisponibles :",
               derniereErreur?.message || derniereErreur);
  section.classList.remove("stats-attente");
  section.classList.add("stats-offline");
  if (resume) resume.textContent = t("js.chiffresIndisponibles");
  [membres, serveurs, pays].forEach((el) => {
    if (el && el.textContent === "—") el.textContent = "·";
  });
}

// La démo de l'accueil est du HTML généré : elle se redessine elle aussi.
document.addEventListener("modbot:language", () => {
  const actifDemo = document.querySelector(".demo-command.is-active");
  if (document.getElementById("demoFeed")) runDemoCommand(actifDemo?.dataset.command || "panel");

  // Les chiffres sont déjà chargés : on ne redemande rien au bot, on réécrit
  // seulement les noms de pays et de langues dans la nouvelle langue.
  peindreStatsPubliques(derniersStatsPubliques);
});

document.addEventListener("DOMContentLoaded", () => {
  resetInitialScroll();
  initApiBridgeFromUrl();
  initDiscordOAuthLinks();
  initStarfield();
  trackSiteAnalytics();
  initNavigation();
  initSiteLanguage();
  initAdminZone();
  initDemo();
  initAssistant();
  initRevealAnimations();
  // Le decor ne doit jamais emporter le reste. Une exception levee ici
  // interromprait ce gestionnaire, et les statistiques comme le dashboard
  // qui s'initialisent juste apres ne demarreraient pas.
  [initOndeAuClic, initParallaxeFond, initFondVivant].forEach((decor) => {
    try {
      decor();
    } catch (erreur) {
      console.warn("Decor desactive :", erreur);
    }
  });
  initPublicStats();
  initDashboard();
  remplirSelecteurPays();
});

/* ══════════════════════════════════════════════════════════════════
   PAGE PREMIUM
   Les offres et les fonctionnalites viennent du bot : les prix ne
   doivent exister qu'a un seul endroit, sinon le site finira par
   afficher un tarif que la caisse ne pratique plus.
   ══════════════════════════════════════════════════════════════════ */

/* Les tarifs et la liste des fonctionnalites sont des faits fixes : ils
   n'ont pas besoin du bot pour s'afficher. Quand la page en dependait,
   un bot en cours de redemarrage la laissait vide — un visiteur voyait
   une page premium sans une seule offre. Le serveur ne sert plus qu'a
   deux choses : dire si le paiement est ouvert, et dire ou en est
   l'abonnement du serveur choisi. */
const PREMIUM_OFFRES = [
  { key: "mensuel", labelClef: "prem.offreMensuel", price: "3,99 €",
    periodClef: "prem.parMois", saving: 0 },
  { key: "semestriel", labelClef: "prem.offreSemestriel", price: "19,99 €",
    periodClef: "prem.tousLes6Mois", saving: 16 },
  { key: "annuel", labelClef: "prem.offreAnnuel", price: "45 €",
    periodClef: "prem.parAn", saving: 6 },
];

/* Chaque fonctionnalite a un titre court pour la grille, et un texte qui
   dit ce qu'elle fait vraiment. Le resume seul ne suffisait pas : on
   annoncait « Journal complet » sans jamais dire ce que ca recouvre. */
const PREMIUM_FONCTIONS = [
  { icon: "u-palette", titreClef: "prem.f.embed_colors.titre",
    detailClef: "prem.f.embed_colors.detail" },
  { icon: "u-image", titreClef: "prem.f.images.titre",
    detailClef: "prem.f.images.detail" },
  { icon: "u-clipboard", titreClef: "prem.f.logs_complets.titre",
    detailClef: "prem.f.logs_complets.detail" },
  { icon: "i-megaphone", titreClef: "prem.f.social_relays.titre",
    detailClef: "prem.f.social_relays.detail" },
  { icon: "u-broadcast", titreClef: "prem.f.voice.titre",
    detailClef: "prem.f.voice.detail" },
  { icon: "u-star", titreClef: "prem.f.events.titre",
    detailClef: "prem.f.events.detail" },
  { icon: "u-mask", titreClef: "prem.f.auto_roles.titre",
    detailClef: "prem.f.auto_roles.detail" },
  { icon: "u-mail", titreClef: "prem.f.dm.titre",
    detailClef: "prem.f.dm.detail" },
  { icon: "u-mask", titreClef: "prem.f.premium_role.titre",
    detailClef: "prem.f.premium_role.detail" },
  { icon: "u-timer", titreClef: "prem.f.recurring.titre",
    detailClef: "prem.f.recurring.detail" },
  { icon: "i-shield", titreClef: "prem.f.security_score.titre",
    detailClef: "prem.f.security_score.detail" },
  { icon: "u-sparkles", titreClef: "prem.f.ai.titre",
    detailClef: "prem.f.ai.detail" },
];

function initPagePremium() {
  const hoteOffres = document.querySelector("[data-premium-offers]");
  const hoteFonctions = document.querySelector("[data-premium-features]");
  if (!hoteOffres && !hoteFonctions) return;



  function carteOffre(offre, populaire) {
    const economie = offre.saving
      ? `<span class="premium-saving">${escapeHtmlValue(
          tp("prem.economie", { pct: offre.saving }))}</span>`
      : "";
    return `
      <article class="premium-offer${populaire ? " is-featured" : ""}">
        ${populaire ? `<span class="premium-badge">${escapeHtmlValue(t("prem.populaire"))}</span>` : ""}
        <h3>${escapeHtmlValue(t(offre.labelClef))}</h3>
        <p class="premium-price">${escapeHtmlValue(offre.price)}</p>
        <p class="premium-period">${escapeHtmlValue(t(offre.periodClef))}</p>
        ${economie}
        <button class="primary-btn" type="button" data-premium-buy="${escapeHtmlValue(offre.key)}">
          ${escapeHtmlValue(t("prem.choisir"))}
        </button>
      </article>`;
  }

  function carteFonction(fonction) {
    return `
      <article class="premium-feature">
        <span class="premium-feature-icon" aria-hidden="true">
          <svg class="ui-icon" viewBox="0 0 24 24"><use href="#${escapeHtmlValue(fonction.icon)}"/></svg>
        </span>
        <h3>${escapeHtmlValue(t(fonction.titreClef))}</h3>
        <p>${escapeHtmlValue(t(fonction.detailClef))}</p>
      </article>`;
  }

  /** Dessine offres et fonctionnalites sans rien attendre du serveur. */
  function dessiner() {
    if (hoteOffres) {
      hoteOffres.innerHTML = PREMIUM_OFFRES
        .map((offre) => carteOffre(offre, offre.key === "semestriel")).join("");
      hoteOffres.querySelectorAll("[data-premium-buy]").forEach((bouton) => {
        bouton.addEventListener("click", () => acheter(bouton.dataset.premiumBuy));
      });
    }
    if (hoteFonctions) {
      hoteFonctions.innerHTML = PREMIUM_FONCTIONS.map(carteFonction).join("");
    }
  }

  async function acheter(plan) {
    // On achete pour SOI, plus pour un serveur : il n'y a donc plus de
    // serveur a choisir avant de payer. La seule condition est d'etre
    // connecte — c'est ce compte qui recevra la licence, et lui seul
    // decidera ensuite ou poser ses places.
    if (!getModbotSessionToken()) {
      showToast(t("lic.connecteToi"));
      setTimeout(() => { location.href = "dashboard.html"; }, 1600);
      return;
    }
    try {
      const data = await modbotApiFetch("/api/premium/checkout", {
        method: "POST",
        body: JSON.stringify({ plan }),
      });
      if (data?.url) location.href = data.url;
      else showToast(t("prem.paiementIndisponible"));
    } catch (erreur) {
      showToast(erreur?.message || t("prem.paiementIndisponible"));
    }
  }

  /**
   * Ce que la personne connectee possede, pas ce qu'un serveur a recu.
   *
   * Cette page parlait de l'etat premium d'un serveur choisi ailleurs :
   * elle annoncait « Premium offert — equivalent 6 mois, actif jusqu'au
   * … » a quelqu'un venu regarder les tarifs. Depuis que l'achat
   * appartient a l'acheteur, ce qui compte ici est ce qu'il a en main :
   * combien de places, et combien il lui en reste a poser.
   */
  async function afficherEtat() {
    const bloc = document.querySelector("[data-premium-state]");
    if (!bloc) return;
    // Pas connecte : la page reste une page de tarifs, sans demander au
    // bot un 401 certain.
    if (!getModbotSessionToken()) return;
    let data;
    try {
      data = await modbotApiFetch("/api/me/licences", { cache: "no-store" });
    } catch (erreur) {
      return;  // Pas connecte : la page reste une page de tarifs.
    }
    const licences = data?.licences || [];
    if (!licences.length) return;

    bloc.hidden = false;
    bloc.classList.add("is-active");
    const titre = bloc.querySelector("[data-premium-state-title]");
    const detail = bloc.querySelector("[data-premium-state-detail]");
    const libres = Number(data.places_libres || 0);

    if (titre) {
      // Deux licences du meme plan affichaient « Mensuel, Mensuel ».
      // On regroupe par offre, et on garde pour chacune l'echeance la
      // plus lointaine : c'est celle qui compte pour l'acheteur.
      const parOffre = new Map();
      licences.forEach((licence) => {
        const offre = PREMIUM_OFFRES.find((o) => o.key === licence.plan);
        const nom = offre ? t(offre.labelClef) : licence.plan;
        const jours = Number(licence.days_left || 0);
        parOffre.set(nom, Math.max(parOffre.get(nom) ?? 0, jours));
      });
      const entrees = [...parOffre.entries()];
      titre.textContent = entrees.length === 1
        ? tp("lic.possedeJours", { offre: entrees[0][0], jours: entrees[0][1] })
        : tp("lic.possedePlusieurs", {
            offres: entrees
              .map(([nom, jours]) => tp("lic.offreEtJours", { offre: nom, jours }))
              .join(", "),
          });
    }
    if (detail) {
      detail.textContent = libres > 0
        ? tn("lic.resteUne", "lic.restePlusieurs", libres, { places: libres })
        : t("lic.toutPose");
    }

    // La carte d'une offre deja possedee se distingue des autres.
    const possedees = new Set(licences.map((licence) => licence.plan));
    document.querySelectorAll("[data-premium-buy]").forEach((bouton) => {
      const carte = bouton.closest(".premium-offer");
      const active = possedees.has(bouton.dataset.premiumBuy);
      carte?.classList.toggle("is-current", active);
      if (active) {
        carte?.setAttribute("data-badge", t("prem.offreEnCours"));
        bouton.textContent = t("prem.prolonger");
      }
    });
  }

  /**
   * Le serveur ne fait plus que confirmer que le paiement est ouvert.
   * S'il ne repond pas, les offres restent affichees et cliquables :
   * l'erreur, s'il y en a une, arrivera au moment du paiement, avec un
   * message qui la nomme.
   */
  async function verifierPaiement() {
    try {
      const data = await modbotApiFetch("/api/premium/offers", { cache: "no-store" });
      if (data && data.checkout_available === false && hoteOffres) {
        hoteOffres.querySelectorAll("[data-premium-buy]").forEach((bouton) => {
          bouton.disabled = true;
          bouton.textContent = t("prem.bientot");
        });
      }
    } catch (erreur) {
      // Bot injoignable : la page reste complete et utile.
    }
  }

  dessiner();
  verifierPaiement();

  // Les cartes sont fabriquees en JS : elles n'ont pas de data-i18n a
  // relire. C'est a nous de les redessiner quand la langue change.
  document.addEventListener("modbot:language", () => {
    dessiner();
    verifierPaiement();
  });
  afficherEtat();

  // Retour de Stripe : on le dit, sinon la page semble n'avoir rien fait.
  const retour = new URLSearchParams(location.search).get("paiement");
  if (retour === "reussi") {
    showToast(t("prem.merci"));
    // Le webhook arrive parfois apres la redirection : on relit l'etat
    // une fois passe ce delai plutot que d'afficher « non abonne ».
    setTimeout(afficherEtat, 4000);
  } else if (retour === "annule") {
    showToast(t("prem.annule"));
  }
}

initPagePremium();

/* ══════════════════════════════════════════════════════════════════
   PAGE BOUTIQUE
   Bots et sites faits sur mesure. Le catalogue est recopie de celui du
   bot (boutique.py) parce qu'il lui faut des textes en cinq langues ;
   les prix, eux, font foi cote bot — c'est lui qui les envoie a Stripe,
   quoi que dise la page — et test_derives.py verifie que les deux
   copies disent la meme chose.
   ══════════════════════════════════════════════════════════════════ */

const BOUTIQUE_ARTICLES = [
  { key: "bot_essentiel", categorie: "bot", prix: 1900, delai: 3, revisions: 1,
    titreClef: "bq.bot_essentiel.titre", resumeClef: "bq.bot_essentiel.resume",
    idealClef: "bq.bot_essentiel.ideal",
    points: [{ texteClef: "bq.bot_essentiel.p1" }, { texteClef: "bq.bot_essentiel.p2" },
             { texteClef: "bq.bot_essentiel.p3" }, { texteClef: "bq.bot_essentiel.p4" }] },
  { key: "bot_avance", categorie: "bot", prix: 4900, delai: 7, revisions: 2, recommande: true,
    titreClef: "bq.bot_avance.titre", resumeClef: "bq.bot_avance.resume",
    idealClef: "bq.bot_avance.ideal",
    points: [{ texteClef: "bq.bot_avance.p1" }, { texteClef: "bq.bot_avance.p2" },
             { texteClef: "bq.bot_avance.p3" }, { texteClef: "bq.bot_avance.p4" }] },
  { key: "bot_pro", categorie: "bot", prix: 9900, delai: 14, revisions: 3,
    titreClef: "bq.bot_pro.titre", resumeClef: "bq.bot_pro.resume",
    idealClef: "bq.bot_pro.ideal",
    points: [{ texteClef: "bq.bot_pro.p1" }, { texteClef: "bq.bot_pro.p2" },
             { texteClef: "bq.bot_pro.p3" }, { texteClef: "bq.bot_pro.p4" }] },
  { key: "site_vitrine", categorie: "site", prix: 2900, delai: 4, revisions: 1,
    titreClef: "bq.site_vitrine.titre", resumeClef: "bq.site_vitrine.resume",
    idealClef: "bq.site_vitrine.ideal",
    points: [{ texteClef: "bq.site_vitrine.p1" }, { texteClef: "bq.site_vitrine.p2" },
             { texteClef: "bq.miseEnLigne" }] },
  { key: "site_complet", categorie: "site", prix: 7900, delai: 10, revisions: 2, recommande: true,
    titreClef: "bq.site_complet.titre", resumeClef: "bq.site_complet.resume",
    idealClef: "bq.site_complet.ideal",
    points: [{ texteClef: "bq.site_complet.p1" }, { texteClef: "bq.site_complet.p2" },
             { texteClef: "bq.site_complet.p3" }, { texteClef: "bq.miseEnLigne" }] },
  { key: "site_dashboard", categorie: "site", prix: 17900, delai: 21, revisions: 3,
    titreClef: "bq.site_dashboard.titre", resumeClef: "bq.site_dashboard.resume",
    idealClef: "bq.site_dashboard.ideal",
    points: [{ texteClef: "bq.site_dashboard.p1" }, { texteClef: "bq.site_dashboard.p2" },
             { texteClef: "bq.site_dashboard.p3" }, { texteClef: "bq.site_dashboard.p4" }] },
  { key: "pack_starter", categorie: "pack", prix: 4200, delai: 7, revisions: 1,
    contient: ["bot_essentiel", "site_vitrine"],
    titreClef: "bq.pack_starter.titre", resumeClef: "bq.pack_starter.resume",
    idealClef: "bq.pack_starter.ideal",
    points: [{ texteClef: "bq.packEnsemble" }, { texteClef: "bq.miseEnLigne" }] },
  { key: "pack_serveur", categorie: "pack", prix: 10900, delai: 14, revisions: 2, recommande: true,
    contient: ["bot_avance", "site_complet"],
    titreClef: "bq.pack_serveur.titre", resumeClef: "bq.pack_serveur.resume",
    idealClef: "bq.pack_serveur.ideal",
    points: [{ texteClef: "bq.packEnsemble" }, { texteClef: "bq.miseEnLigne" }] },
  { key: "pack_pro", categorie: "pack", prix: 24900, delai: 30, revisions: 3,
    contient: ["bot_pro", "site_dashboard"],
    titreClef: "bq.pack_pro.titre", resumeClef: "bq.pack_pro.resume",
    idealClef: "bq.pack_pro.ideal",
    points: [{ texteClef: "bq.packEnsemble" }, { texteClef: "bq.miseEnLigne" }] },
];

// Les memes regles que boutique.py : le bot refuserait de toute facon,
// mais le client merite de l'apprendre avant de quitter la page.
const BOUTIQUE_ID_DISCORD = /^\d{17,20}$/;
const BOUTIQUE_PSEUDO = /^[\p{L}\p{N}_.]{2,32}(#\d{4})?$/u;
const BOUTIQUE_NUMERO = /^MB-\d{6}-[A-HJ-NP-Z2-9]{4}$/;
const BOUTIQUE_DEVIS = /^DV-\d{6}-[A-HJ-NP-Z2-9]{4}$/;

const BOUTIQUE_ICONES = { bot: "u-rocket", site: "u-globe", pack: "u-gift" };

// Les cartes acceptees, sur le bouton « Carte bancaire » : on paie plus
// volontiers quand on reconnait sa carte.
const BOUTIQUE_MARQUES_CARTE = '<span class="boutique-marques" aria-hidden="true">'
  + '<svg viewBox="0 0 38 24"><use href="#i-visa"/></svg>'
  + '<svg viewBox="0 0 38 24"><use href="#i-mastercard"/></svg></span>';

const BOUTIQUE_CATEGORIES = {
  bot: { numero: 1, libelleClef: "bq.devisCatBot" },
  site: { numero: 2, libelleClef: "bq.devisCatSite" },
  les_deux: { numero: 3, libelleClef: "bq.devisCatLesDeux" },
  autre: { numero: 4, libelleClef: "bq.devisCatAutre" },
};

function boutiquePrix(centimes) {
  return new Intl.NumberFormat(localeAffichage(), {
    style: "currency", currency: "EUR",
    minimumFractionDigits: centimes % 100 ? 2 : 0, maximumFractionDigits: 2,
  }).format(centimes / 100);
}

function boutiqueValeurDuPack(article) {
  return (article.contient || []).reduce(
    (total, clef) => total + (BOUTIQUE_ARTICLES.find((a) => a.key === clef)?.prix || 0), 0);
}

/* « dès 39 € » : le prix d'appel de chaque rayon, calcule depuis le
   catalogue plutot qu'ecrit dans les traductions — il suit les prix tout
   seul. Sert a l'accueil comme a la page Boutique. Les exemples, eux,
   nomment la formule qui les rend possibles, avec son prix. */
function remplirPrixDAppel() {
  document.querySelectorAll("[data-boutique-des]").forEach((element) => {
    const prix = BOUTIQUE_ARTICLES
      .filter((article) => article.categorie === element.dataset.boutiqueDes)
      .map((article) => article.prix);
    element.textContent = prix.length
      ? tp("bq.aPartirDe", { prix: boutiquePrix(Math.min(...prix)) }) : "";
  });
  document.querySelectorAll("[data-exemple-formule]").forEach((element) => {
    const article = BOUTIQUE_ARTICLES.find((a) => a.key === element.dataset.exempleFormule);
    if (!article) return;
    element.textContent = tp("bq.exAvec", {
      formule: t(article.titreClef), prix: boutiquePrix(article.prix) });
  });
}

/* ── Le compte Discord du client ─────────────────────────────────────
   Connecte, il n'a rien a taper : le bot prend son identifiant dans la
   session, et c'est cet identifiant qui lui permet d'ecrire en prive a
   chaque etape — prix d'un devis, debut du travail, livraison. Sans
   connexion, un pseudo suffit, mais le bot doit le retrouver. */
let boutiqueCompte = null;

function peindreCompteBoutique() {
  const zone = document.querySelector("[data-boutique-compte]");
  const nom = boutiqueCompte ? (boutiqueCompte.username || boutiqueCompte.user_id) : "";
  if (zone) {
    zone.classList.toggle("is-connecte", Boolean(boutiqueCompte));
    // Discord n'accepte un message prive que d'un bot avec qui l'on
    // partage un serveur : l'invitation vaut dans les deux cas.
    zone.innerHTML = (boutiqueCompte
      ? `${boutiqueCompte.avatar_url ? `<img src="${escapeHtmlValue(boutiqueCompte.avatar_url)}" alt="" onerror="this.remove()">` : ""}
         <span>${escapeHtmlValue(tp("bq.compteConnecte", { nom }))}</span>
         <button type="button" class="boutique-compte-lien" data-boutique-deconnexion>${escapeHtmlValue(t("bq.compteDeconnexion"))}</button>`
      : `<span>${escapeHtmlValue(t("bq.compteInvite"))}</span>
         <button type="button" class="secondary-btn compact" data-boutique-connexion>
           <svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-discord"/></svg>
           ${escapeHtmlValue(t("bq.compteBouton"))}</button>`)
      + `<span>${t("bq.compteServeur")}</span>`;
  }
  // Connecte : le champ Discord s'efface des formulaires, et une ligne
  // dit a qui l'on ecrira.
  document.querySelectorAll("[data-boutique-contact]").forEach((champ) => {
    champ.hidden = Boolean(boutiqueCompte);
  });
  document.querySelectorAll("[data-boutique-connecte]").forEach((ligne) => {
    ligne.hidden = !boutiqueCompte;
    ligne.textContent = boutiqueCompte ? tp("bq.compteConnecte", { nom }) : "";
  });
}

async function connecterBoutique() {
  const base = await trouverBaseApiJoignable();
  if (!base) {
    document.querySelector("[data-boutique-compte]")?.insertAdjacentHTML("beforeend",
      `<span class="boutique-erreur">${escapeHtmlValue(t("bq.connexionImpossible"))}</span>`);
    return;
  }
  // Le retour garde la recherche : un client qui se connecte depuis le
  // lien de son devis doit y revenir.
  const retour = location.origin + location.pathname + location.search;
  location.href = `${base}/api/auth/discord/login?redirect=${encodeURIComponent(retour)}`;
}

function deconnecterBoutique() {
  localStorage.removeItem("modbot-dashboard-session");
  sessionStorage.removeItem("modbot-dashboard-session");
  boutiqueCompte = null;
  peindreCompteBoutique();
}

async function chargerCompteBoutique() {
  const zone = document.querySelector("[data-boutique-compte]");
  if (!zone) return;
  zone.addEventListener("click", (evenement) => {
    if (evenement.target.closest("[data-boutique-connexion]")) connecterBoutique();
    if (evenement.target.closest("[data-boutique-deconnexion]")) deconnecterBoutique();
  });
  document.addEventListener("modbot:language", peindreCompteBoutique);
  peindreCompteBoutique();
  if (!getModbotSessionToken()) return;
  try {
    const data = await modbotApiFetch("/api/me", { cache: "no-store" });
    const utilisateur = data?.user || {};
    boutiqueCompte = BOUTIQUE_ID_DISCORD.test(String(utilisateur.user_id || "")) ? utilisateur : null;
  } catch (erreur) {
    // Session expiree ou bot injoignable : on retombe sur le pseudo a
    // taper, qui marche aussi.
    boutiqueCompte = null;
  }
  peindreCompteBoutique();
}

// Le contact a envoyer : rien si le client est connecte (le bot prend son
// compte), sinon un pseudo ou un identifiant valable.
function lireContactBoutique(champ) {
  if (boutiqueCompte) return { ok: true, valeur: "" };
  const valeur = (champ?.value || "").trim().replace(/^@/, "").trim();
  return { ok: BOUTIQUE_ID_DISCORD.test(valeur) || BOUTIQUE_PSEUDO.test(valeur), valeur };
}

function initPageBoutique() {
  const grilles = document.querySelectorAll("[data-boutique-grille]");
  if (!grilles.length) return;
  const fenetre = document.querySelector("[data-boutique-fenetre]");
  const formulaire = document.querySelector("[data-boutique-formulaire]");
  const champDiscord = document.querySelector("[data-boutique-discord]");
  const champProjet = document.querySelector("[data-boutique-projet]");
  const caseConditions = document.querySelector("[data-boutique-conditions]");
  const zoneErreur = document.querySelector("[data-boutique-erreur]");
  const recap = document.querySelector("[data-boutique-recap]");
  const boutonEnvoyer = document.querySelector("[data-boutique-envoyer]");
  const zoneRetour = document.querySelector("[data-boutique-retour]");
  let enCours = null;
  let declencheur = null;
  let caisseOuverte = true;

  const prixAffiche = boutiquePrix;
  const valeurDuPack = boutiqueValeurDuPack;

  const nomDuMoyen = (moyen) => t(moyen === "paypal" ? "bq.paypal" : "bq.carte");

  function carte(article) {
    const valeur = valeurDuPack(article);
    const barre = valeur > article.prix
      ? `<p class="boutique-valeur">${escapeHtmlValue(tp("bq.auLieuDe", { prix: prixAffiche(valeur) }))}</p>`
      : "";
    const badge = article.recommande
      ? `<span class="boutique-badge">${escapeHtmlValue(t("bq.recommande"))}</span>` : "";
    const points = article.points
      .map((point) => `<li>${escapeHtmlValue(t(point.texteClef))}</li>`).join("");
    const revisions = tn("bq.revisionUne", "bq.revisionsPlusieurs", article.revisions,
                         { n: article.revisions });
    const cle = escapeHtmlValue(article.key);
    const paiement = caisseOuverte
      ? `<button class="primary-btn" type="button" data-boutique-payer="carte" data-article="${cle}">
           <svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#u-lock"/></svg>
           ${escapeHtmlValue(t("bq.carte"))}${BOUTIQUE_MARQUES_CARTE}</button>
         <button class="secondary-btn" type="button" data-boutique-payer="paypal" data-article="${cle}">
           <svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-paypal"/></svg>
           ${escapeHtmlValue(t("bq.paypal"))}</button>`
      : `<p class="boutique-bientot">${escapeHtmlValue(t("bq.bientot"))}</p>`;
    const economie = valeur > article.prix
      ? `<span class="boutique-economie">${escapeHtmlValue(
          tp("bq.economise", { montant: prixAffiche(valeur - article.prix) }))}</span>`
      : "";
    // Un pack montre ce qu'il contient : les deux pieces, cote a cote.
    const pieces = (article.contient || [])
      .map((clef) => BOUTIQUE_ARTICLES.find((a) => a.key === clef))
      .filter(Boolean)
      .map((piece) => `<span class="boutique-piece"><svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#${BOUTIQUE_ICONES[piece.categorie]}"/></svg>${escapeHtmlValue(t(piece.titreClef))}</span>`)
      .join('<span class="boutique-plus" aria-hidden="true">+</span>');
    const contenu = pieces
      ? `<div class="boutique-contenu" role="group" aria-label="${escapeHtmlValue(t("bq.contient"))}">${pieces}</div>`
      : "";
    return `
      <article class="boutique-carte boutique-carte-${escapeHtmlValue(article.categorie)}${article.recommande ? " is-featured" : ""}">
        ${badge}
        <div class="boutique-carte-tete">
          <span class="boutique-icone" aria-hidden="true"><svg class="ui-icon" viewBox="0 0 24 24"><use href="#${BOUTIQUE_ICONES[article.categorie]}"/></svg></span>
          ${economie}
        </div>
        <h3>${escapeHtmlValue(t(article.titreClef))}</h3>
        <p class="boutique-resume">${escapeHtmlValue(t(article.resumeClef))}</p>
        <p class="boutique-ideal"><strong>${escapeHtmlValue(t("bq.idealPour"))}</strong> ${escapeHtmlValue(t(article.idealClef))}</p>
        ${contenu}
        <div class="boutique-prix">
          <span class="boutique-montant">${escapeHtmlValue(prixAffiche(article.prix))}</span>
          ${barre}
        </div>
        <ul class="boutique-points">${points}</ul>
        <p class="boutique-delai">${escapeHtmlValue(tp("bq.delai", { jours: article.delai }))} · ${escapeHtmlValue(revisions)}</p>
        <div class="boutique-payer">${paiement}</div>
      </article>`;
  }

  function dessiner() {
    grilles.forEach((grille) => {
      grille.innerHTML = BOUTIQUE_ARTICLES
        .filter((article) => article.categorie === grille.dataset.boutiqueGrille)
        .map(carte).join("");
    });
    document.querySelectorAll("[data-boutique-payer]").forEach((bouton) => {
      bouton.addEventListener("click", () => {
        const article = BOUTIQUE_ARTICLES.find((a) => a.key === bouton.dataset.article);
        if (article) ouvrir(article, bouton.dataset.boutiquePayer, bouton);
      });
    });
  }

  function montrerErreur(message, champ) {
    if (!zoneErreur) return;
    zoneErreur.textContent = message;
    zoneErreur.hidden = false;
    champ?.focus();
  }

  function ecrireRecap() {
    if (!recap || !enCours) return;
    recap.textContent = tp("bq.recap", {
      article: t(enCours.article.titreClef),
      prix: prixAffiche(enCours.article.prix),
      moyen: nomDuMoyen(enCours.moyen),
    });
  }

  // Le client clique d'abord sur « Carte » ou « PayPal » ; la fenetre lui
  // demande ensuite son contact Discord — sauf s'il est connecte — puis
  // l'envoie payer.
  function ouvrir(article, moyen, bouton) {
    if (!fenetre) return;
    enCours = { article, moyen };
    declencheur = bouton;
    ecrireRecap();
    if (zoneErreur) zoneErreur.hidden = true;
    fenetre.hidden = false;
    document.body.classList.add("boutique-fenetre-ouverte");
    (boutiqueCompte ? champProjet : champDiscord)?.focus();
  }

  function fermer() {
    if (!fenetre || fenetre.hidden) return;
    fenetre.hidden = true;
    document.body.classList.remove("boutique-fenetre-ouverte");
    declencheur?.focus();
  }

  document.querySelectorAll("[data-boutique-fermer]").forEach((element) => {
    element.addEventListener("click", fermer);
  });
  document.addEventListener("keydown", (evenement) => {
    if (evenement.key === "Escape") fermer();
  });

  formulaire?.addEventListener("submit", async (evenement) => {
    evenement.preventDefault();
    if (!enCours) return;
    const contact = lireContactBoutique(champDiscord);
    if (!contact.ok) {
      montrerErreur(t("bq.discordInvalide"), champDiscord);
      return;
    }
    if (!caseConditions?.checked) {
      montrerErreur(t("bq.conditionsRequises"), caseConditions);
      return;
    }
    if (zoneErreur) zoneErreur.hidden = true;
    boutonEnvoyer.disabled = true;
    boutonEnvoyer.textContent = t("bq.redirection");
    try {
      // Le montant n'est pas envoye : le bot le prend dans son catalogue.
      const data = await modbotApiFetch("/api/boutique/commande", {
        method: "POST",
        body: JSON.stringify({
          article: enCours.article.key,
          moyen: enCours.moyen,
          discord: contact.valeur,
          projet: champProjet?.value || "",
          conditions: true,
        }),
      });
      if (data?.url) {
        location.href = data.url;
        return;
      }
      montrerErreur(t("bq.indisponible"));
    } catch (erreur) {
      montrerErreur(erreur?.message || t("bq.indisponible"));
    }
    boutonEnvoyer.disabled = false;
    boutonEnvoyer.textContent = t("bq.continuer");
  });

  // Retour de Stripe. Ce message n'est qu'un accuse de lecture : c'est le
  // webhook, pas cette adresse, qui dit si la commande est payee.
  function afficherRetour() {
    const parametres = new URLSearchParams(location.search);
    const retour = parametres.get("commande");
    if (!zoneRetour || (retour !== "reussie" && retour !== "annulee")) return;
    const numero = parametres.get("numero") || "";
    zoneRetour.textContent = retour === "annulee"
      ? t("bq.annule")
      : BOUTIQUE_NUMERO.test(numero) ? tp("bq.merci", { numero }) : t("bq.merciSansNumero");
    zoneRetour.classList.toggle("is-ok", retour === "reussie");
    zoneRetour.hidden = false;
  }

  async function verifierCaisse() {
    try {
      const data = await modbotApiFetch("/api/boutique/offres", { cache: "no-store" });
      if (data && data.checkout_available === false) {
        caisseOuverte = false;
        dessiner();
      }
    } catch (erreur) {
      // Bot injoignable : les cartes restent affichees ; l'erreur, s'il y
      // en a une, arrivera au moment de payer, avec un message qui la nomme.
    }
  }

  dessiner();
  afficherRetour();
  verifierCaisse();
  document.addEventListener("modbot:language", () => {
    dessiner();
    ecrireRecap();
    afficherRetour();
  });
}

/* ── Les demandes : sur mesure et assistance ─────────────────────────
   Les deux arrivent dans l'administration et dans le salon des
   paiements ; la reponse de l'equipe part en message prive. */
async function envoyerDemandeBoutique(formulaire, requete, { succesClef }) {
  const erreur = formulaire.querySelector(".boutique-erreur");
  const succes = formulaire.querySelector(".boutique-succes");
  const bouton = formulaire.querySelector("button[type='submit']");
  const libelle = bouton?.textContent || "";
  if (bouton) {
    bouton.disabled = true;
    bouton.textContent = t("bq.envoi");
  }
  try {
    const data = await requete();
    formulaire.reset();
    if (succes) {
      succes.textContent = tp(succesClef, { id: data?.id || "" });
      succes.hidden = false;
    }
  } catch (echec) {
    if (erreur) {
      erreur.textContent = echec?.message || t("bq.envoiImpossible");
      erreur.hidden = false;
    }
  }
  if (bouton) {
    bouton.disabled = false;
    bouton.textContent = libelle;
  }
}

function signalerDemandeBoutique(formulaire, message, champ) {
  const erreur = formulaire.querySelector(".boutique-erreur");
  if (erreur) {
    erreur.textContent = message;
    erreur.hidden = false;
  }
  champ?.focus();
}

function initDemandeDevis() {
  const formulaire = document.querySelector("[data-devis-formulaire]");
  if (!formulaire) return;
  formulaire.addEventListener("submit", (evenement) => {
    evenement.preventDefault();
    formulaire.querySelectorAll(".boutique-erreur, .boutique-succes").forEach((zone) => { zone.hidden = true; });
    // La premiere question : 1 = bot, 2 = site, 3 = les deux, 4 = autre.
    // Rien n'est coche d'avance, pour que le choix soit celui du client.
    const choix = formulaire.querySelector("[data-devis-categorie] input:checked");
    if (!choix) {
      signalerDemandeBoutique(formulaire, t("bq.devisChoixRequis"),
                              formulaire.querySelector("[data-devis-categorie] input"));
      return;
    }
    const champDescription = formulaire.querySelector("[data-devis-description]");
    const description = (champDescription?.value || "").trim();
    if (description.length < 20) {
      signalerDemandeBoutique(formulaire, t("bq.devisTropCourt"), champDescription);
      return;
    }
    const champDiscord = formulaire.querySelector("[data-devis-discord]");
    const contact = lireContactBoutique(champDiscord);
    if (!contact.ok) {
      signalerDemandeBoutique(formulaire, t("bq.discordInvalide"), champDiscord);
      return;
    }
    envoyerDemandeBoutique(formulaire, () => modbotApiFetch("/api/boutique/devis", {
      method: "POST",
      body: JSON.stringify({
        categorie: choix.value,
        description,
        budget: formulaire.querySelector("[data-devis-budget]")?.value || "",
        delai: formulaire.querySelector("[data-devis-delai]")?.value || "",
        discord: contact.valeur,
      }),
    }), { succesClef: "bq.devisEnvoye" });
  });
}

function initDemandeAide() {
  const formulaire = document.querySelector("[data-aide-formulaire]");
  if (!formulaire) return;
  formulaire.addEventListener("submit", (evenement) => {
    evenement.preventDefault();
    formulaire.querySelectorAll(".boutique-erreur, .boutique-succes").forEach((zone) => { zone.hidden = true; });
    const champNumero = formulaire.querySelector("[data-aide-numero]");
    const numero = (champNumero?.value || "").trim().toUpperCase();
    if (numero && !BOUTIQUE_NUMERO.test(numero)) {
      signalerDemandeBoutique(formulaire, t("bq.aideNumeroInvalide"), champNumero);
      return;
    }
    const champMessage = formulaire.querySelector("[data-aide-message]");
    const message = (champMessage?.value || "").trim();
    if (message.length < 10) {
      signalerDemandeBoutique(formulaire, t("bq.aideTropCourt"), champMessage);
      return;
    }
    const champDiscord = formulaire.querySelector("[data-aide-discord]");
    const contact = lireContactBoutique(champDiscord);
    if (!contact.ok) {
      signalerDemandeBoutique(formulaire, t("bq.discordInvalide"), champDiscord);
      return;
    }
    envoyerDemandeBoutique(formulaire, () => modbotApiFetch("/api/boutique/sav", {
      method: "POST",
      body: JSON.stringify({
        sujet: formulaire.querySelector("[data-aide-sujet]")?.value || "autre",
        numero,
        message,
        discord: contact.valeur,
      }),
    }), { succesClef: "bq.aideEnvoye" });
  });
}

/* ── Le devis du client ──────────────────────────────────────────────
   Le lien recu en message prive ouvre la boutique sur SON devis : le
   prix, le mot de l'equipe, et de quoi payer. Une page Stripe expire au
   bout d'un jour ; ce lien-la reste valable, chaque clic en ouvre une
   neuve. */
function initTonDevis() {
  const zone = document.querySelector("[data-ton-devis]");
  if (!zone) return;
  const parametres = new URLSearchParams(location.search);
  const id = parametres.get("devis") || "";
  const cle = parametres.get("cle") || "";
  if (!BOUTIQUE_DEVIS.test(id) || !cle) return;
  zone.hidden = false;
  let devis = null;
  let etat = "chargement";

  function peindre() {
    const boite = (contenu) => `<div class="boutique-ton-devis-boite">${contenu}</div>`;
    if (etat === "chargement") {
      zone.innerHTML = boite(`<p>${escapeHtmlValue(t("bq.tonDevisChargement"))}</p>`);
      return;
    }
    if (etat === "introuvable" || !devis) {
      zone.innerHTML = boite(`<h2>${escapeHtmlValue(t("bq.tonDevisTitreSeul"))}</h2>
        <p>${escapeHtmlValue(t("bq.tonDevisIntrouvable"))}</p>`);
      return;
    }
    const choixCategorie = BOUTIQUE_CATEGORIES[devis.categorie] || BOUTIQUE_CATEGORIES.autre;
    const categorie = `${choixCategorie.numero} · ${t(choixCategorie.libelleClef)}`;
    // Le devis detaille en PDF : le meme que celui joint au message prive.
    const pdf = Number(devis.prix) > 0
      ? `<a class="secondary-btn boutique-ton-devis-pdf" href="${escapeHtmlValue(`${getModbotApiBase()}/api/boutique/devis/${encodeURIComponent(id)}/pdf?cle=${encodeURIComponent(cle)}`)}" target="_blank" rel="noopener">
           <svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#u-download"/></svg>
           ${escapeHtmlValue(t("bq.tonDevisPdf"))}</a>`
      : "";
    let suite;
    if (devis.payable) {
      suite = `
        <div><span class="field-help">${escapeHtmlValue(t("bq.tonDevisPrix"))}</span>
          <div class="boutique-ton-devis-prix">${escapeHtmlValue(boutiquePrix(Number(devis.prix) || 0))}</div></div>
        ${devis.message ? `<div><span class="field-help">${escapeHtmlValue(t("bq.tonDevisMessage"))}</span>
          <blockquote>${escapeHtmlValue(devis.message)}</blockquote></div>` : ""}
        <label class="boutique-conditions"><input type="checkbox" data-devis-conditions><span>${t("bq.conditions")}</span></label>
        <p class="boutique-erreur" data-devis-paiement-erreur role="alert" hidden></p>
        <div class="boutique-payer">
          <button class="primary-btn" type="button" data-devis-payer="carte">
            <svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#u-lock"/></svg>
            ${escapeHtmlValue(t("bq.carte"))}${BOUTIQUE_MARQUES_CARTE}</button>
          <button class="secondary-btn" type="button" data-devis-payer="paypal">
            <svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-paypal"/></svg>
            ${escapeHtmlValue(t("bq.paypal"))}</button>
        </div>`;
    } else if (devis.statut === "payee") {
      suite = `<p class="boutique-succes">${escapeHtmlValue(t("bq.tonDevisPaye"))}</p>`;
    } else if (devis.statut === "clos") {
      suite = `<p>${escapeHtmlValue(t("bq.tonDevisClos"))}</p>`;
    } else {
      suite = `<p>${escapeHtmlValue(t("bq.tonDevisAttente"))}</p>`;
    }
    zone.innerHTML = boite(`
      <h2>${escapeHtmlValue(tp("bq.tonDevisTitre", { id: devis.id }))}</h2>
      <p class="boutique-ton-devis-description"><strong>${escapeHtmlValue(categorie)}</strong> — ${escapeHtmlValue(devis.description || "")}</p>
      ${suite}
      ${pdf}`);
  }

  zone.addEventListener("click", async (evenement) => {
    const bouton = evenement.target.closest("[data-devis-payer]");
    if (!bouton || bouton.disabled) return;
    const erreur = zone.querySelector("[data-devis-paiement-erreur]");
    const dire = (message) => {
      if (!erreur) return;
      erreur.textContent = message;
      erreur.hidden = false;
    };
    if (!zone.querySelector("[data-devis-conditions]")?.checked) {
      dire(t("bq.conditionsRequises"));
      return;
    }
    bouton.disabled = true;
    try {
      // Ni prix ni montant : le bot prend celui du devis.
      const data = await modbotApiFetch(`/api/boutique/devis/${encodeURIComponent(id)}/payer`, {
        method: "POST",
        body: JSON.stringify({ cle, moyen: bouton.dataset.devisPayer, conditions: true }),
      });
      if (data?.url) {
        location.href = data.url;
        return;
      }
      dire(t("bq.indisponible"));
    } catch (echec) {
      dire(echec?.message || t("bq.indisponible"));
    }
    bouton.disabled = false;
  });

  async function charger() {
    peindre();
    try {
      const data = await modbotApiFetch(
        `/api/boutique/devis/${encodeURIComponent(id)}?cle=${encodeURIComponent(cle)}`,
        { cache: "no-store" });
      devis = data?.devis || null;
      etat = devis ? "pret" : "introuvable";
    } catch (erreur) {
      etat = "introuvable";
    }
    peindre();
    zone.scrollIntoView({ block: "start" });
  }

  document.addEventListener("modbot:language", peindre);
  charger();
}

initPageBoutique();
initDemandeDevis();
initDemandeAide();
initTonDevis();
remplirPrixDAppel();
document.addEventListener("modbot:language", remplirPrixDAppel);
// Apres l'ecouteur qui range la session revenue de Discord : il est
// inscrit plus haut dans ce fichier, donc appele avant celui-ci.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", chargerCompteBoutique);
} else {
  chargerCompteBoutique();
}

/* ══════════════════════════════════════════════════════════════════
   MENU D'ACCES
   Dashboard, Ajouter ModBot, Premium, Admin et la langue occupaient
   cinq places dans la barre, melanges aux ancres de la page. Ils sont
   regroupes : la barre ne porte plus que la navigation du site.
   ══════════════════════════════════════════════════════════════════ */

function initMenuAcces() {
  const menu = document.querySelector("[data-nav-menu]");
  const declencheur = menu?.querySelector("[data-nav-menu-trigger]");
  const panneau = menu?.querySelector("[data-nav-menu-panel]");
  if (!menu || !declencheur || !panneau) return;

  const ouvrir = (etat) => {
    panneau.hidden = !etat;
    menu.classList.toggle("is-open", etat);
    declencheur.setAttribute("aria-expanded", etat ? "true" : "false");
  };

  declencheur.addEventListener("click", (evenement) => {
    evenement.stopPropagation();
    ouvrir(panneau.hidden);
  });

  // Un clic dehors ferme. Un clic DANS le menu ne doit pas fermer avant
  // que le lien n'ait eu le temps de partir.
  document.addEventListener("click", (evenement) => {
    if (!menu.contains(evenement.target)) ouvrir(false);
  });
  document.addEventListener("keydown", (evenement) => {
    if (evenement.key === "Escape") ouvrir(false);
  });

  // La langue du menu et celle du site sont la meme chose : les deux
  // selecteurs peuvent coexister sur une page, ils doivent s'accorder.
  const choixLangue = menu.querySelector("[data-nav-language]");
  if (choixLangue) {
    choixLangue.value = getSiteLanguage();
    choixLangue.addEventListener("change", () => {
      applySiteLanguage(choixLangue.value);
      const autre = document.getElementById("siteLanguage");
      if (autre && autre.value !== choixLangue.value) autre.value = choixLangue.value;
    });
    document.getElementById("siteLanguage")?.addEventListener("change", (evenement) => {
      choixLangue.value = evenement.target.value;
    });
  }
}

initMenuAcces();

/* ══════════════════════════════════════════════════════════════════
   LOGOS DES PARTENAIRES
   Discord publie, sans authentification, ce que contient un lien
   d'invitation : le nom du serveur, son avatar et son nombre de
   membres. On s'en sert plutot que de stocker des images qui
   vieillissent et des chiffres ecrits en dur qui deviennent faux.
   Si l'appel echoue, le monogramme deja dans la page reste : la carte
   ne bouge pas et rien ne clignote.
   ══════════════════════════════════════════════════════════════════ */

/* Discord est interroge une fois par jour et par serveur, pas a chaque
   page ouverte : le logo et l'effectif ne changent pas d'une minute a
   l'autre, et le visiteur voit la carte complete immediatement. */
const PARTENAIRE_CACHE_MS = 24 * 60 * 60 * 1000;

function partenaireEnCache(code) {
  try {
    const brut = localStorage.getItem(`modbot-partenaire-${code}`);
    if (!brut) return null;
    const garde = JSON.parse(brut);
    return garde.expire > Date.now() ? garde.invitation : null;
  } catch (erreur) {
    return null;  // Stockage refuse ou contenu illisible : on redemande.
  }
}

function memoriserPartenaire(code, invitation) {
  try {
    localStorage.setItem(`modbot-partenaire-${code}`, JSON.stringify({
      expire: Date.now() + PARTENAIRE_CACHE_MS,
      invitation: {
        guild: invitation?.guild,
        approximate_member_count: invitation?.approximate_member_count,
      },
    }));
  } catch (erreur) {
    // Stockage plein ou refuse : on redemandera, sans consequence.
  }
}

async function initLogosPartenaires() {
  const cartes = document.querySelectorAll("[data-partner]");
  if (!cartes.length) return;

  await Promise.all([...cartes].map(async (carte) => {
    const code = carte.dataset.partner;
    let invitation = partenaireEnCache(code);
    if (!invitation) {
      try {
        const reponse = await fetch(
          `https://discord.com/api/v10/invites/${encodeURIComponent(code)}?with_counts=true`);
        if (!reponse.ok) {
          // Une invitation morte ne se voyait nulle part : la carte
          // retombait sur son monogramme, et le bouton « Rejoindre »
          // menait au vide sans que personne s'en aperçoive. Trois
          // l'ont fait en même temps. On le dit au moins en console.
          console.warn(
            `Partenaire « ${carte.querySelector("h2, h3")?.textContent?.trim() || code} » : `
            + `invitation ${code} injoignable (HTTP ${reponse.status}). `
            + "Il faut un lien neuf, créé sans expiration.");
          return;
        }
        invitation = await reponse.json();
        memoriserPartenaire(code, invitation);
      } catch (erreur) {
        return;  // Hors ligne, ou Discord indisponible : le monogramme suffit.
      }
    }

    const serveur = invitation?.guild;
    if (!serveur) return;

    const hote = carte.querySelector("[data-partner-logo]");
    if (hote && serveur.icon) {
      // Un hash qui commence par « a_ » designe un avatar anime.
      const extension = String(serveur.icon).startsWith("a_") ? "gif" : "png";
      const image = new Image();
      image.alt = "";
      image.decoding = "async";
      // Surtout pas de loading="lazy" ici : une image detachee du
      // document n'est jamais chargee paresseusement, et comme on
      // n'insere qu'une fois chargee, les deux s'attendaient l'un
      // l'autre. Quatre icones de 128 px ne valent pas ce risque.
      // On ne remplace le monogramme qu'une fois l'image chargee :
      // sinon un carre vide apparait pendant le telechargement.
      const monogramme = hote.textContent;
      image.addEventListener("load", () => {
        hote.textContent = "";
        hote.appendChild(image);
      });
      // Une image DEJA posee peut echouer plus tard : le CDN qui hoquete,
      // un serveur qui change son icone. Sans ce retour au monogramme,
      // la carte gardait le carre casse du navigateur.
      image.addEventListener("error", () => {
        if (image.parentElement === hote) hote.textContent = monogramme;
      });
      image.src = `https://cdn.discordapp.com/icons/${serveur.id}/${serveur.icon}.${extension}?size=128`;
    }

    // La banniere du serveur, quand il en a une. Elle sert de fond au
    // bandeau de l'accueil : c'est l'image que le serveur a choisie pour
    // se presenter, autant s'en servir plutot que d'un degrade de plus.
    const fond = carte.querySelector("[data-partner-banner]");
    if (fond && serveur.banner) {
      const extension = String(serveur.banner).startsWith("a_") ? "gif" : "png";
      const image = new Image();
      image.decoding = "async";
      image.addEventListener("load", () => {
        fond.style.backgroundImage = `url("${image.src}")`;
        carte.classList.add("has-banner");
      });
      image.addEventListener("error", () => {
        // Le bandeau garde alors son degrade : mieux qu'un fond vide.
        fond.style.backgroundImage = "";
        carte.classList.remove("has-banner");
      });
      image.src = `https://cdn.discordapp.com/banners/${serveur.id}/${serveur.banner}.${extension}?size=1024`;
    }

    const effectif = carte.querySelector("[data-partner-size]");
    const membres = invitation.approximate_member_count;
    if (effectif && Number.isFinite(membres)) {
      // Le compte vient de Discord : on retire le data-i18n, sinon le
      // prochain changement de langue le remplacerait par le texte fige.
      delete effectif.dataset.i18n;
      effectif.dataset.partnerCount = String(membres);
      effectif.classList.add("is-live");
      ecrireEffectif(effectif);
    }
  }));
}

/** Ecrit « 10 924 membres » dans la langue courante. */
function ecrireEffectif(element) {
  const membres = Number(element.dataset.partnerCount);
  if (!Number.isFinite(membres)) return;
  const langue = getSiteLanguage();
  const locales = { fr: "fr-FR", en: "en-US", es: "es-ES", de: "de-DE", ar: "ar-EG" };
  element.textContent = tp("part.membres", {
    nombre: membres.toLocaleString(locales[langue] || "fr-FR"),
  });
}

// Le compte n'a plus de data-i18n : applySiteLanguage ne le retraduit
// pas. Sans ceci, changer de langue apres le chargement des logos
// laissait « 10,924 members » sur une page en francais.
document.addEventListener("modbot:language", () => {
  document.querySelectorAll("[data-partner-count]").forEach(ecrireEffectif);
});

initLogosPartenaires();

/* ══════════════════════════════════════════════════════════════════
   COMPTER LA VISITE
   Une page ouverte, une visite. Rien n'est envoye d'autre que le fait
   qu'une page a ete ouverte : pas de cookie, pas d'identifiant, pas de
   chemin. Le bot ne peut donc rien reconstituer de qui que ce soit.

   La console d'administration ne compte pas ses propres allees et
   venues : elle regarde le compteur, elle ne doit pas le gonfler.
   ══════════════════════════════════════════════════════════════════ */

(function compterLaVisite() {
  if (document.body.classList.contains("admin-page")) return;
  try {
    // `keepalive` pour que l'appel survive a une navigation immediate,
    // et aucune attente : si le bot dort, la page n'en souffre pas.
    const base = getModbotApiBase();
    if (!base) return;
    fetch(`${base}/api/public/visite`, {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: "{}",
    }).catch(() => {});
  } catch (erreur) {
    // Aucune importance : un compteur n'a jamais empeche un site de
    // s'afficher.
  }
})();
