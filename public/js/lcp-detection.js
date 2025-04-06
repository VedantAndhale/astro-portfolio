/**
 * lcp-detection.js - Automatically detects and prioritizes LCP elements
 * 
 * This script:
 * 1. Uses the Performance Observer API to identify what element is your actual LCP
 * 2. Saves this information to localStorage for future visits
 * 3. Pre-prioritizes likely LCP elements on future page loads
 */

// Only run on mobile devices where LCP optimization matters most
const isMobile = window.innerWidth <= 768;

// Store for potential LCP elements we've seen
let lcpCandidates = new Set();
let lcpElement = null;
let lcpSelector = '';

// Check if we have a saved LCP selector from previous visits
function checkSavedLCPData() {
    try {
        const savedLCPData = localStorage.getItem('lcp-data');
        if (savedLCPData) {
            const data = JSON.parse(savedLCPData);
            if (data.selector && data.url === window.location.pathname) {
                lcpSelector = data.selector;

                // Pre-prioritize this element immediately
                prioritizeElement(lcpSelector);
                return true;
            }
        }
    } catch (e) {
        // Silent fail - localStorage might be disabled
    }
    return false;
}

// Create a simple CSS selector for an element (basic version)
function getSimpleSelector(element) {
    if (!element || !element.tagName) return '';

    let selector = element.tagName.toLowerCase();

    // Add id if present
    if (element.id) {
        selector += '#' + element.id;
    }
    // Otherwise try to create a more specific selector
    else {
        // Add classes (but limit to first 2 to keep selector simple)
        if (element.classList.length) {
            const classNames = Array.from(element.classList).slice(0, 2);
            classNames.forEach(className => {
                selector += '.' + className;
            });
        }

        // Add position for images if needed
        if (selector === 'img' || selector === 'picture') {
            const images = document.querySelectorAll(selector);
            if (images.length > 1) {
                const index = Array.from(images).indexOf(element);
                if (index !== -1) {
                    selector += `:nth-of-type(${index + 1})`;
                }
            }
        }

        // For text elements, add some content context
        if (['h1', 'h2', 'h3', 'p'].includes(selector) && element.textContent) {
            const text = element.textContent.trim().substring(0, 20);
            if (text) {
                selector += `:contains("${text}")`;
            }
        }
    }

    return selector;
}

// Apply high priority loading to an element matching the selector
function prioritizeElement(selector) {
    if (!selector) return;

    // Try to find the element
    const elements = document.querySelectorAll(selector);
    if (!elements || elements.length === 0) return;

    // Apply optimizations to the element
    elements.forEach(el => {
        // Mark for developer tools
        el.setAttribute('data-lcp', 'true');

        // For images, apply fetch priority and optimize loading
        if (el.tagName === 'IMG') {
            el.setAttribute('fetchpriority', 'high');
            el.setAttribute('loading', 'eager');
            el.setAttribute('decoding', 'sync');

            // Add a preload hint for the image
            const imgSrc = el.currentSrc || el.src;
            if (imgSrc && imgSrc.startsWith('/')) {
                const preload = document.createElement('link');
                preload.rel = 'preload';
                preload.href = imgSrc;
                preload.as = 'image';
                preload.fetchPriority = 'high';
                document.head.appendChild(preload);
            }
        }

        // For text elements, ensure they render quickly
        if (['H1', 'H2', 'P', 'SPAN', 'DIV'].includes(el.tagName)) {
            el.style.contentVisibility = 'auto';
            el.style.contain = 'none'; // Don't constrain the LCP text element
        }
    });
}

// Save LCP data to localStorage for future visits
function saveLCPData(selector, element) {
    try {
        const lcpData = {
            selector: selector,
            url: window.location.pathname,
            timestamp: Date.now(),
            elementType: element?.tagName?.toLowerCase() || 'unknown'
        };

        localStorage.setItem('lcp-data', JSON.stringify(lcpData));
    } catch (e) {
        // Silent fail
    }
}

// Use PerformanceObserver to identify the LCP element
function observeLCP() {
    if (!('PerformanceObserver' in window)) return;

    try {
        const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];

            if (lastEntry && lastEntry.element) {
                lcpElement = lastEntry.element;
                const newSelector = getSimpleSelector(lcpElement);

                if (newSelector && newSelector !== lcpSelector) {
                    lcpSelector = newSelector;
                    saveLCPData(lcpSelector, lcpElement);
                }
            }
        });

        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
        // Silent fail - PerformanceObserver might not work with all elements
    }
}

// Initialize on mobile only
if (isMobile) {
    // First check if we have saved LCP data
    const hasSavedData = checkSavedLCPData();

    // Start observing to collect or update LCP data
    observeLCP();

    // If we don't have saved data, make an educated guess about LCP elements
    if (!hasSavedData) {
        // Common LCP candidates
        const candidates = [
            'img.hero-image',
            'header img',
            '.intro img',
            'h1',
            '.hero h1',
            '.hero-text',
            '.intro-text'
        ];

        // Prioritize likely candidates
        candidates.forEach(selector => {
            if (document.querySelector(selector)) {
                prioritizeElement(selector);
            }
        });
    }
}

// Export for debugging
window.lcpDebug = {
    getLCPSelector: () => lcpSelector,
    getLCPElement: () => lcpElement
};