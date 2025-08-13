// Main JavaScript functionality for the website

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize navigation highlighting
    initNavigationHighlight();
    
    // Initialize any animations
    initScrollAnimations();
});

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Account for fixed header
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

// Highlight active navigation item
function initNavigationHighlight() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
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
    
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Initial call
}

// Initialize scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe skill items and about items
    const animatedElements = document.querySelectorAll('.skill-item, .about-item');
    animatedElements.forEach(el => observer.observe(el));
}

// Utility function for loading content
function loadContent(url, containerId) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById(containerId).innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading content:', error);
            document.getElementById(containerId).innerHTML = 
                '<p>Sorry, content could not be loaded at this time.</p>';
        });
}

// Utility function for formatting numbers
function formatNumber(num, decimals = 1) {
    if (num >= 1e9) {
        return (num / 1e9).toFixed(decimals) + 'B';
    }
    if (num >= 1e6) {
        return (num / 1e6).toFixed(decimals) + 'M';
    }
    if (num >= 1e3) {
        return (num / 1e3).toFixed(decimals) + 'K';
    }
    return num.toString();
}

// Contact form handling (if you add a contact form later)
function handleContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would normally send the form data
        // For now, just show a success message
        showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
        
        // Reset form
        form.reset();
    });
}

// Show message utility
function showMessage(message, type = 'info') {
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    // Style the message
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };
    messageDiv.style.backgroundColor = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(messageDiv);
    
    // Animate in
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 5000);
}

// Mobile menu toggle (if you add a hamburger menu later)
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initNavigationHighlight();
    initScrollAnimations();
    initMobileMenu();
    handleContactForm();
});

// Export functions for use in other files
window.siteUtils = {
    loadContent,
    formatNumber,
    showMessage
};
