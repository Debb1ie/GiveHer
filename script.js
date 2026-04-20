/* ============================================================
   THE GIVEHER EFFECT — DEVCON MANILA
   script.js
   ============================================================ */

(function() {
    'use strict';

    // ── Dark / Light Mode ─────────────────────────────────────
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const STORAGE_KEY = 'giveher-theme';

    function getStoredTheme() {
        return localStorage.getItem(STORAGE_KEY) || 'light';
    }

    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }

    applyTheme(getStoredTheme());

    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark');
    });

    // ── Navbar Scroll Shadow ───────────────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });

    // ── Mobile Hamburger Menu ──────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', open);
        const spans = hamburger.querySelectorAll('span');
        if (open) {
            spans[0].style.transform = 'translateY(7px) rotate(45deg)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
        } else {
            spans.forEach(s => { s.style.transform = '';
                s.style.opacity = ''; });
        }
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(s => { s.style.transform = '';
                s.style.opacity = ''; });
        });
    });

    // ── Hero Floating Cards Animation ────────────────────────────
    const heroCards = document.querySelectorAll('.hero-card');
    heroCards.forEach((card, i) => {
        card.style.animationDelay = `${i * 0.3}s`;
    });

    // ── Hero Particle Background ────────────────────────────────
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'hero-particles';
        heroSection.appendChild(particleContainer);

        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 6 + 2;
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-duration: ${Math.random() * 10 + 8}s;
                animation-delay: ${Math.random() * 5}s;
            `;
            particleContainer.appendChild(particle);
        }
    }

    // ── Scroll Reveal ──────────────────────────────────────────
    function addReveal() {
        const targets = document.querySelectorAll(
            '.speaker-card, .commute-card, .tl-item, .about-text, .objectives-card, .hero-card, .reg-cta-box, .tip-landmark, .tip-extras, .faq-item, .partner-item, .sponsor-item'
        );
        targets.forEach((el, i) => {
            el.classList.add('reveal');
            el.style.transitionDelay = `${(i % 6) * 0.07}s`;
        });
    }
    addReveal();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ── Active nav link highlight on scroll ───────────────────
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navAnchors.forEach(a => {
                    a.style.color = '';
                    a.style.background = '';
                    if (a.getAttribute('href') === `#${id}`) {
                        a.style.color = 'var(--pink)';
                        a.style.background = 'var(--pink-pale)';
                    }
                });
            }
        });
    }, { threshold: 0.45 });

    sections.forEach(s => sectionObserver.observe(s));

    // ── Smooth back-to-top on brand click ─────────────────────
    document.querySelector('.nav-brand').addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ── Parallax Effect on Hero ─────────────────────────────────
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        if (heroContent && scrolled < 600) {
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroContent.style.opacity = 1 - scrolled * 0.002;
        }
        if (heroVisual && scrolled < 600) {
            heroVisual.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
    }, { passive: true });

    // ── Tilt Effect on Cards ────────────────────────────────────
    document.querySelectorAll('.speaker-card, .commute-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ── Button Ripple Effect ────────────────────────────────────
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${e.clientX - rect.left - size / 2}px;
                top: ${e.clientY - rect.top - size / 2}px;
            `;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ── Timeline Progress Animation ────────────────────────────
    const timelineItems = document.querySelectorAll('.tl-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('tl-visible');
            }
        });
    }, { threshold: 0.2 });
    timelineItems.forEach(item => timelineObserver.observe(item));

    // ── Staggered Title Reveal ──────────────────────────────────
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.classList.add('title-animate');
    }

    // ── Stats Counter Animation (if needed) ────────────────────
    function animateValue(el, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            el.textContent = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // ── Smooth Scroll with Offset ───────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ── Loading Animation ────────────────────────────────────────
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    });

    // ── FAQ Accordion Toggle ─────────────────────────────────────
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ── Lightbox Gallery ───────────────────────────────────────
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    let currentImageIndex = 0;
    let allImages = [];

    function collectAllImages() {
        allImages = [];
        document.querySelectorAll('.highlight-card').forEach((card, index) => {
            const img = card.querySelector('.highlight-img');
            if (img) {
                allImages.push({
                    src: img.src,
                    alt: img.alt,
                    element: card
                });
            }
        });
    }

    function openLightbox(card) {
        collectAllImages();
        const img = card.querySelector('.highlight-img');
        if (!img) return;
        
        currentImageIndex = allImages.findIndex(imgData => imgData.element === card);
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox(event) {
        if (event && event.target !== lightbox && event.target.classList.contains('lightbox')) {
            return;
        }
        if (event && event.target.closest('.lightbox-nav')) {
            return;
        }
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightboxImage() {
        if (allImages[currentImageIndex]) {
            lightboxImg.src = allImages[currentImageIndex].src;
            lightboxCaption.textContent = allImages[currentImageIndex].alt;
        }
    }

    function navigateLightbox(direction) {
        currentImageIndex += direction;
        if (currentImageIndex < 0) {
            currentImageIndex = allImages.length - 1;
        } else if (currentImageIndex >= allImages.length) {
            currentImageIndex = 0;
        }
        updateLightboxImage();
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        }
    });

    console.log('💗 The GiveHER Effect · She is DEVCON × DEVCON Manila');
})();