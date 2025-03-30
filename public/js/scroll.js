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
