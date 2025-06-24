// Future JavaScript code goes here 

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            if(backToTopButton) backToTopButton.classList.remove('hidden');
        } else {
            if(backToTopButton) backToTopButton.classList.add('hidden');
        }
    });

    if(backToTopButton) {
        backToTopButton.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            console.log('Form submitted:');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Advanced: Staggered section reveal on scroll
    const revealSections = document.querySelectorAll('.section');
    function revealOnScroll() {
        let delay = 0;
        revealSections.forEach((section, idx) => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                setTimeout(() => section.classList.add('visible'), delay);
                delay += 120;
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);

    // Typing animation for hero section
    const typedText = document.getElementById('typed-text');
    const typingPhrases = [
        'Full-Stack Developer',
        'Data Analyst',
        'Tech Enthusiast',
        'AI & Web Innovator',
        'Open Source Contributor'
    ];
    let typingIndex = 0, charIndex = 0, isDeleting = false;
    function type() {
        const current = typingPhrases[typingIndex];
        if (isDeleting) {
            typedText.textContent = current.substring(0, charIndex--);
            if (charIndex < 0) {
                isDeleting = false;
                typingIndex = (typingIndex + 1) % typingPhrases.length;
                setTimeout(type, 600);
            } else {
                setTimeout(type, 40);
            }
        } else {
            typedText.textContent = current.substring(0, charIndex++);
            if (charIndex > current.length) {
                isDeleting = true;
                setTimeout(type, 1200);
            } else {
                setTimeout(type, 90);
            }
        }
    }
    if (typedText) type();

    // Animated stats counters
    function animateStats() {
        document.querySelectorAll('.stat-number').forEach(stat => {
            const target = +stat.getAttribute('data-target');
            let count = 0;
            const increment = Math.ceil(target / 60);
            function update() {
                count += increment;
                if (count > target) count = target;
                stat.textContent = count;
                if (count < target) {
                    requestAnimationFrame(update);
                }
            }
            update();
        });
    }
    window.addEventListener('DOMContentLoaded', animateStats);

    // Auto-scroll tech stack carousel
    const techCarousel = document.querySelector('.tech-carousel');
    if (techCarousel) {
        let scrollAmount = 0;
        setInterval(() => {
            scrollAmount += 2;
            if (scrollAmount > techCarousel.scrollWidth - techCarousel.clientWidth) {
                scrollAmount = 0;
            }
            techCarousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }, 60);
    }

    // Particle background animation
    const particleBg = document.getElementById('particle-bg');
    if (particleBg) {
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.display = 'block';
        particleBg.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        let particles = [];
        const numParticles = 60;
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2 + 1,
                dx: (Math.random() - 0.5) * 0.7,
                dy: (Math.random() - 0.5) * 0.7,
                alpha: Math.random() * 0.5 + 0.3
            });
        }
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let p of particles) {
                ctx.save();
                ctx.globalAlpha = p.alpha;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
                ctx.fillStyle = '#00f2fe';
                ctx.shadowColor = '#00f2fe';
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.restore();
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Scroll Progress Bar
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrolled = (scrollTop / docHeight) * 100;
        if (scrollProgress) scrollProgress.style.width = scrolled + '%';
    });

    // Animated Back to Top Button Visibility
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.pointerEvents = 'auto';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.pointerEvents = 'none';
        }
    });
    if (backToTop) {
        backToTop.style.transition = 'opacity 0.3s';
        backToTop.style.opacity = '0';
        backToTop.style.pointerEvents = 'none';
    }

    // 3D Parallax/Tilt for Hero and Cards
    function applyTiltEffect(selector) {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('tilt-animate');
            el.addEventListener('mousemove', e => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const tiltX = ((x - centerX) / centerX) * 10;
                const tiltY = ((y - centerY) / centerY) * -10;
                el.style.setProperty('--tilt-x', tiltX + 'deg');
                el.style.setProperty('--tilt-y', tiltY + 'deg');
            });
            el.addEventListener('mouseleave', () => {
                el.style.setProperty('--tilt-x', '0deg');
                el.style.setProperty('--tilt-y', '0deg');
            });
        });
    }
    window.addEventListener('DOMContentLoaded', () => {
        applyTiltEffect('.hero-img-wrapper, .project-card, .stat, .tech-item');
    });

    // Animated SVG/Canvas Motifs in Hero
    const motifs = document.getElementById('hero-motifs');
    if (motifs) {
        motifs.innerHTML = `<svg width="100%" height="180" style="position:absolute;top:0;left:0;z-index:0;pointer-events:none;" viewBox="0 0 600 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="80" cy="60" r="18" fill="#00f2fe" fill-opacity="0.18">
                <animate attributeName="cy" values="60;120;60" dur="6s" repeatCount="indefinite" />
            </circle>
            <rect x="500" y="40" width="32" height="32" rx="8" fill="#43e97b" fill-opacity="0.13">
                <animate attributeName="x" values="500;400;500" dur="7s" repeatCount="indefinite" />
            </rect>
            <polygon points="300,30 320,70 280,70" fill="#a18cd1" fill-opacity="0.13">
                <animate attributeName="points" values="300,30 320,70 280,70;320,50 340,90 300,90;300,30 320,70 280,70" dur="8s" repeatCount="indefinite" />
            </polygon>
            <rect x="200" y="120" width="18" height="18" rx="4" fill="#ffb347" fill-opacity="0.18">
                <animate attributeName="y" values="120;80;120" dur="5s" repeatCount="indefinite" />
            </rect>
        </svg>`;
    }

    // Scroll-triggered Animations
    function animateOnScroll() {
        document.querySelectorAll('[data-animate]').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 60) {
                el.classList.add('animated');
            }
        });
    }
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('DOMContentLoaded', animateOnScroll);
});