const site_serviceType_btn_array = document.querySelectorAll("#site #service-type button.seg-btn")
const site_serviceType_slider = document.querySelector("#site #service-type .slider")
let offersCards = document.querySelector("#site .offers-cards")

// set segmented buttons width
site_serviceType_slider.style.width = `calc(${100 / site_serviceType_btn_array.length}% - 8px)`

let offersData = [];

async function loadOffers() {
    const res = await fetch("offers.json");
    offersData = await res.json();
}

function offerChange(clickedButton, slider, offersCards, btn_array, index) {
    slider.style.left = `calc(${(100 / btn_array.length) * index}% + 4px)`

    offersCards.innerHTML = ""
    
    if (clickedButton.id == "site") {
        const siteOffers = offersData.find(x => x.id === "site").offers;

        siteOffers.forEach(offer => {
            const featuresHTML = offer.features.join("")
            const badgeHTML = offer.popular ? '<div class="popular">🔥Popularne</div>' : "" 
            offersCards.innerHTML += `
                <div class="offer-card">
                    <div class="group">
                        <div class="title">${offer.label} ${badgeHTML}</div>
                        <div class="desc">${offer.description}</div>
                    </div>
                    <div class="group">
                        <div class="price">${offer.price}</div>
                        <a href="#" class="btn btn-primary">Więcej</a>
                    </div>
                </div>`
        })
    }
    if (clickedButton.id == "site_support") {
        const site_supportOffers = offersData.find(x => x.id === "site_support").offers;
        
        site_supportOffers.forEach(offer => {
            const featuresHTML = offer.features.join("")
            const badgeHTML = offer.popular ? '<div class="popular">🔥Popularne</div>' : "" 
            offersCards.innerHTML += `
                <div class="offer-card">
                    <div class="group">
                        <div class="title">${offer.label} ${badgeHTML}</div>
                        <div class="desc">${offer.description}</div>
                    </div>
                    <div class="group">
                        <div class="price">${offer.price}</div>
                        <a href="#" class="btn btn-primary">Więcej</a>
                    </div>
                </div>`
        })
    }
}

loadOffers().then(() => {
    site_serviceType_btn_array.forEach((btn, index) => {
        btn.addEventListener("click", function(clickedButton) {
            offerChange(clickedButton.srcElement, site_serviceType_slider, offersCards, site_serviceType_btn_array, index)
        })
    });
});



// const optionType_btn_array = document.querySelectorAll("#service-type button.seg-btn")
// const optionType_slider = document.querySelector("#service-type .slider")
// optionType_slider.style.width = `calc(${100 / optionType_btn_array.length}% - 8px)`

// const optionSocial_btn_array = document.querySelectorAll("#option-social button.seg-btn")
// const optionSocial_slider = document.querySelector("#option-social .slider")

// var packages = document.querySelectorAll("#oferty .offer-card")

// let offersData = [];

// async function loadOffers() {
//     const res = await fetch("offers.json");
//     offersData = await res.json();
// }


// loadOffers().then(() => {
//     optionSocial_btn_array.forEach(button => {
//         button.addEventListener("click", function(activeButton) {
//             changeOffer(activeButton.srcElement, optionSocial_btn_array, index, optionSocial_slider)
//         })
//     })
//     optionType_btn_array.forEach((element, index) => {
//         element.addEventListener("click", function(activeButton) {
//             changeOffer(activeButton.srcElement, optionType_btn_array, index, optionType_slider)
//         })
//     });
// });


// function changeOffer(button, buttonsArray, index, slider) {
    
//     let socialButtons = document.querySelector("#oferty #option-social")
//     let packages = document.querySelector(".packages")
//     packages.innerHTML = ""

//     buttonsArray.forEach(element => {
//         // console.log(element)
//         element.classList.remove("active")
//     })
//     button.classList.add("active")
//     slider.style.left = `calc(${(100 / buttonsArray.length) * index}% + 4px)`
//     slider.style.width = `calc(${100 / buttonsArray.length}% - 8px)`
    
//     if(button.id == "site"){
//         socialButtons.classList.remove("active")
        
//         const siteOffers = offersData.find(x => x.id === "site").offers;
        
//         siteOffers.forEach(offer => {
//             const featuresHTML = offer.features.join("")
//             const badgeHTML = offer.popular ? '<div class="badge">Najczęściej wybierane</div>' : ""

//             packages.innerHTML += `
//                 <div class="offer-card">
//                     ${badgeHTML}
//                     <div class="title">${offer.label}</div>
//                     <div class="price">${offer.price}</div>
//                     <ul class="desc">${featuresHTML}</ul>
//                     <a href="#" class="btn btn-primary">Więcej</a>
//                 </div>`
//         })
//     }
//     if(button.id == "socialmedia"){
//         socialButtons.classList.add("active")

//         const siteOffers = offersData.find(x => x.id === "socialmedia").types.find(x => x.id === "instagram").offers;
        
//         siteOffers.forEach(offer => {
//             const featuresHTML = offer.features.join("")
//             const badgeHTML = offer.popular ? '<div class="badge">Najczęściej wybierane</div>' : ""

//             packages.innerHTML += `
//                 <div class="offer-card">
//                     ${badgeHTML}
//                     <div class="title">${offer.label}</div>
//                     <div class="price">${offer.price}</div>
//                     <ul class="desc">${featuresHTML}</ul>
//                     <a href="#" class="btn btn-primary">Więcej</a>
//                 </div>`
//         })
//     }
//     if(button.id == "other"){
//         socialButtons.classList.remove("active")

//         const siteOffers = offersData.find(x => x.id === "other").offers;
        
//         siteOffers.forEach(offer => {
//             const featuresHTML = offer.features.join("")
//             const badgeHTML = offer.popular ? '<div class="badge">Najczęściej wybierane</div>' : ""

//             packages.innerHTML += `
//                 <div class="offer-card">
//                     ${badgeHTML}
//                     <div class="title">${offer.label}</div>
//                     <div class="price">${offer.price}</div>
//                     <ul class="desc">${featuresHTML}</ul>
//                     <a href="#" class="btn btn-primary">Więcej</a>
//                 </div>`
//         })
//     }

//     if(button.id == "instagram"){
//         const siteOffers = offersData.find(x => x.id === "socialmedia").types.find(x => x.id === "instagram").offers;
        
//         siteOffers.forEach(offer => {
//             const featuresHTML = offer.features.join("")
//             const badgeHTML = offer.popular ? '<div class="badge">Najczęściej wybierane</div>' : ""

//             packages.innerHTML += `
//                 <div class="offer-card">
//                     ${badgeHTML}
//                     <div class="title">${offer.label}</div>
//                     <div class="price">${offer.price}</div>
//                     <ul class="desc">${featuresHTML}</ul>
//                     <a href="#" class="btn btn-primary">Więcej</a>
//                 </div>`
//         })
//     }
//     if(button.id == "youtube"){
//         const siteOffers = offersData.find(x => x.id === "socialmedia").types.find(x => x.id === "youtube").offers;
        
//         siteOffers.forEach(offer => {
//             const featuresHTML = offer.features.join("")
//             const badgeHTML = offer.popular ? '<div class="badge">Najczęściej wybierane</div>' : ""

//             packages.innerHTML += `
//                 <div class="offer-card">
//                     ${badgeHTML}
//                     <div class="title">${offer.label}</div>
//                     <div class="price">${offer.price}</div>
//                     <ul class="desc">${featuresHTML}</ul>
//                     <a href="#" class="btn btn-primary">Więcej</a>
//                 </div>`
//         })
//     }
//     if(button.id == "tiktok"){
//         const siteOffers = offersData.find(x => x.id === "socialmedia").types.find(x => x.id === "tiktok").offers;
        
//         siteOffers.forEach(offer => {
//             const featuresHTML = offer.features.join("")
//             const badgeHTML = offer.popular ? '<div class="badge">Najczęściej wybierane</div>' : ""

//             packages.innerHTML += `
//                 <div class="offer-card">
//                     ${badgeHTML}
//                     <div class="title">${offer.label}</div>
//                     <div class="price">${offer.price}</div>
//                     <ul class="desc">${featuresHTML}</ul>
//                     <a href="#" class="btn btn-primary">Więcej</a>
//                 </div>`
//         })
//     }
// }

function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("active");
}

function ctaScroll(type) {
    document.getElementById("oferty").scrollIntoView({  behavior: 'smooth', block: "start" })
    if (type == "page") {
        // changeOffer(document.getElementById("strony"))
    } else if (type == "social") {
        // changeOffer(document.getElementById("socialmedia"))
    }
}

