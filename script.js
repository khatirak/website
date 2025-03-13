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
  
    // Form submission handling with validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
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
        
        if (isValid) {
          // Form is valid, proceed with submission
          // For demo, we'll just show a success message
          showFormSuccess();
          contactForm.reset();
        }
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
  
    function showFormSuccess() {
      const formContainer = contactForm.parentElement;
      const successMsg = document.createElement('div');
      successMsg.className = 'success-message';
      successMsg.innerHTML = `
        <div style="padding: 20px; background-color: rgba(87, 110, 145, 0.1); border-radius: 4px; margin-top: 20px; text-align: center;">
          <h3 style="color: #273454; margin-bottom: 10px;">Message Sent!</h3>
          <p>Thank you for reaching out. I'll get back to you soon.</p>
        </div>
      `;
      
      formContainer.appendChild(successMsg);
      
      setTimeout(() => {
        successMsg.remove();
      }, 5000);
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
      const elements = document.querySelectorAll('.project-card, .experience-card, .education-card');
      
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
      .project-card, .experience-card, .education-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .project-card.visible, .experience-card.visible, .education-card.visible {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', animateOnScroll);
    // Initial check for elements in view
    animateOnScroll();
  });