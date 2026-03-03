// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

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

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== Typing Effect =====
const typingText = document.querySelector('.typing-text');
// Updated words to match your new profile
const words = ['3x Google Intern', 'Machine Learning Engineer', 'Full-Stack Developer', 'Computer Science @ Howard'];
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

// ===== Project Filtering =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.classList.remove('hide');
                card.style.display = 'block'; // Ensure it's visible
                card.style.animation = 'fadeInUp 0.6s ease-out';
            } else {
                card.classList.add('hide');
                card.style.display = 'none'; // Hide non-matching
            }
        });
    });
});

// ===== AI Chatbot Logic (Connected to Python Backend) =====
const chatTrigger = document.getElementById('chat-trigger');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const aiInput = document.getElementById('ai-input');
const aiSend = document.getElementById('ai-send');
const chatMessages = document.getElementById('chat-messages');

// Toggle chat window
chatTrigger.addEventListener('click', () => {
    chatWindow.classList.toggle('hidden');
});

closeChat.addEventListener('click', () => {
    chatWindow.classList.add('hidden');
});

async function handleChat() {
    const userText = aiInput.value.trim();
    if (!userText) return;

    // 1. Append User Message to UI
    appendMessage('user', userText);
    aiInput.value = '';

    // 2. Create a "Loading..." bubble for the AI
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'msg ai loading';
    loadingDiv.innerText = "...";
    chatMessages.appendChild(loadingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
        // 3. Send the question to your Python Flask server (app.py)
        // Note: Change this URL when you deploy to Render/Railway!
        const response = await fetch('/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: userText })
        });

        const data = await response.json();

        // 4. Remove loading and show real answer
        chatMessages.removeChild(loadingDiv);
        
        if (data.answer) {
            appendMessage('ai', data.answer);
        } else {
            appendMessage('ai', "I'm having a bit of trouble thinking right now. Please try again!");
        }

    } catch (error) {
        console.error("Error calling AI API:", error);
        chatMessages.removeChild(loadingDiv);
        appendMessage('ai', "Error connecting to the AI server. Is the backend running?");
    }
}

function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${sender}`;
    msgDiv.innerText = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

aiSend.addEventListener('click', handleChat);
aiInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChat();
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
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            if (entry.target.id === 'about' && !animated) {
                animated = true;
                animateStats();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section, .project-card, .skill-category').forEach(el => {
    observer.observe(el);
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        alert(`Thank you, ${name}! Your message has been received.`);
        contactForm.reset();
    });
}

// ===== Log Console Message =====
console.log('%c Portfolio Website Loaded! ', 'background: linear-gradient(135deg, #6e00ff 0%, #b300ff 100%); color: white; padding: 10px 20px; border-radius: 5px; font-size: 16px; font-weight: bold;');