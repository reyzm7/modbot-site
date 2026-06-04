if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

const discordInvite = "https://discord.gg/CK8CbFtYuv";
const patchDiscordChannel = "https://discord.com/channels/1510421934435729586/1510440693070430324";

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

  function setCurrentServer(serverName, serverLogo = "assets/default_logo.png", initials = "MB") {
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

  document.querySelectorAll("[data-server-name]").forEach((serverCard) => {
    serverCard.addEventListener("click", () => {
      const cardLogo = serverCard.querySelector("[data-logo-img]");
      const loadedLogo = cardLogo?.currentSrc || cardLogo?.src || serverCard.dataset.serverLogo || "assets/default_logo.png";
      const initials = serverCard.dataset.serverInitials || serverCard.dataset.serverName?.slice(0, 2).toUpperCase() || "MB";
      setCurrentServer(serverCard.dataset.serverName || "Serveur ModBot", loadedLogo, initials);
      showDashboardStage("dashboard");
      showToast(`Serveur sélectionné : ${serverCard.dataset.serverName}`);
    });
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
  initNavigation();
  initHeroCommands();
  initDemo();
  initAssistant();
  initRevealAnimations();
  initDashboard();
});
