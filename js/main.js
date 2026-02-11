/* ============================================
   Premium CV Website - Advanced Interactions
   ============================================ */

(function() {
    'use strict';

    // ---- DOM Elements ----
    var navbar = document.getElementById('navbar');
    var navToggle = document.querySelector('.nav-toggle');
    var navLinks = document.querySelector('.nav-links');
    var themeToggle = document.getElementById('themeToggle');
    var backToTop = document.getElementById('backToTop');
    var sections = document.querySelectorAll('.section');
    var navItems = document.querySelectorAll('.nav-links a');
    var cursorDot = document.getElementById('cursorDot');
    var cursorRing = document.getElementById('cursorRing');

    // ---- Custom Cursor ----
    var mouseX = 0, mouseY = 0;
    var ringX = 0, ringY = 0;
    var isTouch = 'ontouchstart' in window;

    if (!isTouch) {
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateRing() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // Hover effect on interactive elements
        var hoverTargets = document.querySelectorAll('a, button, .skill-tag, .stat-card, .timeline-card, .contact-item, .achievement-card');
        hoverTargets.forEach(function(el) {
            el.addEventListener('mouseenter', function() {
                cursorRing.classList.add('hover');
            });
            el.addEventListener('mouseleave', function() {
                cursorRing.classList.remove('hover');
            });
        });
    }

    // ---- Dark Mode ----
    function getTheme() {
        return document.documentElement.getAttribute('data-theme');
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    themeToggle.addEventListener('click', function() {
        setTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });

    // ---- Mobile Navigation ----
    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function openNav() {
        navLinks.classList.add('open');
        navToggle.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('nav-open');
    }

    function closeNav() {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('nav-open');
    }

    navToggle.addEventListener('click', function() {
        navLinks.classList.contains('open') ? closeNav() : openNav();
    });

    overlay.addEventListener('click', closeNav);
    navItems.forEach(function(link) {
        link.addEventListener('click', closeNav);
    });

    // ---- Navbar Scroll Effect ----
    function handleNavScroll() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }

    // ---- Back to Top ----
    function handleBackToTop() {
        backToTop.classList.toggle('visible', window.scrollY > 500);
    }

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', function() {
        handleNavScroll();
        handleBackToTop();
    }, { passive: true });

    // ---- Active Navigation Highlighting ----
    var navObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var id = entry.target.getAttribute('id');
                navItems.forEach(function(link) {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });

    sections.forEach(function(section) { navObserver.observe(section); });

    // ---- Scroll-triggered Animations ----
    var animElements = document.querySelectorAll('.animate-on-scroll');
    var animObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animObserver.unobserve(entry.target);

                // Trigger counters if stat card
                if (entry.target.classList.contains('stat-card')) {
                    animateCounter(entry.target);
                }

                // Trigger language bars
                var langFills = entry.target.querySelectorAll('.language-fill');
                langFills.forEach(function(fill) {
                    var w = fill.getAttribute('data-width');
                    fill.style.width = w + '%';
                });
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    animElements.forEach(function(el) { animObserver.observe(el); });

    // ---- Animated Counters ----
    function animateCounter(card) {
        var target = parseInt(card.getAttribute('data-count'));
        var suffix = card.getAttribute('data-suffix') || '';
        var numEl = card.querySelector('.stat-number');
        var duration = 2000;
        var start = 0;
        var startTime = null;

        function easeOutExpo(t) {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        }

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var easedProgress = easeOutExpo(progress);
            var current = Math.floor(easedProgress * target);
            numEl.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                numEl.textContent = target + suffix;
            }
        }

        requestAnimationFrame(step);
    }

    // ---- Typing Animation ----
    var typedElement = document.querySelector('.typed-text');
    var phrases = [
        'Civil Engineer & Project Coordinator',
        'Data-Driven Problem Solver',
        'Process Optimization Specialist'
    ];
    var phraseIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typeSpeed = 60;

    function type() {
        var currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 30;
        } else {
            typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 60;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 800);

    // ---- Magnetic Effect ----
    var magneticEls = document.querySelectorAll('.magnetic');
    if (!isTouch) {
        magneticEls.forEach(function(el) {
            el.addEventListener('mousemove', function(e) {
                var rect = el.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
            });

            el.addEventListener('mouseleave', function() {
                el.style.transform = '';
            });
        });
    }

    // ---- Hero Canvas Particles ----
    var canvas = document.getElementById('heroCanvas');
    if (canvas) {
        var ctx = canvas.getContext('2d');
        var particles = [];
        var particleCount = 60;
        var connectDistance = 120;

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        function Particle() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }

        Particle.prototype.update = function() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        };

        Particle.prototype.draw = function() {
            var isDark = getTheme() === 'dark';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? 'rgba(129, 140, 248, 0.5)' : 'rgba(99, 102, 241, 0.35)';
            ctx.fill();
        };

        for (var i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var isDark = getTheme() === 'dark';

            for (var i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (var j = i + 1; j < particles.length; j++) {
                    var dx = particles[i].x - particles[j].x;
                    var dy = particles[i].y - particles[j].y;
                    var dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectDistance) {
                        var alpha = (1 - dist / connectDistance) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = isDark
                            ? 'rgba(129, 140, 248, ' + alpha + ')'
                            : 'rgba(99, 102, 241, ' + alpha + ')';
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }

    // ---- Initialize ----
    handleNavScroll();
    handleBackToTop();

})();
