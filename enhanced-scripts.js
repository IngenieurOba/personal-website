// Enhanced JavaScript for modern interactions and animations

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeCounters();
    initializeProgressBars();
    initializeScrollEffects();
    initializeNavigation();
    initializeParallax();
});

// Initialize all animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Trigger specific animations
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
                
                if (entry.target.classList.contains('skill-card')) {
                    animateProgressBar(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about-card, .skill-card, .stat-item');
    animatedElements.forEach(el => observer.observe(el));
}

// Animated counters
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format the number
        if (target >= 10) {
            element.textContent = Math.floor(current) + '+';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Progress bar animations
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    progressBars.forEach(bar => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBar(entry.target.closest('.skill-card'));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
}

function animateProgressBar(skillCard) {
    const progressBar = skillCard.querySelector('.progress-bar');
    const progressText = skillCard.querySelector('.progress-text');
    
    // Get progress value from data attribute or text content
    let progressValue = 85; // default
    
    if (progressText.textContent.includes('Expert')) progressValue = 95;
    else if (progressText.textContent.includes('Advanced')) progressValue = 90;
    else if (progressText.textContent.includes('Proficient')) progressValue = 82;
    
    skillCard.classList.add('animate-progress');
    progressBar.style.setProperty('--progress-width', progressValue + '%');
}

// Scroll effects and navigation
function initializeScrollEffects() {
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Header hide/show on scroll
        if (currentScrollY > 100) {
            if (currentScrollY > lastScrollY) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        
        // Parallax effect for floating shapes
        parallaxFloatingShapes();
        
        // Update navigation highlighting
        updateActiveNavigation();
    });
}

// Parallax effects
function initializeParallax() {
    const shapes = document.querySelectorAll('.shape');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', () => {
        parallaxFloatingShapes();
    });
}

function parallaxFloatingShapes() {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    shapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
    
    floatingCards.forEach((card, index) => {
        const speed = 0.05 + (index * 0.02);
        const yPos = -(scrolled * speed);
        card.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
}

// Navigation improvements
function initializeNavigation() {
    // Smooth scrolling
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
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
                
                // Add ripple effect to clicked nav item
                addRippleEffect(this);
            }
        });
    });
    
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

// Button interactions
function addRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation CSS
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Enhanced button interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn, .btn *')) {
        const button = e.target.closest('.btn');
        addRippleEffect(button);
        
        // Add press animation
        button.style.transform = 'scale(0.98)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
});

// Floating card interactions
function initializeFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach(card => {
        // Add hover tilt effect
        card.addEventListener('mouseenter', () => {
            card.style.transform += ' rotateX(5deg) rotateY(5deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = card.style.transform.replace(' rotateX(5deg) rotateY(5deg)', '');
        });
        
        // Add periodic glow effect
        setInterval(() => {
            card.style.boxShadow = '0 25px 50px rgba(59, 130, 246, 0.3)';
            setTimeout(() => {
                card.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.1)';
            }, 2000);
        }, 8000 + Math.random() * 4000);
    });
}

// Page loading animation
function initializePageLoad() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        ">
            <div style="
                text-align: center;
                color: white;
            ">
                <div style="
                    width: 60px;
                    height: 60px;
                    border: 4px solid rgba(255, 255, 255, 0.3);
                    border-top: 4px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                "></div>
                <div style="font-size: 1.2rem; font-weight: 600;">
                    Loading Excellence...
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(loadingOverlay);
    
    // Add spin animation
    const spinCSS = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    const spinStyle = document.createElement('style');
    spinStyle.textContent = spinCSS;
    document.head.appendChild(spinStyle);
    
    // Remove loading overlay after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1000);
    });
}

// Mouse tracking for interactive elements
function initializeMouseTracking() {
    const cards = document.querySelectorAll('.about-card, .skill-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Performance optimization
function initializePerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    
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
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 10);
    };
}

// Easter egg - Konami code
function initializeEasterEgg() {
    let konamiCode = [];
    const correctCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        
        if (konamiCode.length > correctCode.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(correctCode)) {
            triggerEasterEgg();
            konamiCode = [];
        }
    });
}

function triggerEasterEgg() {
    // Create confetti effect
    const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfetti(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 100);
    }
    
    // Show special message
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            color: white;
            padding: 2rem;
            border-radius: 1rem;
            text-align: center;
            z-index: 10000;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
            animation: bounceIn 0.5s ease;
        ">
            <h3 style="margin-bottom: 1rem;">🎉 You found the easter egg!</h3>
            <p>Thanks for exploring my portfolio so thoroughly!</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                margin-top: 1rem;
                padding: 0.5rem 1rem;
                background: rgba(255, 255, 255, 0.2);
                border: none;
                border-radius: 0.5rem;
                color: white;
                cursor: pointer;
            ">Close</button>
        </div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 5000);
}

function createConfetti(color) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${color};
        top: -10px;
        left: ${Math.random() * 100}%;
        z-index: 9999;
        border-radius: 50%;
        pointer-events: none;
        animation: confettiFall 3s linear forwards;
    `;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 3000);
}

// Add confetti animation
const confettiCSS = `
@keyframes confettiFall {
    0% {
        transform: translateY(-10px) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
    }
}

@keyframes bounceIn {
    0% {
        transform: translate(-50%, -50%) scale(0.3);
        opacity: 0;
    }
    50% {
        transform: translate(-50%, -50%) scale(1.05);
    }
    70% {
        transform: translate(-50%, -50%) scale(0.9);
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
}
`;

const confettiStyle = document.createElement('style');
confettiStyle.textContent = confettiCSS;
document.head.appendChild(confettiStyle);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializePageLoad();
    initializeAnimations();
    initializeCounters();
    initializeProgressBars();
    initializeScrollEffects();
    initializeNavigation();
    initializeParallax();
    initializeFloatingCards();
    initializeMouseTracking();
    initializePerformanceOptimizations();
    initializeEasterEgg();
});

// Utility functions
const utils = {
    // Debounce function
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
    
    // Throttle function
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
    
    // Random number generator
    random: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    
    // Check if element is in viewport
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

// Export utilities for global use
window.portfolioUtils = utils;
