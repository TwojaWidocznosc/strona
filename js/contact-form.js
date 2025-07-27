import { openModal } from './modal.js';

// ContactForm Code 
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    if (!email || !message) {
        openModal('Błąd', 'Prosimy o wypełnienie wszystkich pól, abyśmy mogli wysłać twoją wiadomość.');
        return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        openModal('Błąd', 'Prosimy o wpisanie prawidłowego adresu E-mail, abyśmy mogli odpowiedzieć na twoją wiadomość.');
        return;
    }
    const payload = {
        email: email,
        message: message,
        source: window.location.href
    };
    const res = await fetch('https://api.twojawidocznosc.online/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        openModal('Wiadomość Wysłana!', `Dziękujemy, ${name}! Twoja wiadomość została do nas wysłana i skontaktujemy się z Tobą wkrótce.`);
        contactForm.reset();
    } else {
        openModal(':(', `Nie udało nam się wysłać twojej wiadmości, spróbuj ponownie lub wyślij nam maila bezpośrednio na <a class="important">kontakt@twojawidocznosc.online</a> <br> Przepraszamy`);
    }
});