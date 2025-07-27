// Scroll reveal animation
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the element is visible
};
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);
scrollRevealElements.forEach(el => {
    observer.observe(el);
});