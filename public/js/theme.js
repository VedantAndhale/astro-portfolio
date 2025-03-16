function changeTheme() {
  const element = document.documentElement;
  const theme = element.classList.contains("dark") ? "light" : "dark";

  // Add transition class before changing theme
  element.classList.add('theme-transition');
  
  if (theme === "dark") {
    element.classList.add("dark");
  } else {
    element.classList.remove("dark");
  }

  localStorage.theme = theme;
  
  // Remove transition class after animation completes
  setTimeout(() => {
    element.classList.remove('theme-transition');
  }, 300);
}

function preloadTheme() {
  const theme = (() => {
    if (typeof localStorage !== 'undefined' && localStorage.theme) {
      return localStorage.theme;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  })();

  const element = document.documentElement;

  if (theme === "dark") {
    element.classList.add("dark");
  } else {
    element.classList.remove("dark");
  }

  localStorage.theme = theme;
}

// Initialize theme on page load
window.addEventListener('DOMContentLoaded', () => {
  preloadTheme();
  initializeThemeButtons();
});

function initializeThemeButtons() {
  const headerThemeButton = document.getElementById("header-theme-button");
  const drawerThemeButton = document.getElementById("drawer-theme-button");
  
  [headerThemeButton, drawerThemeButton].forEach(button => {
    if (button) {
      button.addEventListener("click", changeTheme);
    }
  });
}

// Handle theme changes during navigation
document.addEventListener("astro:after-swap", () => {
  preloadTheme();
  initializeThemeButtons();
});
