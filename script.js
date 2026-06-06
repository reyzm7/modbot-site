if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const discordInvite = "https://discord.gg/CK8CbFtYuv";
const patchDiscordChannel = "https://discord.com/channels/1510421934435729586/1510440693070430324";
const modbotDiscordClientId = String(window.MODBOT_DISCORD_CLIENT_ID || document.querySelector('meta[name="modbot-discord-client-id"]')?.content || "").trim();
const modbotBotPermissions = String(window.MODBOT_BOT_PERMISSIONS || "8");

const siteTranslations = {
  fr: {
    "nav.features": "Fonctionnalités",
    "nav.demo": "Démo",
    "nav.pricing": "Tarifs",
    "nav.wiki": "Wiki",
    "nav.admin": "Admin",
    "nav.dashboard": "Dashboard",
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
    "features.development.title": "Automatisations",
    "features.development.copy": "Messages récurrents, rôles réactions, arrivées et départs configurables.",
    "pricing.eyebrow": "Tarifs",
    "pricing.title": "Des offres simples et claires",
    "pricing.copy": "Commence gratuitement avec la sécurité, puis ajoute les modules avancés selon les besoins de ton serveur.",
    "pricing.free.title": "Gratuit",
    "pricing.free.copy": "Le socle essentiel pour protéger et modérer ton serveur Discord.",
    "pricing.free.period": "/ toujours",
    "pricing.free.item1": "Sécurité serveur",
    "pricing.free.item2": "Modération",
    "pricing.free.item3": "Salons de logs",
    "pricing.free.item4": "Configuration des salons essentiels",
    "pricing.free.cta": "Choisir cette offre",
    "pricing.premium.title": "Offre Premium",
    "pricing.premium.copy": "Pour les serveurs qui veulent les tickets, ratings et outils de gestion complets.",
    "pricing.premium.period": "/ 2 mois",
    "pricing.premium.item1": "Modération complète",
    "pricing.premium.item2": "Ratings support",
    "pricing.premium.item3": "Logs et salons avancés",
    "pricing.premium.item4": "Système de tickets",
    "pricing.premium.cta": "Choisir cette offre",
    "pricing.ultimate.title": "Offre complète",
    "pricing.ultimate.copy": "Tout ModBot avec accompagnement prioritaire et personnalisations dédiées.",
    "pricing.ultimate.period": "/ 3 mois",
    "pricing.ultimate.item1": "Tout le Premium",
    "pricing.ultimate.item2": "Support Discord prioritaire",
    "pricing.ultimate.item3": "Personnalisations juste pour vous",
    "pricing.ultimate.item4": "Accompagnement configuration avancée",
    "pricing.ultimate.cta": "Choisir cette offre",
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
    "admin.premium.badge": "2 serveurs maximum",
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
    "nav.wiki": "Wiki",
    "nav.admin": "Admin",
    "nav.dashboard": "Dashboard",
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
    "features.development.title": "Automations",
    "features.development.copy": "Recurring messages, reaction roles, welcome and departure messages you can configure.",
    "pricing.eyebrow": "Pricing",
    "pricing.title": "Simple and clear offers",
    "pricing.copy": "Start free with security, then add advanced modules depending on your server needs.",
    "pricing.free.title": "Free",
    "pricing.free.copy": "The essential base to protect and moderate your Discord server.",
    "pricing.free.period": "/ forever",
    "pricing.free.item1": "Server security",
    "pricing.free.item2": "Moderation",
    "pricing.free.item3": "Log channels",
    "pricing.free.item4": "Essential channel setup",
    "pricing.free.cta": "Choose this offer",
    "pricing.premium.title": "Premium offer",
    "pricing.premium.copy": "For servers that want tickets, ratings and complete management tools.",
    "pricing.premium.period": "/ 2 months",
    "pricing.premium.item1": "Complete moderation",
    "pricing.premium.item2": "Support ratings",
    "pricing.premium.item3": "Advanced logs and channels",
    "pricing.premium.item4": "Ticket system",
    "pricing.premium.cta": "Choose this offer",
    "pricing.ultimate.title": "Complete offer",
    "pricing.ultimate.copy": "All of ModBot with priority support and dedicated customizations.",
    "pricing.ultimate.period": "/ 3 months",
    "pricing.ultimate.item1": "Everything in Premium",
    "pricing.ultimate.item2": "Priority Discord support",
    "pricing.ultimate.item3": "Customizations just for you",
    "pricing.ultimate.item4": "Advanced setup assistance",
    "pricing.ultimate.cta": "Choose this offer",
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
    "admin.premium.badge": "2 servers maximum",
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
    "nav.wiki": "الويكي",
    "nav.admin": "الإدارة",
    "nav.dashboard": "لوحة التحكم",
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
    "features.development.title": "الأتمتة",
    "features.development.copy": "رسائل متكررة، أدوار تفاعلية، ورسائل ترحيب ومغادرة قابلة للإعداد.",
    "pricing.eyebrow": "الأسعار",
    "pricing.title": "عروض بسيطة وواضحة",
    "pricing.copy": "ابدأ مجاناً بالحماية، ثم أضف الوحدات المتقدمة حسب احتياجات خادمك.",
    "pricing.free.title": "مجاني",
    "pricing.free.copy": "القاعدة الأساسية لحماية وإدارة خادم Discord الخاص بك.",
    "pricing.free.period": "/ دائماً",
    "pricing.free.item1": "حماية الخادم",
    "pricing.free.item2": "الإشراف",
    "pricing.free.item3": "قنوات السجلات",
    "pricing.free.item4": "إعداد القنوات الأساسية",
    "pricing.free.cta": "اختيار هذا العرض",
    "pricing.premium.title": "عرض Premium",
    "pricing.premium.copy": "للخوادم التي تحتاج التذاكر والتقييمات وأدوات إدارة كاملة.",
    "pricing.premium.period": "/ شهرين",
    "pricing.premium.item1": "إشراف كامل",
    "pricing.premium.item2": "تقييمات الدعم",
    "pricing.premium.item3": "سجلات وقنوات متقدمة",
    "pricing.premium.item4": "نظام التذاكر",
    "pricing.premium.cta": "اختيار هذا العرض",
    "pricing.ultimate.title": "العرض الكامل",
    "pricing.ultimate.copy": "كل ميزات ModBot مع دعم أولوية وتخصيصات مخصصة لك.",
    "pricing.ultimate.period": "/ 3 أشهر",
    "pricing.ultimate.item1": "كل ميزات Premium",
    "pricing.ultimate.item2": "دعم Discord أولوية",
    "pricing.ultimate.item3": "تخصيصات خاصة بك",
    "pricing.ultimate.item4": "مساعدة إعداد متقدمة",
    "pricing.ultimate.cta": "اختيار هذا العرض",
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
    "admin.premium.badge": "خادمان كحد أقصى",
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
    answer: "ModBot peut être demandé depuis le Discord. L’offre gratuite donne accès à la sécurité, à la modération et aux salons/logs essentiels. Les offres payantes ajoutent tickets, ratings, support prioritaire et personnalisations.",
    link: "Ouvrir le Discord"
  },
  tarifs: {
    question: "Quels sont les tarifs ?",
    answer: "L’offre gratuite est à 0€ avec sécurité, modération et salons/logs. L’offre Premium est à 15€ pour 2 mois avec tickets, ratings, logs, salons et modération. L’offre complète est à 35€ tous les 3 mois avec tout, support Discord prioritaire et personnalisations dédiées."
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

function normalizeApiBase(value) {
  return String(value || "").trim().replace(/\/+$/, "");
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

function getModbotApiBase() {
  const configured = normalizeApiBase(window.MODBOT_API_URL || document.querySelector('meta[name="modbot-api-url"]')?.content || "");
  if (configured) return configured;
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    return `${location.protocol}//${location.host}`;
  }
  return "";
}

function currentCleanUrl() {
  return `${location.origin}${location.pathname}`;
}

function buildDiscordOAuthUrl(mode = "login") {
  if (!modbotDiscordClientId) return "";
  const params = new URLSearchParams({ client_id: modbotDiscordClientId });
  if (mode === "invite") {
    params.set("permissions", modbotBotPermissions);
    params.set("scope", "bot applications.commands");
  } else {
    params.set("response_type", "code");
    params.set("redirect_uri", currentCleanUrl());
    params.set("scope", "identify guilds");
  }
  return `https://discord.com/oauth2/authorize?${params.toString()}`;
}

function getModbotSessionToken() {
  return sessionStorage.getItem("modbot-dashboard-session") || localStorage.getItem("modbot-dashboard-session") || "";
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
  const response = await fetch(`${base}${path}`, { ...options, headers });
  if (!response.ok) {
    let message = `Erreur connexion ModBot ${response.status}`;
    try {
      const text = await response.text();
      if (text) message = text;
    } catch (error) {
      // message par defaut
    }
    throw new Error(message);
  }
  return response.json();
}

function initApiBridgeFromUrl() {
  const hash = new URLSearchParams((location.hash || "").replace(/^#/, ""));
  const query = new URLSearchParams(location.search || "");
  const session = hash.get("session") || query.get("session");
  const tokenRequired = hash.get("api_token_required") || query.get("api_token_required");
  const loginError = hash.get("login_error") || query.get("login_error");
  const oauthCode = query.get("code");

  if (session) {
    localStorage.setItem("modbot-dashboard-session", session);
    history.replaceState(null, "", location.pathname);
  }
  if (tokenRequired) {
    console.warn("OAuth Discord ModBot non configure cote bot.");
    history.replaceState(null, "", location.pathname);
  }
  if (oauthCode && !session) {
    console.warn("Code OAuth Discord recu. Branche le callback backend ModBot pour finaliser la session dashboard.");
    history.replaceState(null, "", location.pathname);
  }
  if (loginError) {
    console.warn("Erreur de connexion ModBot:", loginError);
    history.replaceState(null, "", location.pathname);
  }
}

function initDiscordOAuthLinks() {
  const inviteUrl = buildDiscordOAuthUrl("invite");
  if (!inviteUrl) return;
  document.querySelectorAll("[data-discord-bot-invite]").forEach((link) => {
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
  const adminTabs = document.querySelectorAll("[data-admin-tab]");
  const adminPanels = document.querySelectorAll("[data-admin-panel]");
  let storedAdminIds = [];
  try {
    storedAdminIds = JSON.parse(localStorage.getItem("modbot-admin-ids") || "[]");
  } catch (error) {
    storedAdminIds = [];
  }
  let adminToastTimer;

  if (Array.isArray(storedAdminIds)) {
    storedAdminIds.forEach((adminId) => {
      if (typeof adminId === "string" && adminId.trim()) {
        allowedAdminIds.add(adminId.trim());
      }
    });
  }

  function showAdminToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(adminToastTimer);
    adminToastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
  }

  function openAdminPanel(panelName) {
    adminTabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.adminTab === panelName));
    adminPanels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.adminPanel === panelName));
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
      const data = await modbotApiFetch("/api/admin/stats", { cache: "no-store" });
      setAdminStats({
        visits: data.visits,
        today: data.today,
        dashboard: data.dashboardOpens ?? data.dashboard,
        installs: data.installs ?? data.servers
      }, "Connexion bot active");
      const serverList = document.querySelector("[data-admin-server-list]");
      if (serverList && Array.isArray(data.guilds)) {
        serverList.innerHTML = data.guilds.map((guild) => `
          <div><img src="${escapeHtmlValue(guild.icon || "assets/default_logo.png")}" alt=""><span><strong>${escapeHtmlValue(guild.name)}</strong><small>ID ${escapeHtmlValue(guild.id)}</small></span></div>
        `).join("");
      }
      return;
    } catch (error) {
      // Le site garde un secours local si la connexion bot n'est pas encore branchee.
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

  adminTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const panelName = tab.dataset.adminTab;
      if (!panelName) return;
      openAdminPanel(panelName);
    });
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

  document.querySelector("[data-premium-apply]")?.addEventListener("click", async () => {
    const memberInput = document.querySelector("[data-premium-member]");
    const list = document.querySelector("[data-premium-list]");
    const premiumTicketList = document.querySelector("[data-premium-ticket-list]");
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
    if (premiumTicketList) {
      const request = document.createElement("div");
      const requestIdentity = document.createElement("span");
      const requestName = document.createElement("strong");
      const requestMeta = document.createElement("small");
      requestName.textContent = member;
      requestMeta.textContent = `Ticket Premium à ouvrir ou vérifier pour une durée : ${duration}`;
      requestIdentity.append(requestName, requestMeta);
      const requestState = document.createElement("span");
      requestState.textContent = "🎫 Ticket requis";
      request.append(requestIdentity, requestState);
      premiumTicketList.prepend(request);
    }
    try {
      await modbotApiFetch("/api/admin/premium", {
        method: "POST",
        body: JSON.stringify({ member, duration })
      });
      showAdminToast(`💎 Premium synchronisé avec le bot pour ${member}`);
    } catch (error) {
      showAdminToast(`💾 Premium ajouté localement, connexion bot non disponible`);
    }
    memberInput.value = "";
  });

  document.querySelector("[data-add-admin]")?.addEventListener("click", () => {
    const input = document.querySelector("[data-new-admin-id]");
    const list = document.querySelector("[data-admin-list]");
    const adminId = input?.value.trim();
    if (!adminId || !list) {
      showAdminToast("⚠️ Ajoute un ID Discord administrateur");
      return;
    }
    if (allowedAdminIds.has(adminId)) {
      showAdminToast("✅ Cet administrateur est déjà autorisé");
      return;
    }
    allowedAdminIds.add(adminId);
    const nextStoredIds = Array.from(allowedAdminIds);
    localStorage.setItem("modbot-admin-ids", JSON.stringify(nextStoredIds));
    const item = document.createElement("div");
    item.innerHTML = `
      <span><strong>${adminId}</strong><small>Administrateur ajouté manuellement</small></span>
      <button type="button" data-remove-admin="${adminId}">Retirer</button>
    `;
    list.append(item);
    input.value = "";
    showAdminToast(`🔐 Administrateur ${adminId} ajouté`);
  });

  document.querySelector("[data-admin-list]")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-remove-admin]");
    if (!button) return;
    const adminId = button.dataset.removeAdmin;
    if (!adminId) return;
    allowedAdminIds.delete(adminId);
    localStorage.setItem("modbot-admin-ids", JSON.stringify(Array.from(allowedAdminIds)));
    button.closest("div")?.remove();
    showAdminToast(`🗑️ Administrateur ${adminId} retiré`);
  });

  document.querySelector("[data-blacklist-add]")?.addEventListener("click", async () => {
    const memberInput = document.querySelector("[data-blacklist-member]");
    const reasonInput = document.querySelector("[data-blacklist-reason]");
    const list = document.querySelector("[data-blacklist-list]");
    const member = memberInput?.value.trim();
    const reason = reasonInput?.value.trim() || "Aucune raison renseignée";
    if (!member || !list) {
      showAdminToast("⚠️ Ajoute un membre à blacklister");
      return;
    }
    const emptyRow = Array.from(list.children).find((row) => row.textContent.includes("Aucun membre blacklisté"));
    emptyRow?.remove();
    const item = document.createElement("div");
    item.innerHTML = `
      <span><strong>${member}</strong><small>${reason}</small></span>
      <button type="button" data-blacklist-remove>Retirer</button>
    `;
    list.prepend(item);
    memberInput.value = "";
    if (reasonInput) reasonInput.value = "";
    try {
      await modbotApiFetch("/api/admin/blacklist", {
        method: "POST",
        body: JSON.stringify({ member, reason })
      });
      showAdminToast(`🚫 ${member} blacklisté côté bot`);
    } catch (error) {
      showAdminToast(`💾 ${member} blacklisté localement, connexion bot non disponible`);
    }
  });

  document.querySelector("[data-blacklist-list]")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-blacklist-remove]");
    if (!button) return;
    button.closest("div")?.remove();
    showAdminToast("✅ Membre retiré de la blacklist");
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
  let personalizationAssets = {
    logo: "",
    banner: ""
  };
  const IFC_TOURNAMENT_API_READY = false;
  let activePanelName = "overview";
  let hasUnsavedChanges = false;
  let dirtyPanelName = null;
  let ticketNeedsPublish = false;
  let pendingNavigation = null;
  let toastTimer;
  let selectedServer = {
    id: "",
    name: "Hote BOT - ModBot",
    logo: "assets/default_logo.png",
    initials: "HB"
  };
  let dashboardGuilds = [];
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
          id: String(server.id || ""),
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
      name: "EA FC 26 Club Pro Cup"
    };
  }

  function readStoredTournamentConfig() {
    try {
      const stored = JSON.parse(localStorage.getItem("modbot-dashboard-tournament") || "null");
      return {
        ...defaultTournamentConfig(),
        ...(stored && typeof stored === "object" ? stored : {}),
        enabled: IFC_TOURNAMENT_API_READY ? Boolean(stored?.enabled) : false
      };
    } catch (error) {
      return defaultTournamentConfig();
    }
  }

  function collectTournamentConfig() {
    return {
      enabled: IFC_TOURNAMENT_API_READY && Boolean(tournamentEnabled?.checked),
      name: tournamentNameInput?.value.trim() || defaultTournamentConfig().name
    };
  }

  function saveTournamentConfig() {
    tournamentDraft = collectTournamentConfig();
    localStorage.setItem("modbot-dashboard-tournament", JSON.stringify(tournamentDraft));
  }

  function syncTournamentState(isActive = Boolean(tournamentEnabled?.checked)) {
    if (!IFC_TOURNAMENT_API_READY) {
      if (tournamentEnabled) {
        tournamentEnabled.checked = false;
        tournamentEnabled.disabled = true;
      }

      const toggleLine = tournamentEnabled?.closest(".toggle-line");
      toggleLine?.classList.remove("is-on");
      toggleLine?.classList.add("is-locked");

      if (tournamentState) {
        tournamentState.classList.remove("active", "inactive");
        tournamentState.classList.add("pending");
        tournamentState.textContent = "🟡 En attente API IFC";
      }

      if (tournamentCommandState) {
        tournamentCommandState.classList.remove("active", "inactive");
        tournamentCommandState.classList.add("pending");
        tournamentCommandState.textContent = "🟡 Commandes indisponibles";
      }

      if (tournamentOverviewState) {
        tournamentOverviewState.textContent = "En attente";
      }

      tournamentCommandCards.forEach((card) => {
        card.classList.add("is-disabled");
      });
      return;
    }

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
    const canEnableTournament = IFC_TOURNAMENT_API_READY && Boolean(config.enabled);
    if (tournamentEnabled) {
      tournamentEnabled.checked = canEnableTournament;
      tournamentEnabled.disabled = !IFC_TOURNAMENT_API_READY;
    }
    if (tournamentNameInput) tournamentNameInput.value = config.name || defaultTournamentConfig().name;
    tournamentEnabled?.closest(".toggle-line")?.classList.toggle("is-on", canEnableTournament);
    tournamentEnabled?.closest(".toggle-line")?.classList.toggle("is-locked", !IFC_TOURNAMENT_API_READY);
    syncTournamentState(canEnableTournament);
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

  function renderGuildChoices(guilds) {
    const serverGrid = document.querySelector(".server-grid");
    if (!serverGrid || !Array.isArray(guilds) || !guilds.length) return;
    serverGrid.innerHTML = guilds.map((guild) => `
      <button class="server-card" type="button" data-server-name="${escapeHtml(guild.name)}" data-server-id="${escapeHtml(guild.id)}" data-server-logo="${escapeHtml(guild.icon || "assets/default_logo.png")}" data-server-initials="${escapeHtml(guild.initials || "MB")}">
        <span class="server-logo-shell" data-initials="${escapeHtml(guild.initials || "MB")}">
          <img class="server-logo" src="${escapeHtml(guild.icon || "assets/default_logo.png")}" alt="" data-logo-img>
        </span>
        <span>
          <strong>${escapeHtml(guild.name)}</strong>
          <small>ID ${escapeHtml(guild.id)}</small>
        </span>
      </button>
    `).join("");
    setupLogoFallbacks();
  }

  function renderPremiumGuildChoices(guilds) {
    const grid = document.querySelector(".premium-choice-grid");
    if (!grid || !Array.isArray(guilds) || !guilds.length) return;
    grid.innerHTML = guilds.map((guild) => `
      <button class="premium-choice-card" type="button" data-premium-server-choice data-server-name="${escapeHtml(guild.name)}" data-server-id="${escapeHtml(guild.id)}" data-server-logo="${escapeHtml(guild.icon || "assets/default_logo.png")}" data-server-initials="${escapeHtml(guild.initials || "MB")}">
        <span class="server-logo-shell" data-initials="${escapeHtml(guild.initials || "MB")}"><img src="${escapeHtml(guild.icon || "assets/default_logo.png")}" alt="" data-logo-img></span>
        <span><strong>${escapeHtml(guild.name)}</strong><small>ID ${escapeHtml(guild.id)}</small></span>
      </button>
    `).join("");
    setupLogoFallbacks();
  }

  async function loadDashboardGuilds() {
    const data = await modbotApiFetch("/api/guilds", { cache: "no-store" });
    dashboardGuilds = data.guilds || [];
    renderGuildChoices(dashboardGuilds);
    renderPremiumGuildChoices(dashboardGuilds);
    renderPremiumAssociations();
    return dashboardGuilds;
  }

  async function dashboardLogin() {
    const base = getModbotApiBase();
    if (getModbotSessionToken() || getModbotApiToken()) {
      try {
        await loadDashboardGuilds();
        showDashboardStage("servers");
        showToast("✅ Dashboard connecté au bot");
        return;
      } catch (error) {
        showToast("⚠️ Session invalide, nouvelle connexion requise");
      }
    }
    if (base) {
      window.location.href = `${base}/api/auth/discord/login?redirect=${encodeURIComponent(currentCleanUrl())}`;
      return;
    }
    const oauthUrl = buildDiscordOAuthUrl("login");
    if (!oauthUrl) {
      showToast("⚠️ Client ID Discord manquant pour ouvrir la connexion");
      return;
    }
    window.location.href = oauthUrl;
  }

  function applyDashboardConfig(config) {
    if (!config) return;
    const tickets = config.tickets || {};
    const channels = config.channels || {};
    const personalization = config.personalization || {};
    const welcome = config.welcome_system || config.welcome || {};
    const security = config.security || {};

    const previewAuthor = document.querySelector("[data-preview-author]");
    const previewTitle = document.querySelector("[data-preview-title]");
    const previewEmoji = document.querySelector("[data-preview-emoji]");
    const previewDesc = document.querySelector("[data-preview-desc]");
    const ticketChannel = document.querySelector("[data-ticket-channel]");
    const ticketBanner = document.querySelector("[data-ticket-banner]");
    const ticketSupportRole = document.querySelector("[data-ticket-support-role]");
    if (previewAuthor && tickets.author) previewAuthor.value = tickets.author;
    if (previewTitle && tickets.title) previewTitle.value = tickets.title;
    if (previewEmoji && tickets.emoji) previewEmoji.value = tickets.emoji;
    if (previewDesc && tickets.description) previewDesc.value = tickets.description;
    if (ticketChannel && channels.tickets) ticketChannel.value = channels.tickets;
    if (ticketBanner && tickets.banner) ticketBanner.value = tickets.banner;
    if (ticketSupportRole && tickets.support_role) ticketSupportRole.value = tickets.support_role;

    const optionList = document.getElementById("ticketOptionList");
    if (optionList && Array.isArray(tickets.options) && tickets.options.length) {
      optionList.innerHTML = tickets.options.map((option, index) => `
        <div class="option-row"><span>${String(index + 1).padStart(2, "0")}</span><input class="emoji-input" value="${escapeHtml(option.emoji || "🎫")}" maxlength="3"><input value="${escapeHtml(option.label || "Ticket")}"><input value="${escapeHtml(option.desc || "Ouvrir un ticket")}"><button type="button">Supprimer</button></div>
      `).join("");
    }

    const channelRows = document.querySelectorAll("[data-dashboard-panel='channels'] .channel-row input");
    const channelValues = [channels.tickets, channels.logs, channels.suggestions, channels.reports, channels.staff_alert];
    channelRows.forEach((input, index) => {
      if (channelValues[index]) input.value = channelValues[index];
    });

    const securityToggles = document.querySelectorAll("[data-dashboard-panel='security'] .toggle-line input");
    [
      security.antilink,
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

    const personalizationName = document.querySelector("[data-personalization-name]");
    const personalizationFooter = document.querySelector("[data-personalization-footer]");
    if (personalizationName && personalization.name) personalizationName.value = personalization.name;
    if (personalizationFooter && personalization.footer) personalizationFooter.value = personalization.footer;
    const personalizationPreviewTitle = document.querySelector("[data-personalization-preview-title]");
    const personalizationPreviewFooter = document.querySelector("[data-personalization-preview-footer]");
    if (personalizationPreviewTitle) personalizationPreviewTitle.textContent = `${personalization.name || "ModBot"} - Panel`;
    if (personalizationPreviewFooter) personalizationPreviewFooter.textContent = personalization.footer || "ModBot - Protection de votre communauté";
    const personalizationLogo = document.querySelector("[data-dashboard-panel='personalization'] .embed-thumb img");
    const personalizationBanner = document.querySelector("[data-dashboard-panel='personalization'] .preview-banner");
    if (personalizationLogo && personalization.logo) personalizationLogo.src = personalization.logo;
    if (personalizationBanner && personalization.banner) personalizationBanner.src = personalization.banner;
    personalizationAssets = { logo: "", banner: "" };

    const welcomeMessage = document.querySelector("[data-welcome-message]");
    const departureMessage = document.querySelector("[data-departure-message]");
    const welcomeChannel = document.querySelector("[data-welcome-channel]");
    const welcomeBg = document.querySelector("[data-welcome-bg]");
    const welcomeFont = document.querySelector("[data-welcome-font]");
    const welcomeColor = document.querySelector("[data-welcome-color]");
    if (welcomeChannel && welcome.channel_id) welcomeChannel.value = welcome.channel_id;
    if (welcomeMessage && welcome.message) welcomeMessage.value = welcome.message;
    if (departureMessage && welcome.departure_message) departureMessage.value = welcome.departure_message;
    if (welcomeBg && welcome.background) welcomeBg.value = welcome.background;
    if (welcomeFont && welcome.font) welcomeFont.value = welcome.font;
    if (welcomeColor && welcome.color) welcomeColor.value = welcome.color;

    if (config.language) {
      const languageSelect = document.querySelector("[data-dashboard-panel='language'] select");
      if (languageSelect) languageSelect.value = config.language === "en" ? "English" : "Français";
    }

    if (Array.isArray(config.premium_servers)) {
      premiumDraftServers = config.premium_servers
        .filter((server) => server && server.name)
        .map((server) => ({
          id: String(server.id || ""),
          name: String(server.name),
          logo: String(server.logo || "assets/default_logo.png"),
          initials: String(server.initials || "MB")
        }))
        .slice(0, 2);
      renderPremiumAssociations();
    }

    if (Array.isArray(config.recurring_messages)) {
      const recurringList = document.querySelector("[data-recurring-list]");
      if (recurringList) {
        recurringList.innerHTML = "";
        if (!config.recurring_messages.length) {
          const empty = document.createElement("div");
          empty.className = "recurring-empty";
          empty.textContent = "Aucun message récurrent créé pour le moment.";
          recurringList.append(empty);
        }
        config.recurring_messages.forEach((message) => {
          const item = document.createElement("div");
          item.className = "recurring-item";
          item.dataset.name = message.name || "Message récurrent";
          item.dataset.channel = message.channel_id || "";
          item.dataset.interval = message.interval || "30";
          item.dataset.unit = message.unit || "minutes";
          item.dataset.content = message.content || "";
          item.dataset.mode = message.mode || "repeat";
          item.dataset.lastSent = message.last_sent || "";
          item.innerHTML = `
            <span>
              <strong>🔁 ${escapeHtml(item.dataset.name)}</strong>
              <small>Toutes les ${escapeHtml(item.dataset.interval)} ${escapeHtml(item.dataset.unit)} dans ${escapeHtml(item.dataset.channel)}</small>
            </span>
            <button class="secondary-btn compact" type="button" data-recurring-remove>Supprimer</button>
          `;
          recurringList.append(item);
        });
      }
    }

    const liveTitle = document.querySelector("[data-live-title]");
    const liveDescription = document.querySelector("[data-live-desc]");
    const liveTicketEmoji = document.querySelector("[data-live-ticket-emoji]");
    if (liveTitle) liveTitle.textContent = tickets.title || "Ouvre ton ticket";
    if (liveDescription) liveDescription.textContent = tickets.description || "Merci de sélectionner la raison de ta demande.";
    if (liveTicketEmoji) liveTicketEmoji.textContent = tickets.emoji || "📩";
    syncWelcomePreview();
    renderReactionPreview();
  }

  async function loadSelectedGuildConfig(guildId) {
    try {
      const data = await modbotApiFetch(`/api/guilds/${guildId}/config`, { cache: "no-store" });
      applyDashboardConfig(data.config);
      showToast("✅ Configuration chargée depuis le bot");
    } catch (error) {
      showToast("⚠️ Configuration locale affichée, connexion bot non disponible");
    }
  }

  function collectDashboardConfig() {
    const ticketOptions = Array.from(document.querySelectorAll("#ticketOptionList .option-row")).map((row) => {
      const inputs = row.querySelectorAll("input");
      return {
        emoji: inputs[0]?.value || "🎫",
        label: inputs[1]?.value || "Ticket",
        desc: inputs[2]?.value || "Ouvrir un ticket",
      };
    });
    const channelRows = document.querySelectorAll("[data-dashboard-panel='channels'] .channel-row input");
    const socialRelays = Array.from(document.querySelectorAll(".social-card")).map((card) => ({
      platform: card.dataset.socialPlatform,
      link: card.querySelector("[data-social-link]")?.value || "",
      channel_id: card.querySelector("[data-social-channel]")?.value || "",
      enabled: Boolean(card.querySelector("[data-social-enabled]")?.checked),
    }));
    const reactionRoles = Array.from(document.querySelectorAll(".reaction-role-row")).map((row) => {
      const inputs = row.querySelectorAll("input");
      return {
        emoji: inputs[0]?.value || "✨",
        role: inputs[1]?.value || "",
        label: inputs[2]?.value || "",
      };
    });
    const recurringMessages = Array.from(document.querySelectorAll(".recurring-item")).map((item) => ({
      enabled: true,
      name: item.dataset.name || item.querySelector("strong")?.textContent?.replace(/^🔁\s*/, "") || "Message récurrent",
      channel_id: item.dataset.channel || "",
      interval: Number(item.dataset.interval || 30),
      unit: item.dataset.unit || "minutes",
      content: item.dataset.content || "Hey @everyone, pensez à suivre les dernières annonces du serveur.",
      mode: item.dataset.mode || "repeat",
      last_sent: item.dataset.lastSent || "",
    }));
    const languageValue = document.querySelector("[data-dashboard-panel='language'] select")?.value || "Français";
    const securityToggles = document.querySelectorAll("[data-dashboard-panel='security'] .toggle-line input");
    return {
      channels: {
        tickets: document.querySelector("[data-ticket-channel]")?.value || channelRows[0]?.value || "",
        logs: channelRows[1]?.value || "",
        suggestions: channelRows[2]?.value || "",
        reports: channelRows[3]?.value || "",
        staff_alert: channelRows[4]?.value || "",
      },
      security: {
        antilink: Boolean(securityToggles[0]?.checked),
        antispam: Boolean(securityToggles[1]?.checked),
        antiraid: Boolean(securityToggles[2]?.checked),
        staff_alert: Boolean(securityToggles[3]?.checked),
        lockdown: Boolean(securityToggles[4]?.checked),
      },
      tickets: {
        author: document.querySelector("[data-preview-author]")?.value || "ModBot Ticket System",
        title: document.querySelector("[data-preview-title]")?.value || "Ouvre ton ticket",
        emoji: document.querySelector("[data-preview-emoji]")?.value || "📩",
        description: document.querySelector("[data-preview-desc]")?.value || "",
        banner: document.querySelector("[data-ticket-banner]")?.value || "",
        support_role: document.querySelector("[data-ticket-support-role]")?.value || "",
        options: ticketOptions,
      },
      personalization: {
        name: document.querySelector("[data-personalization-name]")?.value || "ModBot",
        footer: document.querySelector("[data-personalization-footer]")?.value || "",
        logo: personalizationAssets.logo,
        banner: personalizationAssets.banner,
        color: document.querySelector(".color-swatch.is-selected")?.dataset.color || "#5865F2",
      },
      welcome_system: {
        enabled: Boolean(document.querySelector("[data-dashboard-panel='welcome'] .toggle-line input")?.checked),
        departure_enabled: Boolean(document.querySelectorAll("[data-dashboard-panel='welcome'] .toggle-line input")[1]?.checked),
        channel_id: document.querySelector("[data-welcome-channel]")?.value || "",
        message: document.querySelector("[data-welcome-message]")?.value || "",
        departure_message: document.querySelector("[data-departure-message]")?.value || "",
        background: document.querySelector("[data-welcome-bg]")?.value || "",
        font: document.querySelector("[data-welcome-font]")?.value || "Inter",
        color: document.querySelector("[data-welcome-color]")?.value || "#ffffff",
      },
      reaction_roles: reactionRoles,
      recurring_messages: recurringMessages,
      social_relays: socialRelays,
      premium_servers: premiumDraftServers,
      language: languageValue === "English" ? "en" : "fr",
      tournament: collectTournamentConfig(),
    };
  }

  async function saveDashboardConfigToApi() {
    if (!selectedServer.id) return false;
    await modbotApiFetch(`/api/guilds/${selectedServer.id}/config`, {
      method: "PUT",
      body: JSON.stringify(collectDashboardConfig())
    });
    return true;
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

    document.querySelectorAll("[data-premium-server-choice]").forEach((choice) => {
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

  function setCurrentServer(serverName, serverLogo = "assets/default_logo.png", initials = "MB", serverId = "") {
    selectedServer = {
      id: serverId,
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

  async function saveCurrentChanges(message = "💾 Configuration enregistrée") {
    if (!hasUnsavedChanges) {
      showToast("✅ Tout est déjà enregistré");
      return true;
    }
    if (dirtyPanelName === "premium") {
      savePremiumServers();
    }
    if (dirtyPanelName === "tournaments") {
      saveTournamentConfig();
    }
    let savedToApi = false;
    try {
      savedToApi = await saveDashboardConfigToApi();
    } catch (error) {
      showToast("⚠️ Connexion bot indisponible, sauvegarde non envoyée");
      return false;
    }
    if (selectedServer.id && !savedToApi) {
      showToast("🔗 Connecte-toi avec Discord pour enregistrer ce serveur");
      return false;
    }
    clearUnsavedChanges();
    showToast(savedToApi ? message : "💾 Configuration gardée dans cette page");
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

  function openPanel(panelName) {
    activePanelName = panelName;
    tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.dashboardTab === panelName));
    panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.dashboardPanel === panelName));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.querySelector("[data-dashboard-login]")?.addEventListener("click", () => {
    dashboardLogin();
  });

  document.querySelector("[data-auth-back]")?.addEventListener("click", () => {
    showDashboardStage("auth");
  });

  document.querySelector("[data-change-server]")?.addEventListener("click", () => {
    runWithUnsavedGuard(() => showDashboardStage("servers"));
  });

  document.querySelector(".server-picker .server-grid")?.addEventListener("click", async (event) => {
    const serverCard = event.target.closest(".server-card[data-server-name]");
    if (!serverCard) return;
    const cardLogo = serverCard.querySelector("[data-logo-img]");
    const loadedLogo = cardLogo?.currentSrc || cardLogo?.src || serverCard.dataset.serverLogo || "assets/default_logo.png";
    const initials = serverCard.dataset.serverInitials || serverCard.dataset.serverName?.slice(0, 2).toUpperCase() || "MB";
    const guildId = serverCard.dataset.serverId || "";
    setCurrentServer(serverCard.dataset.serverName || "Serveur ModBot", loadedLogo, initials, guildId);
    showDashboardStage("dashboard");
    showToast(`✅ Serveur sélectionné : ${serverCard.dataset.serverName}`);
    if (guildId) {
      await loadSelectedGuildConfig(guildId);
      clearUnsavedChanges();
      ticketNeedsPublish = false;
      setTicketPublishVisible(false);
    }
  });

  document.querySelector("[data-premium-associate-current]")?.addEventListener("click", () => {
    addPremiumServer(selectedServer);
  });

  document.querySelector(".premium-choice-grid")?.addEventListener("click", (event) => {
    const choice = event.target.closest("[data-premium-server-choice]");
    if (!choice) return;
    addPremiumServer({
      name: choice.dataset.serverName || "Serveur ModBot",
      logo: choice.dataset.serverLogo || "assets/default_logo.png",
      initials: choice.dataset.serverInitials || "MB",
      id: choice.dataset.serverId || ""
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
    if (!IFC_TOURNAMENT_API_READY) {
      tournamentEnabled.checked = false;
      syncTournamentState(false);
      showToast("🔒 Module tournois en attente de l'API IFC");
      return;
    }
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
    button.addEventListener("click", () => {
      saveCurrentChanges("💾 Configuration enregistrée dans le bot");
    });
  });

  document.querySelectorAll("[data-reset-section]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = button.closest("[data-dashboard-panel]");
      markPanelDirty(panel?.dataset.dashboardPanel || activePanelName);
      showToast("♻️ Section réinitialisée");
    });
  });

  document.querySelector("[data-unsaved-save]")?.addEventListener("click", async () => {
    const action = pendingNavigation;
    const saved = await saveCurrentChanges("💾 Configuration sauvegardée");
    if (!saved) return;
    closeUnsavedModal();
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
      if (checkbox.matches("[data-tournament-enabled]") && !IFC_TOURNAMENT_API_READY) {
        checkbox.checked = false;
        syncToggle();
        syncTournamentState(false);
        showToast("🔒 Module tournois en attente de l'API IFC");
        return;
      }
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

  publishTicketButton?.addEventListener("click", async () => {
    const channel = ticketChannelInput?.value.trim() || "salon ticket désigné";
    if (!selectedServer.id) {
      showToast("🔗 Sélectionne un serveur connecté au bot avant de publier");
      return;
    }
    if (hasUnsavedChanges) {
      const saved = await saveCurrentChanges("💾 Configuration ticket enregistrée");
      if (!saved) return;
    }
    try {
      await modbotApiFetch(`/api/guilds/${selectedServer.id}/tickets/publish`, {
        method: "POST",
        body: JSON.stringify({ channel_id: channel })
      });
    } catch (error) {
      showToast("⚠️ Publication impossible : connexion bot indisponible");
      return;
    }
    ticketNeedsPublish = false;
    setTicketPublishVisible(false);
    if (dirtyPanelName === "tickets") clearUnsavedChanges();
    showToast(`🚀 Message ticket publié dans le salon ${channel}`);
  });

  const welcomeMessageInput = document.querySelector("[data-welcome-message]");
  const welcomeBgInput = document.querySelector("[data-welcome-bg]");
  const welcomeFontSelect = document.querySelector("[data-welcome-font]");
  const welcomeColorInput = document.querySelector("[data-welcome-color]");
  const departureMessageInput = document.querySelector("[data-departure-message]");
  const welcomeLiveMessage = document.querySelector("[data-welcome-live-message]");
  const departureLiveMessage = document.querySelector("[data-departure-live-message]");
  const welcomeCard = document.querySelector("[data-welcome-card]");

  function syncWelcomePreview() {
    if (welcomeLiveMessage) {
      welcomeLiveMessage.textContent = welcomeMessageInput?.value.trim() || "Bienvenue nom du membre sur @serveur !";
    }
    if (departureLiveMessage) {
      departureLiveMessage.textContent = departureMessageInput?.value.trim() || "Au revoir nom du membre.";
    }
    if (welcomeCard && welcomeBgInput?.value.trim()) {
      welcomeCard.style.backgroundImage = `linear-gradient(90deg, rgba(19, 15, 70, 0.58), rgba(42, 94, 255, 0.72)), url("${welcomeBgInput.value.trim()}")`;
    }
    if (welcomeCard && welcomeFontSelect?.value) {
      welcomeCard.style.fontFamily = `${welcomeFontSelect.value}, Inter, sans-serif`;
    }
    if (welcomeCard && welcomeColorInput?.value) {
      welcomeCard.style.setProperty("--welcome-title-color", welcomeColorInput.value);
    }
  }

  [welcomeMessageInput, departureMessageInput, welcomeBgInput, welcomeFontSelect, welcomeColorInput].forEach((field) => {
    field?.addEventListener("input", syncWelcomePreview);
    field?.addEventListener("change", syncWelcomePreview);
  });
  syncWelcomePreview();

  const reactionTitleInput = document.querySelector("[data-reaction-title]");
  const reactionDescriptionInput = document.querySelector("[data-reaction-description]");
  const reactionLiveTitle = document.querySelector("[data-reaction-live-title]");
  const reactionLiveDescription = document.querySelector("[data-reaction-live-description]");
  const reactionPreviewList = document.querySelector("[data-reaction-preview-list]");
  const reactionRoleList = document.querySelector("[data-reaction-role-list]");
  const addReactionRoleButton = document.querySelector("[data-add-reaction-role]");

  function renderReactionPreview() {
    if (reactionLiveTitle) {
      reactionLiveTitle.textContent = `🎭 ${reactionTitleInput?.value.trim() || "Choisis tes rôles"}`;
    }
    if (reactionLiveDescription) {
      reactionLiveDescription.textContent = reactionDescriptionInput?.value.trim() || "Clique sur une réaction pour recevoir ou retirer le rôle correspondant.";
    }
    if (!reactionPreviewList || !reactionRoleList) return;

    reactionPreviewList.innerHTML = "";
    reactionRoleList.querySelectorAll(".reaction-role-row").forEach((row) => {
      const inputs = row.querySelectorAll("input");
      const emoji = inputs[0]?.value.trim() || "✨";
      const label = inputs[2]?.value.trim() || inputs[1]?.value.trim() || "Rôle";
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
    const row = document.createElement("div");
    row.className = "reaction-role-row";
    row.innerHTML = `
      <span>${String(count).padStart(2, "0")}</span>
      <input class="emoji-input" type="text" value="✨" maxlength="3">
      <input type="text" value="@Nouveau rôle">
      <input type="text" value="Nouveau rôle">
      <button type="button">Supprimer</button>
    `;
    reactionRoleList.append(row);
    renderReactionPreview();
    markPanelDirty("reactionroles");
    showToast("🎭 Rôle réaction ajouté");
  });

  reactionRoleList?.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const rows = reactionRoleList.querySelectorAll(".reaction-role-row");
    if (rows.length <= 1) {
      showToast("⚠️ Garde au moins un rôle réaction");
      return;
    }
    button.closest(".reaction-role-row")?.remove();
    renumberReactionRoles();
    renderReactionPreview();
    markPanelDirty("reactionroles");
    showToast("🗑️ Rôle réaction supprimé");
  });
  renderReactionPreview();

  document.querySelectorAll("[data-recurring-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-recurring-mode]").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      markPanelDirty("recurring");
      showToast(button.dataset.recurringMode === "target" ? "⏰ Mode heure ciblée sélectionné" : "🔁 Mode répétition sélectionné");
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
    const name = document.querySelector("[data-recurring-name]")?.value.trim() || "Message récurrent";
    const channel = document.querySelector("[data-recurring-channel]")?.value.trim();
    const interval = document.querySelector("[data-recurring-interval]")?.value || "30";
    const unit = document.querySelector("[data-recurring-unit]")?.value || "minutes";
    const list = document.querySelector("[data-recurring-list]");
    if (!channel) {
      showToast("⚠️ Ajoute l'ID du salon pour créer le message");
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
    item.dataset.content = document.querySelector("[data-recurring-content]")?.value.trim() || "Hey @everyone, pensez à suivre les dernières annonces du serveur.";
    item.innerHTML = `
      <span>
        <strong>🔁 ${escapeHtml(name)}</strong>
        <small>Toutes les ${escapeHtml(interval)} ${escapeHtml(unit)} dans ${escapeHtml(channel)}</small>
      </span>
      <button class="secondary-btn compact" type="button" data-recurring-remove>Supprimer</button>
    `;
    list?.prepend(item);
    markPanelDirty("recurring");
    showToast(`✅ Message récurrent "${name}" créé`);
  });

  document.querySelector("[data-recurring-list]")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-recurring-remove]");
    if (!button) return;
    const list = button.closest("[data-recurring-list]");
    button.closest(".recurring-item")?.remove();
    if (list && !list.querySelector(".recurring-item")) {
      const empty = document.createElement("div");
      empty.className = "recurring-empty";
      empty.textContent = "Aucun message récurrent créé pour le moment.";
      list.append(empty);
    }
    markPanelDirty("recurring");
    showToast("🗑️ Message récurrent supprimé");
  });

  document.querySelector("[data-recurring-recover]")?.addEventListener("click", () => {
    showToast("♻️ Récupération prête pour le futur backend du bot");
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

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(String(reader.result || "")));
      reader.addEventListener("error", () => reject(reader.error || new Error("Lecture impossible")));
      reader.readAsDataURL(file);
    });
  }

  fileInputs.forEach((input) => {
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      const field = input.closest(".file-field");
      const fileName = field?.querySelector("[data-file-name]");
      if (fileName) fileName.textContent = file ? file.name : "Aucun fichier sélectionné";
      if (!file) {
        personalizationAssets[input.dataset.fileInput] = "";
      } else if (file.size > 10 * 1024 * 1024) {
        input.value = "";
        if (fileName) fileName.textContent = "Fichier trop lourd";
        showToast("⚠️ Image trop lourde : maximum 10 MB");
        return;
      } else {
        try {
          const dataUrl = await readFileAsDataUrl(file);
          if (input.dataset.fileInput === "logo") {
            personalizationAssets.logo = dataUrl;
            if (liveLogo) liveLogo.src = dataUrl;
          }
          if (input.dataset.fileInput === "banner") {
            personalizationAssets.banner = dataUrl;
            if (liveBanner) liveBanner.src = dataUrl;
          }
        } catch (error) {
          showToast("⚠️ Lecture du fichier impossible");
          return;
        }
      }
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
    personalizationAssets = { logo: "", banner: "" };
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
  initApiBridgeFromUrl();
  initDiscordOAuthLinks();
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
