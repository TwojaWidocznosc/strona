import { closeMobileMenu } from './nav.js';

const mobileNavMenu = document.getElementById('mobile-nav-menu');
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        // Adjust scroll position to account for fixed header
        const headerOffset = document.querySelector('nav').offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset - 20; // Added extra padding
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        // Close mobile menu if open
        if (mobileNavMenu.classList.contains('open')) {
            closeMobileMenu();
        }
    });
});