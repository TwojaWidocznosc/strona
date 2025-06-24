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

        // Newsletter Signup Logic
        const newsletterSignupBtn = document.getElementById('newsletter-signup-btn');
        const newsletterEmailInput = document.getElementById('newsletter-email');

        newsletterSignupBtn.addEventListener('click', async () => {
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
                openModal('Błąd', `Nie udało się zapisać do newslettera, spróbuj ponownie`);
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

        