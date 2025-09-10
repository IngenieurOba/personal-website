// Jobs-worthy smooth interactions - Obsessive attention to detail

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSmoothScrolling();
    initializeScrollEffects();
    initializeAnimations();
    initializeInteractions();
});

// Navigation with perfect timing
function initializeNavigation() {
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    // Smooth scroll-based navigation behavior
    function updateNavigation() {
        const currentScrollY = window.scrollY;
        
        // Hide/show navigation with precision timing
        if (currentScrollY > 150) {
            if (currentScrollY > lastScrollY && currentScrollY > 300) {
                nav.style.transform = 'translateY(-120%)';
                nav.style.opacity = '0';
            } else {
                nav.style.transform = 'translateY(0)';
                nav.style.opacity = '1';
            }
        } else {
            nav.style.transform = 'translateY(0)';
            nav.style.opacity = '1';
        }
        
        lastScrollY = currentScrollY;
        updateActiveNavLink();
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavigation);
            ticking = true;
        }
    });
    
    // Mobile navigation toggle with smooth animation
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            
            const spans = navToggle.querySelectorAll('span');
            if (navToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
                spans[1].style.transform = 'rotate(-45deg) translate(4px, -4px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
            }
        });
    }
}

// Buttery smooth scrolling
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 120;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // Custom smooth scroll with easing
                smoothScrollTo(offsetPosition, 800);
                
                // Add subtle feedback
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
}

// Custom smooth scroll with easing
function smoothScrollTo(endY, duration) {
    const startY = window.scrollY;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();
    
    // Easing function - cubic bezier for Apple-like feel
    const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };
    
    const timer = setInterval(() => {
        const time = new Date().getTime() - startTime;
        const percent = Math.min(time / duration, 1);
        const easedPercent = easeInOutCubic(percent);
        
        window.scrollTo(0, startY + distanceY * easedPercent);
        
        if (time >= duration) {
            clearInterval(timer);
        }
    }, 16); // 60fps
}

// Update active navigation link with precision
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        if (sectionTop <= 150 && sectionTop + sectionHeight > 150) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Scroll-based effects with performance optimization
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollY = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        const profileImage = document.querySelector('.profile-image');
        
        // Subtle parallax effect
        if (heroVisual) {
            const parallaxSpeed = 0.05;
            heroVisual.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
        }
        
        // Profile image subtle movement
        if (profileImage) {
            const imageParallax = 0.02;
            profileImage.style.transform = `translateY(${scrollY * imageParallax}px)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}

// Intersection Observer for reveal animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger metric animations
                if (entry.target.classList.contains('metric-card')) {
                    setTimeout(() => {
                        animateMetric(entry.target);
                    }, 200);
                }
                
                // Stagger work items
                if (entry.target.classList.contains('work-item')) {
                    const items = document.querySelectorAll('.work-item');
                    const index = Array.from(items).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.15}s`;
                }
                
                // Stagger timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    const items = document.querySelectorAll('.timeline-item');
                    const index = Array.from(items).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for reveal animations
    const animatedElements = document.querySelectorAll(
        '.metric-card, .work-item, .timeline-item, .skill-item, .contact-method'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Animate metric values with precision
function animateMetric(card) {
    const valueElement = card.querySelector('.metric-value');
    if (!valueElement) return;
    
    const targetText = valueElement.textContent;
    const numberMatch = targetText.match(/(\d+)/);
    if (!numberMatch) return;
    
    const targetNumber = parseInt(numberMatch[1]);
    const duration = 1200;
    const startTime = performance.now();
    
    // Easing function for smooth counting
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const currentNumber = Math.floor(targetNumber * easedProgress);
        
        // Update display preserving original formatting
        valueElement.textContent = targetText.replace(/\d+/, currentNumber);
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            valueElement.textContent = targetText;
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Enhanced button and interaction effects
function initializeInteractions() {
    // Button hover effects with precision
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
    
    // Work item hover effects
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Contact method interactions
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        method.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Skill item subtle interactions
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Profile image interaction
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.filter = 'grayscale(0)';
            this.style.transform = 'scale(1.02)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.filter = 'grayscale(0.3)';
            this.style.transform = 'scale(1)';
        });
    }
}

// Keyboard navigation support
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Escape key functionality
        if (e.key === 'Escape') {
            const navToggle = document.querySelector('.nav-toggle');
            if (navToggle && navToggle.classList.contains('active')) {
                navToggle.click();
            }
        }
        
        // Tab navigation visual feedback
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Performance optimizations
function initializePerformanceOptimizations() {
    // Preload critical resources
    const profileImage = document.querySelector('.profile-image');
    if (profileImage && profileImage.src) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = profileImage.src;
        document.head.appendChild(preloadLink);
    }
    
    // Intersection Observer for lazy loading (future enhancement)
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if (lazyImages.length > 0) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }
}

// Error handling for graceful degradation
function initializeErrorHandling() {
    window.addEventListener('error', function(e) {
        console.warn('Non-critical error:', e.error);
    });
    
    // Handle failed image loads gracefully
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            e.target.style.opacity = '0.5';
            e.target.alt = 'Image temporarily unavailable';
        }
    }, true);
}

// Initialize everything with proper sequencing
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality first
    initializeNavigation();
    initializeSmoothScrolling();
    initializeScrollEffects();
    
    // Visual enhancements
    setTimeout(() => {
        initializeAnimations();
        initializeInteractions();
    }, 100);
    
    // Progressive enhancements
    setTimeout(() => {
        initializeKeyboardNavigation();
        initializePerformanceOptimizations();
        initializeErrorHandling();
    }, 200);
});

// Utility functions for smooth operations
const utils = {
    // Precise debounce
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Smooth throttle
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Viewport detection
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export for global use
window.portfolioUtils = utils;

// Add dynamic CSS for animations
const animationCSS = `
    /* Reveal animations */
    .metric-card,
    .work-item,
    .timeline-item,
    .skill-item,
    .contact-method {
        opacity: 0;
        transform: translateY(24px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .metric-card.animate-in,
    .work-item.animate-in,
    .timeline-item.animate-in,
    .skill-item.animate-in,
    .contact-method.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Keyboard navigation styles */
    .keyboard-navigation *:focus {
        outline: 2px solid var(--near-black) !important;
        outline-offset: 3px !important;
        border-radius: 4px;
    }
    
    /* Smooth transitions for all interactive elements */
    .nav-link,
    .btn,
    .work-item,
    .contact-method,
    .skill-item,
    .profile-image {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        .metric-card,
        .work-item,
        .timeline-item,
        .skill-item,
        .contact-method {
            opacity: 1;
            transform: none;
            transition: none;
        }
        
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;

// Inject the CSS
const style = document.createElement('style');
style.textContent = animationCSS;
document.head.appendChild(style);
