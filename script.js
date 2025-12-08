// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light' mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Update icon based on theme
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (html.getAttribute('data-theme') === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

updateThemeIcon();

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon();
});

// ===== Mobile Navigation =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== Typing Effect =====
const typingText = document.querySelector('.typing-text');
const words = ['Developer', 'Designer', 'Problem Solver', 'Creative Thinker'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 150);
    }
}

// Start typing effect
setTimeout(type, 1000);

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Project Filtering =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.classList.remove('hide');
                card.style.animation = 'fadeInUp 0.6s ease-out';
            } else {
                card.classList.add('hide');
            }
        });
    });
});

// ===== Animated Counter for Stats =====
const stats = document.querySelectorAll('.stat-number');
let animated = false;

function animateStats() {
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;
        
        const updateCount = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target + '+';
            }
        };
        
        updateCount();
    });
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // Animate stats when about section is visible
            if (entry.target.id === 'about' && !animated) {
                animated = true;
                animateStats();
            }
        }
    });
}, observerOptions);

// Observe sections for animation
sections.forEach(section => {
    observer.observe(section);
});

// Observe project cards
projectCards.forEach(card => {
    observer.observe(card);
});

// Observe skill categories
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(category => {
    observer.observe(category);
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    // For now, we'll just show an alert
    alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon at ${email}.`);
    
    // Reset form
    contactForm.reset();
    
    // In a real application, you would use something like:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ name, email, subject, message })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     alert('Message sent successfully!');
    //     contactForm.reset();
    // })
    // .catch(error => {
    //     alert('An error occurred. Please try again.');
    // });
});

// ===== Navbar Background on Scroll =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'var(--bg-card)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'var(--bg-card)';
    }
});

// ===== Scroll to Top Button (Optional - can be added to HTML) =====
// You can add this button to your HTML if desired:
// <button id="scrollTop" class="scroll-top"><i class="fas fa-arrow-up"></i></button>

// const scrollTopBtn = document.getElementById('scrollTop');
// if (scrollTopBtn) {
//     window.addEventListener('scroll', () => {
//         if (window.scrollY > 300) {
//             scrollTopBtn.classList.add('visible');
//         } else {
//             scrollTopBtn.classList.remove('visible');
//         }
//     });
    
//     scrollTopBtn.addEventListener('click', () => {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });
//     });
// }

// ===== Prevent FOUC (Flash of Unstyled Content) =====
window.addEventListener('load', () => {
    document.body.style.visibility = 'visible';
});

// ===== Log Console Message =====
console.log('%c Portfolio Website Loaded! ', 'background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 10px 20px; border-radius: 5px; font-size: 16px; font-weight: bold;');
console.log('%c Thanks for checking out my portfolio! ', 'color: #6366f1; font-size: 14px;');
