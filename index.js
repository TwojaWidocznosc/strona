var btn = document.querySelectorAll(".option-buttons button.btn")
var socialButtons = document.querySelectorAll("#oferty div.social-buttons button.btn")
var packages = document.querySelectorAll("#oferty .offer-card")


let offersData = [];

async function loadOffers() {
  const res = await fetch("offers.json");
  offersData = await res.json();
}


loadOffers().then(() => {
    socialButtons.forEach(button => {
        button.addEventListener("click", function(activeButton) {
            changeOffer(activeButton.srcElement, socialButtons)
        })
    })
    btn.forEach(element => {
        element.addEventListener("click", function(e) {
            changeOffer(e.srcElement, btn)
        })
    });
});


function changeOffer(button, buttonsArray) {
    
    let socialButtons = document.querySelector("#oferty div.social-buttons")
    let packages = document.querySelector(".packages")
    packages.innerHTML = ""

    buttonsArray.forEach(element => {
        // console.log(element)
        element.classList.remove = "active"
    })
    button.classList.add = "active"
    
    if(button.id == "strony"){
        socialButtons.classList.remove("active")
        
        const siteOffers = offersData.find(x => x.id === "site").offers;
        
        siteOffers.forEach(offer => {
            const featuresHTML = offer.features.join("")
            const badgeHTML = offer.popular ? '<div class="badge">Najczęściej wybierane</div>' : ""

            packages.innerHTML += `
                <div class="offer-card">
                    ${badgeHTML}
                    <div class="title">${offer.label}</div>
                    <div class="price">${offer.price}</div>
                    <ul class="desc">${featuresHTML}</ul>
                    <a href="#" class="btn btn-primary">Więcej</a>
                </div>`
        })
    }
    if(button.id == "socialmedia"){
        socialButtons.classList.add("active")

        const siteOffers = offersData.find(x => x.id === "socialmedia").types.find(x => x.id === "instagram").offers;
        
        siteOffers.forEach(offer => {
            const featuresHTML = offer.features.join("")
            const badgeHTML = offer.popular ? '<div class="badge">Najczęściej wybierane</div>' : ""

            packages.innerHTML += `
                <div class="offer-card">
                    ${badgeHTML}
                    <div class="title">${offer.label}</div>
                    <div class="price">${offer.price}</div>
                    <ul class="desc">${featuresHTML}</ul>
                    <a href="#" class="btn btn-primary">Więcej</a>
                </div>`
        })
    }
    if(button.id == "niewiem"){
        socialButtons.classList.remove("active")

        const siteOffers = offersData.find(x => x.id === "other").offers;
        
        siteOffers.forEach(offer => {
            const featuresHTML = offer.features.join("")
            const badgeHTML = offer.popular ? '<div class="badge">Najczęściej wybierane</div>' : ""

            packages.innerHTML += `
                <div class="offer-card">
                    ${badgeHTML}
                    <div class="title">${offer.label}</div>
                    <div class="price">${offer.price}</div>
                    <ul class="desc">${featuresHTML}</ul>
                    <a href="#" class="btn btn-primary">Więcej</a>
                </div>`
        })
    }

    if(button.id == "IG"){
        const siteOffers = offersData.find(x => x.id === "socialmedia").types.find(x => x.id === "instagram").offers;
        
        siteOffers.forEach(offer => {
            const featuresHTML = offer.features.join("")
            const badgeHTML = offer.popular ? '<div class="badge">Najczęściej wybierane</div>' : ""

            packages.innerHTML += `
                <div class="offer-card">
                    ${badgeHTML}
                    <div class="title">${offer.label}</div>
                    <div class="price">${offer.price}</div>
                    <ul class="desc">${featuresHTML}</ul>
                    <a href="#" class="btn btn-primary">Więcej</a>
                </div>`
        })
    }
    if(button.id == "YT"){
        const siteOffers = offersData.find(x => x.id === "socialmedia").types.find(x => x.id === "youtube").offers;
        
        siteOffers.forEach(offer => {
            const featuresHTML = offer.features.join("")
            const badgeHTML = offer.popular ? '<div class="badge">Najczęściej wybierane</div>' : ""

            packages.innerHTML += `
                <div class="offer-card">
                    ${badgeHTML}
                    <div class="title">${offer.label}</div>
                    <div class="price">${offer.price}</div>
                    <ul class="desc">${featuresHTML}</ul>
                    <a href="#" class="btn btn-primary">Więcej</a>
                </div>`
        })
    }
    if(button.id == "TIKTOK"){
        const siteOffers = offersData.find(x => x.id === "socialmedia").types.find(x => x.id === "tiktok").offers;
        
        siteOffers.forEach(offer => {
            const featuresHTML = offer.features.join("")
            const badgeHTML = offer.popular ? '<div class="badge">Najczęściej wybierane</div>' : ""

            packages.innerHTML += `
                <div class="offer-card">
                    ${badgeHTML}
                    <div class="title">${offer.label}</div>
                    <div class="price">${offer.price}</div>
                    <ul class="desc">${featuresHTML}</ul>
                    <a href="#" class="btn btn-primary">Więcej</a>
                </div>`
        })
    }
}

function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("active");
}

function ctaScroll(type) {
    document.getElementById("oferty").scrollIntoView({  behavior: 'smooth', block: "start" })
    if (type == "page") {
        changeOffer(document.getElementById("strony"))
    } else if (type == "social") {
        changeOffer(document.getElementById("socialmedia"))
    }
}

