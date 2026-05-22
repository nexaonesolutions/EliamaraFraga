/* ==========================================================================
   REISCLINIC CLIENT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Dynamic Navbar Scroll Effect --- */
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load


    /* --- 2. Mobile Drawer Navigation --- */
    const menuToggle = document.getElementById('menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        const isOpen = mobileDrawer.classList.contains('open');
        if (isOpen) {
            mobileDrawer.classList.remove('open');
            navbar.classList.remove('menu-open');
        } else {
            mobileDrawer.classList.add('open');
            navbar.classList.add('menu-open');
        }
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking on nav link or background
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.remove('open');
            navbar.classList.remove('menu-open');
        });
    });


    /* --- 3. Interactive Before/After Comparison Slider --- */
    const sliderContainer = document.querySelector('.comparison-container');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const imageAfterOverlay = document.getElementById('image-after-overlay');
    const sliderHandle = document.getElementById('slider-handle');

    if (sliderWrapper && imageAfterOverlay && sliderHandle) {
        let isDragging = false;

        const updateSlider = (clientX) => {
            const rect = sliderWrapper.getBoundingClientRect();
            // Get position of drag within the element, bounded [0, width]
            let positionX = clientX - rect.left;
            
            if (positionX < 0) positionX = 0;
            if (positionX > rect.width) positionX = rect.width;

            // Translate into percentage
            const percentage = (positionX / rect.width) * 100;

            // Apply updates
            imageAfterOverlay.style.width = `${100 - percentage}%`;
            sliderHandle.style.left = `${percentage}%`;
        };

        // Desktop Mouse Drag Events
        sliderHandle.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault();
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            updateSlider(e.clientX);
        });

        // Mobile Touch Drag Events (Responsive support)
        sliderHandle.addEventListener('touchstart', (e) => {
            isDragging = true;
        }, { passive: true });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            if (e.touches && e.touches[0]) {
                updateSlider(e.touches[0].clientX);
            }
        });

        // Allow clicking anywhere inside the slider to jump to that point
        sliderWrapper.addEventListener('click', (e) => {
            // Avoid conflict with handle drag start
            if (e.target.closest('#slider-handle')) return;
            updateSlider(e.clientX);
        });

        // Responsive handling - Keep overlay image dimensions scaled correctly
        const resizeImageOverlay = () => {
            const rect = sliderWrapper.getBoundingClientRect();
            const img = imageAfterOverlay.querySelector('img');
            if (img) {
                img.style.width = `${rect.width}px`;
            }
        };
        
        window.addEventListener('resize', resizeImageOverlay);
        resizeImageOverlay(); // Run on load
    }


    /* --- 4. Interactive Accordion (FAQ) --- */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const faqAnswer = question.nextElementSibling;
            const isOpen = faqItem.classList.contains('active');

            // Close all other open accordion panels first for clean aesthetic UI
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle current panel
            if (isOpen) {
                faqItem.classList.remove('active');
                faqAnswer.style.maxHeight = null;
            } else {
                faqItem.classList.add('active');
                // Calculate real height of scrollable element
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
            }
        });
    });


    /* --- 5. Scroll Reveal Animation --- */
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Remove element from observer once animation has played
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Element is 10% visible
        rootMargin: '0px 0px -50px 0px' // Reveal slightly before it fully rolls into screen
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});
