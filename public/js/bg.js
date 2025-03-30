// Advanced background effects for premium data portfolio - Optimized for performance
function generateParticles(n, color = '#000') {
  // For low-performance devices, reduce particle count
  const isMobile = window.innerWidth < 768;
  const isLowPerf = isLowEndDevice();
  // Further reduce particle count for better performance
  const particleCount = isLowPerf ? Math.floor(n / 10) : (isMobile ? Math.floor(n / 6) : Math.floor(n / 1.5));

  let value = `${getRandom(2560)}px ${getRandom(2560)}px ${color}`;
  for (let i = 2; i <= particleCount; i++) {
    value += `, ${getRandom(2560)}px ${getRandom(2560)}px ${color}`;
  }
  return value;
}

function generateStars(n, colors = ['#fff', '#e6f2ff', '#d9ecff']) {
  // For low-performance devices, reduce star count
  const isMobile = window.innerWidth < 768;
  const isLowPerf = isLowEndDevice();
  // Further reduce star count for better performance
  const starCount = isLowPerf ? Math.floor(n / 8) : (isMobile ? Math.floor(n / 4) : Math.floor(n / 1.5));

  let value = '';
  for (let i = 1; i <= starCount; i++) {
    const x = getRandom(2560);
    const y = getRandom(2560);
    const color = getRandomFromArray(colors);

    if (i > 1) value += ', ';
    value += `${x}px ${y}px ${color}`;
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

function generateDataPoints(n, maxSize = 3) {
  // For low-performance devices, reduce data point count
  const isMobile = window.innerWidth < 768;
  const isLowPerf = isLowEndDevice();
  // Further reduce data point count for better performance
  const pointCount = isLowPerf ? Math.floor(n / 8) : (isMobile ? Math.floor(n / 5) : Math.floor(n / 1.5));

  // Create data-like visualization points for light mode
  const dataColors = [
    'rgba(59, 130, 246, 0.2)', // blue
    'rgba(99, 102, 241, 0.2)',  // indigo
    'rgba(139, 92, 246, 0.15)',  // violet
  ];

  let value = '';
  for (let i = 1; i <= pointCount; i++) {
    const x = getRandom(2560);
    const y = getRandom(2560);
    const size = 1 + Math.random() * maxSize;
    const color = getRandomFromArray(dataColors);

    if (i > 1) value += ', ';
    value += `${x}px ${y}px 0 ${size}px ${color}`;
  }
  return value;
}

function initBG() {
  // Always consider mobile or tablet as lower performance for initial page render
  const isMobile = window.innerWidth < 1024; // Changed from 768 to 1024 to include tablets
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isHighPerformance = !isLowEndDevice() && !isMobile;

  // Skip all animations for users who prefer reduced motion
  if (isReducedMotion) {
    return;
  }

  // Use much lighter effects on initial load - optimize for performance
  const useMinimalEffects = true; // Always start with minimal effects

  // Light mode particles (data-like visualization) - reduced counts
  const particlesSmall = isHighPerformance ? generateParticles(isMobile ? 100 : 300, 'rgba(59, 130, 246, 0.3)') : ''; // blue
  const particlesMedium = isHighPerformance ? generateParticles(isMobile ? 50 : 150, 'rgba(99, 102, 241, 0.25)') : ''; // indigo
  const particlesLarge = isHighPerformance ? generateParticles(isMobile ? 25 : 75, 'rgba(139, 92, 246, 0.2)') : ''; // violet

  // Light mode data points - reduced counts
  const dataPoints = isHighPerformance ? generateDataPoints(isMobile ? 40 : 150, 4) : '';

  // Dark mode stars with varied colors for depth - reduced counts
  const starsSmall = isHighPerformance ? generateStars(isMobile ? 100 : 400, ['#fff', '#e6f2ff', '#d9ecff']) : '';
  const starsMedium = isHighPerformance ? generateStars(isMobile ? 50 : 200, ['#fff', '#e6f2ff', '#b3d9ff']) : '';
  const starsLarge = isHighPerformance ? generateStars(isMobile ? 25 : 100, ['#fff', '#cce6ff', '#99d6ff']) : '';

  // Apply light mode particles
  const particles1 = document.getElementById('particles1');
  const particles2 = document.getElementById('particles2');
  const particles3 = document.getElementById('particles3');

  if (particles1 && isHighPerformance) {
    particles1.style.cssText = `
    width: 1px;
    height: 1px;
    border-radius: 50%;
    box-shadow: ${particlesSmall};
    animation: animateParticle ${isMobile ? 150 : 100}s linear infinite;
    `;
  }
  if (particles2 && isHighPerformance) {
    particles2.style.cssText = `
    width: 1.5px;
    height: 1.5px;
    border-radius: 50%;
    box-shadow: ${particlesMedium};
    animation: animateParticle ${isMobile ? 220 : 160}s linear infinite;
    `;
  }
  if (particles3 && isHighPerformance) {
    particles3.style.cssText = `
    width: 2px;
    height: 2px;
    border-radius: 50%;
    box-shadow: ${dataPoints};
    animation: animateParticle ${isMobile ? 280 : 200}s linear infinite;
    `;
  }

  // Apply dark mode stars
  const stars1 = document.getElementById('stars1');
  const stars2 = document.getElementById('stars2');
  const stars3 = document.getElementById('stars3');

  if (stars1 && isHighPerformance) {
    stars1.style.cssText = `
    width: 1px;
    height: 1px;
    border-radius: 50%;
    box-shadow: ${starsSmall};
    animation: twinkleAnimation ${isMobile ? 90 : 65}s ease infinite;
    `;
  }
  if (stars2 && isHighPerformance) {
    stars2.style.cssText = `
    width: 1.5px;
    height: 1.5px;
    border-radius: 50%;
    box-shadow: ${starsMedium};
    animation: twinkleAnimation ${isMobile ? 120 : 85}s ease infinite;
    `;
  }
  if (stars3 && isHighPerformance) {
    stars3.style.cssText = `
    width: 2.5px;
    height: 2.5px;
    border-radius: 50%;
    box-shadow: ${starsLarge};
    animation: twinkleAnimation ${isMobile ? 150 : 105}s ease infinite;
    `;
  }

  // Skip additional animations on initial load - add them later if needed
  if (isHighPerformance && !useMinimalEffects) {
    // This will now only run after upgrade
    initDataAnimations();
  }
}

function initDataAnimations() {
  // Create data-specific floating elements - only for high performance devices
  createFloatingDataElements();
}

function createFloatingDataElements() {
  // If reduced motion is preferred, skip this animation
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Only create these elements for desktop, and limit to fewer elements
  if (window.innerWidth < 1200) return;

  const galaxy = document.getElementById('stars3');
  if (!galaxy) return;

  const dataContainer = document.createElement('div');
  dataContainer.className = 'floating-data-container';

  // Significantly reduce the number of elements to improve performance
  const maxElements = 8; // Reduced from 15
  const shapes = ['circle', 'square', 'triangle', 'diamond', 'wave'];

  for (let i = 0; i < maxElements; i++) {
    const element = document.createElement('div');
    const shape = getRandomFromArray(shapes);
    element.className = `floating-data-element ${shape}`;

    // Random positions and sizes
    const size = 10 + Math.random() * 25; // Reduced max size
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 18 + Math.random() * 15; // Slowed down animations

    element.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      top: ${y}%;
      opacity: ${0.1 + Math.random() * 0.15}; /* Reduced opacity */
      pointer-events: none;
      animation: floatData ${duration}s ease-in-out infinite;
      animation-delay: ${delay}s;
    `;

    // Different shapes
    if (shape === 'circle') {
      element.style.borderRadius = '50%';
      element.style.border = '1px solid rgba(59, 130, 246, 0.3)';
    } else if (shape === 'square') {
      element.style.border = '1px solid rgba(99, 102, 241, 0.3)';
    } else if (shape === 'triangle') {
      element.style.width = '0';
      element.style.height = '0';
      element.style.borderLeft = `${size / 2}px solid transparent`;
      element.style.borderRight = `${size / 2}px solid transparent`;
      element.style.borderBottom = `${size}px solid rgba(139, 92, 246, 0.2)`;
    } else if (shape === 'diamond') {
      element.style.transform = 'rotate(45deg)';
      element.style.border = '1px solid rgba(79, 70, 229, 0.3)';
    } else if (shape === 'wave') {
      element.style.height = `${size / 4}px`;
      element.style.width = `${size * 1.5}px`;
      element.style.borderRadius = `${size}px`;
      element.style.border = '1px solid rgba(59, 130, 246, 0.2)';
    }

    dataContainer.appendChild(element);
  }

  galaxy.appendChild(dataContainer);

  // Add keyframe animation if it doesn't exist
  if (!document.getElementById('data-animations')) {
    const style = document.createElement('style');
    style.id = 'data-animations';
    style.textContent = `
      @keyframes floatData {
        0%, 100% {
          transform: translateY(0) rotate(0);
        }
        25% {
          transform: translateY(-20px) rotate(5deg);
        }
        50% {
          transform: translateY(-30px) rotate(-5deg);
        }
        75% {
          transform: translateY(-15px) rotate(3deg);
        }
      }
      
      @keyframes twinkleAnimation {
        0%, 100% {
          opacity: 0.8;
        }
        50% {
          opacity: 0.6;
        }
      }
    `;
    document.head.appendChild(style);
  }
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

// Initialize the background effects after page load, with much longer delay
document.addEventListener('DOMContentLoaded', function () {
  // Create intersection observer to only initialize animations when scrolled into view
  if ('IntersectionObserver' in window) {
    // Initialize minimal background for above-the-fold content
    setTimeout(() => {
      requestIdleCallback(function () {
        initBG();
      });
    }, 2000); // Increased to 2 seconds to help improve LCP
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    setTimeout(() => {
      initBG();
    }, 2000);
  }
});