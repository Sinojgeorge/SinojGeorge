document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Theme Toggle Logic
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;
  
  // Read saved theme or fallback to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // 2. Mobile Burger Navigation Menu
  const burgerMenu = document.getElementById('burgerMenu');
  const navLinks = document.getElementById('navLinks');
  
  burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Toggle burger icon between bars and times (cross)
    const icon = burgerMenu.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });

  // Close mobile menu when a nav link is clicked
  const navLinksList = document.querySelectorAll('.nav-links a');
  navLinksList.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      burgerMenu.querySelector('i').className = 'fa-solid fa-bars';
    });
  });

  // 3. Typing Animation Logic
  const typedTextSpan = document.getElementById('typedText');
  const phrases = [
    "Backend-focused Software Engineer",
    "Python & Django Developer",
    "Java Spring Boot Engineer",
    "C++ Systems Programmer",
    "Scalable API Builder"
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deleting is faster
    } else {
      typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Normal typing speed
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at full phrase
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      // Move to next phrase
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before typing next phrase
    }

    setTimeout(type, typingSpeed);
  }
  
  // Start typing animation
  if (typedTextSpan) {
    setTimeout(type, 1000);
  }

  // 4. Skills Filter Logic
  window.filterSkills = function(category) {
    // Update active button state
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
      // Highlight correct button
      if (btn.getAttribute('onclick').includes(category)) {
        btn.classList.add('active');
      }
    });

    // Filter skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'flex';
        // Minor animation to pop cards in
        card.style.opacity = '0';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 50);
      } else {
        card.style.display = 'none';
      }
    });
  };

  // 5. Collapsible Experience Panel Drawer
  window.toggleTimelineDrawer = function(card) {
    const drawer = card.querySelector('.timeline-drawer');
    const toggleIcon = card.querySelector('.drawer-toggle i');
    const isOpen = drawer.classList.contains('open');
    
    // Close other drawers for neatness
    document.querySelectorAll('.timeline-drawer').forEach(d => {
      d.classList.remove('open');
      d.style.maxHeight = null;
      const otherIcon = d.closest('.timeline-card').querySelector('.drawer-toggle i');
      if (otherIcon) otherIcon.className = 'fa-solid fa-chevron-down';
    });

    if (!isOpen) {
      drawer.classList.add('open');
      drawer.style.maxHeight = drawer.scrollHeight + 'px';
      toggleIcon.className = 'fa-solid fa-chevron-up';
    } else {
      drawer.classList.remove('open');
      drawer.style.maxHeight = null;
      toggleIcon.className = 'fa-solid fa-chevron-down';
    }
  };

  // 6. Scroll Reveal Animation
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    reveals.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  };
  
  // Trigger once on load
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // 7. Contact Form Handling (Client-side validation & feedback)
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !subject || !message) {
        formStatus.textContent = "Please fill in all the fields.";
        formStatus.className = "form-status error";
        return;
      }
      
      // Simulate form submission
      formStatus.textContent = "Sending your message...";
      formStatus.className = "form-status success";
      
      setTimeout(() => {
        formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
        contactForm.reset();
        
        // Remove status after 5 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  }

  // 8. Set Current Year in Footer
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
