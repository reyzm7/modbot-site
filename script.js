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
