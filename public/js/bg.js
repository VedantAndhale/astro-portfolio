// Advanced background effects for premium data portfolio
function generateParticles(n, color = '#000') {
  let value = `${getRandom(2560)}px ${getRandom(2560)}px ${color}`;
  for (let i = 2; i <= n; i++) {
    value += `, ${getRandom(2560)}px ${getRandom(2560)}px ${color}`;
  }
  return value;
}

function generateStars(n, colors = ['#fff', '#e6f2ff', '#d9ecff']) {
  let value = `${getRandom(2560)}px ${getRandom(2560)}px ${getRandomFromArray(colors)}`;
  for (let i = 2; i <= n; i++) {
    value += `, ${getRandom(2560)}px ${getRandom(2560)}px ${getRandomFromArray(colors)}`;
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
  // Create data-like visualization points for light mode
  const dataColors = [
    'rgba(59, 130, 246, 0.2)', // blue
    'rgba(99, 102, 241, 0.2)',  // indigo
    'rgba(139, 92, 246, 0.15)',  // violet
  ];

  let value = '';
  for (let i = 1; i <= n; i++) {
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
  // Light mode particles (data-like visualization)
  const particlesSmall = generateParticles(800, 'rgba(59, 130, 246, 0.3)'); // blue
  const particlesMedium = generateParticles(400, 'rgba(99, 102, 241, 0.25)'); // indigo
  const particlesLarge = generateParticles(200, 'rgba(139, 92, 246, 0.2)'); // violet

  // Light mode data points
  const dataPoints = generateDataPoints(350, 4);

  // Dark mode stars with varied colors for depth
  const starsSmall = generateStars(1000, ['#fff', '#e6f2ff', '#d9ecff']);
  const starsMedium = generateStars(500, ['#fff', '#e6f2ff', '#b3d9ff']);
  const starsLarge = generateStars(250, ['#fff', '#cce6ff', '#99d6ff']);

  // Apply light mode particles
  const particles1 = document.getElementById('particles1');
  const particles2 = document.getElementById('particles2');
  const particles3 = document.getElementById('particles3');

  if (particles1) {
    particles1.style.cssText = `
    width: 1px;
    height: 1px;
    border-radius: 50%;
    box-shadow: ${particlesSmall};
    animation: animateParticle 80s linear infinite;
    `;
  }
  if (particles2) {
    particles2.style.cssText = `
    width: 1.5px;
    height: 1.5px;
    border-radius: 50%;
    box-shadow: ${particlesMedium};
    animation: animateParticle 120s linear infinite;
    `;
  }
  if (particles3) {
    particles3.style.cssText = `
    width: 2px;
    height: 2px;
    border-radius: 50%;
    box-shadow: ${dataPoints};
    animation: animateParticle 160s linear infinite;
    `;
  }

  // Apply dark mode stars
  const stars1 = document.getElementById('stars1');
  const stars2 = document.getElementById('stars2');
  const stars3 = document.getElementById('stars3');

  if (stars1) {
    stars1.style.cssText = `
    width: 1px;
    height: 1px;
    border-radius: 50%;
    box-shadow: ${starsSmall};
    animation: twinkleAnimation 50s ease infinite;
    `;
  }
  if (stars2) {
    stars2.style.cssText = `
    width: 1.5px;
    height: 1.5px;
    border-radius: 50%;
    box-shadow: ${starsMedium};
    animation: twinkleAnimation 70s ease infinite;
    `;
  }
  if (stars3) {
    stars3.style.cssText = `
    width: 2.5px;
    height: 2.5px;
    border-radius: 50%;
    box-shadow: ${starsLarge};
    animation: twinkleAnimation 90s ease infinite;
    `;
  }

  // Add data-focused animation
  initDataAnimations();
}

function initDataAnimations() {
  // Create floating data elements in the background for light mode
  const darkMode = document.documentElement.classList.contains('dark');
  if (!darkMode) {
    createFloatingDataElements();
  }

  // Listen for theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        const darkMode = document.documentElement.classList.contains('dark');
        const dataElements = document.querySelectorAll('.floating-data-element');

        if (!darkMode) {
          if (dataElements.length === 0) {
            createFloatingDataElements();
          } else {
            dataElements.forEach(el => el.style.display = 'block');
          }
        } else {
          dataElements.forEach(el => el.style.display = 'none');
        }
      }
    });
  });

  observer.observe(document.documentElement, { attributes: true });
}

function createFloatingDataElements() {
  // Only create if they don't already exist
  if (document.querySelectorAll('.floating-data-element').length > 0) return;

  const galaxy = document.getElementById('galaxy');
  if (!galaxy) return;

  // Data-focused shapes for light mode
  const shapes = ['circle', 'square', 'triangle', 'diamond', 'wave'];
  const dataContainer = document.createElement('div');
  dataContainer.className = 'floating-data-container';
  dataContainer.style.cssText = `
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    opacity: 0.3;
  `;

  // Create 12 floating data elements
  for (let i = 0; i < 12; i++) {
    const shape = getRandomFromArray(shapes);
    const element = document.createElement('div');
    element.className = `floating-data-element ${shape}`;

    // Random positions and sizes
    const size = 10 + Math.random() * 40;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 15 + Math.random() * 30;

    element.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      top: ${y}%;
      opacity: ${0.1 + Math.random() * 0.3};
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
      element.style.width = `${size * 2}px`;
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
          transform: translateY(-40px) rotate(-5deg);
        }
        75% {
          transform: translateY(-20px) rotate(3deg);
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

// Initialize on page load and after navigation
document.addEventListener('astro:after-swap', initBG);
window.addEventListener('DOMContentLoaded', initBG);