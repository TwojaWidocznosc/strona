const activeLine = document.querySelector('.process-timeline-line-active');
const sectionToMonitor = document.getElementById('process-timeline');
const timelineItems = document.querySelectorAll('.process-timeline-item');
function updateTimelineForSection() {
    const sectionRect = sectionToMonitor.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const sectionTotalHeight = sectionRect.height;
    let progress = 0;
    if (sectionRect.top < viewportHeight / 2 && sectionRect.bottom > viewportHeight / 2) {
        const currentScrollPositionInSection = (viewportHeight / 2) - sectionRect.top;
        progress = (currentScrollPositionInSection / sectionTotalHeight) * 100;
    } else if (sectionRect.top >= viewportHeight / 2) {
        progress = 0;
    } else if (sectionRect.bottom <= viewportHeight / 2) {
        progress = 100;
    }
    progress = Math.max(0, Math.min(100, progress));
    activeLine.style.height = `${progress}%`;
    
    timelineItems.forEach(item => {
        if (item.id != "process-timeline-item-first") {
            const itemRect = item.getBoundingClientRect();
            const itemCenterRelativeToSection = (itemRect.top + itemRect.height / 2) - sectionRect.top;   
            const itemCenterPercentageInSection = (itemCenterRelativeToSection / sectionRect.height) * 100;
            const activationTolerance = 5;
            if (progress >= (itemCenterPercentageInSection - activationTolerance)) {
                item.classList.add('active');
                item.classList.add('active-reveal');
            } else {
                item.classList.remove('active');
            }
        }
    });
}
window.addEventListener('scroll', updateTimelineForSection);
document.addEventListener('DOMContentLoaded', updateTimelineForSection);

// Typing effect for the hero slogan with changing words
const sloganElement = document.querySelector('#hero-text-typing');
const words = ['Nowoczesna', 'Oszczędna', 'Wygodna', 'Atrakcyjna'];

// Timing variables for animations (in milliseconds)
const typingSpeed = 80; // Speed of typing each character
const deletingSpeed = 60; // Speed of deleting each character
const pauseBetweenWords = 1400; // Pause after fully typing a word
const pauseBeforeDeleting = 250; // Pause before starting to delete
const pauseAfterDeleting = 150; // Pause after deleting before typing next word

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let currentWord = '';

function typeSlogan() {
    const currentWordText = words[wordIndex];

    if (isDeleting) {
        // Deleting phase
        if (charIndex > 0) {
            currentWord = currentWordText.substring(0, charIndex - 1);
            if (charIndex == 1) {
                sloganElement.textContent = '\u200B';
            } else {
                sloganElement.textContent = currentWord;
            }
            charIndex--;
            setTimeout(typeSlogan, deletingSpeed);
        } else {
            // Move to next word after deleting
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            sloganElement.textContent = '\u200B';
            setTimeout(typeSlogan, pauseAfterDeleting);
        }
    } else {
        // Typing phase
        if (charIndex < currentWordText.length) {
            currentWord = currentWordText.substring(0, charIndex + 1);
            sloganElement.textContent = currentWord;
            charIndex++;
            setTimeout(typeSlogan, typingSpeed);
        } else {
            // Pause before starting to delete
            isDeleting = true;
            setTimeout(typeSlogan, pauseBeforeDeleting + pauseBetweenWords);
        }
    }
}

window.addEventListener('load', () => {
    sloganElement.textContent = ' |';
    typeSlogan();
});

const baseDuration = 200; // Base duration in milliseconds (1 second)
const durationMultiplier = 1; // Additional milliseconds per unit of value

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            element.textContent = end;
        }
    };
    requestAnimationFrame(step);
}

function handlePricingAnimation() {
    const priceElements = document.querySelectorAll('.price-animate');
    const pricingSection = document.querySelector('#pricing');
    const sectionTop = pricingSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.45) {
        priceElements.forEach(element => {
            const targetValue = parseInt(element.getAttribute('data-target'), 10);
            const duration = baseDuration + (targetValue * durationMultiplier);
            if (element.textContent !== targetValue.toString()) {
                animateValue(element, 0, targetValue, duration);
            }
        });
        window.removeEventListener('scroll', handlePricingAnimation);
    }
}
window.addEventListener('load', handlePricingAnimation);
window.addEventListener('scroll', handlePricingAnimation);