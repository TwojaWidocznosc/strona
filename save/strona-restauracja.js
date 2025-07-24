document.addEventListener('DOMContentLoaded', () => {
    const contactInputFirst = document.getElementById('contact-form-input-first');
    const contactInputSecond = document.getElementById('contact-form-input-second');
    const buttons = document.querySelectorAll('.contact-type-btn');

    function updateFormAndActive(selectedButton) {
        buttons.forEach(button => button.classList.remove('active'));
        selectedButton.classList.add('active');

        const type = selectedButton.getAttribute('data-type');
        if (type === 'wycena') {
            contactInputFirst.innerText = 'Twój Adres E-mail:'
            contactInputSecond.innerHTML = 'Wymagania:'
        } else if (type === 'szkic') {
            contactInputFirst.innerText = 'Twój Adres E-mail'
            contactInputSecond.innerText = 'Budżet (Opcojnalny), Wymagania'
        } else if (type === 'wiadomosc') {
            contactInputFirst.innerText = 'Twój Adres E-mail:'
            contactInputSecond.innerText = "Wiadmość"
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => updateFormAndActive(button));
    });

    buttons[0].classList.add('active');
    updateFormAndActive(buttons[0]);
});

// / Carousel logic for "How it works?" section
const stepsData = [
    {
        title: "Krok 1: Wybierz Pakiet",
        description: "Wybierz pakiet, który najlepiej odpowiada potrzebom Twojej restauracji. Oferujemy elastyczne opcje dostosowane do każdego budżetu."
    },
    {
        title: "Krok 2: Dostosuj Menu",
        description: "Prześlij nam swoje menu, a my zajmiemy się resztą! Możesz łatwo aktualizować pozycje, ceny i opisy w dowolnym momencie."
    },
    {
        title: "Krok 3: Projektowanie Strony",
        description: "Nasz zespół stworzy nowoczesną i intuicyjną stronę menu, która idealnie odzwierciedli charakter Twojej restauracji."
    },
    {
        title: "Krok 4: Generowanie Kodu QR",
        description: "Wygenerujemy unikalny kod QR, który Twoi klienci będą mogli zeskanować, aby natychmiast uzyskać dostęp do menu."
    },
    {
        title: "Krok 5: Wdrożenie i Wsparcie",
        description: "Pomożemy Ci wdrożyć cyfrowe menu w Twojej restauracji i zapewnimy pełne wsparcie techniczne, aby wszystko działało płynnie."
    }
];
let currentStepIndex = 0;
const carouselContainer = document.getElementById('carousel-cards-container');
const carouselPrevBtn = document.getElementById('carousel-prev');
const carouselNextBtn = document.getElementById('carousel-next');
function renderCarousel() {
    carouselContainer.innerHTML = ''; // Clear existing cards
    stepsData.forEach((step, index) => {
        const card = document.createElement('div');
        card.classList.add('carousel-card', 'glass-card');
        card.setAttribute('data-index', index);
        card.innerHTML = `
            <h3 class="text-2xl font-semibold mb-3 text-slate-800">${step.title}</h3>
            <p class="text-slate-600">${step.description}</p>
        `;
        // Add click listener to each card
        card.addEventListener('click', () => {
            currentStepIndex = index;
            renderCarousel();
        });
        // Determine class based on position relative to currentStepIndex
        let offset = index - currentStepIndex;
        if (offset > stepsData.length / 2) { 
            offset -= stepsData.length;
        } else if (offset < -stepsData.length / 2) {
            offset += stepsData.length;
        }
        if (offset === 0) {
            card.classList.add('active');
        } else if (offset === -1) {
            card.classList.add('prev-1');
            card.disabled
        } else if (offset === 1) {
            card.classList.add('next-1');
        } else if (offset === -2) {
            card.classList.add('prev-2');
        } else if (offset === 2) {
            card.classList.add('next-2');
        } else if (offset < -2) {
            card.classList.add('hidden-left');
        } else if (offset > 2) {
            card.classList.add('hidden-right');
        }
        carouselContainer.appendChild(card);
    });
}
function navigateCarousel(direction) {
    currentStepIndex = (currentStepIndex + direction + stepsData.length) % stepsData.length;
    renderCarousel();
}
carouselPrevBtn.addEventListener('click', () => navigateCarousel(-1));
carouselNextBtn.addEventListener('click', () => navigateCarousel(1));
renderCarousel();

 // Typing effect for the hero slogan
const sloganElement = document.querySelector('.typing-text');
const originalSlogan = sloganElement.textContent;
sloganElement.textContent = ''; // Clear content to start typing
let charIndex = 0;
function typeSlogan() {
    if (charIndex < originalSlogan.length) {
        sloganElement.textContent += originalSlogan.charAt(charIndex);
        charIndex++;
        setTimeout(typeSlogan, 60); // Typing speed
    } else {
        sloganElement.classList.remove('typing-text');
    }
}
window.addEventListener('load', typeSlogan);