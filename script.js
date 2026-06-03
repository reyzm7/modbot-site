/* ═══════════════════════════════════════
   ModBot - script.js
   ═══════════════════════════════════════ */
 
// ─── CURSOR ───────────────────────────────
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');
let trailX = 0, trailY = 0;
let cursorX = 0, cursorY = 0;
 
document.addEventListener('mousemove', e => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
 
function animateTrail() {
  trailX += (cursorX - trailX) * 0.12;
  trailY += (cursorY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();
 
document.querySelectorAll('a, button, .cmd-chip, .quick-q, .partner-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursorTrail.style.width = '56px';
    cursorTrail.style.height = '56px';
    cursorTrail.style.borderColor = 'rgba(0,212,255,0.7)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    cursorTrail.style.width = '36px';
    cursorTrail.style.height = '36px';
    cursorTrail.style.borderColor = 'rgba(0,212,255,0.4)';
  });
});
 
// ─── PARTICLE CANVAS ─────────────────────
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let W, H;
 
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);
 
class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.size = Math.random() * 1.5 + 0.3;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.7 ? '#7c3aed' : '#00d4ff';
    this.pulse = Math.random() * Math.PI * 2;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.pulse += 0.02;
    this.alpha = (Math.sin(this.pulse) * 0.2 + 0.3);
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.fill();
  }
}
 
// Create particles
for (let i = 0; i < 120; i++) particles.push(new Particle());
 
// Lines between nearby particles
function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        const alpha = (1 - dist/100) * 0.06;
        ctx.strokeStyle = `rgba(0,212,255,${alpha})`;
        ctx.globalAlpha = 1;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}
 
function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  ctx.globalAlpha = 1;
  drawLines();
  requestAnimationFrame(animateParticles);
}
animateParticles();
 
// ─── SCROLL REVEAL ────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
 
revealEls.forEach(el => revealObserver.observe(el));
 
// ─── COUNTER ANIMATION ────────────────────
const counterEls = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();
      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
 
counterEls.forEach(el => counterObserver.observe(el));
 
// ─── MOBILE MENU ─────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger?.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
 
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});
 
// ─── DISCORD DEMO ────────────────────────
const discordCommands = {
  '/ban': {
    user: '/ban @TrollUser raison: Spam répété',
    response: null,
    embed: {
      title: '🔨 Utilisateur banni',
      color: '#ff006e',
      fields: [
        { name: 'Utilisateur', value: '@TrollUser' },
        { name: 'Raison', value: 'Spam répété' },
        { name: 'Modérateur', value: '@Admin' },
      ]
    }
  },
  '/warn': {
    user: '/warn @User raison: Langage inapproprié',
    response: null,
    embed: {
      title: '⚠️ Avertissement émis',
      color: '#ffa500',
      fields: [
        { name: 'Utilisateur', value: '@User' },
        { name: 'Avertissements', value: '2/3' },
        { name: 'Raison', value: 'Langage inapproprié' },
      ]
    }
  },
  '/mute': {
    user: '/mute @User durée: 10m',
    response: null,
    embed: {
      title: '🔇 Utilisateur muté',
      color: '#00d4ff',
      fields: [
        { name: 'Utilisateur', value: '@User' },
        { name: 'Durée', value: '10 minutes' },
        { name: 'Expiration', value: 'Dans 10 min' },
      ]
    }
  },
  '/translate': {
    user: '/translate message: Bonjour tout le monde',
    embed: {
      title: '🌐 Traduction',
      color: '#00d4ff',
      fields: [
        { name: 'Original (FR)', value: 'Bonjour tout le monde' },
        { name: 'Traduit (EN)', value: 'Hello everyone' },
      ]
    }
  },
  '/modstats': {
    user: '/modstats',
    embed: {
      title: '📊 Statistiques de modération',
      color: '#7c3aed',
      fields: [
        { name: 'Bans ce mois', value: '14' },
        { name: 'Avertissements', value: '47' },
        { name: 'Mutes', value: '23' },
        { name: 'Top Modérateur', value: '@AdminPro' },
      ]
    }
  },
  '/serverstats': {
    user: '/serverstats',
    embed: {
      title: '🖥️ Statistiques du serveur',
      color: '#00ff88',
      fields: [
        { name: 'Membres', value: '2 847' },
        { name: 'En ligne', value: '342 🟢' },
        { name: 'Salons', value: '38' },
        { name: 'Boosts', value: '⭐ Niveau 2' },
      ]
    }
  }
};
 
function addDiscordMessage(container, avatar, isBot, username, text, embed) {
  const msg = document.createElement('div');
  msg.className = 'disc-msg';
  const time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
 
  let embedHTML = '';
  if (embed) {
    const fields = embed.fields.map(f =>
      `<div class="disc-embed-field"><strong>${f.name}:</strong> ${f.value}</div>`
    ).join('');
    embedHTML = `
      <div class="disc-embed" style="border-left-color:${embed.color || 'var(--neon-blue)'}">
        <div class="disc-embed-title">${embed.title}</div>
        ${fields}
      </div>`;
  }
 
  msg.innerHTML = `
    <div class="disc-avatar ${isBot ? 'bot' : 'user'}">${avatar}</div>
    <div class="disc-msg-content">
      <div class="disc-msg-header">
        <span class="disc-username ${isBot ? 'bot-name' : ''}">${username}</span>
        <span class="disc-timestamp">Aujourd'hui à ${time}</span>
      </div>
      ${text ? `<div class="disc-text">${text}</div>` : ''}
      ${embedHTML}
    </div>`;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}
 
function showTyping(container) {
  const typing = document.createElement('div');
  typing.className = 'disc-msg';
  typing.id = 'disc-typing';
  typing.innerHTML = `
    <div class="disc-avatar bot">🤖</div>
    <div class="disc-msg-content">
      <div class="disc-msg-header">
        <span class="disc-username bot-name">ModBot</span>
        <span class="disc-timestamp">typing...</span>
      </div>
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>`;
  container.appendChild(typing);
  container.scrollTop = container.scrollHeight;
}
 
document.querySelectorAll('.cmd-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const cmd = chip.dataset.cmd;
    if (!cmd || !discordCommands[cmd]) return;
    const data = discordCommands[cmd];
    const container = document.getElementById('discord-messages');
 
    addDiscordMessage(container, '👤', false, 'Utilisateur', data.user, null);
    showTyping(container);
 
    setTimeout(() => {
      document.getElementById('disc-typing')?.remove();
      addDiscordMessage(container, '🤖', true, 'ModBot', data.response || null, data.embed);
    }, 900);
  });
});
 
const discordInput = document.getElementById('discord-input');
const discordSend = document.getElementById('discord-send');
 
function handleDiscordSend() {
  const val = discordInput.value.trim();
  if (!val) return;
  const container = document.getElementById('discord-messages');
  addDiscordMessage(container, '👤', false, 'Utilisateur', val, null);
 
  showTyping(container);
  setTimeout(() => {
    document.getElementById('disc-typing')?.remove();
    const cmd = Object.keys(discordCommands).find(k => val.startsWith(k));
    if (cmd) {
      const data = discordCommands[cmd];
      addDiscordMessage(container, '🤖', true, 'ModBot', data.response || null, data.embed);
    } else {
      addDiscordMessage(container, '🤖', true, 'ModBot', null, {
        title: '❓ Commande inconnue',
        color: '#ff006e',
        fields: [{ name: 'Aide', value: 'Utilisez /help pour voir toutes les commandes disponibles.' }]
      });
    }
  }, 800);
 
  discordInput.value = '';
}
 
discordSend?.addEventListener('click', handleDiscordSend);
discordInput?.addEventListener('keypress', e => { if (e.key === 'Enter') handleDiscordSend(); });
 
// ─── AI ASSISTANT ────────────────────────
const KB = {
  commandes: `ModBot propose les commandes suivantes : **/ban**, **/kick**, **/mute**, **/warn**, **/translate**, **/modstats** et **/serverstats**. Chaque commande est accessible via le menu de commandes Discord (tapez / pour les voir).`,
  tarifs: `ModBot est disponible en deux formules :\n• **Basique — 20€** : commandes de modération essentielles, logs, protection anti-spam\n• **Premium — 40€** : tout le Basique + IA avancée, statistiques complètes, traduction, support prioritaire`,
  installation: `L'installation de ModBot est simple : invitez le bot sur votre serveur Discord via le lien officiel, configurez les permissions nécessaires, puis utilisez **/setup** pour initialiser le bot. Notre équipe peut vous aider si besoin.`,
  modstats: `La commande **/modstats** affiche les statistiques de modération du serveur : nombre de bans, avertissements, mutes, ainsi que le top modérateur du mois.`,
  serverstats: `La commande **/serverstats** affiche les statistiques générales du serveur : nombre de membres, membres en ligne, nombre de salons et niveau de boost.`,
  translate: `La commande **/translate** permet de traduire un message dans la langue de votre choix directement dans Discord. Exemple : \`/translate message: Bonjour lang: en\``,
  partenaires: `ModBot est partenaire officiel de **VPG Belgique** (compétitions gaming) et **VFT** (tournois gaming). Ces partenariats garantissent une expérience optimale pour les serveurs de jeu compétitif.`,
  support: `Pour obtenir de l'aide, rejoignez notre serveur Discord officiel ou contactez-nous via le formulaire de contact. Les clients Premium bénéficient d'un support prioritaire 24h/24.`,
};
 
function getAIResponse(question) {
  const q = question.toLowerCase();
  if (q.includes('command') || q.includes('slash') || q.includes('/')) return KB.commandes;
  if (q.includes('prix') || q.includes('tarif') || q.includes('coût') || q.includes('combien') || q.includes('€') || q.includes('euro')) return KB.tarifs;
  if (q.includes('install') || q.includes('ajouter') || q.includes('inviter') || q.includes('setup')) return KB.installation;
  if (q.includes('modstats') || q.includes('mod stat')) return KB.modstats;
  if (q.includes('serverstats') || q.includes('server stat')) return KB.serverstats;
  if (q.includes('translat') || q.includes('traduire') || q.includes('traduction')) return KB.translate;
  if (q.includes('partenaire') || q.includes('vpg') || q.includes('vft')) return KB.partenaires;
  if (q.includes('support') || q.includes('aide') || q.includes('help') || q.includes('contact')) return KB.support;
  if (q.includes('ban') || q.includes('kick') || q.includes('mute') || q.includes('warn')) return KB.commandes;
  return `Bonne question ! Je suis ModBot, votre assistant de modération Discord. Vous pouvez me demander des infos sur les **commandes**, les **tarifs**, l'**installation**, nos **partenaires**, ou le **support**. Comment puis-je vous aider ?`;
}
 
function addChatBubble(container, isBot, text) {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${isBot ? 'bot' : 'user'}`;
  const avatar = isBot
    ? `<div class="chat-bubble-avatar bot-bub-avatar">🤖</div>`
    : `<div class="chat-bubble-avatar user-bub-avatar">👤</div>`;
  bubble.innerHTML = `
    ${isBot ? avatar : ''}
    <div class="bubble-text">${text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>')}</div>
    ${!isBot ? avatar : ''}`;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
}
 
function showBotTyping(container) {
  const typing = document.createElement('div');
  typing.className = 'chat-bubble bot';
  typing.id = 'bot-typing';
  typing.innerHTML = `
    <div class="chat-bubble-avatar bot-bub-avatar">🤖</div>
    <div class="bubble-text">
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>`;
  container.appendChild(typing);
  container.scrollTop = container.scrollHeight;
}
 
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send');
const chatArea = document.getElementById('chat-messages');
 
function sendChatMessage(text) {
  if (!text.trim()) return;
  addChatBubble(chatArea, false, text);
  chatInput && (chatInput.value = '');
  showBotTyping(chatArea);
 
  setTimeout(() => {
    document.getElementById('bot-typing')?.remove();
    const response = getAIResponse(text);
    addChatBubble(chatArea, true, response);
  }, 1000 + Math.random() * 600);
}
 
chatSendBtn?.addEventListener('click', () => sendChatMessage(chatInput?.value || ''));
chatInput?.addEventListener('keypress', e => { if (e.key === 'Enter') sendChatMessage(chatInput.value); });
 
document.querySelectorAll('.quick-q').forEach(q => {
  q.addEventListener('click', () => sendChatMessage(q.textContent));
});
 
// ─── SMOOTH NAV SCROLL ────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
 
// ─── NAV ACTIVE STATE ────────────────────
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + sec.id) a.classList.add('active');
      });
    }
  });
});
