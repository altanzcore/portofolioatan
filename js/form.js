// Form handling functionality
document.addEventListener('DOMContentLoaded', () => {
  // Contact form handling
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    const submitButton = contactForm.querySelector('.btn-submit');
    
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form inputs
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const subjectInput = document.getElementById('subject');
      const messageInput = document.getElementById('message');
      
      // Simple validation
      if (!nameInput.value.trim() || !emailInput.value.trim() || 
          !subjectInput.value.trim() || !messageInput.value.trim()) {
        showFormError('Please fill in all fields');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        showFormError('Please enter a valid email address');
        return;
      }
      
      // Show processing state
      submitButton.classList.add('processing');
      
      // Simulate form submission (replace with actual form submission)
      setTimeout(() => {
        // Hide processing state
        submitButton.classList.remove('processing');
        
        // Show success message
        showFormSuccess();
        
        // Reset form after success
        setTimeout(() => {
          contactForm.reset();
          hideFormSuccess();
        }, 3000);
      }, 1500);
    });
    
    // Show form error message
    function showFormError(message) {
      // Remove existing error message
      const existingError = contactForm.querySelector('.form-error');
      if (existingError) {
        existingError.remove();
      }
      
      // Create error message element
      const errorElement = document.createElement('div');
      errorElement.className = 'form-error';
      errorElement.textContent = message;
      errorElement.style.color = 'var(--color-error)';
      errorElement.style.marginBottom = 'var(--space-16)';
      errorElement.style.fontSize = 'var(--font-size-sm)';
      
      // Add error before the button
      contactForm.insertBefore(errorElement, submitButton.parentNode);
      
      // Auto-remove error after a few seconds
      setTimeout(() => {
        errorElement.remove();
      }, 4000);
    }
    
    // Show form success message
    function showFormSuccess() {
      // Create success message container
      const successElement = document.createElement('div');
      successElement.className = 'form-success';
      successElement.innerHTML = `
        <span class="success-checkmark">✓</span>
        <span>Message sent successfully!</span>
      `;
      
      // Add success message to form
      contactForm.appendChild(successElement);
      
      // Show success message with animation
      setTimeout(() => {
        successElement.classList.add('show');
      }, 10);
    }
    
    // Hide form success message
    function hideFormSuccess() {
      const successElement = contactForm.querySelector('.form-success');
      if (successElement) {
        successElement.classList.remove('show');
        setTimeout(() => {
          successElement.remove();
        }, 300);
      }
    }
    
    // Form input animation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      // Add placeholder for animation
      input.setAttribute('placeholder', ' ');
      
      // Create label position animation
      input.addEventListener('focus', () => {
        input.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (input.value === '') {
          input.classList.remove('focused');
        }
      });
      
      // Check initial state (for autofilled inputs)
      if (input.value !== '') {
        input.classList.add('focused');
      }
    });
  }
  
  // Newsletter form handling
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const submitButton = newsletterForm.querySelector('button');
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        // Show error styling
        emailInput.style.borderColor = 'var(--color-error)';
        emailInput.style.boxShadow = '0 0 0 2px rgba(244, 67, 54, 0.2)';
        
        // Reset styling after a delay
        setTimeout(() => {
          emailInput.style.borderColor = '';
          emailInput.style.boxShadow = '';
        }, 2000);
        
        return;
      }
      
      // Show processing state
      submitButton.textContent = 'Subscribing...';
      submitButton.disabled = true;
      
      // Simulate subscription (replace with actual newsletter signup)
      setTimeout(() => {
        // Show success state
        submitButton.textContent = 'Subscribed!';
        emailInput.value = '';
        
        // Reset button after delay
        setTimeout(() => {
          submitButton.textContent = 'Subscribe';
          submitButton.disabled = false;
        }, 2000);
      }, 1500);
    });
  }
});