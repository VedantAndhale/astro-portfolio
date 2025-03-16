function changeTheme() {
  const element = document.documentElement;
  const theme = element.classList.contains("dark") ? "light" : "dark";

  if (theme === "dark") {
    element.classList.add("dark");
  } else {
    element.classList.remove("dark");
  }

  localStorage.theme = theme;

  // Reload the page after theme change
  window.location.reload();
}

function preloadTheme() {
  const theme = (() => {
    const userTheme = localStorage.theme;

    if (userTheme === "light" || userTheme === "dark") {
      return userTheme;
    } else {
      return "dark";
    }
  })();

  const element = document.documentElement;

  if (theme === "dark") {
    element.classList.add("dark");
  } else {
    element.classList.remove("dark");
  }

  localStorage.theme = theme;
}

window.onload = () => {
  preloadTheme(); // Ensure preloadTheme is called on window load

  function initializeThemeButtons() {
    const headerThemeButton = document.getElementById("header-theme-button");
    const drawerThemeButton = document.getElementById("drawer-theme-button");
    headerThemeButton?.addEventListener("click", changeTheme);
    drawerThemeButton?.addEventListener("click", changeTheme);
  }

  document.addEventListener("astro:after-swap", initializeThemeButtons);
  initializeThemeButtons();
};

document.addEventListener("astro:after-swap", preloadTheme);

preloadTheme(); // Ensure preloadTheme is called initially
