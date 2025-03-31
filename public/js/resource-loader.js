// Optional resource loader optimized for Speed Index improvement
// This script should be placed inline in the head before any other scripts
(function () {
    // Detect if the browser supports modules
    const supportsModules = 'noModule' in document.createElement('script');

    // Function to load scripts conditionally
    function loadScript(src, isModule = false, priority = 'auto', defer = true) {
        const script = document.createElement('script');
        script.src = src;
        if (isModule && supportsModules) {
            script.type = 'module';
        }
        script.defer = defer;
        script.fetchpriority = priority;
        document.head.appendChild(script);
    }

    // Detect connection speed
    const isSlowConnection = navigator.connection &&
        (navigator.connection.saveData ||
            (navigator.connection.effectiveType || '').includes('2g'));

    // Load non-essential scripts based on connection and visibility
    function loadNonEssentialScripts() {
        if (isSlowConnection) return;

        // Add delayed loading for analytics or other non-critical scripts
        if (document.visibilityState === 'visible') {
            setTimeout(function () {
                // You can add any non-critical scripts to load here
                loadScript('/js/bg.js', true, 'low', true);
            }, 1000);
        }
    }

    // Listen for page visibility to load non-critical resources
    if (document.visibilityState === 'visible') {
        loadNonEssentialScripts();
    } else {
        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'visible') {
                loadNonEssentialScripts();
            }
        });
    }

    // Add support for native lazy loading if supported
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }

    // IntersectionObserver for loading when scrolling into viewport
    if ('IntersectionObserver' in window) {
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    if (element.tagName === 'IMG' && element.dataset.src) {
                        element.src = element.dataset.src;
                        lazyLoadObserver.unobserve(element);
                    } else if (element.dataset.background) {
                        element.style.backgroundImage = `url(${element.dataset.background})`;
                        lazyLoadObserver.unobserve(element);
                    }
                }
            });
        });

        // Watch for lazy loaded elements
        document.querySelectorAll('[data-src], [data-background]').forEach(element => {
            lazyLoadObserver.observe(element);
        });
    }

    // Use requestIdleCallback to defer non-critical tasks
    const idle = window.requestIdleCallback || function (cb) {
        setTimeout(cb, 50);
    };

    // Prioritize LCP image loading
    const lcpImageSelector = '.hero-image, header img, [data-priority="high"]';
    const lcpImages = document.querySelectorAll(lcpImageSelector);
    if (lcpImages.length) {
        Array.from(lcpImages).forEach(img => {
            img.fetchpriority = 'high';
            img.loading = 'eager';
        });
    }

    // Delay low-priority CSS
    idle(() => {
        const lowPriorityStyles = document.querySelectorAll('link[rel="stylesheet"][data-priority="low"]');
        Array.from(lowPriorityStyles).forEach(link => {
            link.media = 'all';
        });
    });

    // Add listener for Astro view transitions
    document.addEventListener('astro:page-load', () => {
        if (document.visibilityState === 'visible') {
            loadNonEssentialScripts();
        }
    });
})();