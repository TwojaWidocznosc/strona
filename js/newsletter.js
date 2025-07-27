import { openModal } from './modal.js';

// Newsletter Code
const newsletterSignupBtn = document.getElementById('newsletter-signup-btn');
const newsletterEmailInput = document.getElementById('newsletter-email');
const newsletterRulesAccept = document.getElementById('newsletter-rules-accept');

newsletterSignupBtn.addEventListener('click', async () => {
    if (newsletterRulesAccept.checked == true) {
        const email = newsletterEmailInput.value.trim();
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            openModal('Błąd', 'Prosimy wpisać poprawny adres e-mail.');
            return;
        }
        const res = await fetch('https://api.twojawidocznosc.online/newsletter/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        });
        if (res.ok) {
            openModal('Sukces!', `Dziękujemy, że zapisałeś się do naszego newslettera <a class="important">${email}!</a> Oczekuj pierwszych maili, które wspomogą twoją widoczność w sieci.`);
            newsletterEmailInput.value = ''; // Clear input field
        } else {
            openModal(':(', `Nie udało nam się zapisać ciebie do newslettera, spróbuj ponownie lub zgłoś błąd na maila <a class="important">kontakt@twojawidocznosc.online</a> <br> Przepraszamy`);
        }
    } else {
        openModal('Błąd', 'Musisz zaakceptować regulamin i politykę prywatności, żebyśmy mogli cię zapisać do newslettera.')
    }
});