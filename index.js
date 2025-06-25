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

        // Typing effect for the hero slogan
        const sloganElement = document.querySelector('.typing-text');
        const originalSlogan = sloganElement.textContent;
        sloganElement.textContent = ''; // Clear content to start typing
        let charIndex = 0;

        function typeSlogan() {
            if (charIndex < originalSlogan.length) {
                sloganElement.textContent += originalSlogan.charAt(charIndex);
                charIndex++;
                setTimeout(typeSlogan, 70); // Typing speed
            } else {
                sloganElement.classList.remove('typing-text');
            }
        }
        window.addEventListener('load', typeSlogan);

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

        // Universal Modal Logic
        const universalModal = document.getElementById('universal-modal');
        const modalCloseBtn = document.getElementById('modal-close-btn');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        function openModal(title, content) {
            modalTitle.textContent = title;
            modalBody.innerHTML = content;
            universalModal.classList.add('open');
        }

        function closeModal() {
            universalModal.classList.remove('open');
            // Clear content after closing for next use
            setTimeout(() => {
                modalTitle.textContent = '';
                modalBody.textContent = '';
            }, 300); // Allow transition to complete
        }

        modalCloseBtn.addEventListener('click', closeModal);
        universalModal.addEventListener('click', (e) => {
            if (e.target === universalModal) { // Close only if clicking on overlay, not content
                closeModal();
            }
        });

        // Gemini API integration logic for Idea Generator
        const generateIdeaBtn = document.getElementById('generate-idea-btn');
        const ideaInput = document.getElementById('idea-input');
        const ideaBtnText = document.getElementById('idea-btn-text');
        const ideaSpinner = document.getElementById('idea-spinner');

        generateIdeaBtn.addEventListener('click', async () => {
            const industry = ideaInput.value.trim();
            if (!industry) {
                openModal('Błąd Wprowadzania', 'Proszę wpisać opis branży, produktu lub usługi, aby wygenerować pomysł.');
                return;
            }
        
            ideaBtnText.textContent = 'Generowanie...';
            ideaSpinner.classList.remove('hidden');
            generateIdeaBtn.disabled = true;
        
            try {
                const response = await fetch("https://api.twojawidocznosc.online/ai", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ industry })  // tylko industry!
                });
            
                const data = await response.json();
            
                if (data && data.idea) {
                    const formattedText = data.idea.replace(/\n/g, '<br>');
                    const cleaned = data.idea.replace(/```html|```/g, '').trim();
                    openModal('Twój Nowy Pomysł na Stronę!', cleaned);
                } else {
                    openModal('Błąd Generowania', 'Nie udało się wygenerować pomysłu. Spróbuj ponownie.');
                }
            
            } catch (error) {
                console.error("Błąd połączenia z API:", error);
                openModal('Błąd Połączenia', 'Wystąpił problem z serwerem. Spróbuj ponownie później.');
            } finally {
                ideaBtnText.textContent = 'Generuj Pomysł!';
                ideaSpinner.classList.add('hidden');
                generateIdeaBtn.disabled = false;
            }
        });

        // Newsletter Signup Logic
        const newsletterSignupBtn = document.getElementById('newsletter-signup-btn');
        const newsletterEmailInput = document.getElementById('newsletter-email');
        const newsletterRulesAccept = document.getElementById('newsletter-rules-accept');

        newsletterSignupBtn.addEventListener('click', async () => {
            console.log(newsletterRulesAccept)
            if (newsletterRulesAccept.checked == true) {
                const email = newsletterEmailInput.value.trim();
                if (!email || !/\S+@\S+\.\S+/.test(email)) {
                    openModal('Błąd', 'Proszę wpisać poprawny adres e-mail.');
                    return;
                }
    
                const res = await fetch('https://api.twojawidocznosc.online/newsletter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email })
                });
    
                if (res.ok) {
                    openModal('Sukces!', `Dziękujemy za zapisanie się do newslettera, ${email}! Wkrótce otrzymasz od nas pierwsze wiadomości.`);
                    newsletterEmailInput.value = ''; // Clear input field
                } else {
                    openModal('Błąd', `Nie udało się zapisać do newslettera, spróbuj ponownie.`);
                }
            } else {
                openModal('Błąd', 'Wymagana akceptacja regulaminu i polityki prywatności.')
            }
        });

        // Contact Form Submission Logic
        const contactForm = document.getElementById('contact-form');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const subject = document.getElementById('contact-subject').value.trim();
            const message = document.getElementById('contact-message').value.trim();

            if (!name || !email || !subject || !message) {
                openModal('Błąd Wprowadzania', 'Proszę wypełnić wszystkie pola formularza.');
                return;
            }

            if (!/\S+@\S+\.\S+/.test(email)) {
                openModal('Błąd Wprowadzania', 'Proszę wpisać poprawny adres e-mail.');
                return;
            }

            const payload = {
                name: name,
                email: email,
                subject: subject,
                message: message
            };

            const res = await fetch('https://api.twojawidocznosc.online/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        
            if (res.ok) {
                openModal('Wiadomość Wysłana!', `Dziękujemy, ${name}! Twoja wiadomość została do nas wysłana i skontaktujemy się z Tobą wkrótce.`);
                // Clear form fields
                contactForm.reset();
            } else {
                openModal('Błąd', `Wiadomość nie została wysłana, spróbuj ponownie lub rozważ komunikację mailową, przepraszamy.`);
            }


        });


        // FAQ Accordion Logic
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', () => {
                const content = document.getElementById(`accordion-content-${header.dataset.accordion}`);
                const isActive = header.classList.contains('active');

                // Close all other open accordions
                document.querySelectorAll('.accordion-header.active').forEach(openHeader => {
                    if (openHeader !== header) {
                        openHeader.classList.remove('active');
                        document.getElementById(`accordion-content-${openHeader.dataset.accordion}`).classList.remove('open');
                    }
                });

                // Toggle the clicked accordion
                if (!isActive) {
                    header.classList.add('active');
                    content.classList.add('open');
                } else {
                    header.classList.remove('active');
                    content.classList.remove('open');
                }
            });
        });

        // Hamburger Menu Toggle Logic
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const mobileNavMenu = document.getElementById('mobile-nav-menu');

        function toggleMobileMenu() {
            hamburgerMenu.classList.toggle('open');
            mobileNavMenu.classList.toggle('open');
            // Prevent body scrolling when mobile menu is open
            document.body.style.overflow = mobileNavMenu.classList.contains('open') ? 'hidden' : '';
        }

        function closeMobileMenu() {
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

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded')
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptAllButton = document.getElementById('accept-all-cookies');
    const rejectAllButton = document.getElementById('reject-all-cookies');
    const manageCookiesBtn = document.getElementById('manage-cookies-btn');
    const cookiePreferencesModal = document.getElementById('cookie-preferences-modal');
    const closeCookiePreferencesBtn = document.getElementById('close-cookie-preferences');
    const saveCookiePreferencesBtn = document.getElementById('save-cookie-preferences');
    const necessaryCookiesCheckbox = document.getElementById('cookie-necessary');
    const analyticsCookiesCheckbox = document.getElementById('cookie-analytics');
    const marketingCookiesCheckbox = document.getElementById('cookie-marketing');
    const CONSENT_KEY = 'cookie_consent';
    // Function to set a cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
    }
    // Function to get a cookie
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    // Function to load Google Analytics and other trackers
    function loadTrackers(consent) {
        // If analytical cookies are accepted
        if (consent.analytics) {
            // ======== GOOGLE ANALYTICS (Analytics Consent) ========
            document.querySelectorAll('script[src*="googletagmanager"]').forEach(script => script.remove());
            document.querySelectorAll('script').forEach(script => {
                if (script.textContent.includes("gtag('config'")) {
                    script.remove();
                }
            });
            const gaScript = document.createElement('script');
            gaScript.async = true;
            gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-5TNWGGYCWS"; // Replace with your actual GA_MEASUREMENT_ID
            document.head.appendChild(gaScript);
            gaScript.onload = () => {
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-5TNWGGYCWS'); // Replace with your actual GA_MEASUREMENT_ID
                console.log('Google Analytics loaded.');
            };

            // ======== CLARIT (Analytics Consent) ========
            (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "s3k8lgr3qk");
        } else {
            // If analytics are not accepted, ensure GA is not loaded or disable it
            window['ga-disable-G-5TNWGGYCWS'] = true; // Replace with your actual GA_MEASUREMENT_ID
            console.log('Google Analytics disabled.');
        }
        // You can add logic for other marketing/tracking scripts here
        // For example, if you have Facebook Pixel or other marketing scripts
        // ======== META PIXEL (Marketing Consent) ========
        // ======== GOOGLE ADS (Marketing Consent) ========
        if (consent.marketing) {
            // Usuń istniejące skrypty Facebook Pixel, aby uniknąć duplikatów
            document.querySelectorAll('script[src*="connect.facebook.net/en_US/fbevents.js"]').forEach(script => script.remove());
            document.querySelectorAll('script').forEach(script => {
                if (script.textContent.includes("fbq('init'")) {
                    script.remove();
                }
            });
        
            // Kod Meta Pixel
            // Pamiętaj: Użyj swojego prawdziwego ID Pixela!
            !function(f,b,e,v,n,t,s) {
                if(f.fbq)return;n=f.fbq=function(){n.callMethod? n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '1263416628463015');
                fbq('track', 'PageView');
            console.log('Meta Pixel loaded.');
                
                
            // ======== GOOGLE ADS (Marketing Consent) ========
            // Google Ads często używa tej samej biblioteki gtag.js co Google Analytics.
            // Jeśli już masz zainicjalizowane gtag.js dla GA (w bloku analytics),
            // wystarczy dodać konfigurację dla Google Ads.
            // Jeśli Google Ads ma osobny skrypt, dodaj go poniżej.
            // Pamiętaj: Użyj swojego prawdziwego ID konwersji Google Ads!
                
            // Jeśli gtag.js jest już załadowany (np. przez Google Analytics), wystarczy tylko config
            if (typeof gtag === 'function') {
                gtag('config', 'AW-YOUR_CONVERSION_ID'); // Zmień na swój ID konwersji Google Ads
                console.log('Google Ads loaded (via gtag).');
            } else {
                // Jeśli gtag.js nie jest jeszcze załadowane (mniej prawdopodobne, jeśli używasz GA)
                // Możesz załadować je tutaj ponownie lub upewnić się, że ładowanie GA jest wyżej
                // i zawsze następuje przed próbą konfigurowania Google Ads.
                // Dla pewności, można użyć podobnej logiki ładowania skryptu jak dla GA,
                // ale najlepiej jest, aby oba Gtagi były obsługiwane przez jedną instancję.
                const adsScript = document.createElement('script');
                adsScript.async = true;
                adsScript.src = "https://www.googletagmanager.com/gtag/js?id=AW-YOUR_CONVERSION_ID"; // Zmień na swój ID konwersji Google Ads
                document.head.appendChild(adsScript);
                adsScript.onload = () => {
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'AW-YOUR_CONVERSION_ID'); // Zmień na swój ID konwersji Google Ads
                    console.log('Google Ads loaded (separate gtag).');
                };
            }
        
            // Jeśli masz konkretne zdarzenia konwersji Google Ads (np. po wysłaniu formularza),
            // możesz je również umieścić tutaj lub w odpowiednich miejscach w kodzie JS,
            // otoczone tym samym warunkiem `if (consent.marketing)`.
            // Przykładowo:
            // if (typeof gtag === 'function') {
            //     gtag('event', 'conversion', { 'send_to': 'AW-YOUR_CONVERSION_ID/YOUR_CONVERSION_LABEL' });
            // }
        
        
        } else {
            // Jeśli marketing nie jest akceptowany, upewnij się, że Meta Pixel i Google Ads są wyłączone/niezaładowane
            // Dla Meta Pixela, wystarczy nie ładować skryptu i nie wywoływać fbq
            if (typeof fbq === 'function') {
                console.log('Meta Pixel disabled/not loaded.');
                // Nie ma prostego sposobu na "wyłączenie" raz załadowanego Pixela bez ponownego ładowania strony.
                // Najlepszą praktyką jest jego warunkowe ładowanie, co już robimy.
            }
        
            // Dla Google Ads (jeśli korzysta z gtag), można użyć podobnego mechanizmu wyłączenia jak dla GA
            // Pamiętaj: Użyj swojego prawdziwego ID konwersji Google Ads!
            if (window['ga-disable-AW-YOUR_CONVERSION_ID'] !== undefined) { // Sprawdź, czy flaga wyłączenia istnieje
                 window['ga-disable-AW-YOUR_CONVERSION_ID'] = true;
                 console.log('Google Ads disabled.');
            } else {
                 window['ga-disable-AW-YOUR_CONVERSION_ID'] = true; // Ustaw flagę, nawet jeśli gtag jeszcze nie ma
                 console.log('Google Ads disabled.');
            }
        
            console.log('Marketing trackers disabled/not loaded.');
        }
    }
    // Initialize consent state
    function initializeConsent() {
        console.log("initializeConsent")
        const storedConsent = getCookie(CONSENT_KEY); // Using cookie for consent
        if (storedConsent) {
            const consent = JSON.parse(storedConsent);
            loadTrackers(consent);
            hideBanner();
            // Set checkbox states if modal is opened later
            analyticsCookiesCheckbox.checked = consent.analytics;
            marketingCookiesCheckbox.checked = consent.marketing;
        } else {
            showBanner();
        }
    }
    function showBanner() {
        cookieBanner.classList.remove('translate-y-full');
        cookieBanner.classList.add('translate-y-0');
    }
    function hideBanner() {
        cookieBanner.classList.remove('translate-y-0');
        cookieBanner.classList.add('translate-y-full');
    }
    function showPreferencesModal() {
        cookiePreferencesModal.classList.remove('pointer-events-none', 'opacity-0');
        cookiePreferencesModal.classList.add('opacity-100');
        // cookiePreferencesModal.querySelector('div').classList.remove('scale-95');
        // cookiePreferencesModal.querySelector('div').classList.add('scale-100');
        // Set initial checkbox states based on current consent
        const currentConsent = getCookie(CONSENT_KEY);
        if (currentConsent) {
            const consent = JSON.parse(currentConsent);
            analyticsCookiesCheckbox.checked = consent.analytics;
            marketingCookiesCheckbox.checked = consent.marketing;
        } else {
            // Default to unchecked if no consent yet
            analyticsCookiesCheckbox.checked = false;
            marketingCookiesCheckbox.checked = false;
        }
    }
    function hidePreferencesModal() {
        cookiePreferencesModal.classList.remove('opacity-100');
        cookiePreferencesModal.classList.add('opacity-0', 'pointer-events-none');
        // cookiePreferencesModal.querySelector('div').classList.remove('scale-100');
        // cookiePreferencesModal.querySelector('div').classList.add('scale-95');
    }
    // Event Listeners
    acceptAllButton.addEventListener('click', () => {
        const consent = {
            necessary: true,
            analytics: true,
            marketing: true
        };
        setCookie(CONSENT_KEY, JSON.stringify(consent), 365); // Consent for 1 year
        loadTrackers(consent);
        hideBanner();
        alert('Zgody na pliki cookie zostały zaakceptowane.'); // User feedback
    });
    rejectAllButton.addEventListener('click', () => {
        const consent = {
            necessary: true, // Necessary cookies are always on
            analytics: false,
            marketing: false
        };
        setCookie(CONSENT_KEY, JSON.stringify(consent), 365);
        loadTrackers(consent); // Disable trackers
        hideBanner();
        alert('Zgody na pliki cookie zostały odrzucone (z wyjątkiem niezbędnych).'); // User feedback
    });
    manageCookiesBtn.addEventListener('click', () => {
        hideBanner(); // Hide main banner when managing preferences
        showPreferencesModal();
    });
    closeCookiePreferencesBtn.addEventListener('click', () => {
        hidePreferencesModal();
        // Re-show banner if no consent was previously set
        if (!getCookie(CONSENT_KEY)) {
            showBanner();
        }
    });
    saveCookiePreferencesBtn.addEventListener('click', () => {
        const consent = {
            necessary: necessaryCookiesCheckbox.checked,
            analytics: analyticsCookiesCheckbox.checked,
            marketing: marketingCookiesCheckbox.checked
        };
        setCookie(CONSENT_KEY, JSON.stringify(consent), 365);
        loadTrackers(consent);
        hidePreferencesModal();
        alert('Twoje preferencje dotyczące plików cookie zostały zapisane.'); // User feedback
        // Reload page to ensure all scripts are correctly loaded/unloaded based on new consent
        location.reload();
    });
    // Initialize consent state on page load
    initializeConsent();
    // Add "Zarządzaj zgodami na pliki cookie" link to the footer
    const footer = document.querySelector('footer'); // Assuming you have a footer element
    if (footer) {
        const manageConsentLink = document.createElement('li'); // Or a div, depending on your footer structure
        manageConsentLink.innerHTML = `
            <a href="#" id="open-cookie-preferences-footer" class="text-slate-400 hover:text-white transition duration-300">
                Zarządzaj zgodami na pliki cookie
            </a>
        `;
        // Append to an existing ul/nav if available, or directly to footer
        const footerNav = footer.querySelector('ul') || footer; // Try to find a ul, else append to footer directly
        footerNav.appendChild(manageConsentLink);
        document.getElementById('open-cookie-preferences-footer').addEventListener('click', (e) => {
            e.preventDefault();
            showPreferencesModal();
        });
    }
});

        