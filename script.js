/**
 * This script handles the interactive elements of the website:
 * 1. Toggling the mobile navigation menu.
 * 2. Toggling the light/dark theme and saving the user's preference.
 */
document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Menu Toggle ---
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  // Check if the menu button and mobile menu exist before adding event listener
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      // Toggle the display of the mobile menu
      const isHidden = mobileMenu.style.display === 'none' || mobileMenu.style.display === '';
      mobileMenu.style.display = isHidden ? 'block' : 'none';
    });
  }

  // --- Theme Toggle ---
  const themeToggleButton = document.getElementById('theme-toggle');
  const htmlElement = document.getElementById('html-element');

  // Check if the theme toggle button and HTML element exist
  if (themeToggleButton && htmlElement) {
    
    /**
     * Applies the specified theme by adding or removing the 'dark-mode' class
     * from the HTML element and saves the preference to localStorage.
     * @param {string} theme - The theme to apply ('dark' or 'light').
     */
    const applyTheme = (theme) => {
      if (theme === 'dark') {
        htmlElement.classList.add('dark-mode');
      } else {
        htmlElement.classList.remove('dark-mode');
      }
      // Save the user's preference to local storage for persistence
      localStorage.setItem('theme', theme);
    };

    // Add a click event listener to the theme toggle button
    themeToggleButton.addEventListener('click', () => {
      const isDarkMode = htmlElement.classList.contains('dark-mode');
      // Switch to the opposite theme
      applyTheme(isDarkMode ? 'light' : 'dark');
    });

    // --- Initial Theme Determination on Page Load ---

    // 1. Check for a theme preference saved in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // 2. Check for the user's OS-level preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      // If a theme is saved in localStorage, use it
      applyTheme(savedTheme);
    } else if (prefersDark) {
      // Otherwise, if the OS prefers dark mode, apply it
      applyTheme('dark');
    } else {
      // As a fallback, default to light mode
      applyTheme('light');
    }
  }
});
