/**
 * This script handles the interactive elements of the website:
 * 1. Toggling the mobile navigation menu.
 * 2. Toggling the light/dark theme and saving the user's preference.
 * 3. Powering the testimonial carousel with swipe and scroll functionality.
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
  
  // --- Testimonial Carousel ---
  const carousel = document.querySelector('.testimonials-grid');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (carousel && prevBtn && nextBtn) {
    let currentIndex = 0;
    let items = carousel.querySelectorAll('.testimonial-card');
    let totalItems = items.length;
    let itemsVisible = 1;

    const updateItemsVisible = () => {
        if (window.innerWidth >= 1024) {
            itemsVisible = 3;
        } else if (window.innerWidth >= 768) {
            itemsVisible = 2;
        } else {
            itemsVisible = 1;
        }
    };

    const updateCarousel = () => {
      const itemWidth = items[0].offsetWidth;
      const gap = parseInt(window.getComputedStyle(carousel).gap);
      const totalWidth = itemWidth + gap;
      carousel.style.transform = `translateX(-${currentIndex * totalWidth}px)`;

      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= totalItems - itemsVisible;
    };

    nextBtn.addEventListener('click', () => {
      if (currentIndex < totalItems - itemsVisible) {
        currentIndex++;
        updateCarousel();
      }
    });

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    // Swipe functionality
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    const handleSwipe = () => {
        if (touchEndX < touchStartX) {
            nextBtn.click();
        }
        if (touchEndX > touchStartX) {
            prevBtn.click();
        }
    };
    
    // Scroll functionality
    carousel.addEventListener('wheel', (e) => {
        const isScrollingRight = e.deltaX > 0 || e.deltaY > 0;
        const isScrollingLeft = e.deltaX < 0 || e.deltaY < 0;

        const atStart = currentIndex === 0;
        const atEnd = currentIndex >= totalItems - itemsVisible;

        // If trying to scroll past the boundaries, allow the page to scroll.
        if ((isScrollingLeft && atStart) || (isScrollingRight && atEnd)) {
            return;
        }

        // Otherwise, prevent page scroll and move the carousel.
        e.preventDefault();
        if (isScrollingRight) {
            nextBtn.click();
        } else if (isScrollingLeft) {
            prevBtn.click();
        }
    }, { passive: false });

    window.addEventListener('resize', () => {
        updateItemsVisible();
        updateCarousel();
    });
    
    // Initial setup
    updateItemsVisible();
    updateCarousel();
  }
});
