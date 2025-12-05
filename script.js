document.addEventListener('DOMContentLoaded', () => {
    // Update copyright year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
  
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  
    // Form validation (now works alongside FormSubmit)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        // Don't prevent default - let the form submit to FormSubmit
        // But still do client-side validation
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        // Very simple validation
        if (!name.value.trim()) {
          highlightError(name);
          isValid = false;
        } else {
          removeError(name);
        }
        
        if (!email.value.trim() || !isValidEmail(email.value)) {
          highlightError(email);
          isValid = false;
        } else {
          removeError(email);
        }
        
        if (!message.value.trim()) {
          highlightError(message);
          isValid = false;
        } else {
          removeError(message);
        }
        
        if (!isValid) {
          e.preventDefault(); // Only prevent form submission if validation fails
          return false;
        }
        
        // If we get here, the form will submit to FormSubmit service
        // Add a small delay to show form being submitted
        const submitButton = contactForm.querySelector('.submit-button');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // This just adds a nice UX touch - FormSubmit will handle the actual submission
        setTimeout(() => {
          submitButton.innerHTML = 'Send Message';
          submitButton.disabled = false;
        }, 1000);
      });
    }
  
    // Helper functions for form validation
    function highlightError(element) {
      element.style.borderColor = '#bc2d4f';
      element.style.backgroundColor = 'rgba(188, 45, 79, 0.05)';
    }
  
    function removeError(element) {
      element.style.borderColor = '';
      element.style.backgroundColor = '';
    }
  
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
      
      // Show/hide scroll-to-top button
      const scrollTopButton = document.querySelector('.scroll-top-button');
      if (window.pageYOffset > 300) {
        scrollTopButton.style.display = 'flex';
        setTimeout(() => {
          scrollTopButton.style.opacity = '1';
        }, 10);
      } else {
        scrollTopButton.style.opacity = '0';
        setTimeout(() => {
          if (window.pageYOffset <= 300) {
            scrollTopButton.style.display = 'none';
          }
        }, 300);
      }
    });
  
    // Scroll to top when button is clicked
    const scrollTopButton = document.querySelector('.scroll-top-button');
    if (scrollTopButton) {
      scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  
    // Add subtle animations for page elements
    function animateOnScroll() {
      const elements = document.querySelectorAll('.project-card, .experience-card, .education-card, .activity-card, .skills-category');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    }
    
    // Add CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
      .project-card, .experience-card, .education-card, .activity-card, .skills-category {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .project-card.visible, .experience-card.visible, .education-card.visible, .activity-card.visible, .skills-category.visible {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', animateOnScroll);
    // Initial check for elements in view
    animateOnScroll();
    
    // Typewriter effect for hero text
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
      const fullText = typewriterElement.textContent;
      typewriterElement.textContent = '';
      typewriterElement.style.opacity = '1';
      
      const words = fullText.split(' ');
      let wordIndex = 0;
      
      function typeWriter() {
        if (wordIndex < words.length) {
          // Add the current word
          if (wordIndex > 0) {
            typewriterElement.textContent += ' ';
          }
          typewriterElement.textContent += words[wordIndex];
          wordIndex++;
          
          // Set delay between words (adjust timing as needed)
          setTimeout(typeWriter, 150); // 150ms delay between words
        }
      }
      
      // Start the typewriter effect after a short delay
      setTimeout(() => {
        typeWriter();
      }, 500);
    }
    
    // Flip card functionality for interests page
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
      card.addEventListener('click', function() {
        this.classList.toggle('flipped');
      });
    });
  });