document.addEventListener('DOMContentLoaded', () => {
  // Navigation active state on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  const scrollSpy = () => {
    let current = '';
    const scrollPos = window.scrollY + 150; // Offset for navbar

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === current) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', scrollSpy);
  scrollSpy(); // Initial call to set active state on load

  // Header scroll effect
  const nav = document.querySelector('nav');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: 'smooth'
      });
    });
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-links a');

  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinksContainer.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinksContainer.contains(e.target) && !menuToggle.contains(e.target)) {
        navLinksContainer.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });

    // Close menu when clicking a link
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }

  // Simple form submission handler
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.btn-submit');
      const originalText = submitBtn.innerText;
      
      submitBtn.innerText = 'Sending...';
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        alert('Message sent successfully!');
        contactForm.reset();
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.skill-card, .project-card, .timeline-item, .stat-card');
  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    
    // Add staggered delay for skill cards
    if (el.classList.contains('skill-card')) {
      el.style.transitionDelay = `${index * 0.1}s`;
    }
    
    observer.observe(el);
  });
});