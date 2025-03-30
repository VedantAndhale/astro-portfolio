// Optimized theme switching script with improved performance
(function () {
  // Immediately apply the theme to prevent flash of wrong theme
  function preloadTheme() {
    // Try to get theme from localStorage, otherwise use device preference
    const userTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = userTheme === 'light' || userTheme === 'dark'
      ? userTheme
      : prefersDark ? 'dark' : 'light';

    // Apply theme to documentElement
    document.documentElement.classList.toggle('dark', theme === 'dark');

    // Store the theme
    localStorage.setItem('theme', theme);
  }

  // Change theme without full page reload for better performance
  function changeTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';

    // Toggle the class
    document.documentElement.classList.toggle('dark');

    // Store the theme
    localStorage.setItem('theme', newTheme);

    // Dispatch a 'themeToggle' event for compatibility with Giscus
    window.dispatchEvent(new CustomEvent('themeToggle', { detail: { theme: newTheme } }));
  }

  // Initialize theme buttons when they exist - with performance optimizations
  function initializeThemeButtons() {
    const headerThemeButton = document.getElementById('header-theme-button');
    const drawerThemeButton = document.getElementById('drawer-theme-button');

    // Use event delegation instead of multiple listeners
    document.addEventListener('click', (e) => {
      // Check if clicked element is a theme button
      if (e.target.closest('#header-theme-button, #drawer-theme-button')) {
        changeTheme();
      }
    }, { passive: true });
  }

  // Run preloadTheme immediately to prevent flash of wrong theme
  preloadTheme();

  // Initialize event listeners after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeThemeButtons);
  } else {
    // Use requestIdleCallback to defer non-critical initialization
    if (window.requestIdleCallback) {
      window.requestIdleCallback(initializeThemeButtons);
    } else {
      setTimeout(initializeThemeButtons, 1);
    }
  }

  // Re-initialize on Astro page transitions
  document.addEventListener('astro:after-swap', function () {
    preloadTheme();
  });
})();
