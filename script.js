// ASSISTANT
function toggleAssistant() {
  const panel = document.getElementById("panel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
}

function answer(type) {
  const r = document.getElementById("response");

  const answers = {
    prix: "20€/an Standard — 40€/an Sur mesure (installation incluse).",
    obtenir: "Le bot est installé manuellement après achat.",
    fonctionnalite: "Modération, tickets, stats, logs, annonces.",
    support: "Support disponible via le Discord officiel.",
    partenaires: "VPG Belgique & Virtual French Tournament."
  };

  r.innerText = answers[type];
}

// TILT EFFECT (CARDS)
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--x", x + "%");
    card.style.setProperty("--y", y + "%");
  });
});

// SCROLL REVEAL
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
});

document.querySelectorAll(".section, .card, .pricing, .patch").forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(20px)";
  el.style.transition = "0.6s ease";
  observer.observe(el);
});
