/* ============================================================================
   Our Strengths Page JavaScript
   為何選擇芯凝 - Interactive Features
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all modules
  initCardFlip();
  initGallery();
  initSmoothScroll();
  initScrollAnimations();
  initKeyboardNavigation();
});

/* ============================================================================
   Card Flip Interaction
   ========================================================================== */

function initCardFlip() {
  const cards = document.querySelectorAll(".strength-card");

  cards.forEach((card) => {
    const toggleBtn = card.querySelector(".strength-card__toggle");
    const closeBtn = card.querySelector(".strength-card__close");

    // Click toggle button to flip
    if (toggleBtn) {
      toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        flipCard(card);
      });
    }

    // Click close button to unflip
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        unflipCard(card);
      });
    }

    // Click card front to flip
    const cardFront = card.querySelector(".strength-card__front");
    if (cardFront) {
      cardFront.addEventListener("click", () => {
        if (!card.classList.contains("is-flipped")) {
          flipCard(card);
        }
      });
    }

    // Touch support for mobile - handle on toggle button specifically
    if (toggleBtn) {
      toggleBtn.addEventListener("touchstart", (e) => {
        e.stopPropagation();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("touchstart", (e) => {
        e.stopPropagation();
      });
    }
  });

  // Close flipped card when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".strength-card")) {
      cards.forEach((card) => unflipCard(card));
    }
  });
}

function flipCard(card) {
  // Close other flipped cards first
  document.querySelectorAll(".strength-card.is-flipped").forEach((c) => {
    if (c !== card) {
      unflipCard(c);
    }
  });

  card.classList.add("is-flipped");
  card.setAttribute("aria-expanded", "true");

  // Update toggle button icon
  const toggleIcon = card.querySelector(".strength-card__toggle i");
  if (toggleIcon) {
    toggleIcon.classList.remove("fa-plus");
    toggleIcon.classList.add("fa-minus");
  }
}

function unflipCard(card) {
  card.classList.remove("is-flipped");
  card.setAttribute("aria-expanded", "false");

  // Update toggle button icon
  const toggleIcon = card.querySelector(".strength-card__toggle i");
  if (toggleIcon) {
    toggleIcon.classList.remove("fa-minus");
    toggleIcon.classList.add("fa-plus");
  }
}

/* ============================================================================
   Gallery Slider
   ========================================================================== */

function initGallery() {
  const galleryControls = document.querySelectorAll(".gallery-control");
  const gallerySlides = document.querySelectorAll(".gallery-slide");

  if (galleryControls.length === 0 || gallerySlides.length === 0) return;

  galleryControls.forEach((control) => {
    control.addEventListener("click", () => {
      const slideIndex = parseInt(control.dataset.slide, 10);
      switchSlide(slideIndex, galleryControls, gallerySlides);
    });
  });

  // Auto-play gallery (optional - uncomment to enable)
  // let currentSlide = 0;
  // setInterval(() => {
  //   currentSlide = (currentSlide + 1) % gallerySlides.length;
  //   switchSlide(currentSlide, galleryControls, gallerySlides);
  // }, 5000);
}

function switchSlide(index, controls, slides) {
  // Remove active class from all
  controls.forEach((c) => c.classList.remove("active"));
  slides.forEach((s) => s.classList.remove("active"));

  // Add active class to current
  if (controls[index]) controls[index].classList.add("active");
  if (slides[index]) slides[index].classList.add("active");
}

/* ============================================================================
   Smooth Scroll
   ========================================================================== */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      // Skip if it's just "#" or empty
      if (targetId === "#" || !targetId) return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        // Calculate offset for fixed header
        const headerHeight =
          document.querySelector(".header")?.offsetHeight || 0;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight -
          20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Update URL without jumping
        history.pushState(null, null, targetId);
      }
    });
  });
}

/* ============================================================================
   Scroll-triggered Animations
   ========================================================================== */

function initScrollAnimations() {
  // Check if IntersectionObserver is supported
  if (!("IntersectionObserver" in window)) return;

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        // Optionally unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements that should animate on scroll
  const animatedElements = document.querySelectorAll(
    ".strength-card, .feature-item, .process-detail, .process-step"
  );

  animatedElements.forEach((el, index) => {
    // Add stagger delay
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
  });

  // Re-trigger cycle animation when visible
  const cycleContainer = document.querySelector(".cycle-container");
  if (cycleContainer) {
    const cycleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset and replay animations
            const cyclePath = entry.target.querySelector(".cycle-path");
            const cycleSteps = entry.target.querySelectorAll(".cycle-step");

            if (cyclePath) {
              cyclePath.style.animation = "none";
              cyclePath.offsetHeight; // Trigger reflow
              cyclePath.style.animation = "drawPath 3s ease forwards";
            }

            cycleSteps.forEach((step, i) => {
              step.style.animation = "none";
              step.offsetHeight; // Trigger reflow
              step.style.animation = `fadeInScale 0.5s ease ${
                1 + i * 0.5
              }s forwards`;
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    cycleObserver.observe(cycleContainer);
  }
}

/* ============================================================================
   Keyboard Navigation (Accessibility)
   ========================================================================== */

function initKeyboardNavigation() {
  const cards = document.querySelectorAll(".strength-card");

  cards.forEach((card) => {
    // Make card focusable
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-expanded", "false");

    // Handle keyboard events
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (card.classList.contains("is-flipped")) {
          unflipCard(card);
        } else {
          flipCard(card);
        }
      }

      if (e.key === "Escape") {
        unflipCard(card);
      }
    });
  });

  // Gallery keyboard navigation
  const galleryControls = document.querySelectorAll(".gallery-control");
  galleryControls.forEach((control, index) => {
    control.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = (index + 1) % galleryControls.length;
        galleryControls[nextIndex].click();
        galleryControls[nextIndex].focus();
      }

      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex =
          (index - 1 + galleryControls.length) % galleryControls.length;
        galleryControls[prevIndex].click();
        galleryControls[prevIndex].focus();
      }
    });
  });
}

/* ============================================================================
   Utility: Throttle Function
   ========================================================================== */

function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/* ============================================================================
   Utility: Debounce Function
   ========================================================================== */

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
