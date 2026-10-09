document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    const nav = document.querySelector('.nav-minimal');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 2. Prepare text reveals (Wrap text in spans if not already)
    const revealTexts = document.querySelectorAll('.reveal-text:not(.hero-title):not(.section-title)');
    revealTexts.forEach(el => {
        if (!el.querySelector('span')) {
            const text = el.innerHTML;
            el.innerHTML = `<span>${text}</span>`;
        }
    });

    // 3. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                // Optional: unobserve if you only want it to animate once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Elements to observe
    const elementsToReveal = document.querySelectorAll('.reveal-text, .reveal-fade, .reveal-line');
    elementsToReveal.forEach(el => {
        observer.observe(el);
    });

    // 4. Initial Hero Animation
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .reveal-text, .hero .reveal-fade');
        heroElements.forEach(el => el.classList.add('is-revealed'));
    }, 100);

    // 5. Parallax effect on Golden Sphere
    const sphere = document.querySelector('.golden-sphere');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if(sphere) {
            sphere.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    });

    // 6. Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
