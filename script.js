// Future JavaScript code goes here 

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                const navToggle = document.getElementById('nav-toggle');
                if (navToggle) navToggle.checked = false;
            }
        });
    });

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            if(backToTopButton) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.pointerEvents = 'auto';
            }
        } else {
            if(backToTopButton) {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.pointerEvents = 'none';
            }
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

    // Improved section reveal on scroll with Intersection Observer
    const revealSections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealSections.forEach(section => {
        sectionObserver.observe(section);
    });

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
        if (!typedText) return;
        
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

    // Improved animated stats counters with Intersection Observer
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
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
                statsObserver.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(stat => {
        statsObserver.observe(stat);
    });

    // Improved tech stack carousel for mobile
    const techCarousel = document.querySelector('.tech-carousel');
    if (techCarousel) {
        let isScrolling = false;
        let scrollAmount = 0;
        let scrollDirection = 1;
        const scrollSpeed = 1;
        const resetThreshold = 100;
        
        function autoScroll() {
            if (isScrolling) return;
            
            const maxScroll = techCarousel.scrollWidth - techCarousel.clientWidth;
            
            if (scrollAmount >= maxScroll - resetThreshold) {
                scrollDirection = -1;
            } else if (scrollAmount <= resetThreshold) {
                scrollDirection = 1;
            }
            
            scrollAmount += scrollSpeed * scrollDirection;
            
            // Ensure scroll amount stays within bounds
            if (scrollAmount > maxScroll) scrollAmount = maxScroll;
            if (scrollAmount < 0) scrollAmount = 0;
            
            techCarousel.scrollTo({ 
                left: scrollAmount, 
                behavior: 'smooth' 
            });
        }
        
        // Pause auto-scroll on hover/touch
        techCarousel.addEventListener('mouseenter', () => isScrolling = true);
        techCarousel.addEventListener('mouseleave', () => isScrolling = false);
        techCarousel.addEventListener('touchstart', () => isScrolling = true);
        techCarousel.addEventListener('touchend', () => {
            setTimeout(() => isScrolling = false, 1000);
        });
        
        // Start auto-scroll
        setInterval(autoScroll, 80);
        
        // Add touch scroll support for mobile
        let isDown = false;
        let startX;
        let scrollLeft;
        
        techCarousel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - techCarousel.offsetLeft;
            scrollLeft = techCarousel.scrollLeft;
        });
        
        techCarousel.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        techCarousel.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        techCarousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - techCarousel.offsetLeft;
            const walk = (x - startX) * 2;
            techCarousel.scrollLeft = scrollLeft - walk;
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

    // Improved scroll-triggered animations with Intersection Observer
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    document.querySelectorAll('[data-animate]').forEach(el => {
        animationObserver.observe(el);
    });

    // 3D Parallax/Tilt for Hero and Cards (desktop only)
    function applyTiltEffect(selector) {
        if (window.innerWidth <= 768) return; // Disable on mobile
        
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
    
    // Apply tilt effect on load and resize
    function initTiltEffects() {
        applyTiltEffect('.hero-img-wrapper, .project-card, .stat, .tech-item');
    }
    
    window.addEventListener('load', initTiltEffects);
    window.addEventListener('resize', initTiltEffects);

    // Mobile menu toggle
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('change', () => {
            if (navToggle.checked) {
                navLinks.style.display = 'flex';
            } else {
                navLinks.style.display = 'none';
            }
        })
    }

    // Optimize background videos for mobile
    const bgVideos = document.querySelectorAll('.bg-video');
    bgVideos.forEach(video => {
        if (window.innerWidth <= 768) {
            video.style.display = 'none'; // Hide videos on mobile for better performance
        }
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});
