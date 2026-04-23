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

    // --- Google Ads Conversion Fix: Redirect to Thank You Page ---
    document.addEventListener('click', function(e) {
        var el = e.target;
        while (el && el.tagName !== 'A') el = el.parentNode;
        
        if (el && el.href && el.href.indexOf('forms.gle') !== -1) {
            var isSpanish = window.location.href.indexOf('-es') !== -1;
            var thanksPage = isSpanish ? 'thanks-es.html' : 'thanks.html';
            
            setTimeout(function() {
                window.location.href = thanksPage;
            }, 600);
        }
    });
});
