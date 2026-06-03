// PARTNER TOGGLE
function togglePartner(el) {
  const p = el.querySelector(".hidden");
  p.style.display = p.style.display === "block" ? "none" : "block";
}

// COMMAND DEMO
function runCmd(cmd) {
  console.log("Commande:", cmd);
}

// ASSISTANT
function toggleAssistant() {
  const panel = document.getElementById("panel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
}

function answer(type) {
  const r = document.getElementById("response");

  const answers = {
    prix: "Offre Standard 20€/an, Sur Mesure 40€/an.",
    obtenir: "Invitez le bot manuellement via l'installation propriétaire.",
    fonctionnalite: "Modération, tickets, stats, annonces et plus.",
    support: "Via notre serveur Discord officiel.",
    partenaires: "VPG Belgique et Virtual French Tournament."
  };

  r.innerText = answers[type];
}

// PARTICLES SIMPLE
const p = document.getElementById("particles");
for(let i=0;i<40;i++){
  const d = document.createElement("div");
  d.style.position="absolute";
  d.style.width="4px";
  d.style.height="4px";
  d.style.background="#8B5CF6";
  d.style.borderRadius="50%";
  d.style.top=Math.random()*100+"%";
  d.style.left=Math.random()*100+"%";
  d.style.opacity=Math.random();
  p.appendChild(d);
}
