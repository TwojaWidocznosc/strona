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
    buttonsArray.forEach(element => {
        // console.log(element)
        element.classList = "btn btn-unactive"
    })
    button.classList = "btn btn-primary"
    if(button.id == "strony"){
        socialButtons.classList.remove("active")
        let packages = document.querySelector(".packages")
        packages.innerHTML = "" 
        
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
        let socialButtons = document.querySelector("#oferty div.social-buttons")
        socialButtons.classList.add("active")
        let packages = document.querySelector(".packages")
        packages.innerHTML = ""  
        let offers = [
            ["IG Start", "149 zł/msc", "", false], 
            ["IG Normal", "199 zł/msc", "", true], 
            ["IG Boost", "399 zł/msc", "", false], 
            ["IG Pro", "599 zł/msc", "", false]]
        
        offers.forEach(offer => {
            if(offer[3] == true){
                packages.innerHTML += '<div class="offer-card">  <div class="badge">Najczęściej wybierane</div> <div class="title">'+offer[0]+'</div>  <div class="price">'+offer[1]+'</div> <ul class="desc">'+offer[2]+'</ul>    <a href="" class="btn btn-primary">Więcej</a>   </div>'
            }  else {
                packages.innerHTML += '<div class="offer-card">   <div class="title">'+offer[0]+'</div>  <div class="price">'+offer[1]+'</div> <ul class="desc">'+offer[2]+'</ul>    <a href="" class="btn btn-primary">Więcej</a>   </div>'
            }
        })
    }
    if(button.id == "niewiem"){
        let packages = document.querySelector(".packages").innerHTML = "" 
        let offers = [["Konsultacja", "0 zł", "Napisz do nas maila z informacjami o twojej działalności, a my zaproponujemy spersonalizowaną ofertę dla twojej działalności, która przyciągnie największą ilość klientów"]]
        socialButtons.classList.remove("active")
        offers.forEach(offer => {
            document.querySelector(".packages").innerHTML += '<div class="offer-card">   <div class="title">'+offer[0]+'</div>  <div class="price">'+offer[1]+'</div> <div class="desc">'+offer[2]+'</div>    <a href="" class="btn btn-primary">Kontakt</a>   </div>'
        })
    }

    if(button.id == "IG"){
        let packages = document.querySelector(".packages")
        packages.innerHTML = ""  
        let offers = [
            ["IG Start", "149 zł/msc", "", false], 
            ["IG Normal", "199 zł/msc", "", true], 
            ["IG Boost", "399 zł/msc", "", false], 
            ["IG Pro", "599 zł/msc", "", false]]
        
        offers.forEach(offer => {
            if(offer[3] == true){
                packages.innerHTML += '<div class="offer-card">  <div class="badge">Najczęściej wybierane</div> <div class="title">'+offer[0]+'</div>  <div class="price">'+offer[1]+'</div> <ul class="desc">'+offer[2]+'</ul>    <a href="" class="btn btn-primary">Więcej</a>   </div>'
            }  else {
                packages.innerHTML += '<div class="offer-card">   <div class="title">'+offer[0]+'</div>  <div class="price">'+offer[1]+'</div> <ul class="desc">'+offer[2]+'</ul>    <a href="" class="btn btn-primary">Więcej</a>   </div>'
            }
        })
    }
    if(button.id == "YT"){
        let packages = document.querySelector(".packages")
        packages.innerHTML = ""  
        let offers = [
            ["YT Start", "149 zł/msc", "", false], 
            ["YT Normal", "199 zł/msc", "", true], 
            ["YT Boost", "399 zł/msc", "", false], 
            ["YT Pro", "599 zł/msc", "", false]]
        
        offers.forEach(offer => {
            if(offer[3] == true){
                packages.innerHTML += '<div class="offer-card">  <div class="badge">Najczęściej wybierane</div> <div class="title">'+offer[0]+'</div>  <div class="price">'+offer[1]+'</div> <ul class="desc">'+offer[2]+'</ul>    <a href="" class="btn btn-primary">Więcej</a>   </div>'
            }  else {
                packages.innerHTML += '<div class="offer-card">   <div class="title">'+offer[0]+'</div>  <div class="price">'+offer[1]+'</div> <ul class="desc">'+offer[2]+'</ul>    <a href="" class="btn btn-primary">Więcej</a>   </div>'
            }
        })
    }
    if(button.id == "TIKTOK"){
        let packages = document.querySelector(".packages")
        packages.innerHTML = ""  
        let offers = [
            ["IG Start", "149 zł/msc", "", false], 
            ["IG Normal", "199 zł/msc", "", true], 
            ["IG Boost", "399 zł/msc", "", false], 
            ["IG Pro", "599 zł/msc", "", false]]
        
        offers.forEach(offer => {
            if(offer[3] == true){
                packages.innerHTML += '<div class="offer-card">  <div class="badge">Najczęściej wybierane</div> <div class="title">'+offer[0]+'</div>  <div class="price">'+offer[1]+'</div> <ul class="desc">'+offer[2]+'</ul>    <a href="" class="btn btn-primary">Więcej</a>   </div>'
            }  else {
                packages.innerHTML += '<div class="offer-card">   <div class="title">'+offer[0]+'</div>  <div class="price">'+offer[1]+'</div> <ul class="desc">'+offer[2]+'</ul>    <a href="" class="btn btn-primary">Więcej</a>   </div>'
            }
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

