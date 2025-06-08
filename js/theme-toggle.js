// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme preference or use OS preference
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    if (savedTheme === 'light') {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      updateThemeIcon();
    } else {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      updateThemeIcon();
    }
  } else {
    // If no saved preference, use OS preference
    if (prefersDarkScheme.matches) {
      body.classList.add('dark-mode');
      body.classList.remove('light-mode');
    } else {
      body.classList.add('light-mode');
      body.classList.remove('dark-mode');
    }
    updateThemeIcon();
  }
  
  // Theme toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
      } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      }
      
      // Subtle animation for theme change
      document.documentElement.style.transition = 'all 0.5s ease';
      setTimeout(() => {
        document.documentElement.style.transition = '';
      }, 500);
      updateThemeIcon();
    });
  }
  function updateThemeIcon() {
  const icon = document.getElementById('theme-icon-inner');
  const isDark = document.body.classList.contains('dark-mode');
  icon.className = isDark ? 'bx bx-sun' : 'bx bx-moon'; // matahari = dark mode aktif
}

  // Listen for OS theme changes
  prefersDarkScheme.addEventListener('change', (e) => {
    // Only auto-switch if user hasn't set a preference
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
      } else {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
      }
    }
  });
});