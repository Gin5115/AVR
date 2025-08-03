/**
 * This script handles the interactive elements of the website:
 * 1. Toggling the mobile navigation menu.
 * 2. Toggling the light/dark theme and saving the user's preference.
 * 3. Animating elements into view as the user scrolls.
 */
document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Menu Toggle ---
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.style.display === 'none' || mobileMenu.style.display === '';
      mobileMenu.style.display = isHidden ? 'block' : 'none';
    });
  }

  // --- Theme Toggle ---
  const themeToggleButton = document.getElementById('theme-toggle');
  const htmlElement = document.getElementById('html-element');

  if (themeToggleButton && htmlElement) {
    const applyTheme = (theme) => {
      if (theme === 'dark') {
        htmlElement.classList.add('dark-mode');
      } else {
        htmlElement.classList.remove('dark-mode');
      }
      localStorage.setItem('theme', theme);
    };

    themeToggleButton.addEventListener('click', () => {
      const isDarkMode = htmlElement.classList.contains('dark-mode');
      applyTheme(isDarkMode ? 'light' : 'dark');
    });

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      applyTheme(savedTheme);
    } else if (prefersDark) {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
  }
  
  // --- Testimonial Carousel has been removed ---
  // The section is now a responsive CSS grid and no longer requires JavaScript.

  // --- Scroll Reveal Animation ---
  // Select all elements that should fade in
  const fadeInElements = document.querySelectorAll('.fade-in-element');

  if (fadeInElements.length > 0) {
    // Set up the Intersection Observer
    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        // If the element is intersecting (visible)
        if (entry.isIntersecting) {
          // Add the 'is-visible' class to trigger the animation
          entry.target.classList.add('is-visible');
          // Stop observing the element so the animation only happens once
          observer.unobserve(entry.target);
        }
      });
    };

    // Create a new observer
    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each of the fade-in elements
    fadeInElements.forEach(el => scrollObserver.observe(el));
  }
});
