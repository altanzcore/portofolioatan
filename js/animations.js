// Custom animations functionality
document.addEventListener('DOMContentLoaded', () => {
  // Custom cursor
  const cursor = document.getElementById('cursor');
  const cursorBorder = document.getElementById('cursor-border');
  
  if (cursor && cursorBorder) {
    const moveCursor = (e) => {
      const mouseY = e.clientY;
      const mouseX = e.clientX;
      
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      cursorBorder.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };
    
    window.addEventListener('mousemove', moveCursor);
    
    // Add custom cursor states for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, input, textarea, .social-link');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorBorder.style.transform = 'scale(1.5)';
        
        if (el.tagName === 'A' || el.classList.contains('social-link')) {
          document.body.classList.add('hover-link');
        } else if (el.tagName === 'BUTTON' || el.classList.contains('btn')) {
          document.body.classList.add('hover-button');
        }
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorBorder.style.transform = 'scale(1)';
        document.body.classList.remove('hover-link', 'hover-button');
      });
    });
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseout', (e) => {
      if (e.relatedTarget === null) {
        cursor.style.opacity = '0';
        cursorBorder.style.opacity = '0';
      }
    });
    
    document.addEventListener('mouseover', () => {
      cursor.style.opacity = '1';
      cursorBorder.style.opacity = '1';
    });
  }
  
  // Parallax effect
  const parallaxElements = document.querySelectorAll('.hero-image, .shape');
  
  if (parallaxElements.length > 0) {
    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      parallaxElements.forEach(el => {
        const speed = el.classList.contains('hero-image') ? 30 : 50;
        const x = (0.5 - mouseX) * speed;
        const y = (0.5 - mouseY) * speed;
        
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    });
  }
  
  // Typing effect animation for hero heading
  function createTypingEffect() {
    const heroHeading = document.querySelector('.hero h1');
    if (!heroHeading) return;
    
    const originalText = heroHeading.innerHTML;
    heroHeading.innerHTML = '';
    
    const lines = originalText.split('<br>');
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let isTyping = true;
    
    function typeNextChar() {
      // If we've finished all lines, exit
      if (currentLineIndex >= lines.length) return;
      
      const currentLine = lines[currentLineIndex];
      
      // Add a line break if we're starting a new line (except the first line)
      if (currentCharIndex === 0 && currentLineIndex > 0) {
        heroHeading.innerHTML += '<br>';
      }
      
      // Get the current character, preserving any HTML tags
      if (isTyping) {
        if (currentCharIndex < currentLine.length) {
          // Handle HTML tags
          if (currentLine[currentCharIndex] === '<') {
            const endTagIndex = currentLine.indexOf('>', currentCharIndex);
            if (endTagIndex !== -1) {
              heroHeading.innerHTML += currentLine.substring(currentCharIndex, endTagIndex + 1);
              currentCharIndex = endTagIndex + 1;
            } else {
              heroHeading.innerHTML += currentLine[currentCharIndex];
              currentCharIndex++;
            }
          } else {
            heroHeading.innerHTML += currentLine[currentCharIndex];
            currentCharIndex++;
          }
          
          setTimeout(typeNextChar, 100);
        } else {
          // Finished typing current line
          currentLineIndex++;
          currentCharIndex = 0;
          setTimeout(typeNextChar, 500);
        }
      }
    }
    
    // Start the typing effect after a delay
    setTimeout(typeNextChar, 1000);
  }
  
  // Only use typing effect on desktop
  if (window.innerWidth > 768) {
    // createTypingEffect(); // Uncomment to enable typing effect
  }
  
  // Scroll-triggered animations for sections
  const sections = document.querySelectorAll('section');
  
  function checkSectionVisibility() {
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add('section-visible');
      }
    });
  }
  
  window.addEventListener('scroll', checkSectionVisibility);
  checkSectionVisibility();
});