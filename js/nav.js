// Hamburger Menu Toggle Logic
const hamburgerMenu = document.getElementById('hamburger-menu');
const mobileNavMenu = document.getElementById('mobile-nav-menu');
function toggleMobileMenu() {
    hamburgerMenu.classList.toggle('open');
    mobileNavMenu.classList.toggle('open');
    // Prevent body scrolling when mobile menu is open
    document.body.style.overflow = mobileNavMenu.classList.contains('open') ? 'hidden' : '';
}
export function closeMobileMenu() {
    hamburgerMenu.classList.remove('open');
    mobileNavMenu.classList.remove('open');
    document.body.style.overflow = ''; // Restore body scrolling
}
hamburgerMenu.addEventListener('click', toggleMobileMenu);
// Close mobile menu if clicked outside (on the menu itself)
mobileNavMenu.addEventListener('click', (e) => {
    if (e.target === mobileNavMenu) {
        closeMobileMenu();
    }
});