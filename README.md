# 🎨 Personal Portfolio Website

A modern, responsive personal portfolio website showcasing your projects, skills, and professional experience. Features a beautiful dark/light theme toggle, smooth animations, and an interactive user interface.

## ✨ Features

- **🌓 Dark/Light Mode Toggle** - Seamless theme switching with preferences saved to localStorage
- **📱 Fully Responsive** - Optimized for all devices (mobile, tablet, desktop)
- **⚡ Smooth Animations** - Engaging transitions and scroll-based animations
- **🎯 Interactive Navigation** - Active link highlighting based on scroll position
- **💼 Project Showcase** - Filterable project gallery with categories
- **🎨 Modern Design** - Clean, professional UI with gradient accents
- **📊 Animated Statistics** - Counter animations for achievements
- **📝 Contact Form** - Functional contact form for visitor inquiries
- **🔄 Typing Effect** - Dynamic hero section with rotating text
- **🎭 Timeline View** - Visual representation of education and experience

## 🚀 Quick Start

1. **Open the Portfolio**
   - Simply open `index.html` in your web browser
   - Or use a local development server for the best experience

2. **Using a Local Server** (Recommended)
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
   
   Then navigate to `http://localhost:8000` in your browser.

## 📁 Project Structure

```
Portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styles and animations
├── script.js           # JavaScript functionality
├── .github/
│   └── copilot-instructions.md
└── README.md           # This file
```

## 🎨 Customization Guide

### 1. Personal Information

Edit `index.html` to update your personal details:

```html
<!-- Update your name -->
<h1 class="hero-title">
    Hi, I'm <span class="gradient-text">Your Name</span>
</h1>

<!-- Update social links -->
<a href="https://github.com/yourusername" target="_blank">...</a>
<a href="https://linkedin.com/in/yourprofile" target="_blank">...</a>

<!-- Update contact information -->
<a href="mailto:your.email@example.com">your.email@example.com</a>
```

### 2. Typing Text Animation

Modify the rotating text in `script.js`:

```javascript
const words = ['Developer', 'Designer', 'Problem Solver', 'Creative Thinker'];
// Change these to your preferred titles/roles
```

### 3. Projects

Update the project cards in `index.html`:

```html
<div class="project-card" data-category="web">
    <!-- Update project details -->
    <h3>Your Project Name</h3>
    <p>Your project description</p>
    <!-- Update tags -->
    <span class="tag">Technology 1</span>
    <span class="tag">Technology 2</span>
</div>
```

### 4. Skills

Customize your skills in the Skills section of `index.html`. Add or remove skill items:

```html
<div class="skill-item">
    <i class="fab fa-react"></i> <!-- Font Awesome icon -->
    <span>React</span>
</div>
```

### 5. About Section

Update your bio, education, and experience in the About section.

### 6. Color Scheme

Modify colors in `styles.css` by changing CSS variables:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    /* Customize other colors */
}
```

### 7. Statistics

Update the counter numbers in `index.html`:

```html
<span class="stat-number" data-target="50">0</span>
<!-- Change data-target to your actual number -->
```

## 🖼️ Adding Images

To add your profile picture or project images:

1. Create an `assets` or `images` folder
2. Add your images to this folder
3. Replace the placeholder elements:

```html
<!-- Replace this -->
<div class="profile-image-placeholder">
    <i class="fas fa-user"></i>
</div>

<!-- With this -->
<img src="assets/profile.jpg" alt="Your Name" class="profile-image">
```

Add corresponding CSS:

```css
.profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
}
```

## 📧 Contact Form Setup

The contact form currently shows an alert. To make it functional:

1. **Using a Backend Service:**
   - [Formspree](https://formspree.io/)
   - [EmailJS](https://www.emailjs.com/)
   - [Web3Forms](https://web3forms.com/)

2. **Example with Formspree:**
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
       <!-- form fields -->
   </form>
   ```

3. **Or uncomment the fetch code in `script.js`** if you have your own backend API.

## 🚀 Deployment

Deploy your portfolio to any static hosting service:

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select the branch to deploy
4. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify
1. Drag and drop your folder to [Netlify](https://www.netlify.com/)
2. Or connect your GitHub repository
3. Site will be deployed automatically

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts

## 🎨 Font Awesome Icons

This portfolio uses [Font Awesome](https://fontawesome.com/) for icons. Browse their library to find icons for:
- Social media links
- Skills and technologies
- Contact information
- Projects

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 📱 Responsive Breakpoints

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: Below 768px

## 🔧 Troubleshooting

**Issue: Theme not persisting**
- Check if localStorage is enabled in your browser

**Issue: Animations not working**
- Ensure JavaScript is enabled
- Check browser console for errors

**Issue: Icons not showing**
- Verify Font Awesome CDN link is working
- Check internet connection

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this project and customize it for your own use!

## 📧 Contact

For questions or suggestions, feel free to reach out through the contact form on the portfolio or via email.

---

**Note:** Remember to replace all placeholder content (name, email, social links, projects, skills, etc.) with your actual information before deploying!

## 🎯 Next Steps

1. ✅ Replace "Your Name" with your actual name
2. ✅ Update all social media links
3. ✅ Add your real projects with descriptions
4. ✅ Update skills section with your technologies
5. ✅ Add your education and work experience
6. ✅ Replace contact information
7. ✅ Add profile picture and project images
8. ✅ Test contact form functionality
9. ✅ Deploy to a hosting service
10. ✅ Share your portfolio!

Good luck with your portfolio! 🚀
