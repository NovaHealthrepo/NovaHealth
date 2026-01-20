/* ============================================================================
   Our Strengths Page JavaScript
   為何選擇芯凝 - Interactive Features
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all modules
  initCardFlip();
  initTemplateGallery();
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
   Template Gallery
   ========================================================================== */

function initTemplateGallery() {
  const templateImages = document.querySelectorAll(".template-gallery__image");
  const prevArrow = document.querySelector(".template-gallery__arrow--left");
  const nextArrow = document.querySelector(".template-gallery__arrow--right");
  const indicators = document.querySelectorAll(".template-gallery__indicator");
  const galleryContainer = document.querySelector(
    ".template-gallery__container",
  );

  let currentTemplateIndex = 0;

  function showTemplate(index) {
    // Remove active class from all images and indicators
    templateImages.forEach((img) => img.classList.remove("active"));
    indicators.forEach((ind) => ind.classList.remove("active"));

    // Add active class to current image and indicator
    if (templateImages[index]) {
      templateImages[index].classList.add("active");
    }
    if (indicators[index]) {
      indicators[index].classList.add("active");
    }

    currentTemplateIndex = index;
  }

  function nextTemplate() {
    const nextIndex = (currentTemplateIndex + 1) % templateImages.length;
    showTemplate(nextIndex);
  }

  function prevTemplate() {
    const nextIndex =
      (currentTemplateIndex - 1 + templateImages.length) %
      templateImages.length;
    showTemplate(nextIndex);
  }

  // Arrow button events
  if (nextArrow) {
    nextArrow.addEventListener("click", nextTemplate);
  }

  if (prevArrow) {
    prevArrow.addEventListener("click", prevTemplate);
  }

  // Indicator click events
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showTemplate(index);
    });
  });

  // Keyboard navigation for template gallery
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      if (prevArrow) prevTemplate();
    } else if (e.key === "ArrowRight") {
      if (nextArrow) nextTemplate();
    }
  });

  // Click to enlarge
  if (galleryContainer) {
    galleryContainer.addEventListener("click", () => {
      const activeImage = document.querySelector(
        ".template-gallery__image.active",
      );
      if (activeImage) {
        openModal(activeImage.src, activeImage.alt);
      }
    });
  }

  // Modal functionality
  function openModal(src, alt) {
    // Create modal if it doesn't exist
    let modal = document.querySelector(".template-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "template-modal";
      modal.innerHTML = `
        <button class="template-modal__close" aria-label="關閉">&times;</button>
        <img class="template-modal__content" src="" alt="">
      `;
      document.body.appendChild(modal);

      // Close modal on click
      const closeBtn = modal.querySelector(".template-modal__close");
      closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
      });

      // Close modal on background click
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("active");
        }
      });

      // Close modal on Escape key
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
          modal.classList.remove("active");
        }
      });
    }

    // Set image and show modal
    const modalImg = modal.querySelector(".template-modal__content");
    modalImg.src = src;
    modalImg.alt = alt;
    modal.classList.add("active");
  }
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
    ".strength-card, .feature-item, .process-detail, .process-step",
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
      { threshold: 0.5 },
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
