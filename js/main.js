// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', () => {
  // Initialize page loader
  const loader = document.createElement('div');
  loader.className = 'loader';
  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-circle"></div>
      <div class="loader-logo">PORTFOLIO</div>
    </div>
  `;
  document.body.appendChild(loader);

  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true,
    offset: 100,
  });

  // Remove loader after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('fade-out');
      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 500);
  });

  // Mobile menu functionality
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
  }

  // Sticky header
  const header = document.querySelector('.header');
  let lastScrollTop = 0;

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScrollTop = scrollTop;
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        if (mainNav && mainNav.classList.contains('active')) {
          mobileMenuToggle.classList.remove('active');
          mainNav.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
        
        // Scroll to target
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Update active nav link
        document.querySelectorAll('.main-nav a').forEach(navLink => {
          navLink.classList.remove('active');
        });
        this.classList.add('active');
      }
    });
  });

  // Active navigation based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const scrollPosition = window.scrollY;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.id;
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  // Handle newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const submitButton = this.querySelector('button');
      
      if (emailInput.value.trim() !== '') {
        submitButton.innerHTML = 'Subscribed!';
        submitButton.disabled = true;
        setTimeout(() => {
          emailInput.value = '';
          submitButton.innerHTML = 'Subscribe';
          submitButton.disabled = false;
        }, 2000);
      }
    });
  }

  // Initialize project data
  window.projectData = {
    project1: {
      title: 'Cosmic Dreams',
      category: 'Digital Illustration',
      year: '2023',
      description: 'An ethereal digital illustration exploring cosmic themes and vibrant colors. This piece was created using Procreate and Adobe Photoshop, emphasizing a blend of traditional art techniques with digital manipulation. The artwork represents the connection between dreams and the vastness of space.',
      image: 'https://images.pexels.com/photos/3593865/pexels-photo-3593865.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    project2: {
      title: 'Neon Interface',
      category: 'UI/UX Design',
      year: '2023',
      description: 'A futuristic UI design concept for a music streaming application. The interface features a dark theme with neon accent elements, custom visualizer components, and an intuitive navigation system. Created in Figma with a focus on both aesthetics and usability.',
      image: 'https://images.pexels.com/photos/5417678/pexels-photo-5417678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    project3: {
      title: 'Luminous Brand',
      category: 'Branding',
      year: '2022',
      description: 'Complete brand identity for Luminous, a tech startup specializing in AR experiences. The project included logo design, color palette development, typography selection, and brand guidelines. The goal was to create a visual identity that conveys innovation while maintaining elegance and simplicity.',
      image: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    project4: {
      title: 'Ethereal Guardian',
      category: 'Character Design',
      year: '2023',
      description: 'Character design for a fantasy game project. The Ethereal Guardian is a mystical protector with abilities tied to cosmic energies. The design process included concept sketches, color studies, and final rendering. Special attention was given to costume details and the visual representation of magical elements.',
      image: 'https://images.pexels.com/photos/4072840/pexels-photo-4072840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    project5: {
      title: 'Nebula App',
      category: 'Mobile UI',
      year: '2022',
      description: 'Complete UI design for Nebula, a stargazing and astronomy education app. The interface features interactive star maps, educational content, and social sharing features. The design prioritizes usability in low-light environments while maintaining visual appeal and information hierarchy.',
      image: 'https://images.pexels.com/photos/4048145/pexels-photo-4048145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    project6: {
      title: 'Prism Identity',
      category: 'Logo Design',
      year: '2023',
      description: 'Logo design for Prism, a creative agency focusing on multimedia production. The design concept uses geometric principles and color theory to create a distinctive mark that reflects the company\'s focus on transforming ideas into vibrant visual experiences. The deliverables included logo variations, favicon, and social media assets.',
      image: 'https://images.pexels.com/photos/7956707/pexels-photo-7956707.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  };
});