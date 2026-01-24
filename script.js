document.addEventListener("DOMContentLoaded", () => {
  // Set header height for mobile nav positioning - optimized to prevent forced reflow
  const header = document.querySelector(".header");
  if (header) {
    // Cache the header height to avoid repeated reads
    let cachedHeaderHeight = null;

    const setHeaderHeight = () => {
      // Batch the layout read in one RAF
      requestAnimationFrame(() => {
        const headerHeight = header.offsetHeight;
        cachedHeaderHeight = headerHeight;

        // Batch the DOM write in the same RAF
        document.documentElement.style.setProperty(
          "--header-height",
          `${headerHeight}px`,
        );
      });
    };

    setHeaderHeight();

    // Debounce resize event to reduce reflow frequency
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // Invalidate cache on resize
        cachedHeaderHeight = null;
        setHeaderHeight();
      }, 150);
    });
  }

  // Mobile Menu Toggle
  const menuBtn = document.querySelector(".header__menu-toggle");
  const nav = document.querySelector("#nav-menu");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      // Toggle the 'active' class on the nav element
      nav.classList.toggle("active");

      // Change icon from Bars to Times (X)
      const icon = menuBtn.querySelector("i");
      if (icon) {
        if (nav.classList.contains("active")) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-times");
        } else {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
    });
  }

  // Mobile Submenu Toggle
  const submenuItems = document.querySelectorAll(".nav__item--has-submenu");
  submenuItems.forEach((item) => {
    const link = item.querySelector(".nav__link");
    link.addEventListener("click", (e) => {
      // Only prevent default and toggle on mobile
      if (window.innerWidth <= 1200) {
        e.preventDefault();
        item.classList.toggle("active");
      }
    });
  });

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      // Skip if it's just "#" (dropdown toggle) or parent has submenu
      if (
        targetId === "#" ||
        this.parentElement.classList.contains("nav__item--has-submenu")
      ) {
        return;
      }

      e.preventDefault();
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }

      // Close mobile menu if open when a link is clicked
      if (nav && nav.classList.contains("active")) {
        nav.classList.remove("active");

        // Reset icon
        const icon = menuBtn.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
    });
  });

  /* FAQ Accordion */
  const faqQuestions = document.querySelectorAll(".faq__question");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains("active");

      // Close all FAQ items
      document.querySelectorAll(".faq__item").forEach((item) => {
        item.classList.remove("active");
        item
          .querySelector(".faq__question")
          .setAttribute("aria-expanded", "false");
      });

      // Toggle current item
      if (!isActive) {
        faqItem.classList.add("active");
        question.setAttribute("aria-expanded", "true");
      }
    });
  });
});
