// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
}

// Testimonial slider functionality
let currentTestimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonials() {
    // This is a simple version - in a real implementation you might 
    // want to add sliding animations or other UI enhancements
    for (let i = 0; i < testimonials.length; i++) {
        if (window.innerWidth < 768) {
            // On mobile, show only one testimonial at a time
            testimonials[i].style.display = i === currentTestimonialIndex ? 'block' : 'none';
        } else {
            // On desktop, show all testimonials
            testimonials[i].style.display = 'block';
        }
    }
}

// Automatically rotate testimonials on mobile
function rotateTestimonials() {
    if (window.innerWidth < 768) {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        showTestimonials();
    }
}

// Initialize testimonials
if (testimonials.length > 0) {
    showTestimonials();
    // Rotate testimonials every 5 seconds on mobile
    setInterval(rotateTestimonials, 5000);
}

// Handle window resize
window.addEventListener('resize', showTestimonials);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});
