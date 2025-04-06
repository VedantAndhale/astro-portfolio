// Advanced background effects - Full version for desktop only
// This file is dynamically imported only for high-performance devices

function generateStars(n, colors = ['#fff', '#e6f2ff', '#d9ecff']) {
    const starCount = Math.floor(n / 1.5);

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

function generateDataPoints(n, maxSize = 3) {
    const pointCount = Math.floor(n / 1.5);

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

// Simple utility functions
function getRandom(max) {
    return Math.floor(Math.random() * max);
}

function getRandomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function initFullBG() {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Skip all animations for users who prefer reduced motion
    if (isReducedMotion) {
        return;
    }

    // Light mode particles (data-like visualization)
    const particlesSmall = generateParticles(300, 'rgba(59, 130, 246, 0.3)'); // blue
    const particlesMedium = generateParticles(150, 'rgba(99, 102, 241, 0.25)'); // indigo
    const particlesLarge = generateParticles(75, 'rgba(139, 92, 246, 0.2)'); // violet

    // Light mode data points
    const dataPoints = generateDataPoints(150, 4);

    // Dark mode stars with varied colors for depth
    const starsSmall = generateStars(400, ['#fff', '#e6f2ff', '#d9ecff']);
    const starsMedium = generateStars(200, ['#fff', '#e6f2ff', '#b3d9ff']);
    const starsLarge = generateStars(100, ['#fff', '#cce6ff', '#99d6ff']);

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
    animation: animateParticle 100s linear infinite;
    `;
    }
    if (particles2) {
        particles2.style.cssText = `
    width: 1.5px;
    height: 1.5px;
    border-radius: 50%;
    box-shadow: ${particlesMedium};
    animation: animateParticle 160s linear infinite;
    `;
    }
    if (particles3) {
        particles3.style.cssText = `
    width: 2px;
    height: 2px;
    border-radius: 50%;
    box-shadow: ${dataPoints};
    animation: animateParticle 200s linear infinite;
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
    animation: twinkleAnimation 65s ease infinite;
    `;
    }
    if (stars2) {
        stars2.style.cssText = `
    width: 1.5px;
    height: 1.5px;
    border-radius: 50%;
    box-shadow: ${starsMedium};
    animation: twinkleAnimation 85s ease infinite;
    `;
    }
    if (stars3) {
        stars3.style.cssText = `
    width: 2.5px;
    height: 2.5px;
    border-radius: 50%;
    box-shadow: ${starsLarge};
    animation: twinkleAnimation 105s ease infinite;
    `;
    }

    // Add keyframe animation if it doesn't exist
    if (!document.getElementById('data-animations')) {
        const style = document.createElement('style');
        style.id = 'data-animations';
        style.textContent = `
      @keyframes animateParticle {
        0% {
          transform: translateY(0) rotate(0);
        }
        100% {
          transform: translateY(-2000px) rotate(600deg);
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

    // Remove the loading state
    document.documentElement.removeAttribute('data-bg-loading');
}

// Export the initFullBG function to be called from the main script
export { initFullBG, generateParticles };