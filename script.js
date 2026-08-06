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
    "pricing.title": "La protection est gratuite. Pour toujours.",
    "pricing.copy": "Sécurisez votre serveur sans payer. Passez Premium quand vous voulez les modules communautaires.",
    "pricing.free.title": "Protection",
    "pricing.free.copy": "Tout ce qui protège votre serveur, sans limite de temps ni de serveurs.",
    "pricing.free.amount": "Gratuit",
    "pricing.free.period": "pour toujours",
    "pricing.free.note": "Aucune carte bancaire, aucune limite de durée.",
    "pricing.free.item1": "Anti-raid et détection de comptes suspects",
    "pricing.free.item2": "Anti-nuke avec restauration automatique",
    "pricing.free.item3": "Filtre de langage anti-contournement",
    "pricing.free.item4": "Sanctions graduées et historique",
    "pricing.free.item5": "Système de logs complet",
    "pricing.free.item6": "Sauvegardes et restauration du serveur",
    "pricing.free.cta": "Commencer gratuitement",
    "pricing.free.support": "Invitez ModBot, la protection est active immédiatement.",
    "pricing.premium.ribbon": "Premium",
    "pricing.premium.title": "Premium",
    "pricing.premium.copy": "Toute la protection, plus les modules communautaires et l'automatisation.",
    "pricing.premium.period": "pour 5 mois",
    "pricing.premium.note": "Paiement unique — aucun renouvellement automatique.",
    "pricing.premium.item0": "Toute la protection gratuite incluse",
    "pricing.premium.item1": "Système de tickets et évaluations",
    "pricing.premium.item2": "Messages d'arrivée et de départ personnalisés",
    "pricing.premium.item3": "Rôles réactions et messages récurrents",
    "pricing.premium.item4": "Alertes réseaux sociaux et tournois",
    "pricing.premium.item5": "Personnalisation complète des embeds",
    "pricing.premium.item6": "Serveurs illimités",
    "pricing.premium.cta": "Passer Premium",
    "pricing.premium.support": "Activation via un ticket sur notre serveur Discord.",
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
    "admin.premium.badge": "Durée premium",
    "admin.premium.copy": "L’admin attribue l’offre et sa durée. Le membre associe ensuite ses serveurs depuis son dashboard sans limite de quantité.",
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
    "pricing.title": "Protection is free. Forever.",
    "pricing.copy": "Secure your server without paying. Go Premium when you want the community modules.",
    "pricing.free.title": "Protection",
    "pricing.free.copy": "Everything that protects your server, with no time or server limits.",
    "pricing.free.amount": "Free",
    "pricing.free.period": "forever",
    "pricing.free.note": "No credit card, no time limit.",
    "pricing.free.item1": "Anti-raid and suspicious account detection",
    "pricing.free.item2": "Anti-nuke with automatic restore",
    "pricing.free.item3": "Bypass-resistant language filter",
    "pricing.free.item4": "Graduated sanctions and history",
    "pricing.free.item5": "Complete logging system",
    "pricing.free.item6": "Server backups and restore",
    "pricing.free.cta": "Start for free",
    "pricing.free.support": "Invite ModBot — protection is active right away.",
    "pricing.premium.ribbon": "Premium",
    "pricing.premium.title": "Premium",
    "pricing.premium.copy": "All the protection, plus community modules and automation.",
    "pricing.premium.period": "for 5 months",
    "pricing.premium.note": "One-off payment — no automatic renewal.",
    "pricing.premium.item0": "All free protection included",
    "pricing.premium.item1": "Ticket system and ratings",
    "pricing.premium.item2": "Custom join and leave messages",
    "pricing.premium.item3": "Reaction roles and recurring messages",
    "pricing.premium.item4": "Social media alerts and tournaments",
    "pricing.premium.item5": "Full embed customization",
    "pricing.premium.item6": "Unlimited servers",
    "pricing.premium.cta": "Go Premium",
    "pricing.premium.support": "Activated through a ticket on our Discord server.",
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
    "admin.premium.badge": "Premium duration",
    "admin.premium.copy": "The admin grants the offer and duration. The member then associates servers from the dashboard without a quantity limit.",
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
    "pricing.title": "الحماية مجانية. إلى الأبد.",
    "pricing.copy": "أمّن خادمك دون دفع. اشترك في Premium عندما تريد وحدات المجتمع.",
    "pricing.free.title": "الحماية",
    "pricing.free.copy": "كل ما يحمي خادمك، بدون حد زمني ولا حد للخوادم.",
    "pricing.free.amount": "مجاني",
    "pricing.free.period": "إلى الأبد",
    "pricing.free.note": "بدون بطاقة بنكية، بدون حد زمني.",
    "pricing.free.item1": "الحماية من الغارات وكشف الحسابات المشبوهة",
    "pricing.free.item2": "الحماية من التخريب مع الاستعادة التلقائية",
    "pricing.free.item3": "فلتر لغة مقاوم للتحايل",
    "pricing.free.item4": "عقوبات متدرجة وسجل المخالفات",
    "pricing.free.item5": "نظام سجلات كامل",
    "pricing.free.item6": "نسخ احتياطي واستعادة الخادم",
    "pricing.free.cta": "ابدأ مجاناً",
    "pricing.free.support": "ادعُ ModBot، الحماية تعمل فوراً.",
    "pricing.premium.ribbon": "Premium",
    "pricing.premium.title": "Premium",
    "pricing.premium.copy": "كل الحماية، بالإضافة إلى وحدات المجتمع والأتمتة.",
    "pricing.premium.period": "لمدة 5 أشهر",
    "pricing.premium.note": "دفعة واحدة — بدون تجديد تلقائي.",
    "pricing.premium.item0": "كل الحماية المجانية مشمولة",
    "pricing.premium.item1": "نظام التذاكر والتقييمات",
    "pricing.premium.item2": "رسائل ترحيب ومغادرة مخصصة",
    "pricing.premium.item3": "أدوار التفاعل والرسائل المتكررة",
    "pricing.premium.item4": "تنبيهات الشبكات الاجتماعية والبطولات",
    "pricing.premium.item5": "تخصيص كامل للرسائل المضمنة",
    "pricing.premium.item6": "خوادم غير محدودة",
    "pricing.premium.cta": "اشترك في Premium",
    "pricing.premium.support": "التفعيل عبر تذكرة على خادم Discord الخاص بنا.",
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
    "admin.premium.badge": "مدة Premium",
    "admin.premium.copy": "يمنح المسؤول العرض ومدته، ثم يربط العضو خوادمه من لوحة التحكم بدون حد للعدد.",
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
    body: "Panneau de contrôle de ModBot sur Mon Serveur. Toutes les modérations sont sauvegardées par serveur.",
    type: "panel"
  },
  stats: {
    title: "Statistiques - Mon Serveur",
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
    answer: "L’offre gratuite donne accès au socle sécurité/modération et à un essai Premium de 48h. Le Premium est à 15€ pour 2 mois. L’Ultra Premium est à 35€ tous les 3 mois avec support prioritaire et personnalisations dédiées. Les offres ne limitent plus le nombre de serveurs."
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
  const thumb = `<span class="embed-thumb"><img src="assets/default_logo.svg" alt="" onerror="this.onerror=null; this.src='logo.png';"></span>`;
  let embedContent = "";

  if (data.type === "panel") {
    embedContent = `
      <div class="discord-embed embed-with-thumb">
        ${thumb}
        <h3>${data.title}</h3>
        <p>Panneau de contrôle de <strong>ModBot</strong> sur <strong>Mon Serveur</strong>.</p>
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
        <span class="discord-avatar"><img src="assets/default_logo.svg" alt="" onerror="this.onerror=null; this.src='logo.png';">MB</span>
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
 */
function getConfiguredModbotApiBase() {
  return normalizeApiBase(
    window.MODBOT_API_URL ||
    localStorage.getItem("modbot-api-url") ||
    document.querySelector('meta[name="modbot-api-url"]')?.content ||
    ""
  );
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

/** Formate une date ISO en date lisible française. Renvoie "—" si invalide. */
function formatIsoDateFr(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

/** Date + heure lisibles, pour les journaux. */
function formatIsoDateTimeFr(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("fr-FR", {
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
    // 1. Configuration explicite (meta / localStorage) — priorité absolue
    getConfiguredModbotApiBase(),
    // 2. Base ayant fonctionné précédemment
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

/** Mémorise durablement une base d'API validée automatiquement. */
function rememberApiBase(base) {
  if (!base) return;
  sessionStorage.setItem("modbot-api-base", base);
  localStorage.setItem("modbot-api-base-auto", base);
}

function forgetAutoApiBase() {
  sessionStorage.removeItem("modbot-api-base");
  localStorage.removeItem("modbot-api-base-auto");
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

function getDiscordAccessToken() {
  return sessionStorage.getItem("modbot-discord-access-token") || localStorage.getItem("modbot-discord-access-token") || "";
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
  const name = String(guild?.name || "Serveur Discord");
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

async function fetchDiscordManageableGuilds() {
  const token = getDiscordAccessToken();
  if (!token) return [];
  const response = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) {
    localStorage.removeItem("modbot-discord-access-token");
    sessionStorage.removeItem("modbot-discord-access-token");
    throw new Error("Session Discord expirée.");
  }
  const guilds = await response.json();
  if (!Array.isArray(guilds)) return [];
  return guilds
    .filter(canManageDiscordGuild)
    .map((guild) => normalizeDiscordGuild(guild, false));
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
    throw new Error(message);
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
    console.warn("Erreur de connexion ModBot:", loginError);
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
        sessionStorage.setItem("modbot-selected-offer", offerPlan);
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
    // La liste des serveurs se charge à l'ouverture de l'onglet Premium
    if (panelName === "premium") gpCharger();
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
          <div>
            <span class="server-logo-shell" data-initials="${escapeHtmlValue(guild.initials || initialsFromName(guild.name))}">
              <img src="${escapeHtmlValue(guild.icon || modbotDefaultLogo)}" alt="" data-logo-img onerror="if(!this.dataset.logoFallbackTried){this.dataset.logoFallbackTried='1';this.src='assets/default_logo.svg'}else{this.parentElement.classList.add('is-fallback')}" onload="this.parentElement.classList.remove('is-fallback')">
            </span>
            <span><strong>${escapeHtmlValue(guild.name)}</strong><small>ID ${escapeHtmlValue(guild.id)}</small></span>
          </div>
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

  /* ════════════════════════════════════════════════════════════════
     PREMIUM PAR SERVEUR
     L'abonnement est attribué à un serveur, pas à un membre.
     Seuls les administrateurs ModBot peuvent l'activer ou le révoquer.
     ════════════════════════════════════════════════════════════════ */

  const gpList = document.querySelector("[data-guild-premium-list]");
  const gpSearch = document.querySelector("[data-guild-premium-search]");
  const gpCount = document.querySelector("[data-guild-premium-count]");
  let gpServeurs = [];

  function gpRendre() {
    if (!gpList) return;
    const terme = (gpSearch?.value || "").trim().toLowerCase();
    const visibles = terme
      ? gpServeurs.filter((g) => g.name.toLowerCase().includes(terme))
      : gpServeurs;

    const actifs = gpServeurs.filter((g) => g.premium?.active).length;
    if (gpCount) {
      gpCount.textContent = `${actifs} serveur${actifs > 1 ? "s" : ""} Premium / ${gpServeurs.length}`;
    }

    if (!gpServeurs.length) {
      gpList.innerHTML = `<p class="premium-servers-empty">ModBot n'est installé sur aucun serveur.</p>`;
      return;
    }
    if (!visibles.length) {
      gpList.innerHTML = `<p class="premium-servers-empty">Aucun serveur ne correspond à « ${escapeHtmlValue(terme)} ».</p>`;
      return;
    }

    gpList.innerHTML = visibles
      .map((g) => {
        const p = g.premium || {};
        const actif = Boolean(p.active);
        const membres = Number(g.member_count || 0);
        const fin = actif ? formatIsoDateFr(p.expires_at) : null;
        const reste = Number(p.days_left || 0);
        return `
      <article class="guild-premium-row${actif ? " is-premium" : ""}">
        <span class="server-logo-shell" data-initials="${escapeHtmlValue(g.initials || "MB")}">
          ${g.icon ? `<img src="${escapeHtmlValue(g.icon)}" alt="" data-logo-img>` : ""}
        </span>
        <span class="guild-premium-info">
          <strong>${escapeHtmlValue(g.name)}</strong>
          <small>${membres ? membres.toLocaleString("fr-FR") + " membres · " : ""}ID ${escapeHtmlValue(g.id)}</small>
        </span>
        <span class="guild-premium-state">
          ${actif
            ? `<span class="state" data-level="ok">💎 Actif</span>
               <small>Jusqu'au ${escapeHtmlValue(fin)} · ${reste} j restants</small>`
            : `<span class="state" data-level="idle">⚪ Gratuit</span>`}
        </span>
        <button class="${actif ? "secondary-btn danger" : "primary-btn"} compact" type="button"
                data-guild-premium-toggle="${escapeHtmlValue(g.id)}"
                data-guild-premium-active="${actif ? "true" : "false"}"
                data-guild-premium-name="${escapeHtmlValue(g.name)}">
          ${actif ? "Révoquer" : "Activer Premium"}
        </button>
      </article>`;
      })
      .join("");

  }

  async function gpCharger() {
    try {
      const data = await modbotApiFetch("/api/admin/guilds", { cache: "no-store" });
      gpServeurs = Array.isArray(data.guilds) ? data.guilds : [];
      gpRendre();
    } catch (error) {
      if (gpList) {
        gpList.innerHTML = `<p class="premium-servers-empty">⚠️ ${escapeHtmlValue(error?.message || "Chargement impossible")}</p>`;
      }
    }
  }

  async function gpBasculer(guildId, nom, etaitActif) {
    const question = etaitActif
      ? `Révoquer le Premium de « ${nom} » ?\n\nLes modules communautaires seront immédiatement verrouillés.`
      : `Activer le Premium sur « ${nom} » ?\n\n29,99 € pour 5 mois. La date de fin est calculée automatiquement.`;
    if (!window.confirm(question)) return;

    try {
      const data = await modbotApiFetch(`/api/admin/guilds/${guildId}/premium`, {
        method: "POST",
        body: JSON.stringify({ active: !etaitActif })
      });
      const cible = gpServeurs.find((g) => g.id === guildId);
      if (cible) cible.premium = data.premium;
      gpRendre();
      showAdminToast(etaitActif
        ? `🚫 Premium révoqué sur ${nom}`
        : `💎 Premium actif sur ${nom} jusqu'au ${formatIsoDateFr(data.premium?.expires_at)}`);
    } catch (error) {
      showAdminToast(`⚠️ ${error?.message || "Opération impossible"}`);
    }
  }

  gpList?.addEventListener("click", (event) => {
    const bouton = event.target.closest("[data-guild-premium-toggle]");
    if (!bouton) return;
    gpBasculer(
      bouton.dataset.guildPremiumToggle,
      bouton.dataset.guildPremiumName,
      bouton.dataset.guildPremiumActive === "true"
    );
  });

  gpSearch?.addEventListener("input", gpRendre);
  document.querySelector("[data-guild-premium-reload]")?.addEventListener("click", () => {
    gpCharger();
    showAdminToast("↻ Serveurs rechargés");
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

  const dashboardUrlParams = new URLSearchParams(location.search || "");
  const requestedFlow = dashboardUrlParams.get("flow") || "";
  const requestedOfferPlan = dashboardUrlParams.get("plan") || dashboardUrlParams.get("offer") || sessionStorage.getItem("modbot-selected-offer") || "";
  const requiresLiveDiscordFlow = true;
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
  const premiumTierSelect = document.querySelector("[data-premium-tier]");
  const unsavedModal = document.querySelector("[data-unsaved-modal]");
  const publishTicketButton = document.querySelector("[data-publish-ticket]");
  const ticketChannelInput = document.querySelector("[data-ticket-channel]");
  // Offre unique : soit Premium actif, soit aucun abonnement.
  const PREMIUM_OFFER = {
    price: 29.99,
    priceLabel: "29,99 €",
    durationMonths: 5,
    durationLabel: "5 mois"
  };
  const premiumUnlimitedLimit = Number.POSITIVE_INFINITY;
  const premiumTierLimits = {
    free: premiumUnlimitedLimit,
    premium: premiumUnlimitedLimit
  };
  const premiumTierLabels = {
    free: "Sans abonnement",
    premium: "Premium"
  };
  function normalizePremiumTierValue(value) {
    const normalized = String(value || "").trim().toLowerCase().replace(/[\s-]+/g, "_");
    if (!normalized) return "";
    // Les anciens paliers (ultra, partner…) deviennent tous « premium »
    return ["free", "gratuit", "none", "aucun"].includes(normalized) ? "free" : "premium";
  }

  // État renvoyé par l'API (/api/guilds ou /api/me)
  let premiumState = {
    plan: "free",
    active: false,
    expires_at: null,
    days_left: 0,
    price_label: PREMIUM_OFFER.priceLabel,
    duration: PREMIUM_OFFER.durationLabel
  };

  // Sans abonnement : tout le socle de protection reste accessible et fonctionnel.
  const freePanels = new Set([
    "overview", "premium", "security", "backups", "logs",
    "channels", "moderation", "language"
  ]);
  // Premium : ajoute les modules communautaires et d'automatisation.
  const premiumPanels = new Set([
    ...freePanels,
    "tickets", "welcome", "reactionroles", "recurring", "socials", "ratings"
  ]);
  let activePanelName = "overview";
  let hasUnsavedChanges = false;
  let dirtyPanelName = null;
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
  let dashboardResources = { channels: [], roles: [] };
  let premiumTier = normalizePremiumTierValue(requestedOfferPlan) || readStoredPremiumTier();
  if (premiumTierSelect) premiumTierSelect.value = premiumTier;
  if (requestedOfferPlan) {
    sessionStorage.setItem("modbot-selected-offer", premiumTier);
    localStorage.setItem("modbot-dashboard-premium-tier", premiumTier);
  }

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
    if (authTitle) authTitle.textContent = "Connecte-toi avec Discord";
    if (authCopy) {
      authCopy.textContent = "Le dashboard chargera ensuite tous les serveurs où tu as Administrateur ou Gérer le serveur.";
    }
    if (authNote) {
      authNote.textContent = "Après connexion, choisis un serveur. Si ModBot n'y est pas encore, le dashboard proposera l'invitation officielle du bot.";
    }
    if (dashboardLoginButton) {
      dashboardLoginButton.innerHTML = "<span>💬</span> Se connecter avec Discord";
    }
  }

  function openDiscordInviteSelector() {
    const inviteUrl = buildDiscordOAuthUrl("invite");
    if (!inviteUrl) {
      showToast("⚠️ Client ID Discord manquant : impossible de créer le lien d'invitation");
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


  function readStoredPremiumTier() {
    const stored = localStorage.getItem("modbot-dashboard-premium-tier") || "free";
    return Object.hasOwn(premiumTierLimits, stored) ? stored : "free";
  }

  function getPremiumTier() {
    return premiumTierSelect?.value || premiumTier || "free";
  }

  function getPremiumLimit() {
    return premiumTierLimits[getPremiumTier()] || premiumUnlimitedLimit;
  }

  function getPremiumLimitLabel() {
    return "∞";
  }

  function isPanelAllowed(panelName) {
    // Offre gratuite : toute la protection. Premium : + modules communautaires.
    return premiumState.active ? premiumPanels.has(panelName) : freePanels.has(panelName);
  }

  const PREMIUM_PANEL_PITCH = {
    tickets: "Ouvre un support Discord complet : catégories, priorités, transcripts et évaluations.",
    welcome: "Accueille tes membres avec des cartes et messages personnalisés à l'arrivée et au départ.",
    reactionroles: "Laisse tes membres choisir leurs rôles en cliquant sur une réaction.",
    recurring: "Publie automatiquement des messages à intervalle régulier.",
    socials: "Annonce automatiquement tes lives Twitch, vidéos YouTube et posts TikTok.",
    ratings: "Recueille l'avis des membres après chaque ticket fermé."
  };

  /** Voile d'incitation affiché par-dessus un panneau réservé au Premium. */
  function renderPremiumLock(panel) {
    if (!panel || panel.querySelector(".premium-lock")) return;
    const nom = panel.dataset.dashboardPanel;
    const overlay = document.createElement("div");
    overlay.className = "premium-lock";
    overlay.innerHTML = `
      <div class="premium-lock-card">
        <span class="premium-lock-badge">💎 Premium</span>
        <h3>Module réservé à l'offre Premium</h3>
        <p>${escapeHtml(PREMIUM_PANEL_PITCH[nom] || "Ce module fait partie de l'offre Premium.")}</p>
        <p class="premium-lock-price"><strong>29,99 €</strong> pour 5 mois · serveurs illimités</p>
        <button class="primary-btn" type="button" data-dashboard-jump="premium">Voir l'offre Premium</button>
        <small>La protection de ton serveur reste entièrement gratuite.</small>
      </div>`;
    panel.appendChild(overlay);
  }

  function applyPanelAccess() {
    tabs.forEach((tab) => {
      const locked = !isPanelAllowed(tab.dataset.dashboardTab);
      tab.classList.toggle("is-locked", locked);
      // Les onglets restent cliquables : on montre ce que Premium apporte
      // plutôt que de désactiver sans explication.
      tab.setAttribute("aria-disabled", "false");
      tab.title = locked ? "Module Premium — clique pour en savoir plus" : "";
    });

    panels.forEach((panel) => {
      const locked = !isPanelAllowed(panel.dataset.dashboardPanel);
      panel.classList.toggle("is-premium-locked", locked);
      if (locked) {
        renderPremiumLock(panel);
      } else {
        panel.querySelector(".premium-lock")?.remove();
      }
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
    return channel?.name ? `# ${channel.name}` : `Salon ${channel?.id || ""}`;
  }

  function roleLabel(role) {
    return role?.name ? `@${role.name}` : `Rôle ${role?.id || ""}`;
  }

  function setInputState(input) {
    const row = input.closest(".channel-row");
    const state = row?.querySelector(".state");
    if (!state) return;
    const active = Boolean(input.value.trim());
    state.classList.toggle("active", active);
    state.classList.toggle("inactive", !active);
    state.textContent = active ? "🟢 Actif" : "⚪ Inactif";
  }

  function renderDashboardResources(resources = {}) {
    dashboardResources = {
      channels: Array.isArray(resources.channels) ? resources.channels : [],
      roles: Array.isArray(resources.roles) ? resources.roles : []
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
      supportRole.innerHTML = `<option value="">Choisir un rôle support</option>` + dashboardResources.roles.map((role) => (
        `<option value="${escapeHtml(role.id)}">${escapeHtml(roleLabel(role))}</option>`
      )).join("");
      if (current) supportRole.value = current;
    }

    document.querySelectorAll(".reaction-role-row input:nth-of-type(2)").forEach((input) => {
      input.setAttribute("list", "dashboardRoleOptions");
      input.placeholder = "ID du rôle ou @rôle";
    });
  }

  function renderModerationConfig(config = {}) {
    const moderation = config?.moderation || {};
    const security = config?.security || {};
    const customWords = Array.isArray(moderation.custom_words)
      ? moderation.custom_words
      : (Array.isArray(security.custom_words) ? security.custom_words : []);
    const filteredWords = Array.isArray(moderation.filtered_words)
      ? moderation.filtered_words
      : [
          ...(Array.isArray(security.default_words) ? security.default_words.map((word) => ({ word, source: "default", label: "par défaut" })) : []),
          ...customWords.map((word) => ({ word, source: "custom", label: "personnalisé" }))
        ];
    const sanctions = Array.isArray(moderation.sanctions)
      ? moderation.sanctions
      : (Array.isArray(moderation.bans) ? moderation.bans : []);

    const customWordsInput = document.querySelector("[data-custom-words]");
    if (customWordsInput) customWordsInput.value = customWords.join(", ");

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
        const label = source === "custom" ? "personnalisé" : "par défaut";
        return `<span class="filtered-word-chip is-${source}"><strong>${escapeHtml(word)}</strong><em>${label}</em></span>`;
      }).join("") : `<div class="dashboard-empty-state"><strong>Aucun mot filtré</strong><span>La liste sera chargée depuis le bot.</span></div>`;
    }

    const sanctionList = document.querySelector("[data-sanction-list]");
    if (sanctionList) {
      sanctionList.innerHTML = sanctions.length ? sanctions.slice(0, 30).map((item) => {
        const pseudo = item.pseudo || item.username || "Utilisateur inconnu";
        const userId = item.id || item.user_id || "ID inconnu";
        const reason = item.reason || item.raison || "Aucune raison fournie";
        const duration = item.duration || item.duree || "Permanent";
        const date = item.date || item.created_at || "Date inconnue";
        const guildName = item.guild_name || item.server_name || "";
        return `
          <article class="sanction-row">
            <span class="state inactive">Ban</span>
            <strong>${escapeHtml(pseudo)}</strong>
            <code>${escapeHtml(userId)}</code>
            <small>${escapeHtml(reason)}</small>
            <small>${escapeHtml(duration)} • ${escapeHtml(date)}${guildName ? ` • ${escapeHtml(guildName)}` : ""}</small>
          </article>
        `;
      }).join("") : `<div class="dashboard-empty-state"><strong>Aucun bannissement enregistré</strong><span>Les prochains bans effectués par ModBot apparaîtront ici.</span></div>`;
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
    if (labelTarget) labelTarget.textContent = count ? "Stats réelles du bot" : "Aucune note réelle";
    if (overviewAverageTarget) overviewAverageTarget.textContent = `${safeAverage.toFixed(2)}/5`;
    if (overviewCountTarget) overviewCountTarget.textContent = String(count);

    const logFeed = document.querySelector("[data-dashboard-log-feed]");
    if (logFeed) {
      if (!logs.length) {
        logFeed.innerHTML = `<div><span>—</span> Aucun log réel enregistré pour ce serveur.</div>`;
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

  async function loadDashboardResources(guildId) {
    if (!guildId) {
      renderDashboardResources({});
      return;
    }
    try {
      const data = await modbotApiFetch(`/api/guilds/${guildId}/resources`, { cache: "no-store" });
      renderDashboardResources(data);
    } catch (error) {
      renderDashboardResources({});
    }
  }

  function emptyGuildMarkup(message = "Aucun serveur Discord administrable trouvé.") {
    return `
      <div class="dashboard-empty-state">
        <strong>Serveur indisponible</strong>
        <span>${escapeHtml(message)}</span>
      </div>
    `;
  }

  function formatMemberCount(value) {
    const count = Number(value || 0);
    if (!Number.isFinite(count) || count <= 0) return "";
    if (count >= 1000) return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}k Membres`;
    return `${count} Membre${count > 1 ? "s" : ""}`;
  }

  function guildActionLabel(guild) {
    if (guild.installed) return "Ouvrir";
    return "Ajouter ModBot";
  }

  function guildStatusLabel(guild) {
    if (guild.local) return "Ajouter ModBot via Discord";
    return formatMemberCount(guild.member_count) || (guild.installed ? "ModBot installé" : "Bot non installé");
  }

  function updateServerCount(guilds) {
    if (!serverCountLabel) return;
    const realGuilds = guilds.filter((guild) => !guild.local);
    if (realGuilds.length) {
      serverCountLabel.textContent = `Vous avez rejoint ${realGuilds.length} serveur${realGuilds.length > 1 ? "s" : ""}.`;
      return;
    }
    serverCountLabel.textContent = "Choisis un serveur ou ajoute ModBot via Discord.";
  }

  function currentServerSearchTerm() {
    return String(serverSearchInput?.value || "").trim().toLowerCase();
  }

  /**
   * Aucun serveur fictif n'est jamais affiché : la liste vient uniquement de
   * l'API Discord. En l'absence de données, l'écran reste vide avec un
   * message explicite plutôt que de faux serveurs.
   */
  function readLocalGuildChoices() {
    return [];
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

  /** Affiche l'état de la liaison site ↔ bot sur l'écran de connexion. */
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
            ? "API ModBot injoignable. Vérifie que le bot est démarré et que l'URL est correcte."
            : "URL de l'API ModBot non configurée. Renseigne-la ci-dessous pour activer la connexion."
        };
      } else if (!lastApiHealth.oauth_configured) {
        state = {
          level: "warn",
          message:
            "Bot joignable, mais OAuth Discord incomplet. Définis DISCORD_CLIENT_SECRET " +
            "et DISCORD_REDIRECT_URI (ou PUBLIC_BASE_URL) côté bot."
        };
      } else {
        const guilds = Number(lastApiHealth.guilds || 0);
        state = {
          level: "ok",
          message: `Bot connecté : ${lastApiHealth.bot || "ModBot"} · ${guilds} serveur${guilds > 1 ? "s" : ""}.`
        };
      }
    }

    box.hidden = false;
    box.dataset.level = state.level;
    dot.className = `auth-status-dot is-${state.level}`;
    text.textContent = state.message;

    if (badge) {
      const labels = { ok: "connectée", warn: "à configurer", error: "non détectée", pending: "test…" };
      badge.textContent = labels[state.level] || state.level;
      badge.dataset.level = state.level;
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
      serverGrid.innerHTML = emptyGuildMarkup("Connecte l'API ModBot ou utilise l'invitation Discord officielle pour installer le bot.");
      return;
    }
    if (!visibleGuilds.length) {
      serverGrid.innerHTML = emptyGuildMarkup("Aucun serveur ne correspond à cette recherche.");
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


  // Abonnement par serveur : chaque entrée porte son propre état Premium
  const guildPremium = new Map();

  /** Applique l'état Premium du serveur actuellement ouvert. */
  function applyPremiumForSelectedGuild() {
    const etat = guildPremium.get(selectedServer.id);
    premiumState = etat
      ? { ...premiumState, ...etat }
      : { ...premiumState, plan: "free", active: false, expires_at: null, days_left: 0 };
    premiumTier = premiumState.active ? "premium" : "free";
    if (premiumTierSelect) premiumTierSelect.value = premiumTier;
    renderPremiumStatus();
  }

  async function loadDashboardGuilds() {
    const data = await modbotApiFetch("/api/guilds", { cache: "no-store" });
    const brut = Array.isArray(data?.guilds) ? data.guilds : [];
    brut.forEach((g) => {
      if (g?.id && g.premium) guildPremium.set(String(g.id), g.premium);
    });
    dashboardGuilds = normalizeDashboardGuilds(brut);
    applyPremiumForSelectedGuild();
    renderGuildChoices(dashboardGuilds);
    renderPremiumAssociations();
    return dashboardGuilds;
  }

  /** Envoie l'utilisateur vers Discord pour autoriser ModBot. */
  function redirectToDiscordLogin(base) {
    sessionStorage.setItem("modbot-login-redirected", "1");
    window.location.href =
      `${base}/api/auth/discord/login?redirect=${encodeURIComponent(dashboardReturnUrl())}`;
  }

  function forgetSession() {
    localStorage.removeItem("modbot-dashboard-session");
    sessionStorage.removeItem("modbot-dashboard-session");
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
      showDashboardStage("servers");
      renderAuthStatus();
      return "ok";
    } catch (error) {
      const message = String(error?.message || "");
      if (/401|session|expir/i.test(message)) {
        forgetSession();
        return "expired";
      }
      console.warn("Reprise de session impossible :", message);
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
      if (!silencieux) showToast("✅ Connecté au bot");
      return;
    }

    // 2. API injoignable : diagnostic précis, jamais un message vague
    if (!base) {
      showDashboardStage("auth");
      renderAuthStatus();
      if (!silencieux) {
        showToast(getConfiguredModbotApiBase()
          ? "⚠️ Le bot ne répond pas à cette adresse. Vérifie qu'il est démarré."
          : "⚠️ Bot introuvable. Indique son adresse dans « Configuration de l'API ».");
      }
      return;
    }

    // 3. OAuth incomplet côté bot : rediriger vers Discord échouerait
    if (lastApiHealth && !lastApiHealth.oauth_configured) {
      showDashboardStage("auth");
      renderAuthStatus();
      if (!silencieux) {
        showToast("⚠️ OAuth Discord incomplet côté bot : ajoute CLIENT_SECRET et REDIRECT_URI");
      }
      return;
    }

    // 4. Session expirée pendant l'usage : on relance Discord sans rien demander
    if (reprise === "expired") {
      showToast("🔐 Session expirée, reconnexion…");
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
    renderAuthStatus({ level: "pending", message: "Recherche du bot ModBot…" });

    const base = await findAvailableApiBase();
    if (!base) {
      renderAuthStatus();
      return;
    }

    if (await resumeSession(base) === "ok") {
      showToast("✅ Reconnecté automatiquement");
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
      showToast("🔐 Connecte-toi avec Discord pour voir tes serveurs");
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
        showToast("⚠️ Indique l'adresse publique de ton bot (https://…)");
        return;
      }
      renderAuthStatus({ level: "pending", message: "Test de l'API en cours…" });
      const clean = normalizeApiBase(value);
      const health = await probeApiBase(clean);
      if (!health) {
        renderAuthStatus({
          level: "error",
          message: `Aucune API ModBot n'a répondu sur ${clean}/api/health. Vérifie l'URL, que le bot est démarré, et que CORS autorise ce site.`
        });
        showToast("❌ API introuvable à cette adresse");
        return;
      }
      setModbotApiBase(clean);
      lastApiHealth = health;
      apiDiscovery = null; // force une nouvelle découverte avec cette base
      renderAuthStatus();
      showToast("✅ Bot trouvé, connexion en cours…");
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
      showToast("♻️ Adresse réinitialisée, nouvelle recherche…");
      findAvailableApiBase();
    });
  }

  function applyDashboardConfig(config) {
    if (!config) return;
    const tickets = config.tickets || {};
    const channels = config.channels || {};
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
    if (ticketSupportRole && tickets.support_role) {
      if (![...ticketSupportRole.options].some((option) => option.value === String(tickets.support_role))) {
        ticketSupportRole.insertAdjacentHTML("beforeend", `<option value="${escapeHtml(tickets.support_role)}">${escapeHtml(tickets.support_role)}</option>`);
      }
      ticketSupportRole.value = String(tickets.support_role);
    }

    const optionList = document.getElementById("ticketOptionList");
    if (optionList && Array.isArray(tickets.options) && tickets.options.length) {
      optionList.innerHTML = tickets.options.map((option, index) => `
        <div class="option-row"><span>${String(index + 1).padStart(2, "0")}</span><input class="emoji-input" value="${escapeHtml(option.emoji || "🎫")}" maxlength="3"><input value="${escapeHtml(option.label || "Ticket")}"><input value="${escapeHtml(option.desc || "Ouvrir un ticket")}"><button type="button">Supprimer</button></div>
      `).join("");
    }

    const channelRows = document.querySelectorAll("[data-dashboard-panel='channels'] .channel-row input");
    const channelValues = [channels.tickets, channels.logs, channels.suggestions, channels.reports, channels.staff_alert];
    channelRows.forEach((input, index) => {
      input.value = channelValues[index] || "";
      setInputState(input);
    });

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


    const welcomeMessage = document.querySelector("[data-welcome-message]");
    const departureMessage = document.querySelector("[data-departure-message]");
    const welcomeChannel = document.querySelector("[data-welcome-channel]");
    const welcomeBg = document.querySelector("[data-welcome-bg]");
    const welcomeFont = document.querySelector("[data-welcome-font]");
    const welcomeColor = document.querySelector("[data-welcome-color]");
    const welcomeToggles = document.querySelectorAll("[data-dashboard-panel='welcome'] .toggle-line input");
    const welcomeDmEnabled = document.querySelector("[data-welcome-dm-enabled]");
    const welcomeDmMessage = document.querySelector("[data-welcome-dm-message]");
    const departureMemberName = document.querySelector("[data-departure-member-name]");
    const departureCard = document.querySelector("[data-departure-card]");
    if (welcomeToggles[0]) {
      welcomeToggles[0].checked = Boolean(welcome.enabled);
      welcomeToggles[0].closest(".toggle-line")?.classList.toggle("is-on", Boolean(welcome.enabled));
    }
    if (welcomeToggles[2]) {
      welcomeToggles[2].checked = Boolean(welcome.departure_enabled);
      welcomeToggles[2].closest(".toggle-line")?.classList.toggle("is-on", Boolean(welcome.departure_enabled));
    }
    if (welcomeDmEnabled) {
      welcomeDmEnabled.checked = Boolean(welcome.dm_enabled);
      welcomeDmEnabled.closest(".toggle-line")?.classList.toggle("is-on", Boolean(welcome.dm_enabled));
    }
    if (welcomeChannel && welcome.channel_id) welcomeChannel.value = welcome.channel_id;
    if (welcomeMessage && welcome.message) welcomeMessage.value = welcome.message;
    if (departureMessage && welcome.departure_message) departureMessage.value = welcome.departure_message;
    if (welcomeDmMessage && welcome.dm_message) welcomeDmMessage.value = welcome.dm_message;
    if (welcomeBg && welcome.background) welcomeBg.value = welcome.background;
    if (welcomeFont && welcome.font) welcomeFont.value = welcome.font;
    if (welcomeColor && welcome.color) welcomeColor.value = welcome.color;
    if (departureMemberName) departureMemberName.textContent = departureMessage?.value || "nom du membre";
    if (departureCard && welcome.background) {
      departureCard.style.backgroundImage = `linear-gradient(90deg, rgba(19, 15, 70, 0.58), rgba(42, 94, 255, 0.72)), url("${welcome.background}")`;
    }

    if (config.language) {
      const languageSelect = document.querySelector("[data-dashboard-panel='language'] select");
      if (languageSelect) languageSelect.value = config.language === "en" ? "English" : "Français";
    }

    const incomingTier = config.premium_tier || config.premium_plan;
    if (incomingTier) {
      premiumTier = Object.hasOwn(premiumTierLimits, incomingTier) ? incomingTier : premiumTier;
      if (premiumTierSelect) premiumTierSelect.value = premiumTier;
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

    if (Array.isArray(config.reaction_roles)) {
      const reactionTitle = document.querySelector("[data-reaction-title]");
      const reactionDescription = document.querySelector("[data-reaction-description]");
      if (reactionTitle && config.reaction_title) reactionTitle.value = config.reaction_title;
      if (reactionDescription && config.reaction_description) reactionDescription.value = config.reaction_description;
      const reactionRoleList = document.querySelector("[data-reaction-role-list]");
      if (reactionRoleList) {
        reactionRoleList.innerHTML = config.reaction_roles.map((role, index) => `
          <div class="reaction-role-row"><span>${String(index + 1).padStart(2, "0")}</span><input class="emoji-input" value="${escapeHtml(role.emoji || "✨")}" maxlength="3"><input value="${escapeHtml(role.role_id || role.role || "")}" list="dashboardRoleOptions"><input value="${escapeHtml(role.label || role.name || "Rôle")}"><button type="button">Supprimer</button></div>
        `).join("") || `<div class="reaction-role-row"><span>01</span><input class="emoji-input" value="✨" maxlength="3"><input value="" list="dashboardRoleOptions"><input value="Nouveau rôle"><button type="button">Supprimer</button></div>`;
      }
      const reactionChannel = document.querySelector("[data-reaction-channel]");
      const reactionMode = document.querySelector("[data-reaction-mode]");
      if (reactionChannel && config.reaction_roles_channel_id) reactionChannel.value = config.reaction_roles_channel_id;
      if (reactionMode && config.reaction_roles_mode) reactionMode.value = config.reaction_roles_mode;
    }

    if (Array.isArray(config.social_relays)) {
      config.social_relays.forEach((relay) => {
        const card = [...document.querySelectorAll(".social-card")].find((item) => item.dataset.socialPlatform === relay.platform);
        if (!card) return;
        const link = card.querySelector("[data-social-link]");
        const channel = card.querySelector("[data-social-channel]");
        const enabled = card.querySelector("[data-social-enabled]");
        const state = card.querySelector("[data-social-state]");
        if (link) link.value = relay.link || "";
        if (channel) channel.value = relay.channel_id || "";
        if (enabled) enabled.checked = Boolean(relay.enabled);
        if (state) {
          state.classList.toggle("active", Boolean(relay.enabled));
          state.classList.toggle("inactive", !relay.enabled);
          state.textContent = relay.enabled ? "🟢 Actif" : "⚪ Inactif";
        }
      });
    }

    const liveTitle = document.querySelector("[data-live-title]");
    const liveDescription = document.querySelector("[data-live-desc]");
    const liveTicketEmoji = document.querySelector("[data-live-ticket-emoji]");
    if (liveTitle) liveTitle.textContent = tickets.title || "Ouvre ton ticket";
    if (liveDescription) liveDescription.textContent = tickets.description || "Merci de sélectionner la raison de ta demande.";
    if (liveTicketEmoji) liveTicketEmoji.textContent = tickets.emoji || "📩";
    renderModerationConfig(config);
    renderDashboardStats(config);
    document.querySelectorAll("[data-dashboard-panel='channels'] .channel-row input").forEach(setInputState);
    syncWelcomePreview();
    renderReactionPreview();
  }

  async function loadSelectedGuildConfig(guildId) {
    try {
      await loadDashboardResources(guildId);
      const data = await modbotApiFetch(`/api/guilds/${guildId}/config`, { cache: "no-store" });
      applyDashboardConfig(data.config);
      // L'abonnement appartient au serveur : on applique celui-ci
      if (data.premium) guildPremium.set(String(guildId), data.premium);
      applyPremiumForSelectedGuild();
      showToast("✅ Configuration chargée depuis le bot");
    } catch (error) {
      showToast("⚠️ Configuration locale affichée, connexion bot non disponible");
    }
    // Les modules sécurité / logs / sauvegardes ont leurs propres endpoints :
    // on les charge en parallèle sans bloquer l'affichage de la configuration.
    Promise.allSettled([
      loadGuildSecurity(guildId),
      loadGuildLogs(guildId),
      loadGuildBackups(guildId)
    ]);
  }

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
      switcherList.innerHTML = `<p class="server-switcher-empty">Aucun serveur chargé.</p>`;
      return;
    }
    if (!visibles.length) {
      switcherList.innerHTML = `<p class="server-switcher-empty">Aucun résultat pour « ${escapeHtml(filtre)} ».</p>`;
      return;
    }

    switcherList.innerHTML = visibles
      .map((guild, index) => {
        const actif = guild.id === selectedServer.id;
        const statut = guild.installed
          ? `${guild.member_count ? guild.member_count.toLocaleString("fr-FR") + " membres" : "ModBot installé"}`
          : "ModBot non installé";
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
        ${actif ? '<span class="server-switcher-check" aria-hidden="true">✓</span>' : ""}
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
    selectGuildFromElement(item);
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
    warn: "⚠️ Avertissement",
    mute: "🔇 Mute",
    kick: "👢 Expulsion",
    ban: "🔨 Bannissement"
  };
  const PERMISSION_LABELS = {
    view_audit_log: "Voir les logs d'audit (indispensable à l'anti-nuke)",
    ban_members: "Bannir des membres",
    kick_members: "Expulser des membres",
    manage_roles: "Gérer les rôles",
    manage_channels: "Gérer les salons",
    moderate_members: "Exclure temporairement (timeout)",
    manage_guild: "Gérer le serveur"
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
    if (lastEl) lastEl.textContent = autoBackup.last ? formatIsoDateTimeFr(autoBackup.last) : "jamais";

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
        ["Anti-raid", s.antiraid?.enabled],
        ["Anti-nuke", s.antinuke?.enabled],
        ["Filtre de langage", s.filter?.enabled],
        ["Restauration automatique", s.antinuke?.auto_restore],
        ["Sauvegarde automatique", s.auto_backup?.enabled]
      ];
      const actives = protections.filter(([, on]) => on).length;
      txt("[data-overview-security]", `${actives}/${protections.length}`);
      txt("[data-overview-security-detail]",
          s.safe_mode_active ? "🚨 Mode sécurité actif" : "Modules de protection actifs");

      const liste = document.querySelector("[data-overview-checklist]");
      if (liste) {
        const manquantes = Object.entries(s.permissions || {})
          .filter(([, ok]) => !ok)
          .map(([nom]) => PERMISSION_LABELS[nom] || nom);
        liste.innerHTML =
          protections
            .map(([nom, on]) => `<li>${on ? "🟢" : "⚪"} ${escapeHtml(nom)}</li>`)
            .join("") +
          (manquantes.length
            ? `<li>🔴 Permissions Discord manquantes : ${escapeHtml(manquantes.join(", "))}</li>`
            : `<li>🟢 Toutes les permissions Discord sont accordées</li>`);
      }
    }

    const nb = backupList.length;
    txt("[data-overview-backups]", String(nb));
    const derniere = backupList[0]?.created_at;
    txt("[data-overview-backups-detail]",
        derniere ? `Dernière : ${formatIsoDateTimeFr(derniere)}` : "Aucune sauvegarde");

    txt("[data-overview-logs]", String(currentLogs.length));
  }

  async function loadGuildSecurity(guildId) {
    if (!guildId) return;
    try {
      const data = await modbotApiFetch(`/api/guilds/${guildId}/security`, { cache: "no-store" });
      applySecurityState(data.security);
      renderOverview();
    } catch (error) {
      console.warn("Sécurité indisponible :", error?.message || error);
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
      auto_backup: {
        enabled: readChecked("[data-autobackup-enabled]"),
        interval_hours: readNumber("[data-autobackup-interval]", 24)
      },
      logs_enabled: collectLogToggles()
    };
  }

  async function saveGuildSecurity() {
    const guildId = selectedServer.id;
    if (!guildId) {
      showToast("⚠️ Sélectionne d'abord un serveur");
      return;
    }
    try {
      const data = await modbotApiFetch(`/api/guilds/${guildId}/security`, {
        method: "PUT",
        body: JSON.stringify(collectSecurityPayload())
      });
      applySecurityState(data.security);
      clearUnsavedChanges();
      showToast("🛡️ Sécurité enregistrée dans le bot");
    } catch (error) {
      showToast(`⚠️ ${error?.message || "Enregistrement impossible"}`);
    }
  }

  /* ══════════════════════════════════════════════════════════════════
     LOGS
     ══════════════════════════════════════════════════════════════════ */

  const LOG_SEVERITY_ICONS = {
    info: "ℹ️", success: "✅", warning: "⚠️", danger: "🚫", critical: "🚨"
  };
  let logCategories = [];
  let currentLogCategory = "all";
  let currentLogs = [];

  function renderLogFilters() {
    const host = document.querySelector("[data-log-filters]");
    if (!host) return;
    const buttons = [{ id: "all", label: "Tout", emoji: "🗂️" }, ...logCategories.map((c) => ({
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
      <label class="toggle-line compact">
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
      feed.innerHTML = `<div class="log-empty"><span>—</span> Aucun événement enregistré pour cette catégorie.</div>`;
      return;
    }
    feed.innerHTML = currentLogs
      .map((entry) => {
        const category = logCategories.find((c) => c.id === entry.category);
        const icon = LOG_SEVERITY_ICONS[entry.severity] || "•";
        const actor = entry.actor ? `<span class="log-actor">👮 ${escapeHtml(entry.actor)}</span>` : "";
        const target = entry.target ? `<span class="log-target">🎯 ${escapeHtml(entry.target)}</span>` : "";
        return `
      <article class="log-entry" data-severity="${escapeHtml(entry.severity || "info")}">
        <header>
          <span class="log-icon">${icon}</span>
          <strong>${escapeHtml(entry.title || "Événement")}</strong>
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
      logCategories = Array.isArray(data.categories) ? data.categories : [];
      currentLogs = Array.isArray(data.logs) ? data.logs : [];
      currentLogCategory = category;
      renderLogFilters();
      renderLogFeed();
      renderOverview();
    } catch (error) {
      const feed = document.querySelector("[data-dashboard-log-feed]");
      if (feed) {
        feed.innerHTML = `<div class="log-empty"><span>⚠️</span> ${escapeHtml(error?.message || "Logs indisponibles")}</div>`;
      }
    }
  }

  function exportLogs() {
    if (!currentLogs.length) {
      showToast("⚠️ Aucun log à exporter");
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
    showToast(`📤 ${currentLogs.length} log(s) exporté(s)`);
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
      host.innerHTML = `<div class="backup-empty">Aucune sauvegarde pour le moment.</div>`;
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
          <span>🎭 ${Number(counts.roles || 0)}</span>
          <span>🗂️ ${Number(counts.categories || 0)}</span>
          <span>📁 ${Number(counts.channels || 0)}</span>
        </div>
        <div class="backup-actions">
          <button class="primary-btn compact" type="button" data-backup-restore="${escapeHtml(entry.id)}">♻️ Restaurer</button>
          <button class="secondary-btn compact danger" type="button" data-backup-delete="${escapeHtml(entry.id)}">🗑️</button>
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
      showToast("⚠️ Sélectionne d'abord un serveur");
      return;
    }
    showToast("💾 Sauvegarde en cours…");
    try {
      const data = await modbotApiFetch(`/api/guilds/${guildId}/backups`, {
        method: "POST",
        body: JSON.stringify({ note: "Créée depuis le dashboard" })
      });
      await loadGuildBackups(guildId);
      showToast(`✅ Sauvegarde ${data.backup?.id || ""} créée`);
    } catch (error) {
      showToast(`⚠️ ${error?.message || "Sauvegarde impossible"}`);
    }
  }

  async function restoreBackup(backupId) {
    const guildId = selectedServer.id;
    if (!guildId) return;
    const entry = backupList.find((item) => item.id === backupId);
    const counts = entry?.counts || {};
    // Confirmation obligatoire avant une opération aussi lourde
    const confirmed = window.confirm(
      `Restaurer la sauvegarde ${backupId} sur « ${selectedServer.name} » ?\n\n` +
      `Contenu : ${counts.roles || 0} rôles, ${counts.categories || 0} catégories, ${counts.channels || 0} salons.\n\n` +
      `La restauration est additive : elle recrée ce qui manque et ne supprime rien.\n` +
      `L'opération peut prendre plusieurs minutes.`
    );
    if (!confirmed) return;

    showToast("♻️ Restauration en cours, cela peut prendre plusieurs minutes…");
    try {
      const data = await modbotApiFetch(`/api/guilds/${guildId}/backups/${backupId}/restore`, {
        method: "POST",
        body: JSON.stringify({ confirm: true })
      });
      const report = data.report || {};
      showToast(
        `✅ Restauration terminée : ${report.roles || 0} rôles, ` +
        `${report.categories || 0} catégories, ${report.channels || 0} salons`
      );
      loadGuildLogs(guildId);
    } catch (error) {
      showToast(`⚠️ ${error?.message || "Restauration impossible"}`);
    }
  }

  async function deleteBackup(backupId) {
    const guildId = selectedServer.id;
    if (!guildId) return;
    if (!window.confirm(`Supprimer définitivement la sauvegarde ${backupId} ?`)) return;
    try {
      await modbotApiFetch(`/api/guilds/${guildId}/backups/${backupId}`, { method: "DELETE" });
      await loadGuildBackups(guildId);
      showToast("🗑️ Sauvegarde supprimée");
    } catch (error) {
      showToast(`⚠️ ${error?.message || "Suppression impossible"}`);
    }
  }

  /* ── Branchements des nouveaux panneaux ─────────────────────────── */

  document.querySelector("[data-security-save]")?.addEventListener("click", saveGuildSecurity);
  document.querySelector("[data-security-reload]")?.addEventListener("click", () => {
    loadGuildSecurity(selectedServer.id);
    showToast("↻ Sécurité rechargée");
  });
  document.querySelector("[data-sanction-reset]")?.addEventListener("click", () => {
    sanctionLadder = DEFAULT_SANCTION_LADDER.map((step) => ({ ...step }));
    renderSanctionLadder();
    markPanelDirty("security");
    showToast("♻️ Échelle de sanctions réinitialisée");
  });
  document.querySelector("[data-autobackup-save]")?.addEventListener("click", saveGuildSecurity);

  document.querySelector("[data-log-filters]")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-log-category]");
    if (!button) return;
    loadGuildLogs(selectedServer.id, button.dataset.logCategory);
  });
  document.querySelector("[data-logs-reload]")?.addEventListener("click", () => {
    loadGuildLogs(selectedServer.id);
    showToast("↻ Journal rechargé");
  });
  document.querySelector("[data-logs-export]")?.addEventListener("click", exportLogs);
  document.querySelector("[data-logs-save]")?.addEventListener("click", saveGuildSecurity);

  document.querySelector("[data-backup-create]")?.addEventListener("click", createBackup);
  document.querySelector("[data-backups-reload]")?.addEventListener("click", () => {
    loadGuildBackups(selectedServer.id);
    showToast("↻ Sauvegardes rechargées");
  });
  document.querySelector("[data-backup-list]")?.addEventListener("click", (event) => {
    const restoreBtn = event.target.closest("[data-backup-restore]");
    if (restoreBtn) return restoreBackup(restoreBtn.dataset.backupRestore);
    const deleteBtn = event.target.closest("[data-backup-delete]");
    if (deleteBtn) return deleteBackup(deleteBtn.dataset.backupDelete);
  });

  renderSanctionLadder();

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
        role_id: inputs[1]?.value || "",
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
    const customWords = (document.querySelector("[data-custom-words]")?.value || "")
      .split(/[\n,;]+/)
      .map((word) => word.trim().toLowerCase())
      .filter(Boolean)
      .filter((word, index, words) => words.indexOf(word) === index);
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
        emoji: document.querySelector("[data-preview-emoji]")?.value || "📩",
        description: document.querySelector("[data-preview-desc]")?.value || "",
        banner: document.querySelector("[data-ticket-banner]")?.value || "",
        support_role: document.querySelector("[data-ticket-support-role]")?.value || "",
        options: ticketOptions,
      },
      welcome_system: {
        enabled: Boolean(document.querySelector("[data-dashboard-panel='welcome'] .toggle-line input")?.checked),
        dm_enabled: Boolean(document.querySelector("[data-welcome-dm-enabled]")?.checked),
        departure_enabled: Boolean(document.querySelectorAll("[data-dashboard-panel='welcome'] .toggle-line input")[2]?.checked),
        channel_id: document.querySelector("[data-welcome-channel]")?.value || "",
        message: document.querySelector("[data-welcome-message]")?.value || "",
        dm_message: document.querySelector("[data-welcome-dm-message]")?.value || "",
        departure_message: document.querySelector("[data-departure-message]")?.value || "",
        background: document.querySelector("[data-welcome-bg]")?.value || "",
        font: document.querySelector("[data-welcome-font]")?.value || "Inter",
        color: document.querySelector("[data-welcome-color]")?.value || "#ffffff",
      },
      reaction_title: document.querySelector("[data-reaction-title]")?.value || "Choisis tes rôles",
      reaction_description: document.querySelector("[data-reaction-description]")?.value || "",
      reaction_roles_channel_id: document.querySelector("[data-reaction-channel]")?.value || "",
      reaction_roles_mode: document.querySelector("[data-reaction-mode]")?.value || "Plusieurs rôles possibles",
      reaction_roles: reactionRoles,
      recurring_messages: recurringMessages,
      social_relays: socialRelays,
      language: languageValue === "English" ? "en" : "fr",
      // Ni premium_servers, ni premium_tier, ni personnalisation, ni tournoi :
      // ces réglages ne sont plus pilotés depuis le dashboard utilisateur.
      // Les envoyer écraserait des valeurs gérées côté administration.
    };
  }

  async function saveDashboardConfigToApi() {
    if (!selectedServer.id || !selectedServer.installed) return false;
    await modbotApiFetch(`/api/guilds/${selectedServer.id}/config`, {
      method: "PUT",
      body: JSON.stringify(collectDashboardConfig())
    });
    return true;
  }


  /** Met à jour l'encart d'état de l'abonnement Premium. */
  function renderPremiumStatus() {
    const active = Boolean(premiumState.active);
    const card = document.querySelector("[data-premium-status]");
    const badge = document.querySelector("[data-premium-state-badge]");
    const expiry = document.querySelector("[data-premium-expiry]");
    const remaining = document.querySelector("[data-premium-remaining]");
    const priceEl = document.querySelector("[data-premium-price]");
    const durationEl = document.querySelector("[data-premium-duration]");

    if (card) card.dataset.active = active ? "true" : "false";
    if (badge) {
      badge.textContent = active ? "🟢 Premium actif" : "⚪ Aucun abonnement";
      badge.dataset.level = active ? "ok" : "idle";
    }
    if (priceEl) priceEl.textContent = premiumState.price_label || PREMIUM_OFFER.priceLabel;
    if (durationEl) durationEl.textContent = premiumState.duration || PREMIUM_OFFER.durationLabel;
    if (expiry) expiry.textContent = active ? formatIsoDateFr(premiumState.expires_at) : "—";
    if (remaining) {
      const days = Number(premiumState.days_left || 0);
      remaining.textContent = active ? `${days} jour${days > 1 ? "s" : ""}` : "—";
      remaining.dataset.level = active && days <= 14 ? "warn" : "ok";
    }
    // L'accès aux modules suit immédiatement l'état de l'abonnement
    applyPanelAccess();
  }

  /**
   * Rafraîchit l'affichage Premium. L'association des serveurs est gérée
   * côté administration : le dashboard n'en affiche plus que l'état.
   */
  function renderPremiumAssociations() {
    renderPremiumStatus();
    applyPanelAccess();
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

  function openBotInviteForGuild(guildId, guildName = "ce serveur") {
    if (!guildId || String(guildId).startsWith("local-")) {
      return openDiscordInviteSelector();
    }
    const inviteUrl = buildDiscordOAuthUrl("invite", guildId);
    if (!inviteUrl) {
      showToast("⚠️ Lien d'invitation Discord indisponible");
      return false;
    }
    window.open(inviteUrl, "_blank", "noreferrer");
    showToast(`➕ Invite ModBot sur ${guildName}`);
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

  async function saveCurrentChanges(message = "💾 Configuration enregistrée") {
    if (!hasUnsavedChanges) {
      showToast("✅ Tout est déjà enregistré");
      return true;
    }
    if (!selectedServer.id || !selectedServer.installed) {
      showToast("🔗 Le serveur actif n'est pas relié au bot : reconnecte-toi via Discord");
      return false;
    }
    let savedToApi = false;
    try {
      savedToApi = await saveDashboardConfigToApi();
    } catch (error) {
      showToast(`⚠️ Sauvegarde impossible : ${error.message || "connexion bot indisponible"}`);
      return false;
    }
    if (selectedServer.installed && !savedToApi) {
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
    // Un panneau Premium s'ouvre quand même : le voile explique ce qu'il apporte.
    if (!isPanelAllowed(panelName)) {
      showToast("💎 Module Premium — la protection reste gratuite");
    }
    document.querySelector(".dashboard-content")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
        showToast("↻ Serveurs Discord rafraîchis");
        return;
      } catch (error) {
        showToast("⚠️ Impossible de rafraîchir les serveurs depuis l'API");
      }
    }
    showDashboardStage("auth");
    showToast("🔐 Connecte-toi avec Discord pour charger tes vrais serveurs");
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
    const nom = element.dataset.serverName || "Serveur ModBot";
    const initiales = element.dataset.serverInitials || nom.slice(0, 2).toUpperCase() || "MB";
    const guildId = element.dataset.serverId || element.dataset.switcherGuild || "";
    const installe = element.dataset.serverInstalled === "true";
    const peutGerer = element.dataset.serverCanManage !== "false";

    if (!peutGerer) {
      showToast("🔒 Permissions insuffisantes : il faut Administrateur ou Gérer le serveur");
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
    showToast(`✅ ${nom}`);

    if (guildId) {
      await loadSelectedGuildConfig(guildId);
    } else {
      renderDashboardResources({});
    }
    clearUnsavedChanges();
    ticketNeedsPublish = false;
    setTicketPublishVisible(false);
    if (requestedOfferPlan) openPanel("premium");
  }

  document.querySelector(".server-picker .server-grid")?.addEventListener("click", (event) => {
    const carte = event.target.closest(".server-card[data-server-name]");
    if (carte) selectGuildFromElement(carte);
  });






  renderPremiumAssociations();



  setupLogoFallbacks();
  setOfferInviteFallbackCopy();
  initApiUrlControls();

  const LOGIN_ERROR_MESSAGES = {
    oauth_backend_required: "⚠️ Connexion Discord reçue, mais l'API ModBot doit finaliser la session",
    oauth_not_configured: "⚠️ OAuth Discord non configuré côté bot : ajoute DISCORD_CLIENT_SECRET et DISCORD_REDIRECT_URI",
    oauth_state: "⚠️ Lien de connexion expiré ou déjà utilisé. Relance la connexion Discord.",
    oauth_token: "⚠️ Discord a refusé le code : l'URL de callback du portail Discord doit correspondre exactement à DISCORD_REDIRECT_URI",
    oauth_user: "⚠️ Discord n'a pas renvoyé le profil utilisateur",
    oauth_guilds: "⚠️ Discord n'a pas renvoyé la liste des serveurs",
    missing_code: "⚠️ Discord n'a pas renvoyé de code de connexion"
  };
  const LOGIN_ERROR_DETAILS = {
    oauth_not_configured:
      "Le bot répond mais l'OAuth Discord est incomplet. Sur ton hébergeur, définis DISCORD_CLIENT_SECRET et DISCORD_REDIRECT_URI (ou PUBLIC_BASE_URL).",
    oauth_token:
      "Dans le portail développeur Discord → OAuth2 → Redirects, l'URL doit être identique à DISCORD_REDIRECT_URI, au caractère près.",
    oauth_state:
      "Le jeton anti-CSRF a expiré (10 minutes) ou a déjà servi. Clique de nouveau sur « Se connecter avec Discord »."
  };

  const pendingLoginError = sessionStorage.getItem("modbot-login-error");
  if (pendingLoginError) {
    sessionStorage.removeItem("modbot-login-error");
    showDashboardStage("auth");
    showToast(LOGIN_ERROR_MESSAGES[pendingLoginError] || `⚠️ Connexion Discord impossible : ${pendingLoginError}`);
    if (LOGIN_ERROR_DETAILS[pendingLoginError]) {
      renderAuthStatus({ level: "warn", message: LOGIN_ERROR_DETAILS[pendingLoginError] });
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
    clearUnsavedChanges();
    showToast("🗑️ Modifications laissées de côté");
    pendingNavigation = null;
    action?.();
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
      showToast(checkbox.checked ? "Module activé" : "Module désactivé");
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
    if (!selectedServer.id || !selectedServer.installed) {
      showToast("🔗 Le serveur actif n'est pas encore relié au bot côté dashboard");
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

  document.querySelector("[data-publish-reaction-roles]")?.addEventListener("click", async () => {
    const channel = document.querySelector("[data-reaction-channel]")?.value.trim();
    if (!selectedServer.id || !selectedServer.installed) {
      showToast("🔗 Le serveur actif n'est pas encore relié au bot côté dashboard");
      return;
    }
    if (!channel) {
      showToast("⚠️ Choisis le salon des rôles réactions");
      return;
    }
    const saved = await saveCurrentChanges("💾 Rôles réactions enregistrés");
    if (!saved) return;
    try {
      await modbotApiFetch(`/api/guilds/${selectedServer.id}/reaction-roles/publish`, {
        method: "POST",
        body: JSON.stringify(collectDashboardConfig())
      });
      showToast(`🚀 Message rôles réactions publié dans le salon ${channel}`);
    } catch (error) {
      showToast("⚠️ Publication rôles réactions impossible");
    }
  });

  const welcomeMessageInput = document.querySelector("[data-welcome-message]");
  const welcomeBgInput = document.querySelector("[data-welcome-bg]");
  const welcomeFontSelect = document.querySelector("[data-welcome-font]");
  const welcomeColorInput = document.querySelector("[data-welcome-color]");
  const departureMessageInput = document.querySelector("[data-departure-message]");
  const welcomeLiveMessage = document.querySelector("[data-welcome-live-message]");
  const departureLiveMessage = document.querySelector("[data-departure-live-message]");
  const welcomeCard = document.querySelector("[data-welcome-card]");
  const departureCard = document.querySelector("[data-departure-card]");
  const departureMemberName = document.querySelector("[data-departure-member-name]");

  function syncWelcomePreview() {
    if (welcomeLiveMessage) {
      welcomeLiveMessage.textContent = welcomeMessageInput?.value.trim() || "Bienvenue nom du membre sur @serveur !";
    }
    if (departureLiveMessage) {
      departureLiveMessage.textContent = departureMessageInput?.value.trim() || "Au revoir nom du membre.";
    }
    if (departureMemberName) {
      departureMemberName.textContent = "nom du membre";
    }
    if (welcomeCard && welcomeBgInput?.value.trim()) {
      welcomeCard.style.backgroundImage = `linear-gradient(90deg, rgba(19, 15, 70, 0.58), rgba(42, 94, 255, 0.72)), url("${welcomeBgInput.value.trim()}")`;
    }
    if (departureCard && welcomeBgInput?.value.trim()) {
      departureCard.style.backgroundImage = `linear-gradient(90deg, rgba(70, 15, 32, 0.58), rgba(42, 94, 255, 0.62)), url("${welcomeBgInput.value.trim()}")`;
    }
    if (welcomeCard && welcomeFontSelect?.value) {
      welcomeCard.style.fontFamily = `${welcomeFontSelect.value}, Inter, sans-serif`;
    }
    if (departureCard && welcomeFontSelect?.value) {
      departureCard.style.fontFamily = `${welcomeFontSelect.value}, Inter, sans-serif`;
    }
    if (welcomeCard && welcomeColorInput?.value) {
      welcomeCard.style.setProperty("--welcome-title-color", welcomeColorInput.value);
    }
    if (departureCard && welcomeColorInput?.value) {
      departureCard.style.setProperty("--welcome-title-color", welcomeColorInput.value);
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
      <input type="text" value="" placeholder="ID du rôle ou @rôle" list="dashboardRoleOptions">
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

  document.querySelector("[data-recurring-list]")?.addEventListener("click", async (event) => {
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
    if (selectedServer.id && selectedServer.installed) {
      await saveCurrentChanges("🗑️ Message récurrent supprimé du bot");
    } else {
      showToast("🗑️ Message récurrent supprimé localement");
    }
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

    testButton?.addEventListener("click", async () => {
      const link = linkInput?.value.trim();
      const channel = channelInput?.value.trim();
      if (!link || !channel) {
        showToast(`⚠️ Ajoute le lien ${platform} et l'ID du salon`);
        return;
      }
      if (!selectedServer.id || !selectedServer.installed) {
        showToast("🔗 Le serveur actif n'est pas encore relié au bot côté dashboard");
        return;
      }
      if (hasUnsavedChanges && dirtyPanelName === "socials") {
        const saved = await saveCurrentChanges(`💾 Relais ${platform} enregistré`);
        if (!saved) return;
      }
      try {
        await modbotApiFetch(`/api/guilds/${selectedServer.id}/socials/test`, {
          method: "POST",
          body: JSON.stringify({ platform, link, channel_id: channel })
        });
        showToast(`🧪 Test ${platform} envoyé dans le salon ${channel}`);
      } catch (error) {
        showToast(`⚠️ Test ${platform} impossible : ${error.message || "connexion bot indisponible"}`);
      }
    });
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
