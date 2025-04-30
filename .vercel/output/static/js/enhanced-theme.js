/**
 * Enhanced theme switching functionality with accessibility considerations
 */
document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    if (themeToggle) {
        // Update toggle UI based on current theme
        const updateToggleUI = (isDark) => {
            const toggleIcon = themeToggle.querySelector('svg');
            if (toggleIcon) {
                if (isDark) {
                    toggleIcon.innerHTML = `<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>`;
                    themeToggle.setAttribute('aria-label', 'Switch to light theme');
                } else {
                    toggleIcon.innerHTML = `<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>`;
                    themeToggle.setAttribute('aria-label', 'Switch to dark theme');
                }
            }
        };

        // Toggle theme and sync UI
        const toggleTheme = () => {
            const isDark = htmlElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateToggleUI(isDark);

            // Update Giscus theme if present
            updateGiscusTheme(isDark ? 'dark' : 'light');
        };

        // Initialize theme based on preference
        const initTheme = () => {
            let isDark;
            // --- CHANGE: Prioritize dark mode if no theme is stored ---
            if (localStorage.getItem('theme') === 'dark' || !localStorage.getItem('theme')) {
                // --- END CHANGE ---
                htmlElement.classList.add('dark');
                isDark = true;
                // --- CHANGE: Explicitly check for 'light' or system preference (if not dark) ---
            } else if (localStorage.getItem('theme') === 'light' || window.matchMedia('(prefers-color-scheme: light)').matches) {
                // --- END CHANGE ---
                htmlElement.classList.remove('dark');
                isDark = false;
            }
            // --- CHANGE: Fallback if neither condition met (shouldn't happen often) ---
            else {
                // Default to dark if system preference is dark, otherwise light
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                htmlElement.classList.toggle('dark', prefersDark);
                isDark = prefersDark;
            }
            // --- END CHANGE ---
            updateToggleUI(isDark);
        };

        // Update Giscus theme if it exists
        const updateGiscusTheme = (theme) => {
            const iframe = document.querySelector('iframe.giscus-frame');
            if (iframe?.contentWindow) {
                iframe.contentWindow.postMessage(
                    { giscus: { setConfig: { theme } } },
                    'https://giscus.app'
                );
            }
        };

        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // --- CHANGE: Only update if no explicit theme is set ---
            if (!localStorage.getItem('theme')) { // Only if user hasn't set preference
                // --- END CHANGE ---
                const newTheme = e.matches ? 'dark' : 'light';
                htmlElement.classList.toggle('dark', e.matches);
                updateToggleUI(e.matches);
                updateGiscusTheme(newTheme);
            }
        });

        // Add toggle event listener
        themeToggle.addEventListener('click', toggleTheme);

        // Initialize on load
        initTheme();
    }

    // Respect reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('reduce-motion');
    }
});
