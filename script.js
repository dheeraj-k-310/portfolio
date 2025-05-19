
document.addEventListener('DOMContentLoaded', () => {
  // ----- Theme Toggle -----
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    document.documentElement.classList.add('theme-transition');
    setTimeout(() => document.documentElement.classList.remove('theme-transition'), 300);
  });

  // ----- Smooth Scroll for Navigation -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ----- Active Navigation Link Highlight -----
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (scrollY >= section.offsetTop - 60)
        current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href').slice(1) === current);
    });
  });

  // ----- Intersection Observer for Animations -----
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
  const animateOnIntersect = (entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('animate'); });
  };
  const observer = new IntersectionObserver(animateOnIntersect, observerOptions);
  document.querySelectorAll('.skill-card, .project-card, .edu-card, .contact-form, .social-card')
          .forEach(el => observer.observe(el));

  // ----- Hero Section Floating Animation -----
  const heroImage = document.querySelector('.hero-image'); // if available
  let floatY = 0, floatDirection = 1;
  function floatAnimation() {
    if (heroImage) {
      floatY += 0.5 * floatDirection;
      if (floatY >= 20) floatDirection = -1;
      if (floatY <= 0) floatDirection = 1;
      heroImage.style.transform = `translateY(${floatY}px)`;
      requestAnimationFrame(floatAnimation);
    }
  }
  floatAnimation();

  // ----- Education Cards Animation & Hover Effect -----
  const eduCards = document.querySelectorAll('.edu-card');
  eduCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 200);
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const rotateX = (e.clientY - rect.top - rect.height / 2) / 20;
      const rotateY = (e.clientX - rect.left - rect.width / 2) / 20;
      card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });

  // ----- Social Icons Animation -----
  const socialIcons = document.querySelectorAll('.social-icon');
  socialIcons.forEach((icon, index) => {
    icon.style.opacity = '0';
    icon.style.transform = 'scale(0.5)';
    setTimeout(() => {
      icon.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
      icon.style.opacity = '1';
      icon.style.transform = 'scale(1)';
    }, index * 150);
  });

  // ----- Hamburger Menu Functionality -----
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navMenu = document.querySelector('.nav-links');
  if (hamburgerMenu && navMenu) {
    const toggleMenu = () => {
      navMenu.classList.toggle('active');
      hamburgerMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    };
    hamburgerMenu.addEventListener('click', toggleMenu);
    navMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', toggleMenu));
  }

  // ----- Contact Form Animation & Submission Simulation -----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = this.querySelector('.submit-btn');
      const btnText = submitBtn.querySelector('span');
      const btnIcon = submitBtn.querySelector('i');
      submitBtn.disabled = true;
      btnText.textContent = 'Sending...';
      btnIcon.className = 'fas fa-spinner fa-spin';
      setTimeout(() => {
        submitBtn.disabled = false;
        btnText.textContent = 'Message Sent!';
        btnIcon.className = 'fas fa-check';
        contactForm.reset();
        setTimeout(() => {
          btnText.textContent = 'Send Message';
          btnIcon.className = 'fas fa-paper-plane';
        }, 3000);
      }, 2000);
    });
  }

  // ----- Social Card 3D Hover Effects -----
  const socialCards = document.querySelectorAll('.social-card');
  socialCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (e.clientY - rect.top - centerY) / 10;
      const rotateY = (centerX - (e.clientX - rect.left)) / 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
});

// ----- Particle Effect Background -----

/*******************************************
 * Particle Effect Background
 ******************************************/
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let particlesArray = [];
  const particleColor = "#3b82f6";
  
  class Particle {
    constructor(x, y, size, speedX, speedY) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.speedX = speedX;
      this.speedY = speedY;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.fillStyle = particleColor;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 200; i++) {
      let size = Math.random() * 2 + 0.5;
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      let speedX = (Math.random() - 0.5) * 1.5;
      let speedY = (Math.random() - 0.5) * 1.5;
      particlesArray.push(new Particle(x, y, size, speedX, speedY));
    }
  }
  
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(particle => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  });
  
  initParticles();
  animateParticles();
});








// Add this to your script.js file within the DOMContentLoaded event listener
const eduCards = document.querySelectorAll('.edu-card');
eduCards.forEach(card => {
  // Keep existing animation code here
  
  // Add click functionality
  card.addEventListener('click', () => {
    // Toggle expanded class on this card
    card.classList.toggle('expanded');
    
    // Close other cards (optional - remove if you want multiple cards expanded)
    eduCards.forEach(otherCard => {
      if (otherCard !== card) {
        otherCard.classList.remove('expanded');
      }
    });
  });
  
  // Prevent click event from triggering when hovering over the card's 3D effect
  card.addEventListener('mousemove', (e) => {
    // Keep existing mousemove code here
    e.stopPropagation(); // This prevents the click handler from firing during hover animation
  });
});







