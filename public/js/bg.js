// Advanced background effects for premium data portfolio - Optimized for performance
function generateParticles(n, color = '#000') {
  // For low-performance devices, reduce particle count
  const isMobile = window.innerWidth < 768;
  const isLowPerf = isLowEndDevice();
  const particleCount = isLowPerf ? Math.floor(n / 8) : (isMobile ? Math.floor(n / 5) : n);

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
  const starCount = isLowPerf ? Math.floor(n / 5) : (isMobile ? Math.floor(n / 3) : n);

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
  const pointCount = isLowPerf ? Math.floor(n / 6) : (isMobile ? Math.floor(n / 4) : n);

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
  // Detect if this is a high performance device
  const isHighPerformance = !isLowEndDevice();
  const isMobile = window.innerWidth < 768;
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // If user prefers reduced motion, skip complex animations
  if (isReducedMotion) {
    return;
  }

  // Light mode particles (data-like visualization)
  const particlesSmall = isHighPerformance ? generateParticles(isMobile ? 200 : 500, 'rgba(59, 130, 246, 0.3)') : ''; // blue
  const particlesMedium = isHighPerformance ? generateParticles(isMobile ? 100 : 250, 'rgba(99, 102, 241, 0.25)') : ''; // indigo
  const particlesLarge = isHighPerformance ? generateParticles(isMobile ? 50 : 125, 'rgba(139, 92, 246, 0.2)') : ''; // violet

  // Light mode data points
  const dataPoints = isHighPerformance ? generateDataPoints(isMobile ? 75 : 250, 4) : '';

  // Dark mode stars with varied colors for depth
  const starsSmall = isHighPerformance ? generateStars(isMobile ? 200 : 700, ['#fff', '#e6f2ff', '#d9ecff']) : '';
  const starsMedium = isHighPerformance ? generateStars(isMobile ? 100 : 350, ['#fff', '#e6f2ff', '#b3d9ff']) : '';
  const starsLarge = isHighPerformance ? generateStars(isMobile ? 50 : 175, ['#fff', '#cce6ff', '#99d6ff']) : '';

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
    animation: animateParticle ${isMobile ? 120 : 80}s linear infinite;
    `;
  }
  if (particles2 && isHighPerformance) {
    particles2.style.cssText = `
    width: 1.5px;
    height: 1.5px;
    border-radius: 50%;
    box-shadow: ${particlesMedium};
    animation: animateParticle ${isMobile ? 180 : 120}s linear infinite;
    `;
  }
  if (particles3 && isHighPerformance) {
    particles3.style.cssText = `
    width: 2px;
    height: 2px;
    border-radius: 50%;
    box-shadow: ${dataPoints};
    animation: animateParticle ${isMobile ? 240 : 160}s linear infinite;
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
    animation: twinkleAnimation ${isMobile ? 75 : 50}s ease infinite;
    `;
  }
  if (stars2 && isHighPerformance) {
    stars2.style.cssText = `
    width: 1.5px;
    height: 1.5px;
    border-radius: 50%;
    box-shadow: ${starsMedium};
    animation: twinkleAnimation ${isMobile ? 105 : 70}s ease infinite;
    `;
  }
  if (stars3 && isHighPerformance) {
    stars3.style.cssText = `
    width: 2.5px;
    height: 2.5px;
    border-radius: 50%;
    box-shadow: ${starsLarge};
    animation: twinkleAnimation ${isMobile ? 135 : 90}s ease infinite;
    `;
  }

  // Add data-focused animation for high-performance devices only
  if (isHighPerformance && !isMobile) {
    // Delay non-critical animations to after initial rendering
    requestIdleCallback(() => {
      initDataAnimations();
    });
  }
}

function initDataAnimations() {
  // Create data-specific floating elements
  createFloatingDataElements();
}

function createFloatingDataElements() {
  // If reduced motion is preferred, skip this animation
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Only create these elements for desktop
  if (window.innerWidth < 1024) return;

  const galaxy = document.getElementById('stars3');
  if (!galaxy) return;

  const dataContainer = document.createElement('div');
  dataContainer.className = 'floating-data-container';

  // Limit the number of elements to avoid performance issues
  const maxElements = 15;
  const shapes = ['circle', 'square', 'triangle', 'diamond', 'wave'];

  for (let i = 0; i < maxElements; i++) {
    const element = document.createElement('div');
    const shape = getRandomFromArray(shapes);
    element.className = `floating-data-element ${shape}`;

    // Random positions and sizes
    const size = 10 + Math.random() * 30;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 15 + Math.random() * 20;

    element.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      top: ${y}%;
      opacity: ${0.1 + Math.random() * 0.2};
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

// Use requestIdleCallback or a polyfill to initialize non-critical visuals
const requestIdleCallback =
  window.requestIdleCallback ||
  function (cb) {
    const start = Date.now();
    return setTimeout(function () {
      cb({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start));
        }
      });
    }, 1);
  };

// Initialize the background effects after page load
document.addEventListener('DOMContentLoaded', function () {
  // Significantly delay bg effects until after critical content is loaded and painted
  setTimeout(() => {
    requestIdleCallback(function () {
      initBG();
    });
  }, 1000); // 1 second delay helps to improve Speed Index
});