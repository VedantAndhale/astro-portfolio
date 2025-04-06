/**
 * critical-resources.js - Optimize critical resource loading for better LCP and Speed Index
 * 
 * This script implements advanced techniques to improve mobile loading performance:
 * 1. Prioritizes critical resources on mobile
 * 2. Defers non-critical resources based on device and connection
 * 3. Implements network-aware loading for better mobile experience
 */

// Detect device capabilities and network conditions
const isMobile = window.innerWidth < 768;
const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
const isSlowConnection = connection ?
    (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g' || connection.saveData) :
    false;

// Add data attributes to document for CSS targeting
document.documentElement.setAttribute('data-device', isMobile ? 'mobile' : 'desktop');
if (isSlowConnection) {
    document.documentElement.setAttribute('data-connection', 'slow');
}

// Track performance
let lcpElement = null;
let lcpTimeStart = 0;

// Function to prioritize above-the-fold content
function prioritizeCriticalContent() {
    // Find potential LCP candidates
    const lcpCandidates = document.querySelectorAll('img[fetchpriority="high"], h1, h2, .hero, .intro, header img');

    lcpCandidates.forEach(el => {
        // Set load priority
        if (el.tagName === 'IMG') {
            el.setAttribute('fetchpriority', 'high');
            el.setAttribute('loading', 'eager');
            el.setAttribute('decoding', 'sync');

            // Add blur-up loading effect
            if (isMobile) {
                el.classList.add('blur-load');
                el.addEventListener('load', () => {
                    setTimeout(() => el.classList.add('loaded'), 10);
                });
            }
        }

        // Mark element for LCP observation
        el.setAttribute('data-lcp-candidate', 'true');
    });
}

// Function to defer non-critical resources
function deferNonCriticalResources() {
    // Lazy load all images below the fold on mobile
    if (isMobile) {
        // Create intersection observer for image loading
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    // Set the src for the image
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }

                    // Remove observer after loading
                    lazyImageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '300px 0px' });

        // Select all non-critical images
        const lazyImages = document.querySelectorAll('img:not([loading="eager"]):not([data-lcp-candidate])');
        lazyImages.forEach(img => {
            // Don't defer if already in viewport
            const rect = img.getBoundingClientRect();
            if (rect.top > window.innerHeight) {
                const originalSrc = img.src;
                img.dataset.src = originalSrc;
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
                lazyImageObserver.observe(img);
            }
        });
    }
}

// Enable JavaScript decorations only after main content loads
function enableDeferredEnhancements() {
    // Add a class to indicate JS is enabled
    document.documentElement.classList.add('js-loaded');

    // Load non-critical theme scripts
    if (!isMobile) {
        const themes = document.createElement('script');
        themes.src = '/js/bg-full.js';
        themes.type = 'module';
        document.body.appendChild(themes);
    }
}

// Monitor Largest Contentful Paint
function monitorLCP() {
    // Use Performance Observer to identify the LCP element
    const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];

        // Track the LCP element and time
        lcpTimeStart = lastEntry.startTime;

        // Try to identify the element
        try {
            lcpElement = document.querySelector(`[elementtiming="${lastEntry.element.elementTiming}"]`) ||
                lastEntry.element || null;

            if (lcpElement) {
                lcpElement.setAttribute('data-was-lcp', 'true');
            }
        } catch (e) {
            // Silent fail
        }
    });

    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
}

// Execute immediately
document.addEventListener('DOMContentLoaded', () => {
    // Prioritize critical content right away
    prioritizeCriticalContent();

    // Start monitoring LCP
    if ('PerformanceObserver' in window) {
        monitorLCP();
    }

    // Defer non-critical resources
    if ('IntersectionObserver' in window) {
        deferNonCriticalResources();
    }

    // Enable deferred enhancements after critical content loads
    if (isMobile) {
        // Wait longer on mobile
        setTimeout(enableDeferredEnhancements, 2000);
    } else {
        // Load sooner on desktop
        setTimeout(enableDeferredEnhancements, 500);
    }
});

// Expose metrics for debugging
window.getPerformanceMetrics = () => {
    return {
        lcpElement,
        lcpTime: lcpTimeStart,
        connection: connection ? connection.effectiveType : 'unknown',
        isMobile,
        isSlow: isSlowConnection
    };
};