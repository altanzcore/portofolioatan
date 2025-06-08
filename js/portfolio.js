// Portfolio interactions functionality
document.addEventListener('DOMContentLoaded', () => {
  // Portfolio filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (filterButtons.length && portfolioItems.length) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Show/hide portfolio items
        portfolioItems.forEach(item => {
          if (filterValue === 'all' || item.classList.contains(filterValue)) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
  
  // Portfolio modal functionality
  const modal = document.getElementById('project-modal');
  const viewProjectButtons = document.querySelectorAll('.view-project');
  const closeModal = document.querySelector('.close-modal');
  
  if (modal && viewProjectButtons.length && closeModal) {
    // Project data is initialized in main.js
    
    // Open modal function
    function openModal(projectId) {
      if (!window.projectData || !window.projectData[projectId]) return;
      
      const project = window.projectData[projectId];
      
      // Populate modal with project data
      document.getElementById('modal-title').textContent = project.title;
      document.getElementById('modal-category').textContent = project.category;
      document.getElementById('modal-year').textContent = project.year;
      document.getElementById('modal-description').textContent = project.description;
      document.getElementById('modal-image').src = project.image;
      document.getElementById('modal-image').alt = project.title;
      
      // Show modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Close modal function
    function closeProjectModal() {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    // Attach click events to view project buttons
    viewProjectButtons.forEach(button => {
      button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        openModal(projectId);
      });
    });
    
    // Close modal on close button click
    closeModal.addEventListener('click', closeProjectModal);
    
    // Close modal on outside click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
    
    // Close modal on ESC key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeProjectModal();
      }
    });
  }
  
  // Portfolio item hover effects enhanced
  const portfolioImages = document.querySelectorAll('.portfolio-image');
  
  portfolioImages.forEach(item => {
    const overlay = item.querySelector('.portfolio-overlay');
    
    item.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = item.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      // Subtle parallax effect for the image
      const img = item.querySelector('img');
      const offsetX = (x - 0.5) * 20;
      const offsetY = (y - 0.5) * 20;
      
      img.style.transform = `scale(1.1) translate(${offsetX}px, ${offsetY}px)`;
      
      // Subtle shadow effect based on mouse position
      const shadowX = (x - 0.5) * 20;
      const shadowY = (y - 0.5) * 20;
      item.style.boxShadow = `${shadowX}px ${shadowY}px 25px rgba(0, 0, 0, 0.2)`;
    });
    
    item.addEventListener('mouseleave', () => {
      const img = item.querySelector('img');
      img.style.transform = '';
      item.style.boxShadow = '';
    });
  });
});