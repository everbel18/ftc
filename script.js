/**
 * script.js - Lógica del sitio Free Tour Cartagena
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Scroll Effect ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Hamburger Menu ---
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');
    if (hamburger && navbar) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navbar.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navbar.classList.remove('active');
            });
        });
    }



    // --- Testimonials Slider ---
    const slider = document.getElementById('testimonial-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.getElementById('slider-dots');

    if (slider && slides.length > 0) {
        let currentSlide = 0;

        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function updateSlider() {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                dots[i].classList.remove('active');
            });
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');

            // Move the slider horizontally
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        function goToSlide(n) {
            currentSlide = n;
            updateSlider();
        }

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        });

        // Auto-play
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }, 8000);
    }

    // --- Tour Details Modal ---
    const detailsModal = document.getElementById('details-modal');
    const detailsTitle = document.getElementById('details-title');
    const detailsBody = document.getElementById('details-body');

    window.openTourDetails = (button, title) => {
        const card = button.closest('.tour-card');
        const contentHTML = card.querySelector('.tour-more-details').innerHTML;
        const mainImgSrc = card.querySelector('.tour-card-img img').src;
        const modalImgListAttr = card.querySelector('.tour-card-img img').getAttribute('data-modal-img');

        // Unificar imágenes y eliminar duplicados
        let allImages = [mainImgSrc];
        if (modalImgListAttr) {
            const additionalImgs = modalImgListAttr.split(',').map(s => s.trim());
            allImages = [...allImages, ...additionalImgs];
        }

        // Limpiamos URLs
        const uniqueImages = [...new Set(allImages.map(src => {
            return src;
        }))];

        // Determinar idioma para el CTA
        const isEnglish = !window.location.pathname.includes('-es');
        const ctaText = isEnglish ? 'BOOK NOW' : 'RESERVAR AHORA';

        // Construir estructura del Modal
        let thumbsHTML = '';
        if (uniqueImages.length > 1) {
            thumbsHTML = `<div class="modal-details-thumbs">
                ${uniqueImages.map((img, i) => `<img src="${img}" class="${i === 0 ? 'active' : ''}" onclick="changeModalMainImage(this)">`).join('')}
            </div>`;
        }

        const modalHTML = `
            <div class="modal-details-grid">
                <div class="modal-details-image-side">
                    <img src="${uniqueImages[0]}" class="modal-details-main-img" id="modal-main-img" alt="${title}">
                    ${thumbsHTML}
                    <div class="modal-details-cta-wrapper" style="margin-top: 2rem; display: flex; justify-content: center;">
                        <a href="https://forms.gle/qF7ktyChunCXRwVp8" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="text-decoration:none; display:inline-block; text-align:center; width: 100%; padding: 1.2rem; font-size: 1.2rem;">
                            ${ctaText}
                        </a>
                    </div>
                </div>
                <div class="modal-details-content-side">
                    <div class="modal-text" style="text-align: justify;">
                        ${contentHTML}
                    </div>
                </div>
            </div>
        `;

        detailsTitle.innerHTML = title;
        detailsBody.innerHTML = modalHTML;
        detailsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.changeModalMainImage = (thumb) => {
        const mainImg = document.getElementById('modal-main-img');
        const allThumbs = thumb.parentElement.querySelectorAll('img');

        mainImg.src = thumb.src;
        allThumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
    };

    window.closeDetailsModal = () => {
        detailsModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (detailsModal) {
        detailsModal.addEventListener('click', (e) => {
            if (e.target === detailsModal) closeDetailsModal();
        });
    }

    // --- Contact Carousel ---
    const contactCarousel = document.getElementById('contact-carousel');
    const contactSlides = document.querySelectorAll('.contact-slide');
    const contactDotsContainer = document.getElementById('contact-slider-dots');

    if (contactCarousel && contactSlides.length > 0) {
        let currentContactSlide = 0;

        contactSlides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentContactSlide = i;
                updateContactCarousel();
            });
            contactDotsContainer.appendChild(dot);
        });

        const contactDots = contactDotsContainer.querySelectorAll('.dot');

        function updateContactCarousel() {
            contactCarousel.style.transform = `translateX(-${currentContactSlide * 100}%)`;
            contactDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentContactSlide);
            });
        }

        setInterval(() => {
            currentContactSlide = (currentContactSlide + 1) % contactSlides.length;
            updateContactCarousel();
        }, 5000);
    }

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });

                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // --- Promotional Modal Logic ---
    const promoModal = document.getElementById('promo-modal');

    window.closePromoModal = () => {
        if (promoModal) {
            promoModal.classList.remove('active');
            setTimeout(() => {
                promoModal.style.display = 'none';
            }, 500); // Wait for transition
        }
        document.body.style.overflow = '';
    };

    if (promoModal) {
        // Show after 2 seconds on load, but only once per session
        if (!sessionStorage.getItem('promoShown')) {
            setTimeout(() => {
                promoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                sessionStorage.setItem('promoShown', 'true');
            }, 2000);
        } else {
            promoModal.style.display = 'none';
        }

        // Close on overlay click
        promoModal.addEventListener('click', (e) => {
            if (e.target === promoModal) closePromoModal();
        });
    }

    // --- Native Booking Form Logic ---
    const nativeModal = document.getElementById('native-booking-modal');
    const nativeForm = document.getElementById('native-booking-form');

    // --- EXPOSE MODAL FUNCTIONS GLOBALLY ---
    window.openNativeBookingModal = () => {
        if (!nativeModal) return;
        nativeModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Reset and populate
        if (nativeForm) nativeForm.reset();
        populateCountryList();
        updateTourPrice();
        toggleFwtOptions();

        if (!fp) {
            initFlatpickr();
        } else {
            fp.clear();
            refreshFlatpickr();
        }
    };

    window.closeNativeBookingModal = () => {
        if (!nativeModal) return;
        nativeModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "North Korea", "South Korea", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sudan", "South Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];

    const populateCountryList = () => {
        const datalist = document.getElementById('countries-list');
        if (datalist && datalist.options.length === 0) {
            datalist.innerHTML = countries.map(c => `<option value="${c}">`).join('');
        }
    };

    const updateTourPrice = () => {
        const tourSelect = document.getElementById('nb-tour');
        const priceDisplay = document.getElementById('nb-price-display');
        const promoNote = document.getElementById('nb-promo-note');
        const paxInput = document.getElementById('nb-pax');
        const langSelect = document.getElementById('nb-language');
        const isSpanish = (langSelect && langSelect.value === 'Español') || window.location.pathname.includes('-es');

        if (!tourSelect || !priceDisplay || !paxInput || !promoNote) return;

        const pax = parseInt(paxInput.value) || 1;

        const tourPrices = {
            'Free Walking Tour': 0,
            'City Tour': -3,
            'Bazurto Market Food Tour': -7,
            'San Basilio de Palenque Tour': -1,
            'Between Walls and Drums Walking Tour': -5,
            'Black History Private Walking Tour': -6,
            'Cartagena Street Food Tour': -4
        };

        const selectedTour = tourSelect.value;

        // Handle Promo Note and Tiered Pricing for Palenque
        if (selectedTour === 'San Basilio de Palenque Tour') {
            const palenquePricing = isSpanish ? `
                <div style="margin-top:10px; padding:10px; background:rgba(0,110,182,0.05); border-radius:8px; border-left:4px solid #006eb6;">
                    <p style="margin-bottom:5px;"><strong>Precios por persona:</strong></p>
                    <ul style="list-style:none; padding:0; margin:0; font-size:0.9rem;">
                        <li>• 1-4 Personas: $100 USD c/u</li>
                        <li>• 5-7 Personas: $90 USD c/u</li>
                        <li>• 8-10 Personas: $80 USD c/u</li>
                        <li>• 11-14 Personas: $75 USD c/u</li>
                        <li>• 15-20 Personas: $70 USD c/u</li>
                        <li>• 21+ Personas: Cotización especial</li>
                    </ul>
                </div>
                <p style="margin-top:10px;"><strong>PROMO:</strong> ¡Si reservas este tour, obtienes el tour privado de Black History <strong>GRATIS</strong>!</p>
            ` : `
                <div style="margin-top:10px; padding:10px; background:rgba(0,110,182,0.05); border-radius:8px; border-left:4px solid #006eb6;">
                    <p style="margin-bottom:5px;"><strong>Prices per person:</strong></p>
                    <ul style="list-style:none; padding:0; margin:0; font-size:0.9rem;">
                        <li>• 1-4 People: $100 USD each</li>
                        <li>• 5-7 People: $90 USD each</li>
                        <li>• 8-10 People: $80 USD each</li>
                        <li>• 11-14 People: $75 USD each</li>
                        <li>• 15-20 People: $70 USD each</li>
                        <li>• 21+ People: Special quote</li>
                    </ul>
                </div>
                <p style="margin-top:10px;"><strong>PROMO:</strong> If you book this tour, get the Black History Private Tour for <strong>FREE</strong>!</p>
            `;
            promoNote.innerHTML = palenquePricing;
            promoNote.style.display = 'block';
        } else if (selectedTour === 'City Tour') {
            const cityPricing = isSpanish ? `
                <div style="margin-top:10px; padding:10px; background:rgba(0,110,182,0.05); border-radius:8px; border-left:4px solid #006eb6;">
                    <p style="margin-bottom:5px;"><strong>Precios por persona:</strong></p>
                    <ul style="list-style:none; padding:0; margin:0; font-size:0.9rem;">
                        <li>• 1-4 Personas: $70 USD c/u</li>
                        <li>• 5-7 Personas: $60 USD c/u</li>
                        <li>• 8-10 Personas: $55 USD c/u</li>
                        <li>• 11-15 Personas: $50 USD c/u</li>
                        <li>• 16-20 Personas: $45 USD c/u</li>
                        <li>• 21+ Personas: Cotización especial</li>
                    </ul>
                </div>
            ` : `
                <div style="margin-top:10px; padding:10px; background:rgba(0,110,182,0.05); border-radius:8px; border-left:4px solid #006eb6;">
                    <p style="margin-bottom:5px;"><strong>Prices per person:</strong></p>
                    <ul style="list-style:none; padding:0; margin:0; font-size:0.9rem;">
                        <li>• 1-4 People: $70 USD each</li>
                        <li>• 5-7 People: $60 USD each</li>
                        <li>• 8-10 People: $55 USD each</li>
                        <li>• 11-15 People: $50 USD each</li>
                        <li>• 16-20 People: $45 USD each</li>
                        <li>• 21+ People: Special quote</li>
                    </ul>
                </div>
            `;
            promoNote.innerHTML = cityPricing;
            promoNote.style.display = 'block';
        } else if (selectedTour === 'Bazurto Market Food Tour') {
            const bazurtoPricing = isSpanish ? `
                <div style="margin-top:10px; padding:10px; background:rgba(0,110,182,0.05); border-radius:8px; border-left:4px solid #006eb6;">
                    <p style="margin-bottom:5px;"><strong>Precios por persona (Mín. 2):</strong></p>
                    <ul style="list-style:none; padding:0; margin:0; font-size:0.85rem;">
                        <li>• 2 Personas: $50 USD c/u</li>
                        <li>• 3-5 Personas: $45 USD c/u</li>
                        <li>• 6-8 Personas: $40 USD c/u</li>
                        <li>• 9-12 Personas: $35 USD c/u</li>
                        <li>• 13-16 Personas: $30 USD c/u</li>
                    </ul>
                </div>
            ` : `
                <div style="margin-top:10px; padding:10px; background:rgba(0,110,182,0.05); border-radius:8px; border-left:4px solid #006eb6;">
                    <p style="margin-bottom:5px;"><strong>Rate per person (Min. 2):</strong></p>
                    <ul style="list-style:none; padding:0; margin:0; font-size:0.85rem;">
                        <li>• 2 People: $50 USD each</li>
                        <li>• 3-5 People: $45 USD each</li>
                        <li>• 6-8 People: $40 USD each</li>
                        <li>• 9-12 People: $35 USD each</li>
                        <li>• 13-16 People: $30 USD each</li>
                    </ul>
                </div>
            `;
            promoNote.innerHTML = bazurtoPricing;
            promoNote.style.display = 'block';
        } else if (selectedTour === 'Cartagena Street Food Tour') {
            const foodPricing = isSpanish ? `
                <div style="margin-top:10px; padding:10px; background:rgba(255,204,0,0.1); border-radius:8px; border-left:4px solid #ffcc00;">
                    <p style="margin-bottom:5px;"><strong>Precios por persona (Mín. 2):</strong></p>
                    <ul style="list-style:none; padding:0; margin:0; font-size:0.85rem;">
                        <li>• 2 Personas: $40 USD c/u</li>
                        <li>• 3-4 Personas: $37 USD c/u</li>
                        <li>• 5-6 Personas: $34 USD c/u</li>
                        <li>• 7-8 Personas: $32 USD c/u</li>
                        <li>• 9-12 Personas: $30 USD c/u</li>
                        <li>• 13-16 Personas: $28 USD c/u</li>
                        <li>• 17-20 Personas: $26 USD c/u</li>
                    </ul>
                </div>
            ` : `
                <div style="margin-top:10px; padding:10px; background:rgba(255,204,0,0.1); border-radius:8px; border-left:4px solid #ffcc00;">
                    <p style="margin-bottom:5px;"><strong>Rate per person (Min. 2):</strong></p>
                    <ul style="list-style:none; padding:0; margin:0; font-size:0.85rem;">
                        <li>• 2 People: $40 USD each</li>
                        <li>• 3-4 People: $37 USD each</li>
                        <li>• 5-6 People: $34 USD each</li>
                        <li>• 7-8 People: $32 USD each</li>
                        <li>• 9-12 People: $30 USD each</li>
                        <li>• 13-16 People: $28 USD each</li>
                        <li>• 17-20 People: $26 USD each</li>
                    </ul>
                </div>
            `;
            promoNote.innerHTML = foodPricing;
            promoNote.style.display = 'block';
        } else if (selectedTour === 'Between Walls and Drums Walking Tour') {
            const drumsPricing = isSpanish ? `
                <div style="margin-top:10px; padding:10px; background:rgba(0,0,0,0.05); border-radius:8px; border-left:4px solid #333;">
                    <p style="margin-bottom:5px;"><strong>Precios por persona (Mín. 2):</strong></p>
                    <ul style="list-style:none; padding:0; margin:0; font-size:0.85rem;">
                        <li>• 2 Personas: $50 USD c/u</li>
                        <li>• 3-4 Personas: $45 USD c/u</li>
                        <li>• 5-6 Personas: $40 USD c/u</li>
                        <li>• 7-8 Personas: $38 USD c/u</li>
                        <li>• 9-12 Personas: $35 USD c/u</li>
                        <li>• 13-16 Personas: $32 USD c/u</li>
                        <li>• 17-20 Personas: $30 USD c/u</li>
                    </ul>
                </div>
            ` : `
                <div style="margin-top:10px; padding:10px; background:rgba(0,0,0,0.05); border-radius:8px; border-left:4px solid #333;">
                    <p style="margin-bottom:5px;"><strong>Rate per person (Min. 2):</strong></p>
                    <ul style="list-style:none; padding:0; margin:0; font-size:0.85rem;">
                        <li>• 2 People: $50 USD each</li>
                        <li>• 3-4 People: $45 USD each</li>
                        <li>• 5-6 People: $40 USD each</li>
                        <li>• 7-8 People: $38 USD each</li>
                        <li>• 9-12 People: $35 USD each</li>
                        <li>• 13-16 People: $32 USD each</li>
                        <li>• 17-20 People: $30 USD each</li>
                    </ul>
                </div>
            `;
            promoNote.innerHTML = drumsPricing;
            promoNote.style.display = 'block';
        } else if (selectedTour === 'Black History Private Walking Tour') {
            const blackPricing = isSpanish ? `
                <div style="margin-top:10px; padding:10px; background:rgba(0,0,0,0.05); border-radius:8px; border-left:4px solid #000;">
                    <p style="margin-bottom:5px;"><strong>Precios por persona (Mín. 2):</strong></p>
                    <ul style="list-style:none; padding:0; margin:0; font-size:0.85rem;">
                        <li>• 2 Personas: $50 USD c/u</li>
                        <li>• 3-5 Personas: $42 USD c/u</li>
                        <li>• 6-8 Personas: $38 USD c/u</li>
                        <li>• 9-12 Personas: $34 USD c/u</li>
                        <li>• 13-16 Personas: $30 USD c/u</li>
                    </ul>
                    <p style="margin-top:10px; font-size:0.8rem;"><strong>PROMO:</strong> ¡Si reservas Palenque, este tour es <strong>GRATIS</strong>!</p>
                </div>
            ` : `
                <div style="margin-top:10px; padding:10px; background:rgba(0,0,0,0.05); border-radius:8px; border-left:4px solid #000;">
                    <p style="margin-bottom:5px;"><strong>Rate per person (Min. 2):</strong></p>
                    <ul style="list-style:none; padding:0; margin:0; font-size:0.85rem;">
                        <li>• 2 People: $50 USD each</li>
                        <li>• 3-5 People: $42 USD each</li>
                        <li>• 6-8 People: $38 USD each</li>
                        <li>• 9-12 People: $34 USD each</li>
                        <li>• 13-16 People: $30 USD each</li>
                    </ul>
                    <p style="margin-top:10px; font-size:0.8rem;"><strong>PROMO:</strong> If you book Palenque, this tour is <strong>FREE</strong>!</p>
                </div>
            `;
            promoNote.innerHTML = blackPricing;
            promoNote.style.display = 'block';
        } else {
            promoNote.style.display = 'none';
        }

        const priceWrapper = document.getElementById('nb-price-wrapper');
        const paxPriceContainer = document.getElementById('nb-pax-price-container');

        if (selectedTour && tourPrices[selectedTour] !== undefined) {
            const unitPrice = tourPrices[selectedTour];

            // Hide price section for Free Walking Tour
            if (selectedTour === 'Free Walking Tour') {
                if (priceWrapper) priceWrapper.style.display = 'none';
                if (paxPriceContainer) paxPriceContainer.style.gridTemplateColumns = '1fr';
            } else {
                if (priceWrapper) priceWrapper.style.display = 'block';
                if (paxPriceContainer) paxPriceContainer.style.gridTemplateColumns = '1fr 1fr';
            }

            if (unitPrice === 0) {
                priceDisplay.innerText = isSpanish ? 'Gratis / Propinas' : 'Free / Tips';
            } else if (unitPrice === -1) {
                // Tiered pricing for Palenque based on user request
                let total = 0;
                if (pax <= 4) total = 100 * pax;
                else if (pax <= 7) total = 90 * pax;
                else if (pax <= 10) total = 80 * pax;
                else if (pax <= 14) total = 75 * pax;
                else if (pax <= 20) total = 70 * pax;
                else {
                    priceDisplay.innerText = isSpanish ? 'Cotización Especial' : 'Special Quote';
                    return;
                }
                priceDisplay.innerText = `$${total} USD`;
            } else if (unitPrice === -7) {
                // Bazurto Market Food Tour
                let rate = 0;
                if (pax < 2) { priceDisplay.innerText = isSpanish ? 'Mín. 2 pax' : 'Min. 2 guests'; return; }
                else if (pax <= 2) rate = 50;
                else if (pax <= 5) rate = 45;
                else if (pax <= 8) rate = 40;
                else if (pax <= 12) rate = 35;
                else if (pax <= 16) rate = 30;
                else { priceDisplay.innerText = isSpanish ? 'Cotización Especial' : 'Special Quote'; return; }
                priceDisplay.innerText = `$${rate * pax} USD`;
            } else if (unitPrice === -3) {
                // Tiered pricing for City Tour
                let total = 0;
                if (pax <= 4) total = 70 * pax;
                else if (pax <= 7) total = 60 * pax;
                else if (pax <= 10) total = 55 * pax;
                else if (pax <= 15) total = 50 * pax;
                else if (pax <= 20) total = 45 * pax;
                else {
                    priceDisplay.innerText = isSpanish ? 'Cotización Especial' : 'Special Quote';
                    return;
                }
                priceDisplay.innerText = `$${total} USD`;
            } else if (unitPrice === -4) {
                // Cartagena Street Food Tour
                let rate = 0;
                if (pax < 2) { priceDisplay.innerText = isSpanish ? 'Mín. 2 pax' : 'Min. 2 guests'; return; }
                else if (pax <= 2) rate = 40;
                else if (pax <= 4) rate = 37;
                else if (pax <= 6) rate = 34;
                else if (pax <= 8) rate = 32;
                else if (pax <= 12) rate = 30;
                else if (pax <= 16) rate = 28;
                else if (pax <= 20) rate = 26;
                else { priceDisplay.innerText = isSpanish ? 'Cotización Especial' : 'Special Quote'; return; }
                priceDisplay.innerText = `$${rate * pax} USD`;
            } else if (unitPrice === -5) {
                // Between Walls and Drums
                let rate = 0;
                if (pax < 2) { priceDisplay.innerText = isSpanish ? 'Mín. 2 pax' : 'Min. 2 guests'; return; }
                else if (pax <= 2) rate = 50;
                else if (pax <= 4) rate = 45;
                else if (pax <= 6) rate = 40;
                else if (pax <= 8) rate = 38;
                else if (pax <= 12) rate = 35;
                else if (pax <= 16) rate = 32;
                else if (pax <= 20) rate = 30;
                else { priceDisplay.innerText = isSpanish ? 'Cotización Especial' : 'Special Quote'; return; }
                priceDisplay.innerText = `$${rate * pax} USD`;
            } else if (unitPrice === -6) {
                // Black History Tour
                let rate = 0;
                if (pax < 2) { priceDisplay.innerText = isSpanish ? 'Mín. 2 pax' : 'Min. 2 guests'; return; }
                else if (pax <= 2) rate = 50;
                else if (pax <= 5) rate = 42;
                else if (pax <= 8) rate = 38;
                else if (pax <= 12) rate = 34;
                else if (pax <= 16) rate = 30;
                else { priceDisplay.innerText = isSpanish ? 'Cotización Especial' : 'Special Quote'; return; }
                priceDisplay.innerText = `$${rate * pax} USD`;
            } else if (unitPrice === -2) {
                priceDisplay.innerText = isSpanish ? 'Tour Privado' : 'Private Tour';
            } else {
                const total = unitPrice * pax;
                priceDisplay.innerText = `$${total} USD`;
            }
        } else {
            priceDisplay.innerText = '--';
            if (priceWrapper) priceWrapper.style.display = 'block';
            if (paxPriceContainer) paxPriceContainer.style.gridTemplateColumns = '1fr 1fr';
        }
    };

    const toggleFwtOptions = () => {
        const tourSelect = document.getElementById('nb-tour');
        const fwtGroup = document.getElementById('nb-fwt-options-group');
        const fwtTypeSelect = document.getElementById('nb-fwt-type');
        const timeSelect = document.getElementById('nb-time');
        const langSelect = document.getElementById('nb-language');
        const isSpanish = (langSelect && langSelect.value === 'Español') || window.location.pathname.includes('-es');
        const isEnglish = (langSelect && langSelect.value === 'English') || (!isSpanish);

        if (tourSelect && tourSelect.value === 'Free Walking Tour') {
            fwtGroup.style.display = 'block';
            fwtTypeSelect.required = true;

            // Populate sub-options if empty or language changed
            const options = isEnglish ? [
                { val: '9:30 AM - OLD CITY AND GETSEMANÍ', time: '9:30 AM' },
                { val: '10:00 AM - OLD CITY', time: '10:00 AM' },
                { val: '4:00 PM - OLD CITY AND GETSEMANÍ', time: '4:00 PM' },
                { val: '4:00 PM - GETSEMANÍ', time: '4:00 PM' }
            ] : [
                { val: '9:30 AM - CIUDAD AMURALLADA Y GETSEMANÍ', time: '9:30 AM' },
                { val: '2:00 PM - CIUDAD AMURALLADA', time: '2:00 PM' },
                { val: '4:00 PM - CIUDAD AMURALLADA Y GETSEMANÍ', time: '4:00 PM' }
            ];

            const placeholder = isSpanish ? '-- Elige una opción --' : '-- Choose an option --';
            fwtTypeSelect.innerHTML = `<option value="" disabled selected>${placeholder}</option>` +
                options.map(opt => `<option value="${opt.val}" data-time="${opt.time}">${opt.val}</option>`).join('');

            // Ensure calendar updates when sub-option changes
            fwtTypeSelect.onchange = () => {
                refreshFlatpickr();
            };
        } else {
            if (fwtGroup) fwtGroup.style.display = 'none';
            if (fwtTypeSelect) fwtTypeSelect.required = false;
        }
        updateTourPrice();
        refreshFlatpickr();
    };

    /**
     * CUSTOM DATE PICKER (Flatpickr)
     */
    window.blockedDatesList = [];
    const fetchBlockedDates = () => {
        const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzNft1Ig_sfrWNl0Qo8fIXJ3TOptVdnAgCZCiHL0AGTuxfO35dmDVHxv2KJleFFXMQ/exec';
        fetch(WEB_APP_URL + '?action=getBlockedDates', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success' && data.data) {
                    window.blockedDatesList = data.data;
                    if (fp) fp.redraw();
                }
            })
            .catch(err => console.error('Error fetching blocked dates', err));
    };

    let fp = null;
    const initFlatpickr = () => {
        const dateInput = document.getElementById('nb-date');
        if (!dateInput) return;

        const isSpanish = window.location.pathname.includes('-es') || (document.getElementById('nb-language') && document.getElementById('nb-language').value === 'Español');

        fp = flatpickr(dateInput, {
            locale: isSpanish ? "es" : "en",
            minDate: "today",
            dateFormat: "Y-m-d",
            disableMobile: "true",
            disable: [
                function (date) {
                    const tour = document.getElementById('nb-tour').value;
                    const fwtType = document.getElementById('nb-fwt-type') ? document.getElementById('nb-fwt-type').value : "";
                    const day = date.getDay();

                    // Check BLOQUEOS sheet (only for Free Walking Tour)
                    if (tour === 'Free Walking Tour' && window.blockedDatesList && window.blockedDatesList.length > 0) {
                        const dStr = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
                        const checkStr = fwtType.trim().toLowerCase();
                        if (window.blockedDatesList.some(b => b.date === dStr && checkStr.includes(b.matchStr))) {
                            return true;
                        }
                    }

                    // Sunday Restrictions
                    const noSundayTours = [
                        "Bazurto Market Food Tour",
                        "Black History Private Walking Tour",
                        "Cartagena Street Food Tour",
                        "Free Walking Tour Getsemaní Mural Art & Graffiti"
                    ];
                    if (noSundayTours.includes(tour) && day === 0) return true;

                    // Weekday Restrictions (2:00 PM tour and 4:00 PM English)
                    if (fwtType.includes("2:00 PM") && (day === 0 || day === 6)) return true;
                    if (fwtType === "4:00 PM - GETSEMANÍ" && (day === 0 || day === 6)) return true;

                    return false;
                }
            ]
        });
    };

    const refreshFlatpickr = () => {
        if (fp) {
            const isSpanish = window.location.pathname.includes('-es') || (document.getElementById('nb-language') && document.getElementById('nb-language').value === 'Español');
            fp.set("locale", isSpanish ? "es" : "en");
            fp.redraw();

            // Check if currently selected date is now disabled
            if (fp.selectedDates && fp.selectedDates.length > 0) {
                const isNowDisabled = fp.config.disable.some(fn => typeof fn === 'function' && fn(fp.selectedDates[0]));
                if (isNowDisabled) {
                    fp.clear();
                }
            }
        }
    };

    const tourSelect = document.getElementById('nb-tour');
    if (tourSelect) {
        tourSelect.addEventListener('change', toggleFwtOptions);
    }

    const langSelect = document.getElementById('nb-language');
    if (langSelect) {
        langSelect.addEventListener('change', () => {
            toggleFwtOptions();
            refreshFlatpickr();
        });
    }

    const tourSelectEl = document.getElementById('nb-tour');
    if (tourSelectEl) {
        tourSelectEl.addEventListener('change', () => {
            toggleFwtOptions();
            refreshFlatpickr();
        });
    }

    const fwtTypeEl = document.getElementById('nb-fwt-type');
    if (fwtTypeEl) {
        fwtTypeEl.addEventListener('change', refreshFlatpickr);
    }

    const paxInput = document.getElementById('nb-pax');
    if (paxInput) {
        paxInput.addEventListener('input', updateTourPrice);
    }

    if (nativeModal) {
        nativeModal.addEventListener('click', (e) => {
            if (e.target === nativeModal) window.closeNativeBookingModal();
        });
    }

    // Intercept all Booking and Cancellation links
    document.addEventListener('click', function (e) {
        let el = e.target;
        while (el && el.tagName !== 'A') el = el.parentNode;

        if (!el || !el.href) return;

        // 1. Intercept Booking Links (Google Forms links used as buttons)
        if (el.href.indexOf('forms.gle') !== -1 && el.id !== 'cancel-link') {
            e.preventDefault();

            // Auto-select tour logic
            const card = el.closest('.tour-card');
            if (card) {
                const title = card.querySelector('h3').innerText.replace(/\n/g, ' ').trim();
                const tourSelect = document.getElementById('nb-tour');
                if (tourSelect) {
                    if (title.includes('Getsemani') || title.includes('Getsemaní')) {
                        tourSelect.value = 'Free Walking Tour';
                        tourSelect.dispatchEvent(new Event('change'));
                        setTimeout(() => {
                            const fwtTypeSelect = document.getElementById('nb-fwt-type');
                            if (fwtTypeSelect) {
                                for (let i = 0; i < fwtTypeSelect.options.length; i++) {
                                    if (fwtTypeSelect.options[i].value.includes('Getsemani') || fwtTypeSelect.options[i].value.includes('Getsemaní')) {
                                        fwtTypeSelect.selectedIndex = i;
                                        break;
                                    }
                                }
                                fwtTypeSelect.dispatchEvent(new Event('change'));
                            }
                        }, 10);
                    } else if (title.includes('Palenque')) {
                        tourSelect.value = 'San Basilio de Palenque Tour';
                        tourSelect.dispatchEvent(new Event('change'));
                    } else if (title.includes('Old City Free Walking Tour')) {
                        tourSelect.value = 'Free Walking Tour';
                        tourSelect.dispatchEvent(new Event('change'));
                    } else if (title.includes('City Tour')) {
                        tourSelect.value = 'City Tour';
                        tourSelect.dispatchEvent(new Event('change'));
                    }
                }
            }

            window.openNativeBookingModal();
        }

        // 2. Intercept Cancellation Link
        if (el.id === 'cancel-link' || (el.href.indexOf('cancel=true') !== -1 && !el.href.includes('index'))) {
            if (window.openCancelModal) {
                e.preventDefault();
                window.openCancelModal();
            }
        }
    });

    // Handle form submission
    if (nativeForm) {
        nativeForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = document.getElementById('nb-submit-btn');
            const errorMsg = document.getElementById('nb-error-msg');
            errorMsg.style.display = 'none';

            const isSpanish = window.location.href.indexOf('-es') !== -1;
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = isSpanish ? 'Procesando reserva...' : 'Processing booking...';
            submitBtn.disabled = true;

            const whatsappVal = document.getElementById('nb-whatsapp').value;
            const emailVal = document.getElementById('nb-email').value;

            if (!whatsappVal.startsWith('+')) {
                errorMsg.innerText = isSpanish ? 'El número de WhatsApp debe iniciar con +' : 'WhatsApp number must start with +';
                errorMsg.style.display = 'block';
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                return;
            }

            if (!emailVal.includes('@')) {
                errorMsg.innerText = isSpanish ? 'El correo debe incluir @' : 'Email must include @';
                errorMsg.style.display = 'block';
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                return;
            }

            const nationalityVal = document.getElementById('nb-nationality').value;
            if (!countries.includes(nationalityVal)) {
                errorMsg.innerText = isSpanish ? 'Por favor selecciona un país válido de la lista' : 'Please select a valid country from the list';
                errorMsg.style.display = 'block';
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                return;
            }

            // Format date from YYYY-MM-DD to DD/MM/YYYY
            const rawDate = document.getElementById('nb-date').value;
            let formattedDate = rawDate;
            if (rawDate) {
                const parts = rawDate.split('-');
                if (parts.length === 3) {
                    formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
                }
            }

            // Generate a unique ID using the FTC logic from the user's script
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
            const reservationId = `FTC-${year}${month}${day}-${randomSuffix}`;

            const payload = {
                reservationId: reservationId,
                name: document.getElementById('nb-name').value,
                email: emailVal,
                whatsapp: whatsappVal,
                nationality: document.getElementById('nb-nationality').value,
                tour: document.getElementById('nb-tour').value,
                subTour: document.getElementById('nb-tour').value === 'Free Walking Tour' ? document.getElementById('nb-fwt-type').value : '',
                language: document.getElementById('nb-language').value,
                date: formattedDate,
                pax: document.getElementById('nb-pax').value,
                comments: document.getElementById('nb-comments').value
            };

            // The active Web App URL. When the GAS backend is updated to support doPost, this will magically work.
            const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzNft1Ig_sfrWNl0Qo8fIXJ3TOptVdnAgCZCiHL0AGTuxfO35dmDVHxv2KJleFFXMQ/exec';

            fetch(WEB_APP_URL, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        // Redirect to thanks page with the ID to trigger Google Ads Conversion
                        const thanksPage = isSpanish ? 'thanks-es.html' : 'thanks.html';
                        window.location.href = `${thanksPage}?id=${reservationId}`;
                    } else if (data.status === 'blocked') {
                        errorMsg.innerText = isSpanish ? 'El tour que reservaste no está disponible en ese horario. Por favor, cambia la hora, la fecha o la ruta elegida.' : 'The tour you booked is not available at that time. Please change the time, date, or chosen route.';
                        errorMsg.style.display = 'block';
                        submitBtn.innerText = originalBtnText;
                        submitBtn.disabled = false;
                    } else {
                        throw new Error(data.message || 'Unknown error');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    errorMsg.innerText = isSpanish ? 'Hubo un error de conexión. Por favor intenta de nuevo.' : 'Connection error. Please try again.';
                    errorMsg.style.display = 'block';
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

    // --- CANCELLATION MODAL LOGIC ---
    const cancelModal = document.getElementById('cancel-modal');
    const cancelForm = document.getElementById('cancel-form');
    const cancelModalClose = document.getElementById('cancel-modal-close');

    window.openCancelModal = () => {
        if (!cancelModal) return;
        cancelModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeCancelModal = () => {
        if (!cancelModal) return;
        cancelModal.classList.remove('active');
        document.body.style.overflow = '';
        if (cancelForm) {
            cancelForm.reset();
            document.getElementById('cancel-error-msg').style.display = 'none';
            document.getElementById('cancel-success-msg').style.display = 'none';
            document.getElementById('cancel-submit-btn').style.display = 'block';
        }
    };

    if (cancelModalClose) cancelModalClose.addEventListener('click', closeCancelModal);
    if (cancelModal) {
        cancelModal.addEventListener('click', (e) => {
            if (e.target === cancelModal) closeCancelModal();
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('cancel') === 'true') {
        setTimeout(openCancelModal, 500);
    }

    if (cancelForm) {
        cancelForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const submitBtn = document.getElementById('cancel-submit-btn');
            const errorMsg = document.getElementById('cancel-error-msg');
            const successMsg = document.getElementById('cancel-success-msg');
            const reservationId = document.getElementById('cancel-id').value.trim().toUpperCase();
            const isSpanish = window.location.href.indexOf('-es') !== -1;
            const originalBtnText = submitBtn.innerText;

            errorMsg.style.display = 'none';
            submitBtn.innerText = isSpanish ? 'Procesando...' : 'Processing...';
            submitBtn.disabled = true;

            const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzNft1Ig_sfrWNl0Qo8fIXJ3TOptVdnAgCZCiHL0AGTuxfO35dmDVHxv2KJleFFXMQ/exec';

            fetch(WEB_APP_URL, {
                method: 'POST',
                body: JSON.stringify({ action: 'cancel', reservationId: reservationId }),
                headers: { 'Content-Type': 'text/plain;charset=utf-8' }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        successMsg.style.display = 'block';
                        submitBtn.style.display = 'none';
                    } else { throw new Error(data.message || 'ID not found'); }
                })
                .catch(error => {
                    console.error('Error:', error);
                    errorMsg.innerText = isSpanish ? 'No encontramos ese ID de reserva.' : 'Booking ID not found.';
                    errorMsg.style.display = 'block';
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
});
