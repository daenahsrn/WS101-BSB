// ========================================
// BACKSTREET BOYS FAN WEBSITE - JAVASCRIPT
// Professional Interactions & Animations
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // LOADER
    // ========================================
    const loader = document.querySelector('.loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 500);
        });
    }
    
    // ========================================
    // NAVIGATION - SCROLL EFFECT & ACTIVE STATE
    // ========================================
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.navigators a');
    
    // Scroll effect for header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Set initial active state
    setActiveNavLink();
    
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.navigators .nav-links');
    
    mobileMenuToggle?.addEventListener('click', () => {
        navLinksContainer?.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navLinksContainer?.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.navigators .nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer?.classList.remove('active');
            const spans = mobileMenuToggle?.querySelectorAll('span');
            if (spans) {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    });
    
    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================
    const revealElements = document.querySelectorAll(
        '.timeline-item, .band_card, .album_card, .preview-card, .music_link-card, .group_card'
    );
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // ========================================
    // TIMELINE ANIMATION (History Page)
    // ========================================
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const animateTimeline = () => {
        const triggerBottom = window.innerHeight * 0.75;
        
        timelineItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < triggerBottom) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 100);
            }
        });
    };
    
    animateTimeline();
    window.addEventListener('scroll', animateTimeline);
    
    // ========================================
    // PARALLAX EFFECT FOR HERO SECTIONS
    // ========================================
    const heroBanners = document.querySelectorAll('.hero_banner, .about_hero, .history_hero, .songs_hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        heroBanners.forEach(hero => {
            const speed = 0.3;
            const img = hero.querySelector('img');
            if (img && scrolled < hero.offsetHeight) {
                img.style.transform = `translateY(${scrolled * speed}px) scale(1.1)`;
            }
        });
    });
    
    // ========================================
    // INTERACTIVE TRACKLIST (Top Songs Page)
    // ========================================
    const tracklistItems = document.querySelectorAll('.tracklist li');
    
    tracklistItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all tracks
            tracklistItems.forEach(t => t.style.color = '');
            
            // Add active style to clicked track
            this.style.color = 'var(--neon-blue)';
            
            // You can add more functionality here like playing audio
            console.log('Track selected:', this.textContent);
        });
    });
    
    // ========================================
    // ALBUM CARD HOVER EFFECTS
    // ========================================
    const albumCards = document.querySelectorAll('.album_card');
    
    albumCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // ========================================
    // BAND MEMBER CARDS - TILT EFFECT
    // ========================================
    const bandCards = document.querySelectorAll('.band_card');
    
    bandCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    
    // ========================================
    // DYNAMIC YEAR DISPLAY IN FOOTER
    // ========================================
    const copyrightYear = document.querySelector('.footer p');
    if (copyrightYear) {
        const currentYear = new Date().getFullYear();
        copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2026', currentYear + 1);
    }
    
    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ========================================
    // MUSIC VISUALIZER INSPIRED ANIMATION
    // ========================================
    const musicLinks = document.querySelectorAll('.music_link-card');
    
    musicLinks.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s ease-in-out';
        });
        
        card.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // ========================================
    // STATISTICS COUNTER ANIMATION
    // ========================================
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };
    
    // ========================================
    // IMAGE LAZY LOADING
    // ========================================
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ========================================
    // CONSOLE EASTER EGG
    // ========================================
    console.log('%c🎵 Welcome to the Backstreet Boys Fan Website! 🎵', 
        'font-size: 20px; color: #00d4ff; font-weight: bold;');
    console.log('%c"Tell me why!" - Ain\'t nothin\' but a redesigned website!', 
        'font-size: 14px; color: #ffd700;');
    
});

// ========================================
// ADDITIONAL UTILITY FUNCTIONS
// ========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add custom animation for elements entering viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply to elements that need animation
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animationObserver.observe(el);
});
