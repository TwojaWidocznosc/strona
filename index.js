var btn = document.querySelectorAll(".option-buttons button.btn")
var packages = document.querySelectorAll("#oferty .offer-card")

btn.forEach(element => {
    element.addEventListener("click", function(e) {
        btn.forEach(element => {
            // console.log(element)
            element.classList = "btn btn-unactive"
        })
        e.srcElement.classList = "btn btn-primary"
        if(e.srcElement.id == "strony"){
            let packages = document.querySelector(".packages")
            packages.innerHTML = "" 
            let offers = [
                ["Portfolio", "499 zł", '<li>Podstawowa strona</li> <li class="unactive">Hosting</li> <li>Domena: 1 rok</li> <li class="unactive">SEO</li> <li class="unactive">Podstrony</li> <li>Dostosowanie mobilne</li> <li class="unactive">Baza danych</li>', false], 
                ["Standard", "899 zł", '<li>Podstawowa strona</li> <li class="unactive">Hosting</li> <li>Domena: 1 rok</li> <li>SEO</li> <li>1-2 Podstrony</li> <li>Dostosowanie mobilne</li> <li>Podstawowa baza danych</li>', true], 
                ["Premium", "1499 zł", '<li>Profesjonalna strona</li><li>Hosting: 1 rok</li><li>Domena: 1 rok</li><li>SEO</li><li>5-6 Podstron</li><li>Dostosowanie mobilne</li><li>Baza danych</li>', false]]
            
            offers.forEach(offer => {
                if(offer[3] == true){
                    packages.innerHTML += '<div class="offer-card">  <div class="badge">Najczęściej wybierane</div> <div class="title">'+offer[0]+'</div>  <div class="price">'+offer[1]+'</div> <ul class="desc">'+offer[2]+'</ul>    <a href="" class="btn btn-primary">Więcej</a>   </div>'
                }  else {
                    packages.innerHTML += '<div class="offer-card">   <div class="title">'+offer[0]+'</div>  <div class="price">'+offer[1]+'</div> <ul class="desc">'+offer[2]+'</ul>    <a href="" class="btn btn-primary">Więcej</a>   </div>'
                }
            })
        }
        if(e.srcElement.id == "socialmedia"){
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
        if(e.srcElement.id == "niewiem"){
            let packages = document.querySelector(".packages").innerHTML = "" 
            let offers = [["Konsultacja", "0 zł", "Napisz do nas maila z informacjami o twojej działalności, a my zaproponujemy spersonalizowaną ofertę dla twojej działalności, która przyciągnie największą ilość klientów"]]
            
            offers.forEach(offer => {
                document.querySelector(".packages").innerHTML += '<div class="offer-card">   <div class="title">'+offer[0]+'</div>  <div class="price">'+offer[1]+'</div> <div class="desc">'+offer[2]+'</div>    <a href="" class="btn btn-primary">Kontakt</a>   </div>'
            })
        }
    })
});

function changeOffer(e) {
    btn.forEach(element => {
        // console.log(element)
        element.classList = "btn btn-unactive"
    })
    e.classList = "btn btn-primary"
    if(e.id == "strony"){
        let packages = document.querySelector(".packages")
        packages.innerHTML = "" 
        let offers = [
            ["Portfolio", "499 zł", '<li>Podstawowa strona</li> <li class="unactive">Hosting</li> <li>Domena: 1 rok</li> <li class="unactive">SEO</li> <li class="unactive">Podstrony</li> <li>Dostosowanie mobilne</li> <li class="unactive">Baza danych</li>', false], 
            ["Standard", "899 zł", '<li>Podstawowa strona</li> <li class="unactive">Hosting</li> <li>Domena: 1 rok</li> <li>SEO</li> <li>1-2 Podstrony</li> <li>Dostosowanie mobilne</li> <li>Podstawowa baza danych</li>', true], 
            ["Premium", "1499 zł", '<li>Profesjonalna strona</li><li>Hosting: 1 rok</li><li>Domena: 1 rok</li><li>SEO</li><li>5-6 Podstron</li><li>Dostosowanie mobilne</li><li>Baza danych</li>', false]]
        
        offers.forEach(offer => {
            if(offer[3] == true){
                packages.innerHTML += '<div class="offer-card">  <div class="badge">Najczęściej wybierane</div> <div class="title">'+offer[0]+'</div>  <div class="price">'+offer[1]+'</div> <ul class="desc">'+offer[2]+'</ul>    <a href="" class="btn btn-primary">Więcej</a>   </div>'
            }  else {
                packages.innerHTML += '<div class="offer-card">   <div class="title">'+offer[0]+'</div>  <div class="price">'+offer[1]+'</div> <ul class="desc">'+offer[2]+'</ul>    <a href="" class="btn btn-primary">Więcej</a>   </div>'
            }
        })
    }
    if(e.id == "socialmedia"){
        let packages = document.querySelector(".packages")
        packages.innerHTML = ""  
        let offers = [["IG Start", "149 zł/msc", "", false], ["IG Normal", "199 zł/msc", "", true], ["IG Boost", "399 zł/msc", "", false], ["IG Pro", "599 zł/msc", "", false]]
        
        offers.forEach(offer => {
            if(offer[3] == true){
                packages.innerHTML += '<div class="offer-card">  <div class="badge">Najczęściej wybierane</div> <div class="title">'+offer[0]+'</div>  <div class="price">'+offer[1]+'</div> <ul class="desc">'+offer[2]+'</ul>    <a href="" class="btn btn-primary">Więcej</a>   </div>'
            }  else {
                packages.innerHTML += '<div class="offer-card">   <div class="title">'+offer[0]+'</div>  <div class="price">'+offer[1]+'</div> <ul class="desc">'+offer[2]+'</ul>    <a href="" class="btn btn-primary">Więcej</a>   </div>'
            }
        })
    }
    if(e.id == "niewiem"){
        let packages = document.querySelector(".packages").innerHTML = "" 
        let offers = [["Konsultacja", "0 zł", "Napisz do nas maila z informacjami o twojej działalności, a my zaproponujemy spersonalizowaną ofertę dla twojej działalności, która przyciągnie największą ilość klientów"]]
        
        offers.forEach(offer => {
            document.querySelector(".packages").innerHTML += '<div class="offer-card">   <div class="title">'+offer[0]+'</div>  <div class="price">'+offer[1]+'</div> <div class="desc">'+offer[2]+'</div>    <a href="" class="btn btn-primary">Kontakt</a>   </div>'
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

