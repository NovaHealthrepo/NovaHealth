document.addEventListener("DOMContentLoaded", () => {
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

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
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

  /* Testimonials Infinite Loop Logic */
  const track = document.querySelector(".testimonial-track");
  if (track) {
    // Clone all children (cards) and append them to the end
    // This creates the [Set A][Set A] structure needed for infinite scrolling
    const cards = Array.from(track.children);
    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      // Ensure aria-hidden is true for clones to avoid screen reader duplication
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
  }
});
