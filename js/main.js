/* ============================================
   Main JavaScript - CV Website
   ============================================ */

(function() {
    'use strict';

    // ---- DOM Elements ----
    const navbar = document.getElementById('navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.querySelector('.theme-toggle');
    const backToTop = document.querySelector('.back-to-top');
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-links a');

    // ---- Dark Mode ----
    function getTheme() {
        return document.documentElement.getAttribute('data-theme');
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    }

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    // Initialize theme icon on load
    updateThemeIcon(getTheme());

    themeToggle.addEventListener('click', function() {
        const current = getTheme();
        setTheme(current === 'dark' ? 'light' : 'dark');
    });

    // ---- Mobile Navigation ----
    let overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function openNav() {
        navLinks.classList.add('open');
        overlay.classList.add('active');
        document.body.classList.add('nav-open');
        navToggle.querySelector('i').className = 'fas fa-xmark';
    }

    function closeNav() {
        navLinks.classList.remove('open');
        overlay.classList.remove('active');
        document.body.classList.remove('nav-open');
        navToggle.querySelector('i').className = 'fas fa-bars';
    }

    navToggle.addEventListener('click', function() {
        if (navLinks.classList.contains('open')) {
            closeNav();
        } else {
            openNav();
        }
    });

    overlay.addEventListener('click', closeNav);

    navItems.forEach(function(link) {
        link.addEventListener('click', closeNav);
    });

    // ---- Navbar Scroll Effect ----
    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // ---- Back to Top ----
    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Combined scroll handler
    window.addEventListener('scroll', function() {
        handleNavScroll();
        handleBackToTop();
    }, { passive: true });

    // ---- Active Navigation Highlighting ----
    const navObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    });

    sections.forEach(function(section) {
        navObserver.observe(section);
    });

    // ---- Scroll-triggered Animations ----
    const animElements = document.querySelectorAll('.animate-on-scroll');
    const animObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    animElements.forEach(function(el) {
        animObserver.observe(el);
    });

    // ---- Typing Animation ----
    var typedElement = document.querySelector('.typed-text');
    var textToType = 'Civil Engineer & Project Coordinator';
    var charIndex = 0;

    function typeChar() {
        if (charIndex < textToType.length) {
            typedElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 55);
        }
    }

    // Start typing after a short delay
    setTimeout(typeChar, 500);

    // ---- Initialize scroll state ----
    handleNavScroll();
    handleBackToTop();

})();
