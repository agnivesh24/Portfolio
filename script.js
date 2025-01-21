document.addEventListener('DOMContentLoaded', () => {
    // Get in Touch button specific handling
    const getInTouchBtn = document.querySelector('.hero-buttons .btn.secondary');
    if (getInTouchBtn) {
        getInTouchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = contactSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Smooth scrolling for all links with hash
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only prevent default if it's a hash link and not an external link
            if (href.startsWith('#') && !href.includes('html')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks?.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.hamburger')) {
            navLinks.classList.remove('active');
            hamburger?.classList.remove('active');
        }
    });

    // Active navigation highlight on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(nav => {
                    nav.classList.remove('active');
                    if (nav.getAttribute('href') === `#${sectionId}`) {
                        nav.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Animate skills on scroll
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        skillObserver.observe(item);
    });

    // Typing animation for hero section
    const titles = [
        'Machine Learning Engineer',
        'Full Stack Developer',
        'Problem Solver'
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const waitTime = 2000;

    function typeEffect() {
        const currentTitle = titles[titleIndex];
        const heroTitle = document.querySelector('.hero h2');
        
        if (heroTitle) {
            if (isDeleting) {
                heroTitle.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroTitle.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentTitle.length) {
                setTimeout(() => isDeleting = true, waitTime);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
            }

            setTimeout(typeEffect, isDeleting ? erasingSpeed : typingSpeed);
        }
    }

    // Start typing animation
    setTimeout(typeEffect, 1000);

    // Smooth scroll function
    const smoothScroll = (target, duration = 1000) => {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;
        
        const targetPosition = targetElement.offsetTop - 80; // Adjust for navbar
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = currentTime => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        // Easing function
        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    };

    // Add click handlers to buttons
    document.querySelectorAll('.hero-buttons .btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const target = button.getAttribute('href');
            smoothScroll(target);

            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'translateY(-2px)';
            }, 150);
        });
    });

    // Add hover effect for icons
    document.querySelectorAll('.btn i').forEach(icon => {
        icon.parentElement.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateX(3px)';
        });
        
        icon.parentElement.addEventListener('mouseleave', () => {
            icon.style.transform = 'translateX(0)';
        });
    });

    // Update project button click handler
    const projectBtn = document.querySelector('.hero-buttons .btn.primary');
    if (projectBtn) {
        projectBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'projects.html';
        });
    }
}); 