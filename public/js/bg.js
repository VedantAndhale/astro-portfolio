// Advanced background effects for premium data portfolio - Optimized for performance
function generateParticles(n, color = '#000') {
  // For low-performance devices, reduce particle count
  const isMobile = window.innerWidth < 768;
  const isLowPerf = isLowEndDevice();
  // Further reduce particle count for better performance
  const particleCount = isLowPerf ? Math.floor(n / 20) : (isMobile ? Math.floor(n / 12) : Math.floor(n / 1.5));

  let value = `${getRandom(2560)}px ${getRandom(2560)}px ${color}`;
  for (let i = 2; i <= particleCount; i++) {
    value += `, ${getRandom(2560)}px ${getRandom(2560)}px ${color}`;
  }
  return value;
}

// Simple utility functions
function getRandom(max) {
  return Math.floor(Math.random() * max);
}

function getRandomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Detect low-end devices to reduce animations
function isLowEndDevice() {
  // Check if this is a mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // If it's a mobile device or has a small screen, consider it low-end
  if (isMobile || window.innerWidth < 768) {
    return true;
  }

  // Check for hardware concurrency (CPU cores)
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
    return true;
  }

  // Check for device memory
  if (navigator.deviceMemory && navigator.deviceMemory <= 4) {
    return true;
  }

  return false;
}

// Lazy-load and initialize the background effects
function initBG() {
  // Skip all animations for users who prefer reduced motion or on mobile
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) {
    return;
  }

  // Add data-loading="true" attribute to indicate loading state
  document.documentElement.setAttribute('data-bg-loading', 'true');

  // Import the full animation script only for desktop devices
  if (window.innerWidth >= 768 && !isLowEndDevice()) {
    import('./bg-full.js')
      .then(module => {
        if (typeof module.initFullBG === 'function') {
          module.initFullBG();
        }
      })
      .catch(() => {
        // Silently fail - decorative animations are non-essential
        document.documentElement.removeAttribute('data-bg-loading');
      });
  }
}

// Wait until the page is fully loaded and idle
if ('requestIdleCallback' in window) {
  // Use requestIdleCallback for modern browsers
  window.addEventListener('load', () => {
    requestIdleCallback(() => setTimeout(initBG, 3000), { timeout: 4000 });
  });
} else {
  // Fallback for browsers that don't support requestIdleCallback
  window.addEventListener('load', () => {
    setTimeout(initBG, 3500);
  });
}