// Optimized scroll handling script with throttling for better performance
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

function onScroll() {
  const header = document.getElementById("header");

  // Use requestAnimationFrame for smoother performance
  requestAnimationFrame(() => {
    if (window.scrollY > 0) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Throttle scroll event to improve performance on mobile
document.addEventListener("scroll", throttle(onScroll, 100));

// Initialize on page load
document.addEventListener("DOMContentLoaded", onScroll);

// Handle Astro page transitions
document.addEventListener("astro:after-swap", onScroll);

/**
 * scroll.js - Optimizes below-the-fold content loading
 * 
 * This script:
 * 1. Delays loading of non-essential elements until scrolled into view
 * 2. Uses Intersection Observer for efficient loading
 * 3. Helps improve Speed Index on mobile by focusing initial resources
 */

// Only apply these optimizations on mobile devices
const isMobile = window.innerWidth <= 768;

// Skip if reduced motion is preferred
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (!isMobile) return; // Only apply on mobile

  // Target elements that can be lazy-loaded
  const lazyElements = [
    '.footer-section',
    '.related-posts',
    '.comments-section',
    '.social-sharing',
    'section:not(:first-of-type)',
    '.project-card:not(:nth-of-type(-n+3))',
    '.blog-card:not(:nth-of-type(-n+3))'
  ];

  // Apply content-visibility to these elements for better rendering performance
  if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;

          // Remove optimization attributes when in viewport
          element.style.contentVisibility = 'visible';
          element.style.contain = 'none';

          if (element.dataset.srcset) {
            element.srcset = element.dataset.srcset;
            element.removeAttribute('data-srcset');
          }

          if (element.dataset.src) {
            element.src = element.dataset.src;
            element.removeAttribute('data-src');
          }

          element.classList.add('in-viewport');

          // Stop observing this element
          lazyObserver.unobserve(element);
        }
      });
    }, {
      rootMargin: '200px 0px', // Load a bit before they come into view
      threshold: 0.01
    });

    // Select all elements that can be optimized
    lazyElements.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        // Make sure it's not already in the viewport
        const rect = el.getBoundingClientRect();
        if (rect.top > window.innerHeight) {
          // Apply optimization
          el.style.contentVisibility = 'auto';
          el.style.contain = 'layout style paint';

          // Provide size hint to reduce layout shift
          el.style.containIntrinsicSize = '0 ' + Math.max(100, rect.height || 300) + 'px';

          // For images, use data attributes
          const images = el.querySelectorAll('img:not([loading="eager"]):not([data-lcp="true"])');
          images.forEach(img => {
            if (img.src && !img.dataset.src) {
              img.dataset.src = img.src;
              img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
            }

            if (img.srcset && !img.dataset.srcset) {
              img.dataset.srcset = img.srcset;
              img.srcset = '';
            }
          });

          // Observe this element
          lazyObserver.observe(el);
        }
      });
    });
  }

  // Implement progressive enhancement for animations
  if (!prefersReducedMotion) {
    // Wait until first paint is complete
    requestAnimationFrame(() => {
      // Wait a bit more for main content to load
      setTimeout(() => {
        // Apply fade-in animations to elements as they scroll into view
        const animateObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
              animateObserver.unobserve(entry.target);
            }
          });
        }, {
          rootMargin: '0px',
          threshold: 0.1
        });

        // Get elements to animate
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
          animateObserver.observe(el);
        });
      }, 1000);
    });
  }
});

// Add style for animations
if (isMobile && !prefersReducedMotion) {
  const style = document.createElement('style');
  style.textContent = `
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    }
    
    .animate-on-scroll.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    .in-viewport {
      will-change: auto !important;
    }
  `;
  document.head.appendChild(style);
}
