// Premium minimalist interactions - Swiss precision

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSmoothScrolling();
    initializeScrollEffects();
    initializeIntersectionObserver();
});

// Navigation functionality
function initializeNavigation() {
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    let lastScrollY = window.scrollY;
    
    // Scroll-based navigation behavior
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Hide/show navigation on scroll
        if (currentScrollY > 100) {
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        
        // Update active navigation link
        updateActiveNavLink();
    });
    
    // Mobile navigation toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            
            // Animate toggle lines
            const spans = navToggle.querySelectorAll('span');
            if (navToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(3px, 3px)';
                spans[1].style.transform = 'rotate(-45deg) translate(3px, -3px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
            }
            
            // Toggle mobile menu (implement based on design)
            // This would show/hide mobile navigation overlay
        });
    }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
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
        // Add subtle parallax to hero elements
        const scrollY = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroVisual) {
            const parallaxSpeed = 0.1;
            heroVisual.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
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
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Animate metrics when they come into view
                if (entry.target.classList.contains('metric-card')) {
                    animateMetric(entry.target);
                }
                
                // Stagger work items animation
                if (entry.target.classList.contains('work-item')) {
                    const items = document.querySelectorAll('.work-item');
                    const index = Array.from(items).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for reveal animations
    const observedElements = document.querySelectorAll(
        '.metric-card, .work-item, .timeline-item, .skill-item, .contact-method'
    );
    
    observedElements.forEach(element => {
        observer.observe(element);
    });
}

// Animate metric values
function animateMetric(card) {
    const valueElement = card.querySelector('.metric-value');
    const targetText = valueElement.textContent;
    
    // Extract number from text (e.g., "7+" -> 7, "$10B+" -> 10)
    const numberMatch = targetText.match(/(\d+)/);
    if (!numberMatch) return;
    
    const targetNumber = parseInt(numberMatch[1]);
    const duration = 1500;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentNumber = Math.floor(targetNumber * easeOutQuart);
        
        // Update display with original formatting
        valueElement.textContent = targetText.replace(/\d+/, currentNumber);
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            // Ensure final value is exact
            valueElement.textContent = targetText;
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Enhanced button interactions
function initializeButtonEffects() {
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
}

// Keyboard navigation support
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            const navToggle = document.querySelector('.nav-toggle');
            if (navToggle && navToggle.classList.contains('active')) {
                navToggle.click();
            }
        }
        
        // Tab navigation improvements
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Performance optimizations
function initializePerformanceOptimizations() {
    // Preload critical resources
    const criticalImages = document.querySelectorAll('img[loading="eager"]');
    criticalImages.forEach(img => {
        if (img.complete) return;
        
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = img.src;
        document.head.appendChild(preloadLink);
    });
    
    // Lazy load non-critical images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Form enhancements (if contact form is added later)
function initializeFormEnhancements() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Add floating label effect
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Check initial state
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
    });
}

// Error handling for graceful degradation
function initializeErrorHandling() {
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // Gracefully handle errors without breaking user experience
    });
    
    // Handle failed resource loads
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            // Handle failed image loads
            e.target.style.display = 'none';
        }
    }, true);
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSmoothScrolling();
    initializeScrollEffects();
    initializeIntersectionObserver();
    initializeButtonEffects();
    initializeKeyboardNavigation();
    initializePerformanceOptimizations();
    initializeFormEnhancements();
    initializeErrorHandling();
});

// Utility functions
const utils = {
    // Debounce function for performance
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
    
    // Throttle function for scroll events
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
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Get scroll percentage
    getScrollPercentage: () => {
        const h = document.documentElement;
        const b = document.body;
        const st = 'scrollTop';
        const sh = 'scrollHeight';
        return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
    }
};

// Export utilities for global use
window.portfolioUtils = utils;

// Add CSS for reveal animations
const revealCSS = `
    .metric-card,
    .work-item,
    .timeline-item,
    .skill-item,
    .contact-method {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .metric-card.in-view,
    .work-item.in-view,
    .timeline-item.in-view,
    .skill-item.in-view,
    .contact-method.in-view {
        opacity: 1;
        transform: translateY(0);
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary) !important;
        outline-offset: 2px !important;
    }
    
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
    }
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = revealCSS;
document.head.appendChild(style);
