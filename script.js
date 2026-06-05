if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const discordInvite = "https://discord.gg/CK8CbFtYuv";
const patchDiscordChannel = "https://discord.com/channels/1510421934435729586/1510440693070430324";

const siteTranslations = {
  fr: {
    "nav.features": "Fonctionnalités",
    "nav.demo": "Démo",
    "nav.pricing": "Tarifs",
    "nav.admin": "Admin",
    "nav.cta": "Demander ModBot",
    "hero.eyebrow": "Protection Discord 24/7",
    "hero.lead": "La modération intelligente qui protège votre communauté, automatise les sanctions, gère les tickets et garde votre serveur clair, sain et réactif.",
    "hero.primary": "Obtenir ModBot",
    "hero.dashboard": "Accéder au dashboard",
    "hero.demo": "Essayer les commandes",
    "stats.protection": "Protection active",
    "stats.config": "Configuration personnalisée",
    "stats.evolutions": "Évolutions possibles",
    "features.eyebrow": "Fonctionnalités",
    "features.title": "Tout ce qu’il faut pour tenir un serveur propre.",
    "features.moderation.title": "Modération",
    "features.moderation.copy": "Warn, ban, deban, sanctions graduées et historique complet des actions.",
    "features.tickets.title": "Tickets",
    "features.tickets.copy": "Support intégré avec ouverture, suivi et fermeture de tickets depuis Discord.",
    "features.stats.title": "Statistiques",
    "features.stats.copy": "Analyse des membres, activité modération et indicateurs serveur utiles.",
    "features.announcements.title": "Annonces",
    "features.announcements.copy": "Publication d’annonces, changelogs, patch notes et messages propres.",
    "features.translation.title": "Traduction",
    "features.translation.copy": "Traduction rapide pour aider les membres à communiquer sans friction.",
    "features.suggestions.title": "Suggestions",
    "features.suggestions.copy": "Collecte et suivi des idées proposées par votre communauté.",
    "features.panel.title": "Panel Admin",
    "features.panel.copy": "Gestion rapide des réglages et des outils importants du serveur.",
    "features.development.title": "Développement continu",
    "features.development.copy": "Nouvelles fonctions créées selon les besoins et les retours serveur.",
    "pricing.eyebrow": "Tarifs",
    "pricing.title": "Des offres simples et claires",
    "pricing.copy": "ModBot n’est pas ajouté librement : nous l’installons manuellement sur votre serveur.",
    "pricing.free.title": "Offre de base",
    "pricing.free.copy": "La protection ModBot pour sécuriser votre serveur toute l’année.",
    "pricing.free.period": "/ an",
    "pricing.free.item1": "Installation",
    "pricing.free.item2": "Configuration",
    "pricing.free.item3": "Protection du serveur toute l’année",
    "pricing.free.item4": "Support Discord",
    "pricing.free.cta": "Choisir cette offre",
    "pricing.premium.title": "Offre Premium",
    "pricing.premium.copy": "Tout ModBot mis en avant avec une expérience complète pour votre serveur.",
    "pricing.premium.period": "/ an",
    "pricing.premium.item1": "Bot personnalisé",
    "pricing.premium.item2": "Fonctionnalités mises en avant",
    "pricing.premium.item3": "Configuration premium complète",
    "pricing.premium.item4": "Support prioritaire",
    "pricing.premium.cta": "Choisir cette offre",
    "admin.eyebrow": "Administration",
    "admin.title": "Centre administrateur du site",
    "admin.copy": "Gérez le premium, suivez l’activité du site et préparez la synchronisation des serveurs où ModBot est installé.",
    "admin.access.title": "🔐 Accès admin",
    "admin.access.copy": "Entre ton identifiant Discord administrateur pour ouvrir l’espace de gestion.",
    "admin.access.label": "ID Discord administrateur",
    "admin.access.button": "Déverrouiller",
    "admin.stats.title": "📈 Stats du site",
    "admin.stats.visits": "Visites",
    "admin.stats.today": "Aujourd’hui",
    "admin.stats.dashboard": "Ouvertures dashboard",
    "admin.stats.installs": "Serveurs ModBot",
    "admin.premium.title": "💎 Premium membre",
    "admin.premium.badge": "Serveurs côté dashboard",
    "admin.premium.copy": "L’admin attribue le Premium et sa durée. Le membre associe ensuite jusqu’à 2 serveurs depuis son dashboard.",
    "admin.premium.member": "ID ou pseudo Discord",
    "admin.premium.duration": "Durée",
    "admin.premium.customValue": "Durée personnalisée",
    "admin.premium.customUnit": "Unité",
    "admin.premium.apply": "Attribuer le premium",
    "admin.servers.title": "🧭 Serveurs détectés",
    "admin.servers.refresh": "Rafraîchir",
    "admin.servers.copy": "Quand le backend sera branché au bot Discord, cette zone affichera automatiquement les logos réels des serveurs via les données `bot.guilds`."
  },
  en: {
    "nav.features": "Features",
    "nav.demo": "Demo",
    "nav.pricing": "Pricing",
    "nav.admin": "Admin",
    "nav.cta": "Add ModBot",
    "hero.eyebrow": "Discord protection 24/7",
    "hero.lead": "Smart moderation that protects your community, automates sanctions, manages tickets, and keeps your server clear, healthy, and responsive.",
    "hero.primary": "Get ModBot",
    "hero.dashboard": "Open dashboard",
    "hero.demo": "Try commands",
    "stats.protection": "Active protection",
    "stats.config": "Custom configuration",
    "stats.evolutions": "Possible evolutions",
    "features.eyebrow": "Features",
    "features.title": "Everything needed to keep a server clean.",
    "features.moderation.title": "Moderation",
    "features.moderation.copy": "Warn, ban, unban, progressive sanctions and full action history.",
    "features.tickets.title": "Tickets",
    "features.tickets.copy": "Built-in support with ticket opening, tracking and closing from Discord.",
    "features.stats.title": "Statistics",
    "features.stats.copy": "Member analysis, moderation activity and useful server indicators.",
    "features.announcements.title": "Announcements",
    "features.announcements.copy": "Publish announcements, changelogs, patch notes and clean messages.",
    "features.translation.title": "Translation",
    "features.translation.copy": "Fast translation to help members communicate without friction.",
    "features.suggestions.title": "Suggestions",
    "features.suggestions.copy": "Collect and track ideas proposed by your community.",
    "features.panel.title": "Admin Panel",
    "features.panel.copy": "Quick management of important server settings and tools.",
    "features.development.title": "Continuous development",
    "features.development.copy": "New features created according to server needs and feedback.",
    "pricing.eyebrow": "Pricing",
    "pricing.title": "Simple and clear offers",
    "pricing.copy": "ModBot is not added freely: we install it manually on your server.",
    "pricing.free.title": "Base offer",
    "pricing.free.copy": "ModBot protection to secure your server all year.",
    "pricing.free.period": "/ year",
    "pricing.free.item1": "Installation",
    "pricing.free.item2": "Configuration",
    "pricing.free.item3": "Year-round server protection",
    "pricing.free.item4": "Discord support",
    "pricing.free.cta": "Choose this offer",
    "pricing.premium.title": "Premium offer",
    "pricing.premium.copy": "A complete ModBot experience with advanced setup for your server.",
    "pricing.premium.period": "/ year",
    "pricing.premium.item1": "Personalized bot",
    "pricing.premium.item2": "Highlighted features",
    "pricing.premium.item3": "Complete premium configuration",
    "pricing.premium.item4": "Priority support",
    "pricing.premium.cta": "Choose this offer",
    "admin.eyebrow": "Administration",
    "admin.title": "Site administrator center",
    "admin.copy": "Manage premium, track site activity and prepare server synchronization for guilds where ModBot is installed.",
    "admin.access.title": "🔐 Admin access",
    "admin.access.copy": "Enter your administrator Discord ID to open the management area.",
    "admin.access.label": "Administrator Discord ID",
    "admin.access.button": "Unlock",
    "admin.stats.title": "📈 Site stats",
    "admin.stats.visits": "Visits",
    "admin.stats.today": "Today",
    "admin.stats.dashboard": "Dashboard opens",
    "admin.stats.installs": "ModBot servers",
    "admin.premium.title": "💎 Member premium",
    "admin.premium.badge": "Servers on dashboard",
    "admin.premium.copy": "The admin grants Premium and its duration. The member then associates up to 2 servers from their dashboard.",
    "admin.premium.member": "Discord ID or username",
    "admin.premium.duration": "Duration",
    "admin.premium.customValue": "Custom duration",
    "admin.premium.customUnit": "Unit",
    "admin.premium.apply": "Grant premium",
    "admin.servers.title": "🧭 Detected servers",
    "admin.servers.refresh": "Refresh",
    "admin.servers.copy": "When the backend is connected to the Discord bot, this area will automatically show real server logos from `bot.guilds` data."
  },
  ar: {
    "nav.features": "الميزات",
    "nav.demo": "تجربة",
    "nav.pricing": "الأسعار",
    "nav.admin": "الإدارة",
    "nav.cta": "إضافة ModBot",
    "hero.eyebrow": "حماية ديسكورد 24/7",
    "hero.lead": "إشراف ذكي يحمي مجتمعك، يدير التذاكر، وينظم الخادم بطريقة واضحة وسريعة.",
    "hero.primary": "الحصول على ModBot",
    "hero.dashboard": "فتح لوحة التحكم",
    "hero.demo": "تجربة الأوامر",
    "stats.protection": "حماية نشطة",
    "stats.config": "إعداد مخصص",
    "stats.evolutions": "تطويرات ممكنة",
    "features.eyebrow": "الميزات",
    "features.title": "كل ما تحتاجه للحفاظ على خادم منظم.",
    "features.moderation.title": "الإشراف",
    "features.moderation.copy": "تحذير، حظر، رفع حظر، عقوبات تدريجية وسجل كامل للإجراءات.",
    "features.tickets.title": "التذاكر",
    "features.tickets.copy": "دعم مدمج مع فتح وتتبع وإغلاق التذاكر من Discord.",
    "features.stats.title": "الإحصائيات",
    "features.stats.copy": "تحليل الأعضاء ونشاط الإشراف ومؤشرات مفيدة للخادم.",
    "features.announcements.title": "الإعلانات",
    "features.announcements.copy": "نشر الإعلانات وسجلات التغيير وملاحظات التحديث ورسائل منظمة.",
    "features.translation.title": "الترجمة",
    "features.translation.copy": "ترجمة سريعة لمساعدة الأعضاء على التواصل بسهولة.",
    "features.suggestions.title": "الاقتراحات",
    "features.suggestions.copy": "جمع ومتابعة الأفكار المقترحة من مجتمعك.",
    "features.panel.title": "لوحة الإدارة",
    "features.panel.copy": "إدارة سريعة لإعدادات وأدوات الخادم المهمة.",
    "features.development.title": "تطوير مستمر",
    "features.development.copy": "ميزات جديدة حسب احتياجات الخادم وملاحظاته.",
    "pricing.eyebrow": "الأسعار",
    "pricing.title": "عروض بسيطة وواضحة",
    "pricing.copy": "لا تتم إضافة ModBot تلقائياً: نقوم بتثبيته يدوياً على خادمك.",
    "pricing.free.title": "العرض الأساسي",
    "pricing.free.copy": "حماية ModBot لتأمين خادمك طوال العام.",
    "pricing.free.period": "/ سنة",
    "pricing.free.item1": "التثبيت",
    "pricing.free.item2": "الإعداد",
    "pricing.free.item3": "حماية الخادم طوال السنة",
    "pricing.free.item4": "دعم Discord",
    "pricing.free.cta": "اختيار هذا العرض",
    "pricing.premium.title": "عرض Premium",
    "pricing.premium.copy": "تجربة ModBot كاملة مع إعداد متقدم لخادمك.",
    "pricing.premium.period": "/ سنة",
    "pricing.premium.item1": "بوت مخصص",
    "pricing.premium.item2": "ميزات مميزة",
    "pricing.premium.item3": "إعداد Premium كامل",
    "pricing.premium.item4": "دعم أولوية",
    "pricing.premium.cta": "اختيار هذا العرض",
    "admin.eyebrow": "الإدارة",
    "admin.title": "مركز إدارة الموقع",
    "admin.copy": "إدارة Premium، متابعة نشاط الموقع، وتحضير مزامنة الخوادم التي يوجد فيها ModBot.",
    "admin.access.title": "🔐 دخول الإدارة",
    "admin.access.copy": "أدخل معرف Discord للمسؤول لفتح مساحة الإدارة.",
    "admin.access.label": "معرف Discord للمسؤول",
    "admin.access.button": "فتح",
    "admin.stats.title": "📈 إحصائيات الموقع",
    "admin.stats.visits": "الزيارات",
    "admin.stats.today": "اليوم",
    "admin.stats.dashboard": "فتح لوحة التحكم",
    "admin.stats.installs": "خوادم ModBot",
    "admin.premium.title": "💎 Premium للعضو",
    "admin.premium.badge": "الخوادم من لوحة التحكم",
    "admin.premium.copy": "يمنح المسؤول Premium ومدته، ثم يربط العضو ما يصل إلى خادمين من لوحة التحكم الخاصة به.",
    "admin.premium.member": "معرف Discord أو الاسم",
    "admin.premium.duration": "المدة",
    "admin.premium.customValue": "مدة مخصصة",
    "admin.premium.customUnit": "الوحدة",
    "admin.premium.apply": "منح Premium",
    "admin.servers.title": "🧭 الخوادم المكتشفة",
    "admin.servers.refresh": "تحديث",
    "admin.servers.copy": "عند ربط الخلفية ببوت ديسكورد، ستظهر هنا شعارات الخوادم الحقيقية من بيانات `bot.guilds`."
  }
};

const commandResponses = {
  panel: {
    title: "Panneau d'administration - ModBot",
    command: "/panel",
    body: "Panneau de contrôle de ModBot sur Hote BOT - ModBot. Toutes les modérations sont sauvegardées par serveur.",
    type: "panel"
  },
  stats: {
    title: "Statistiques - Hote BOT - ModBot",
    command: "/serverstats",
    body: "Résumé instantané du serveur : membres, messages du jour, avertissements, bans et tickets.",
    type: "stats"
  },
  avert: {
    title: "Dossier de modération",
    command: "/avert-count",
    body: "Dossier membre avec progression, statut et prochain niveau d'avertissement.",
    type: "avert"
  }
};

const assistantAnswers = {
  obtenir: {
    question: "Comment obtenir ModBot ?",
    answer: "ModBot n’est pas ajouté librement : nous l’installons manuellement sur votre serveur. Rejoignez notre Discord et faites votre demande, nous nous occupons de tout.",
    link: "Ouvrir le Discord"
  },
  tarifs: {
    question: "Quels sont les tarifs ?",
    answer: "L’offre de base est à 10€ par an pour protéger votre serveur toute l’année. L’offre Premium est à 35€ par an avec une configuration complète, les fonctionnalités mises en avant et le support prioritaire."
  },
  fonctionnalite: {
    question: "Comment demander une fonctionnalité ?",
    answer: "Passez par le Discord ModBot. Décrivez votre besoin, votre serveur et le résultat attendu : les évolutions sont étudiées selon votre usage."
  },
  support: {
    question: "Comment contacter le support ?",
    answer: "Le support se fait sur le serveur Discord ModBot. Vous pouvez ouvrir une demande et expliquer votre problème ou votre projet.",
    link: "Contacter le support"
  },
  patch: {
    question: "Où voir les patch notes ?",
    answer: "Les patch notes sont dans le salon Discord dédié. Si vous êtes déjà sur le serveur, ouvrez le salon Patch notes. Sinon, rejoignez d’abord le serveur ModBot.",
    link: "Voir le Discord"
  }
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

function getCommandMarkup(command) {
  const data = commandResponses[command] || commandResponses.panel;
  const thumb = `<span class="embed-thumb"><img src="assets/default_logo.png" alt="" onerror="this.onerror=null; this.src='logo.png';"></span>`;
  let embedContent = "";

  if (data.type === "panel") {
    embedContent = `
      <div class="discord-embed embed-with-thumb">
        ${thumb}
        <h3>${data.title}</h3>
        <p>Panneau de contrôle de <strong>ModBot</strong> sur <strong>Hote BOT - ModBot</strong>.</p>
        <p>Toutes les modérations sont <strong>sauvegardées par serveur</strong>.</p>
        <div class="embed-grid">
          <div class="embed-stat"><strong>Mots filtrés</strong><span class="embed-pill">37</span></div>
          <div class="embed-stat"><strong>Anti-Raid</strong><span class="embed-pill">Inactif</span></div>
          <div class="embed-stat"><strong>Anti-Invite</strong><span class="embed-pill">Inactif</span></div>
          <div class="embed-stat"><strong>Anti-Spam</strong><span class="embed-pill">Inactif</span></div>
          <div class="embed-stat"><strong>Lockdown</strong><span class="embed-pill">Inactif</span></div>
          <div class="embed-stat"><strong>Staff Alert</strong><span class="embed-pill">Inactif</span></div>
        </div>
        <div class="embed-actions">
          <span class="action-red">Insultes</span>
          <span class="action-blue">Sécurité</span>
          <span class="action-green">Salons</span>
          <span class="action-dark">Stats & Bans</span>
          <span class="action-blue">Staff</span>
          <span class="action-dark">Personnalisation</span>
        </div>
        <p class="embed-footer">ModBot - Protection de votre communauté - Aujourd'hui à 14:57</p>
      </div>
    `;
  }

  if (data.type === "stats") {
    embedContent = `
      <div class="discord-embed embed-with-thumb">
        ${thumb}
        <h3>${data.title}</h3>
        <div class="embed-grid">
          <div class="embed-stat"><strong>Membres</strong><span class="embed-pill">7</span></div>
          <div class="embed-stat"><strong>Messages aujourd'hui</strong><span class="embed-pill">0</span></div>
          <div class="embed-stat"><strong>Membres avertis</strong><span class="embed-pill">0</span></div>
          <div class="embed-stat"><strong>Total bans</strong><span class="embed-pill">0</span></div>
          <div class="embed-stat"><strong>Tickets aujourd'hui</strong><span class="embed-pill">0</span></div>
        </div>
        <p class="embed-footer">ModBot - Protection de votre communauté - Aujourd'hui à 14:58</p>
      </div>
    `;
  }

  if (data.type === "avert") {
    embedContent = `
      <div class="discord-embed avert-embed">
        <div class="avert-head">
          <div>
            <h3>gimskh</h3>
            <h4>${data.title}</h4>
          </div>
          <div class="mod-photo" aria-hidden="true"></div>
        </div>

        <div class="avert-main-fields">
          <div class="avert-field member">
            <strong>Membre</strong>
            <span class="embed-pill">@</span>
          </div>
          <div class="avert-field id">
            <strong>ID</strong>
            <span class="embed-pill">1189681599965573131</span>
          </div>
          <div class="avert-field joined">
            <strong>Rejoint le</strong>
            <span>30/05/2026<br>à 23:51</span>
          </div>
        </div>

        <div class="avert-secondary-fields">
          <div class="avert-field progress">
            <strong>Progression</strong>
            <div class="progress-line">
              <div class="meter"><span></span></div>
              <span class="embed-pill">0/4</span>
            </div>
          </div>
          <div class="avert-field">
            <strong>Prochain</strong>
            <span>warn</span>
          </div>
          <div class="avert-field">
            <strong>Statut</strong>
            <span>Aucun</span>
          </div>
        </div>

        <p class="embed-footer">ModBot - Dossier de modération - Aujourd'hui à 14:59</p>
      </div>
    `;
  }

  return `
    <div class="discord-command-preview">
      <div class="discord-message">
        <span class="discord-avatar"><img src="assets/default_logo.png" alt="" onerror="this.onerror=null; this.src='logo.png';">MB</span>
        <div>
          <div class="discord-meta">
            <span class="used-command">LGCY a utilisé</span>
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

function renderCommand(target, command) {
  target.innerHTML = getCommandMarkup(command);
}

function initHeroCommands() {
  const stage = document.getElementById("heroCommandStage");
  const buttons = document.querySelectorAll(".command-card");
  if (!stage || !buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      renderCommand(stage, button.dataset.command);
    });
  });

  renderCommand(stage, "panel");
}

function appendDemoMessage(feed, text, type) {
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  feed.appendChild(message);
  feed.scrollTop = feed.scrollHeight;
}

function runDemoCommand(command) {
  const feed = document.getElementById("demoFeed");
  if (!feed) return;

  const data = commandResponses[command] || commandResponses.panel;

  feed.innerHTML = "";
  appendDemoMessage(feed, data.command, "user");

  window.setTimeout(() => {
    const message = document.createElement("div");
    message.className = "message bot command-demo-message";
    message.innerHTML = getCommandMarkup(command);
    feed.appendChild(message);
    feed.scrollTop = feed.scrollHeight;
  }, 260);
}

function initDemo() {
  const buttons = document.querySelectorAll(".demo-command");
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      runDemoCommand(button.dataset.command);
    });
  });

  runDemoCommand("panel");
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

  addAssistantMessage("user", data.question);

  window.setTimeout(() => {
    const link = data.link && key !== "patch" ? `<a href="${discordInvite}" target="_blank" rel="noreferrer">${data.link} →</a>` : "";
    const patchLinks = key === "patch"
      ? `<a href="${patchDiscordChannel}" target="_blank" rel="noreferrer">Ouvrir le salon →</a><a href="${discordInvite}" target="_blank" rel="noreferrer">Rejoindre le serveur →</a>`
      : "";
    addAssistantMessage("bot", `${data.answer}${link}${patchLinks}`);
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

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initSiteLanguage() {
  const selector = document.getElementById("siteLanguage");
  if (!selector) return;

  function applyLanguage(language) {
    const dictionary = siteTranslations[language] || siteTranslations.fr;
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = dictionary[element.dataset.i18n];
      if (value) element.textContent = value;
    });
    localStorage.setItem("modbot-site-language", language);
  }

  const savedLanguage = localStorage.getItem("modbot-site-language") || "fr";
  selector.value = savedLanguage;
  applyLanguage(savedLanguage);
  selector.addEventListener("change", () => applyLanguage(selector.value));
}

function getStoredNumber(key, fallback = 0) {
  return Number(localStorage.getItem(key) || fallback) || 0;
}

function setStoredNumber(key, value) {
  localStorage.setItem(key, String(value));
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

  const allowedAdminIds = new Set([
    "1189681599965573131"
  ]);
  const visits = document.querySelector("[data-admin-stat='visits']");
  const today = document.querySelector("[data-admin-stat='today']");
  const dashboard = document.querySelector("[data-admin-stat='dashboard']");
  const installs = document.querySelector("[data-admin-stat='installs']");
  const statsBadge = document.querySelector("[data-admin-stats-badge]");
  const adminIdInput = document.querySelector("[data-admin-id]");
  const adminError = document.querySelector("[data-admin-error]");
  const adminStatus = document.querySelector("[data-admin-status]");
  const adminGateItems = document.querySelectorAll("[data-admin-gate]");
  const protectedItems = document.querySelectorAll("[data-admin-protected]");
  const toast = document.getElementById("adminToast");
  const durationSelect = document.querySelector("[data-premium-duration]");
  const customDuration = document.querySelector("[data-premium-custom-duration]");
  const customDurationValue = document.querySelector("[data-premium-custom-value]");
  const customDurationUnit = document.querySelector("[data-premium-custom-unit]");
  let adminToastTimer;

  function showAdminToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(adminToastTimer);
    adminToastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
  }

  function formatStat(value) {
    return Number(value || 0).toLocaleString("fr-FR");
  }

  function getLocalAdminStats() {
    return {
      visits: getStoredNumber("modbot-analytics-visits"),
      today: getStoredNumber("modbot-analytics-today"),
      dashboard: getStoredNumber("modbot-analytics-dashboard"),
      installs: document.querySelectorAll("[data-admin-server-list] > div").length
    };
  }

  function setAdminStats(stats, sourceLabel) {
    if (visits) visits.textContent = formatStat(stats.visits);
    if (today) today.textContent = formatStat(stats.today);
    if (dashboard) dashboard.textContent = formatStat(stats.dashboard);
    if (installs) installs.textContent = formatStat(stats.installs);
    if (statsBadge) statsBadge.textContent = sourceLabel;
  }

  async function loadAdminStats() {
    if (statsBadge) statsBadge.textContent = "Chargement";

    try {
      const response = await fetch("/api/admin/stats", { cache: "no-store" });
      if (response.ok) {
        const data = await response.json();
        setAdminStats({
          visits: data.visits,
          today: data.today,
          dashboard: data.dashboardOpens ?? data.dashboard,
          installs: data.installs ?? data.servers
        }, "API active");
        return;
      }
    } catch (error) {
      // Le site peut fonctionner sans backend pendant la maquette.
    }

    setAdminStats(getLocalAdminStats(), "Stats locales");
  }

  function unlockAdmin(adminId) {
    adminGateItems.forEach((item) => {
      item.hidden = true;
    });
    protectedItems.forEach((item) => {
      item.hidden = false;
    });
    if (adminStatus) adminStatus.innerHTML = "<span></span> ✅ Admin validé";
    if (adminError) adminError.hidden = true;
    sessionStorage.setItem("modbot-admin-id", adminId);
    loadAdminStats();
    showAdminToast("✅ Accès administrateur ouvert");
  }

  function tryUnlockAdmin() {
    const adminId = adminIdInput?.value.trim() || "";
    if (!allowedAdminIds.has(adminId)) {
      if (adminError) adminError.hidden = false;
      showAdminToast("❌ ID Discord non autorisé");
      return;
    }
    unlockAdmin(adminId);
  }

  const savedAdminId = sessionStorage.getItem("modbot-admin-id");
  if (savedAdminId && allowedAdminIds.has(savedAdminId)) {
    unlockAdmin(savedAdminId);
  }

  document.querySelector("[data-admin-unlock]")?.addEventListener("click", tryUnlockAdmin);
  adminIdInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") tryUnlockAdmin();
  });

  function updateCustomDurationVisibility() {
    if (!customDuration || !durationSelect) return;
    customDuration.hidden = durationSelect.value !== "custom";
  }

  function getPremiumDuration() {
    if (durationSelect?.value !== "custom") {
      return durationSelect?.value || "Permanent";
    }

    const value = Math.max(1, Number(customDurationValue?.value || 1));
    const unit = customDurationUnit?.value || "jours";
    return `${value} ${unit}`;
  }

  durationSelect?.addEventListener("change", updateCustomDurationVisibility);
  updateCustomDurationVisibility();

  document.querySelector("[data-premium-apply]")?.addEventListener("click", () => {
    const memberInput = document.querySelector("[data-premium-member]");
    const list = document.querySelector("[data-premium-list]");
    const member = memberInput?.value.trim();
    if (!member || !list) return;
    const duration = getPremiumDuration();
    const item = document.createElement("div");
    const identity = document.createElement("span");
    const name = document.createElement("strong");
    const serverLine = document.createElement("small");
    const meta = document.createElement("span");
    name.textContent = member;
    serverLine.textContent = "Serveurs à associer depuis le dashboard";
    meta.textContent = `Premium ${duration}`;
    identity.append(name, serverLine);
    item.append(identity, meta);
    list.prepend(item);
    memberInput.value = "";
    showAdminToast(`💎 Premium ajouté pour ${member}`);
  });

  document.querySelector("[data-refresh-servers]")?.addEventListener("click", () => {
    const list = document.querySelector("[data-admin-server-list]");
    if (!list) return;
    list.querySelectorAll("small").forEach((item) => {
      item.textContent = "Prêt pour sync bot.guilds";
    });
  });
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

  const tabs = document.querySelectorAll("[data-dashboard-tab]");
  const panels = document.querySelectorAll("[data-dashboard-panel]");
  const toast = document.getElementById("dashboardToast");
  const authScreen = document.querySelector("[data-auth-screen]");
  const serverScreen = document.querySelector("[data-server-screen]");
  const dashboardApp = document.querySelector("[data-dashboard-app]");
  const currentServerTargets = document.querySelectorAll("[data-current-server], [data-current-server-label]");
  const currentServerLogoTargets = document.querySelectorAll("[data-current-server-logo], [data-current-server-logo-inline]");
  const currentServerLogoShells = document.querySelectorAll("[data-current-server-logo-shell]");
  const premiumUsedTarget = document.querySelector("[data-premium-used]");
  const premiumSlots = document.querySelector("[data-dashboard-premium-slots]");
  const premiumServerChoices = document.querySelectorAll("[data-premium-server-choice]");
  const tournamentEnabled = document.querySelector("[data-tournament-enabled]");
  const tournamentState = document.querySelector("[data-tournament-state]");
  const tournamentCommandState = document.querySelector("[data-tournament-command-state]");
  const tournamentOverviewState = document.querySelector("[data-tournament-overview-state]");
  const tournamentCommandCards = document.querySelectorAll(".tournament-command-card");
  const tournamentNameInput = document.querySelector("[data-tournament-name]");
  const tournamentFormatInput = document.querySelector("[data-tournament-format]");
  const tournamentTeamsInput = document.querySelector("[data-tournament-teams]");
  const tournamentChannelInput = document.querySelector("[data-tournament-channel]");
  const tournamentRoleInput = document.querySelector("[data-tournament-role]");
  const unsavedModal = document.querySelector("[data-unsaved-modal]");
  const publishTicketButton = document.querySelector("[data-publish-ticket]");
  const ticketChannelInput = document.querySelector("[data-ticket-channel]");
  const personalizationDefaults = {
    name: "ModBot",
    footer: "ModBot - Protection de votre communauté",
    logo: "assets/default_logo.png",
    banner: "assets/default_banner.png",
    color: "#5865F2"
  };
  let activePanelName = "overview";
  let hasUnsavedChanges = false;
  let dirtyPanelName = null;
  let ticketNeedsPublish = false;
  let pendingNavigation = null;
  let toastTimer;
  let selectedServer = {
    name: "Hote BOT - ModBot",
    logo: "assets/default_logo.png",
    initials: "HB"
  };
  let premiumDraftServers = readStoredPremiumServers();
  let tournamentDraft = readStoredTournamentConfig();

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
      img.addEventListener("error", () => markLogoFallback(img));
      img.addEventListener("load", () => img.closest(".server-logo-shell")?.classList.remove("is-fallback"));
      checkImage();
    });
  }

  function readStoredPremiumServers() {
    try {
      const parsed = JSON.parse(localStorage.getItem("modbot-dashboard-premium-servers") || "[]");
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter((server) => server && server.name)
        .map((server) => ({
          name: String(server.name),
          logo: String(server.logo || "assets/default_logo.png"),
          initials: String(server.initials || "MB")
        }))
        .slice(0, 2);
    } catch (error) {
      return [];
    }
  }

  function savePremiumServers() {
    localStorage.setItem("modbot-dashboard-premium-servers", JSON.stringify(premiumDraftServers.slice(0, 2)));
  }

  function defaultTournamentConfig() {
    return {
      enabled: false,
      name: "EA FC 26 Club Pro Cup",
      format: "Poules + phase finale",
      teams: "32",
      channel: "",
      role: ""
    };
  }

  function readStoredTournamentConfig() {
    try {
      const stored = JSON.parse(localStorage.getItem("modbot-dashboard-tournament") || "null");
      return {
        ...defaultTournamentConfig(),
        ...(stored && typeof stored === "object" ? stored : {})
      };
    } catch (error) {
      return defaultTournamentConfig();
    }
  }

  function collectTournamentConfig() {
    return {
      enabled: Boolean(tournamentEnabled?.checked),
      name: tournamentNameInput?.value.trim() || defaultTournamentConfig().name,
      format: tournamentFormatInput?.value || defaultTournamentConfig().format,
      teams: tournamentTeamsInput?.value || defaultTournamentConfig().teams,
      channel: tournamentChannelInput?.value.trim() || "",
      role: tournamentRoleInput?.value.trim() || ""
    };
  }

  function saveTournamentConfig() {
    tournamentDraft = collectTournamentConfig();
    localStorage.setItem("modbot-dashboard-tournament", JSON.stringify(tournamentDraft));
  }

  function syncTournamentState(isActive = Boolean(tournamentEnabled?.checked)) {
    const stateText = isActive ? "🟢 Actif" : "⚪ Inactif";
    const commandText = isActive ? "🟢 Commandes disponibles" : "⚪ Module inactif";

    if (tournamentState) {
      tournamentState.classList.toggle("active", isActive);
      tournamentState.classList.toggle("inactive", !isActive);
      tournamentState.textContent = stateText;
    }

    if (tournamentCommandState) {
      tournamentCommandState.classList.toggle("active", isActive);
      tournamentCommandState.classList.toggle("inactive", !isActive);
      tournamentCommandState.textContent = commandText;
    }

    if (tournamentOverviewState) {
      tournamentOverviewState.textContent = isActive ? "Actif" : "Inactif";
    }

    tournamentCommandCards.forEach((card) => {
      card.classList.toggle("is-disabled", !isActive);
    });
  }

  function applyTournamentConfig(config = defaultTournamentConfig()) {
    if (tournamentEnabled) tournamentEnabled.checked = Boolean(config.enabled);
    if (tournamentNameInput) tournamentNameInput.value = config.name || defaultTournamentConfig().name;
    if (tournamentFormatInput) tournamentFormatInput.value = config.format || defaultTournamentConfig().format;
    if (tournamentTeamsInput) tournamentTeamsInput.value = config.teams || defaultTournamentConfig().teams;
    if (tournamentChannelInput) tournamentChannelInput.value = config.channel || "";
    if (tournamentRoleInput) tournamentRoleInput.value = config.role || "";
    tournamentEnabled?.closest(".toggle-line")?.classList.toggle("is-on", Boolean(config.enabled));
    syncTournamentState(Boolean(config.enabled));
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

  function isPremiumServerAssociated(serverName) {
    return premiumDraftServers.some((server) => server.name === serverName);
  }

  function renderPremiumAssociations() {
    if (premiumUsedTarget) premiumUsedTarget.textContent = String(premiumDraftServers.length);

    if (premiumSlots) {
      premiumSlots.innerHTML = "";
      for (let index = 0; index < 2; index += 1) {
        const server = premiumDraftServers[index];
        const slot = document.createElement("div");
        slot.className = `premium-slot ${server ? "is-filled" : "is-empty"}`;

        if (server) {
          slot.innerHTML = `
            <span class="server-logo-shell" data-initials="${escapeHtml(server.initials)}">
              <img src="${escapeHtml(server.logo)}" alt="" data-logo-img>
            </span>
            <span>
              <strong>${escapeHtml(server.name)}</strong>
              <small>Emplacement ${index + 1}/2 actif</small>
            </span>
            <button class="secondary-btn compact" type="button" data-premium-remove-slot="${index}">Retirer</button>
          `;
        } else {
          slot.textContent = `Emplacement ${index + 1} libre`;
        }

        premiumSlots.append(slot);
      }
      setupLogoFallbacks();
    }

    premiumServerChoices.forEach((choice) => {
      const associated = isPremiumServerAssociated(choice.dataset.serverName);
      choice.classList.toggle("is-associated", associated);
      choice.setAttribute("aria-pressed", associated ? "true" : "false");
    });
  }

  function addPremiumServer(server) {
    if (!server?.name) return;
    if (isPremiumServerAssociated(server.name)) {
      showToast("✅ Ce serveur est déjà associé au Premium");
      return;
    }
    if (premiumDraftServers.length >= 2) {
      showToast("⚠️ Maximum 2 serveurs Premium");
      return;
    }

    premiumDraftServers = [...premiumDraftServers, server].slice(0, 2);
    renderPremiumAssociations();
    markPanelDirty("premium");
    showToast(`💎 ${server.name} ajouté aux emplacements Premium`);
  }

  function removePremiumServer(index) {
    const removed = premiumDraftServers[index];
    premiumDraftServers = premiumDraftServers.filter((_, serverIndex) => serverIndex !== index);
    renderPremiumAssociations();
    markPanelDirty("premium");
    showToast(removed ? `🗑️ ${removed.name} retiré du Premium` : "🗑️ Emplacement libéré");
  }

  function setCurrentServer(serverName, serverLogo = "assets/default_logo.png", initials = "MB") {
    selectedServer = {
      name: serverName,
      logo: serverLogo,
      initials
    };
    currentServerTargets.forEach((target) => {
      target.textContent = serverName;
    });
    currentServerLogoShells.forEach((shell) => {
      shell.dataset.initials = initials;
      shell.classList.remove("is-fallback");
    });
    currentServerLogoTargets.forEach((logo) => {
      logo.src = serverLogo;
      logo.alt = serverName;
    });
  }

  function setTicketPublishVisible(isVisible) {
    if (!publishTicketButton) return;
    publishTicketButton.hidden = !isVisible;
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

  function saveCurrentChanges(message = "💾 Configuration enregistrée") {
    if (!hasUnsavedChanges) {
      showToast("✅ Tout est déjà enregistré");
      return;
    }
    if (dirtyPanelName === "premium") {
      savePremiumServers();
    }
    if (dirtyPanelName === "tournaments") {
      saveTournamentConfig();
    }
    clearUnsavedChanges();
    showToast(message);
  }

  function showUnsavedModal(action) {
    pendingNavigation = action;
    openPanel(activePanelName);
    if (!unsavedModal) {
      saveCurrentChanges();
      pendingNavigation?.();
      pendingNavigation = null;
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

  function openPanel(panelName) {
    activePanelName = panelName;
    tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.dashboardTab === panelName));
    panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.dashboardPanel === panelName));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.querySelector("[data-dashboard-login]")?.addEventListener("click", () => {
    showDashboardStage("servers");
    showToast("Connexion Discord simulée");
  });

  document.querySelector("[data-auth-back]")?.addEventListener("click", () => {
    showDashboardStage("auth");
  });

  document.querySelector("[data-change-server]")?.addEventListener("click", () => {
    runWithUnsavedGuard(() => showDashboardStage("servers"));
  });

  document.querySelectorAll(".server-card[data-server-name]").forEach((serverCard) => {
    serverCard.addEventListener("click", () => {
      const cardLogo = serverCard.querySelector("[data-logo-img]");
      const loadedLogo = cardLogo?.currentSrc || cardLogo?.src || serverCard.dataset.serverLogo || "assets/default_logo.png";
      const initials = serverCard.dataset.serverInitials || serverCard.dataset.serverName?.slice(0, 2).toUpperCase() || "MB";
      setCurrentServer(serverCard.dataset.serverName || "Serveur ModBot", loadedLogo, initials);
      showDashboardStage("dashboard");
      showToast(`Serveur sélectionné : ${serverCard.dataset.serverName}`);
    });
  });

  document.querySelector("[data-premium-associate-current]")?.addEventListener("click", () => {
    addPremiumServer(selectedServer);
  });

  premiumServerChoices.forEach((choice) => {
    choice.addEventListener("click", () => {
      addPremiumServer({
        name: choice.dataset.serverName || "Serveur ModBot",
        logo: choice.dataset.serverLogo || "assets/default_logo.png",
        initials: choice.dataset.serverInitials || "MB"
      });
    });
  });

  premiumSlots?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-premium-remove-slot]");
    if (!button) return;
    removePremiumServer(Number(button.dataset.premiumRemoveSlot || 0));
  });

  document.querySelector("[data-reset-premium-associations]")?.addEventListener("click", () => {
    premiumDraftServers = [];
    renderPremiumAssociations();
    markPanelDirty("premium");
    showToast("♻️ Emplacements Premium vidés");
  });

  renderPremiumAssociations();
  applyTournamentConfig(tournamentDraft);

  tournamentEnabled?.addEventListener("change", () => {
    syncTournamentState(tournamentEnabled.checked);
    showToast(tournamentEnabled.checked ? "🏆 Module tournois activé" : "⚪ Module tournois désactivé");
  });

  document.querySelector("[data-reset-tournament]")?.addEventListener("click", () => {
    tournamentDraft = defaultTournamentConfig();
    applyTournamentConfig(tournamentDraft);
    markPanelDirty("tournaments");
    showToast("♻️ Module tournois réinitialisé");
  });

  setupLogoFallbacks();

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const panelName = tab.dataset.dashboardTab;
      if (!panelName || panelName === activePanelName) return;
      runWithUnsavedGuard(() => openPanel(panelName));
    });
  });

  document.querySelectorAll("[data-dashboard-jump]").forEach((button) => {
    button.addEventListener("click", () => {
      const panelName = button.dataset.dashboardJump;
      if (!panelName || panelName === activePanelName) return;
      runWithUnsavedGuard(() => openPanel(panelName));
    });
  });

  document.querySelectorAll("[data-dashboard-save]").forEach((button) => {
    button.addEventListener("click", () => saveCurrentChanges("💾 Configuration enregistrée dans la maquette"));
  });

  document.querySelectorAll("[data-reset-section]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = button.closest("[data-dashboard-panel]");
      markPanelDirty(panel?.dataset.dashboardPanel || activePanelName);
      showToast("♻️ Section réinitialisée");
    });
  });

  document.querySelector("[data-unsaved-save]")?.addEventListener("click", () => {
    const action = pendingNavigation;
    closeUnsavedModal();
    saveCurrentChanges("💾 Configuration sauvegardée");
    pendingNavigation = null;
    action?.();
  });

  document.querySelector("[data-unsaved-discard]")?.addEventListener("click", () => {
    const action = pendingNavigation;
    closeUnsavedModal();
    if (dirtyPanelName === "tickets") {
      ticketNeedsPublish = false;
      setTicketPublishVisible(false);
    }
    if (dirtyPanelName === "premium") {
      premiumDraftServers = readStoredPremiumServers();
      renderPremiumAssociations();
    }
    if (dirtyPanelName === "tournaments") {
      tournamentDraft = readStoredTournamentConfig();
      applyTournamentConfig(tournamentDraft);
    }
    clearUnsavedChanges();
    showToast("🗑️ Modifications laissées de côté");
    pendingNavigation = null;
    action?.();
  });

  panels.forEach((panel) => {
    const panelName = panel.dataset.dashboardPanel;
    panel.addEventListener("input", (event) => {
      if (event.target.matches("input, textarea, select")) markPanelDirty(panelName);
    });
    panel.addEventListener("change", (event) => {
      if (event.target.matches("input, textarea, select")) markPanelDirty(panelName);
    });
  });

  document.querySelectorAll(".toggle-line input[type='checkbox']").forEach((checkbox) => {
    const line = checkbox.closest(".toggle-line");
    const syncToggle = () => line?.classList.toggle("is-on", checkbox.checked);
    syncToggle();
    checkbox.addEventListener("change", () => {
      syncToggle();
      markPanelDirty(checkbox.closest("[data-dashboard-panel]")?.dataset.dashboardPanel || activePanelName);
      if (checkbox.matches("[data-tournament-enabled]")) {
        showToast(checkbox.checked ? "🏆 Module tournois activé" : "⚪ Module tournois désactivé");
      } else {
        showToast(checkbox.checked ? "Module activé" : "Module désactivé");
      }
    });
  });

  const previewTitle = document.querySelector("[data-preview-title]");
  const previewDescription = document.querySelector("[data-preview-desc]");
  const previewEmoji = document.querySelector("[data-preview-emoji]");
  const liveTitle = document.querySelector("[data-live-title]");
  const liveDescription = document.querySelector("[data-live-desc]");
  const liveTicketEmoji = document.querySelector("[data-live-ticket-emoji]");

  previewTitle?.addEventListener("input", () => {
    if (liveTitle) liveTitle.textContent = previewTitle.value || "Ouvre ton ticket";
  });

  previewDescription?.addEventListener("input", () => {
    if (liveDescription) liveDescription.textContent = previewDescription.value || "Merci de sélectionner la raison de ta demande.";
  });

  previewEmoji?.addEventListener("input", () => {
    if (liveTicketEmoji) liveTicketEmoji.textContent = previewEmoji.value || "📩";
  });

  const optionList = document.getElementById("ticketOptionList");
  const addOptionButton = document.querySelector("[data-add-ticket-option]");

  addOptionButton?.addEventListener("click", () => {
    if (!optionList) return;
    const count = optionList.querySelectorAll(".option-row").length + 1;
    const option = document.createElement("div");
    option.className = "option-row";
    option.innerHTML = `
      <span>${String(count).padStart(2, "0")}</span>
      <input class="emoji-input" type="text" value="✨" maxlength="3">
      <input type="text" value="Nouvelle option">
      <input type="text" value="Description de l'option">
      <button type="button">Supprimer</button>
    `;
    optionList.appendChild(option);
    markPanelDirty("tickets");
    showToast("Option de ticket ajoutée");
  });

  optionList?.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const rows = optionList.querySelectorAll(".option-row");
    if (rows.length <= 1) {
      showToast("Il faut garder au moins une option");
      return;
    }
    button.closest(".option-row")?.remove();
    optionList.querySelectorAll(".option-row span").forEach((label, index) => {
      label.textContent = String(index + 1).padStart(2, "0");
    });
    markPanelDirty("tickets");
    showToast("Option supprimée");
  });

  publishTicketButton?.addEventListener("click", () => {
    const channel = ticketChannelInput?.value.trim() || "salon ticket désigné";
    ticketNeedsPublish = false;
    setTicketPublishVisible(false);
    if (dirtyPanelName === "tickets") clearUnsavedChanges();
    showToast(`🚀 Message ticket publié dans le salon ${channel}`);
  });

  document.querySelectorAll(".social-card").forEach((card) => {
    const enabled = card.querySelector("[data-social-enabled]");
    const state = card.querySelector("[data-social-state]");
    const linkInput = card.querySelector("[data-social-link]");
    const channelInput = card.querySelector("[data-social-channel]");
    const testButton = card.querySelector("[data-social-test]");
    const platform = card.dataset.socialPlatform || "Réseau";

    function syncSocialState() {
      const isActive = Boolean(enabled?.checked);
      if (!state) return;
      state.classList.toggle("active", isActive);
      state.classList.toggle("inactive", !isActive);
      state.textContent = isActive ? "🟢 Actif" : "⚪ Inactif";
    }

    syncSocialState();

    enabled?.addEventListener("change", () => {
      syncSocialState();
      markPanelDirty("socials");
      showToast(enabled.checked ? `📣 Relais ${platform} activé` : `⚪ Relais ${platform} désactivé`);
    });

    testButton?.addEventListener("click", () => {
      const link = linkInput?.value.trim();
      const channel = channelInput?.value.trim();
      if (!link || !channel) {
        showToast(`⚠️ Ajoute le lien ${platform} et l'ID du salon`);
        return;
      }
      showToast(`🧪 Test ${platform} envoyé dans le salon ${channel}`);
    });
  });

  const colorPreview = document.querySelector(".live-color-preview");
  document.querySelectorAll(".color-swatch").forEach((swatch) => {
    swatch.addEventListener("click", () => {
      document.querySelectorAll(".color-swatch").forEach((item) => item.classList.remove("is-selected"));
      swatch.classList.add("is-selected");
      colorPreview?.style.setProperty("--dashboard-accent", swatch.dataset.color || "#5865F2");
      markPanelDirty("personalization");
      showToast("Couleur d'embed mise à jour");
    });
  });

  const personalization = document.querySelector("[data-dashboard-panel='personalization']");
  const fileInputs = personalization ? personalization.querySelectorAll("input[type='file']") : [];
  const liveLogo = personalization?.querySelector(".embed-thumb img");
  const liveBanner = personalization?.querySelector(".preview-banner");
  const personalizationName = document.querySelector("[data-personalization-name]");
  const personalizationFooter = document.querySelector("[data-personalization-footer]");
  const personalizationPreviewTitle = document.querySelector("[data-personalization-preview-title]");
  const personalizationPreviewFooter = document.querySelector("[data-personalization-preview-footer]");

  fileInputs.forEach((input) => {
    input.addEventListener("change", () => {
      const file = input.files?.[0];
      const field = input.closest(".file-field");
      const fileName = field?.querySelector("[data-file-name]");
      if (fileName) fileName.textContent = file ? file.name : "Aucun fichier sélectionné";
      if (file && input.dataset.fileInput === "logo" && liveLogo) liveLogo.src = URL.createObjectURL(file);
      if (file && input.dataset.fileInput === "banner" && liveBanner) liveBanner.src = URL.createObjectURL(file);
      markPanelDirty("personalization");
      showToast(file ? "Fichier ajouté à l'aperçu" : "Aucun fichier sélectionné");
    });
  });

  personalizationName?.addEventListener("input", () => {
    if (personalizationPreviewTitle) {
      personalizationPreviewTitle.textContent = `${personalizationName.value || personalizationDefaults.name} - Panel`;
    }
  });

  personalizationFooter?.addEventListener("input", () => {
    if (personalizationPreviewFooter) {
      personalizationPreviewFooter.textContent = personalizationFooter.value || personalizationDefaults.footer;
    }
  });

  document.querySelector("[data-cancel-personalization]")?.addEventListener("click", () => {
    if (personalizationName) personalizationName.value = personalizationDefaults.name;
    if (personalizationFooter) personalizationFooter.value = personalizationDefaults.footer;
    if (personalizationPreviewTitle) personalizationPreviewTitle.textContent = "Panel ModBot";
    if (personalizationPreviewFooter) personalizationPreviewFooter.textContent = personalizationDefaults.footer;
    if (liveLogo) liveLogo.src = personalizationDefaults.logo;
    if (liveBanner) liveBanner.src = personalizationDefaults.banner;
    fileInputs.forEach((input) => {
      input.value = "";
      const field = input.closest(".file-field");
      const fileName = field?.querySelector("[data-file-name]");
      if (fileName) fileName.textContent = "Aucun fichier sélectionné";
    });
    document.querySelectorAll(".color-swatch").forEach((item) => {
      const isDefault = item.dataset.color === personalizationDefaults.color;
      item.classList.toggle("is-selected", isDefault);
    });
    colorPreview?.style.setProperty("--dashboard-accent", personalizationDefaults.color);
    if (dirtyPanelName === "personalization") clearUnsavedChanges();
    showToast("↩️ Personnalisation remise sur la base ModBot");
  });

  document.querySelectorAll(".dashboard-page button, .dashboard-page .primary-btn, .dashboard-page .secondary-btn").forEach((element) => {
    element.addEventListener("click", (event) => {
      if (element.classList.contains("color-swatch")) return;
      const bounds = element.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "button-ripple";
      ripple.style.left = `${event.clientX - bounds.left}px`;
      ripple.style.top = `${event.clientY - bounds.top}px`;
      element.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 620);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  resetInitialScroll();
  initStarfield();
  trackSiteAnalytics();
  initNavigation();
  initSiteLanguage();
  initAdminZone();
  initHeroCommands();
  initDemo();
  initAssistant();
  initRevealAnimations();
  initDashboard();
});
