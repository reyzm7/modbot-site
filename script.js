console.log("ModBot chargé");

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }

    });

});

cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "0.6s";

    observer.observe(card);

});

document.getElementById("chat-toggle").onclick = () => {

const windowBot = document.getElementById("chat-window");

windowBot.classList.toggle("open");

};

function botReply(type){

const response = document.getElementById("bot-response");

if(type === "installation"){

response.innerHTML =
"Rejoignez notre serveur Discord pour demander l'installation.";

}

if(type === "prix"){

response.innerHTML =
"20€/an pour ModBot Standard et 40€/an pour un bot sur mesure.";

}

if(type === "fonctionnalites"){

response.innerHTML =
"Modération, tickets, statistiques, traduction, suggestions et plus.";

}

}

const button = document.getElementById("assistant-button");
const box = document.getElementById("assistant-box");

if(button && box){

    button.addEventListener("click", () => {

        box.style.display =
            box.style.display === "block"
            ? "none"
            : "block";

    });

}
