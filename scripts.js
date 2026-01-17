// scripts.js - Combined functionality for Kingsley's Portfolio

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');
const downloadCV = document.getElementById('downloadCV');

// Theme Toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const icon = themeToggle.querySelector('i');
    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

// Close mobile menu when clicking on a link
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// Update active nav link on scroll
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Enhanced Carousel functionality
let carouselCurrentSlide = 0;
let isAnimating = false;
let autoSlideInterval;
let carouselSlides;
let carouselTrack;
let carouselPrevBtn;
let carouselNextBtn;
let carouselIndicators;
let carouselCurrentSlideElement;
let carouselTotalSlidesElement;

function initCarousel() {
    // Get carousel elements
    carouselTrack = document.getElementById('carouselTrack');
    carouselSlides = document.querySelectorAll('.carousel-slide');
    carouselPrevBtn = document.getElementById('prevBtn');
    carouselNextBtn = document.getElementById('nextBtn');
    carouselIndicators = document.querySelectorAll('.indicator');
    carouselCurrentSlideElement = document.getElementById('currentSlide');
    carouselTotalSlidesElement = document.getElementById('totalSlides');
    
    const totalSlides = carouselSlides.length;
    
    // Set total slides counter
    if (carouselTotalSlidesElement) {
        carouselTotalSlidesElement.textContent = totalSlides;
    }
    
    // Initialize carousel
    updateCarousel();
    startAutoSlide();
}

function updateCarousel() {
    if (isAnimating) return;
    
    isAnimating = true;
    
    // Update track position with smooth animation
    if (carouselTrack) {
        // Using translateX with percentage for better responsiveness
        carouselTrack.style.transition = 'transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)';
        carouselTrack.style.transform = `translateX(-${carouselCurrentSlide * 100}%)`;
    }
    
    // Update active slide class
    carouselSlides.forEach((slide, index) => {
        slide.classList.toggle('active', index === carouselCurrentSlide);
    });
    
    // Update indicators
    if (carouselIndicators) {
        carouselIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === carouselCurrentSlide);
        });
    }
    
    // Update counter
    if (carouselCurrentSlideElement) {
        carouselCurrentSlideElement.textContent = carouselCurrentSlide + 1;
    }
    
    // Update button states
    if (carouselPrevBtn && carouselNextBtn) {
        carouselPrevBtn.disabled = carouselCurrentSlide === 0;
        carouselNextBtn.disabled = carouselCurrentSlide === carouselSlides.length - 1;
    }
    
    // Reset animation flag after transition
    setTimeout(() => {
        isAnimating = false;
    }, 500);
}

function nextSlide() {
    if (isAnimating || !carouselSlides) return;
    
    carouselCurrentSlide = (carouselCurrentSlide + 1) % carouselSlides.length;
    updateCarousel();
    resetAutoSlide();
}

function prevSlide() {
    if (isAnimating || !carouselSlides) return;
    
    carouselCurrentSlide = (carouselCurrentSlide - 1 + carouselSlides.length) % carouselSlides.length;
    updateCarousel();
    resetAutoSlide();
}

function goToSlide(index) {
    if (isAnimating || index === carouselCurrentSlide || !carouselSlides) return;
    
    carouselCurrentSlide = index;
    updateCarousel();
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Form handling
function handleContactForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        console.log('Contact form submitted:', data);
        alert('Thank you for your message! I will get back to you soon.');
        e.target.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function handleNewsletterForm(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        console.log('Newsletter subscription:', email);
        alert('Thank you for subscribing to my newsletter!');
        e.target.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1000);
}

// Download CV
function handleDownloadCV(e) {
    e.preventDefault();
    const btn = e.target.closest('.btn');
    const originalText = btn.innerHTML;
    
    // Show loading state
    btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Downloading...';
    btn.disabled = true;
    
    // Simulate download
    setTimeout(() => {
        console.log('Downloading CV...');
        
        // Create a temporary download link
        const link = document.createElement('a');
        link.href = 'Kingsley_George_CV.pdf'; // In real app, this would be the CV file URL
        link.download = 'Kingsley_George_CV.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Reset button
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            alert('CV download started!');
        }, 500);
    }, 1500);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Theme
    initTheme();
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Get the target section
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    // Close mobile menu
                    closeMobileMenu();
                    
                    // Scroll to section
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Navigation - update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
    
    // Enhanced Carousel initialization
    initCarousel();
    
    // Carousel navigation
    if (carouselPrevBtn) {
        carouselPrevBtn.addEventListener('click', prevSlide);
    }
    
    if (carouselNextBtn) {
        carouselNextBtn.addEventListener('click', nextSlide);
    }
    
    // Indicator navigation
    if (carouselIndicators) {
        carouselIndicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });
    }
    
    // Pause auto-slide on hover
    if (carouselTrack) {
        carouselTrack.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        carouselTrack.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
    
    // Touch/swipe support for mobile
    if (carouselTrack) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const difference = touchStartX - touchEndX;
            
            if (Math.abs(difference) > swipeThreshold) {
                if (difference > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    prevSlide();
                }
            }
        }
    }
    
    // Keyboard navigation for carousel
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });
    
    // Forms
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterForm);
    }
    
    // CV download
    if (downloadCV) {
        downloadCV.addEventListener('click', handleDownloadCV);
    }
    
    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href !== '#' && href !== '#home') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    // Reset carousel position on resize
    updateCarousel();
});

// Animate skill bars on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate skill bars
            const skillLevels = entry.target.querySelectorAll('.skill-level');
            skillLevels.forEach(skill => {
                const level = skill.getAttribute('data-level');
                skill.style.width = `${level}%`;
            });
            
            // Add animation class
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe skill categories for animation
document.querySelectorAll('.skill-category').forEach(el => {
    observer.observe(el);
});

// Add scroll animations to project cards
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('.project-card').forEach(el => {
    projectObserver.observe(el);
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleTheme,
        toggleMobileMenu,
        closeMobileMenu,
        updateActiveNavLink,
        initCarousel,
        nextSlide,
        prevSlide,
        goToSlide,
        handleContactForm,
        handleNewsletterForm,
        handleDownloadCV
    };
}