// Comprehensive theme switching script with improved functionality
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

        // Update button accessibility labels based on current theme
        updateButtonLabels(theme === 'dark');
    }

    // Update button accessibility labels based on current theme
    function updateButtonLabels(isDark) {
        const headerButton = document.getElementById('header-theme-button');
        const drawerButton = document.getElementById('drawer-theme-button');

        if (headerButton) {
            headerButton.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
        }

        if (drawerButton) {
            drawerButton.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
        }
    }

    // Change theme without full page reload for better performance
    function changeTheme(e) {
        // Stop propagation to prevent multiple triggers
        if (e) e.stopPropagation();

        const isDark = document.documentElement.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';

        // Toggle the class
        document.documentElement.classList.toggle('dark');

        // Store the theme
        localStorage.setItem('theme', newTheme);

        // Update button accessibility 
        updateButtonLabels(!isDark);

        // Dispatch a 'themeToggle' event for compatibility with Giscus and other components
        window.dispatchEvent(new CustomEvent('themeToggle', { detail: { theme: newTheme } }));

        console.log('Theme changed to:', newTheme); // Debugging
    }

    // Initialize theme buttons when they exist - with performance optimizations
    function initializeThemeButtons() {
        console.log('Initializing theme buttons'); // Debugging

        const headerThemeButton = document.getElementById('header-theme-button');
        const drawerThemeButton = document.getElementById('drawer-theme-button');

        // Clean up any existing event listeners first
        if (headerThemeButton) {
            const newHeaderButton = headerThemeButton.cloneNode(true);
            headerThemeButton.parentNode.replaceChild(newHeaderButton, headerThemeButton);
            newHeaderButton.addEventListener('click', changeTheme);
            console.log('Header theme button initialized'); // Debugging
        }

        if (drawerThemeButton) {
            const newDrawerButton = drawerThemeButton.cloneNode(true);
            drawerThemeButton.parentNode.replaceChild(newDrawerButton, drawerThemeButton);
            newDrawerButton.addEventListener('click', changeTheme);
            console.log('Drawer theme button initialized'); // Debugging
        }

        // Fallback for SVG clicks and other nested elements
        document.addEventListener('click', (e) => {
            if (e.target.closest('svg, path, use')) {
                const button = e.target.closest('#header-theme-button, #drawer-theme-button');
                if (button) {
                    console.log('Theme button clicked via SVG element'); // Debugging
                    changeTheme(e);
                }
            }
        });
    }

    // Listen for system preference changes
    function initializeSystemPreferenceListener() {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) { // Only if user hasn't set preference
                document.documentElement.classList.toggle('dark', e.matches);
                updateButtonLabels(e.matches);
            }
        });
    }

    // Run preloadTheme immediately to prevent flash of wrong theme
    preloadTheme();

    // Initialize event listeners after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initializeThemeButtons();
            initializeSystemPreferenceListener();
        });
    } else {
        // Initialize immediately if DOM is already loaded
        initializeThemeButtons();
        initializeSystemPreferenceListener();
    }

    // Re-initialize on Astro page transitions
    document.addEventListener('astro:page-load', function () {
        console.log('Astro page loaded, reinitializing theme'); // Debugging
        preloadTheme();
        initializeThemeButtons();
    });

    document.addEventListener('astro:after-swap', function () {
        console.log('Astro after swap, reinitializing theme'); // Debugging
        preloadTheme();
        initializeThemeButtons();
    });
})();
