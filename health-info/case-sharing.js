// ============================================================================
// Case Sharing - Interactive Navigation & 3D Effects
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const navItems = document.querySelectorAll(".nav-item");
  const caseDetails = document.querySelectorAll(".case-detail");
  const detailCard = document.querySelector(".detail-card");

  // ============================================================================
  // Navigation Click Handlers
  // ============================================================================

  /**
   * Switch between different cases
   */
  function switchCase(caseId) {
    // Update navigation active state
    navItems.forEach((item) => {
      const itemId = item.getAttribute("data-case-id");
      if (itemId === caseId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Update case detail visibility with fade animation
    caseDetails.forEach((detail) => {
      const detailId = detail.getAttribute("data-case-id");

      if (detailId === caseId) {
        // First hide, then show with animation
        detail.style.opacity = "0";
        detail.style.display = "block";

        // Force reflow to trigger animation
        void detail.offsetWidth;

        // Fade in
        requestAnimationFrame(() => {
          detail.style.opacity = "1";
        });
      } else {
        detail.style.display = "none";
      }
    });
  }

  // Add click event listeners to navigation items
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const caseId = item.getAttribute("data-case-id");
      switchCase(caseId);
    });
  });

  // Initialize first case as active
  if (navItems.length > 0) {
    const firstCaseId = navItems[0].getAttribute("data-case-id");
    switchCase(firstCaseId);
  }

  // ============================================================================
  // Smooth Scroll for Internal Links (if any)
  // ============================================================================

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href !== "#!") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // ============================================================================
  // Accessibility: Keyboard Navigation
  // ============================================================================

  navItems.forEach((item, index) => {
    // Make keyboard accessible
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");

    // Handle keyboard events
    item.addEventListener("keydown", (e) => {
      const caseId = item.getAttribute("data-case-id");

      // Enter or Space to activate
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        switchCase(caseId);
      }

      // Arrow key navigation
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const nextIndex = (index + 1) % navItems.length;
        navItems[nextIndex].focus();
      }

      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIndex = (index - 1 + navItems.length) % navItems.length;
        navItems[prevIndex].focus();
      }
    });
  });

  // ============================================================================
  // Performance: Reduce Motion for Accessibility
  // ============================================================================

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (prefersReducedMotion.matches && detailCard) {
    // Disable 3D tilt for users who prefer reduced motion
    detailCard.removeEventListener("mousemove", () => {});
    detailCard.removeEventListener("mouseleave", () => {});
  }
});
