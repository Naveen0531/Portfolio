// ===================================
// NAVEEN BABU KOSURI — PORTFOLIO JS
// Premium Animations & Interactions
// ===================================

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initNavbar();
    initHamburger();
    initSmoothScroll();
    initHeroAnimations();
    initTypewriter();
    initCounters();
    initParticles();
    initScrollAnimations();
    initSkillBars();
    initProjectTilt();
    initScrollProgress();
    updateYear();
});

// ===== CUSTOM CURSOR =====
function initCursor() {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    let mx = -100, my = -100, rx = -100, ry = -100;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
    });

    (function animateRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(animateRing);
    })();

    const hoverEls = document.querySelectorAll('a, button, .project-card, .skill-pill-item, .cloud-tag, .highlight-card');
    hoverEls.forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });

    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0'; ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1'; ring.style.opacity = '1';
    });
}

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');

        // Active nav link
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 120) current = s.id;
        });
        navLinks.forEach(l => {
            l.classList.remove('active');
            if (l.getAttribute('href') === '#' + current) l.classList.add('active');
        });
    });
}

// ===== HAMBURGER =====
function initHamburger() {
    const btn = document.getElementById('hamburger');
    const links = document.getElementById('navLinks');
    if (!btn || !links) return;

    btn.addEventListener('click', () => {
        links.classList.toggle('open');
        const spans = btn.querySelectorAll('span');
        if (links.classList.contains('open')) {
            gsap.to(spans[0], { rotation: 45, y: 7, duration: 0.3 });
            gsap.to(spans[1], { opacity: 0, duration: 0.2 });
            gsap.to(spans[2], { rotation: -45, y: -7, duration: 0.3 });
        } else {
            gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(spans[1], { opacity: 1, duration: 0.2 });
            gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
        }
    });

    document.querySelectorAll('.nav-link').forEach(l => {
        l.addEventListener('click', () => {
            links.classList.remove('open');
        });
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    scrollTo: { y: target, offsetY: 70 },
                    duration: 0.55,
                    ease: 'power2.out',
                    onComplete: () => {
                        // Small delay lets the browser settle before refreshing triggers
                        setTimeout(() => ScrollTrigger.refresh(), 50);
                    }
                });
            }
        });
    });
}

// ===== SCROLL PROGRESS BAR =====
function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        bar.style.width = pct + '%';
    });
}

// ===== HERO ANIMATIONS =====
function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-badge',          { opacity: 0, y: 30, duration: 0.8, delay: 0.3 })
      .from('.title-greeting',      { opacity: 0, y: 30, duration: 0.7 }, '-=0.3')
      .from('.title-name',          { opacity: 0, y: 50, stagger: 0.15, duration: 0.9, ease: 'power4.out' }, '-=0.4')
      .from('.hero-role-wrapper',   { opacity: 0, y: 25, duration: 0.7 }, '-=0.4')
      .from('.hero-tagline',        { opacity: 0, y: 25, duration: 0.7 }, '-=0.4')
      .from('.hero-stats',          { opacity: 0, y: 25, duration: 0.7 }, '-=0.4')
      .from('.hero-cta .btn',       { opacity: 0, y: 25, stagger: 0.15, duration: 0.7 }, '-=0.4')
      .from('.profile-orb',         { scale: 0, opacity: 0, duration: 1.2, ease: 'elastic.out(1,0.5)' }, '-=1.2')
      .from('.floating-badge',      { opacity: 0, scale: 0, stagger: 0.2, duration: 0.6, ease: 'back.out(2)' }, '-=0.6')
      .from('.scroll-indicator',    { opacity: 0, y: 20, duration: 0.6 }, '-=0.3');

    // Hero 3D tilt on mouse
    const card = document.getElementById('heroCard3d');
    if (card) {
        document.addEventListener('mousemove', e => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const rx = (e.clientY - cy) / cy * 8;
            const ry = (e.clientX - cx) / cx * -8;
            gsap.to(card, { rotateX: rx, rotateY: ry, duration: 0.8, ease: 'power2.out', transformPerspective: 800 });
        });
    }

    // Parallax orbs
    gsap.to('.orb-1', { y: 80, scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 2 } });
    gsap.to('.orb-2', { y: -60, scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: 3 } });
}

// ===== TYPEWRITER =====
function initTypewriter() {
    const el = document.getElementById('roleText');
    if (!el) return;
    const roles = ['Data Analyst', 'Python Developer', 'ML Enthusiast', 'Visualization Expert'];
    let ri = 0, ci = 0, deleting = false;

    function type() {
        const current = roles[ri];
        if (!deleting) {
            el.textContent = current.slice(0, ++ci);
            if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
        } else {
            el.textContent = current.slice(0, --ci);
            if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
        }
        setTimeout(type, deleting ? 55 : 80);
    }
    setTimeout(type, 1500);
}

// ===== COUNTERS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    counters.forEach(c => {
        const target = parseInt(c.dataset.count);
        ScrollTrigger.create({
            trigger: c,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to({ val: 0 }, {
                    val: target, duration: 1.8, ease: 'power2.out',
                    onUpdate: function() { c.textContent = Math.round(this.targets()[0].val); }
                });
            }
        });
    });
}

// ===== PARTICLE CANVAS =====
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.3;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = Math.random() > 0.5 ? '#8B5CF6' : '#C084FC';
        }
        update() {
            this.x += this.speedX; this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < 70; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.save();
                    ctx.globalAlpha = (1 - dist / 120) * 0.12;
                    ctx.strokeStyle = '#8B5CF6';
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Section headers — play once, stay visible
    gsap.utils.toArray('.section-header').forEach(el => {
        gsap.from(el.querySelectorAll('.section-label, .section-title, .section-subtitle'), {
            opacity: 0, y: 40, stagger: 0.15, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        });
    });

    // About paragraphs
    gsap.utils.toArray('.about-paragraph').forEach((el, i) => {
        gsap.from(el, {
            opacity: 0, x: -50, duration: 0.8, delay: i * 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true }
        });
    });

    // Highlight cards
    gsap.utils.toArray('.highlight-card').forEach((el, i) => {
        gsap.from(el, {
            opacity: 0, y: 40, scale: 0.92, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true }
        });
    });

    // Timeline
    gsap.utils.toArray('.timeline-item').forEach((el, i) => {
        gsap.from(el, {
            opacity: 0, y: 60, duration: 0.9, delay: i * 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true }
        });
    });

    // Project cards
    gsap.utils.toArray('.project-card').forEach((el, i) => {
        gsap.from(el, {
            opacity: 0, y: 70, scale: 0.95, duration: 0.9, delay: i * 0.15, ease: 'power4.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true }
        });
    });

    // Skill categories
    gsap.utils.toArray('.skill-category').forEach((el, i) => {
        gsap.from(el, {
            opacity: 0, y: 50, duration: 0.8, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true }
        });
    });

    // Cloud tags staggered
    gsap.from('.cloud-tag', {
        opacity: 0, scale: 0.7, stagger: 0.05, duration: 0.5, ease: 'back.out(2)',
        scrollTrigger: { trigger: '.skills-cloud', start: 'top 92%', once: true }
    });

    // Education items
    gsap.utils.toArray('.edu-item').forEach((el, i) => {
        gsap.from(el, {
            opacity: 0, x: i % 2 === 0 ? -50 : 50, duration: 0.8, delay: i * 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true }
        });
    });

    // Achievements banner
    gsap.from('.achievements-banner', {
        opacity: 0, y: 50, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.achievements-banner', start: 'top 92%', once: true }
    });

    // Contact
    gsap.from('.contact-cta-text', {
        opacity: 0, x: -60, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-layout', start: 'top 90%', once: true }
    });
    gsap.utils.toArray('.contact-card').forEach((el, i) => {
        gsap.from(el, {
            opacity: 0, x: 60, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true }
        });
    });
}

// ===== SKILL BARS =====
function initSkillBars() {
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const w = bar.dataset.width + '%';
        ScrollTrigger.create({
            trigger: bar,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to(bar, { width: w, duration: 1.3, ease: 'power2.out', delay: 0.2 });
            }
        });
    });
}

// ===== PROJECT TILT =====
function initProjectTilt() {
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = e.clientX - r.left, y = e.clientY - r.top;
            const rx = (y - r.height / 2) / 14;
            const ry = (r.width / 2 - x) / 14;
            gsap.to(card, { rotateX: rx, rotateY: ry, transformPerspective: 900, duration: 0.4, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
        });
    });
}

// ===== UPDATE YEAR =====
function updateYear() {
    const el = document.getElementById('currentYear');
    if (el) el.textContent = new Date().getFullYear();
}

// ===== WINDOW RESIZE =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
});

// ===== CONSOLE SIGNATURE =====
console.log('%c✨ Naveen Babu Kosuri — Portfolio', 'color:#8B5CF6;font-size:20px;font-weight:900;');
console.log('%c🐍 Data Analyst | Gold Medalist | IEEE Published', 'color:#A78BFA;font-size:13px;');
console.log('%cnaveenbabukosuri@gmail.com', 'color:#C084FC;font-size:12px;');
