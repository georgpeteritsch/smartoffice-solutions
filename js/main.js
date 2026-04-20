/* ========================================
   SmartOffice Solutions – JavaScript
   ======================================== */

(function () {
    'use strict';

    // --- Mobile Navigation ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Scroll animations (IntersectionObserver) ---
    var animatedElements = document.querySelectorAll('.pain-card, .service-card, .process-step');

    if ('IntersectionObserver' in window && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    // Stagger animation
                    setTimeout(function () {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        animatedElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show everything immediately
        animatedElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // --- Contact Form Handling ---
    var contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function (e) {
        var formAction = contactForm.getAttribute('action');

        // If Formspree is not configured, prevent submission and show message
        if (formAction.indexOf('IHRE_FORM_ID') !== -1) {
            e.preventDefault();
            showFormSuccess();
            return;
        }

        // Let Formspree handle the submission via fetch for better UX
        e.preventDefault();

        var formData = new FormData(contactForm);

        fetch(formAction, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(function (response) {
            if (response.ok) {
                showFormSuccess();
                contactForm.reset();
            } else {
                alert('Beim Senden ist leider ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail.');
            }
        }).catch(function () {
            alert('Beim Senden ist leider ein Fehler aufgetreten. Bitte prüfen Sie Ihre Internetverbindung.');
        });
    });

    function showFormSuccess() {
        contactForm.innerHTML =
            '<div class="form-success">' +
            '<h3>Vielen Dank!</h3>' +
            '<p>Ihre Nachricht ist angekommen. Wir melden uns schnellstm&ouml;glich bei Ihnen.</p>' +
            '</div>';
    }

})();
