// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Header scroll effect
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.boxShadow = "none";
    }
  });

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Load More Certificates
  const certificatesGrid = document.getElementById("certificatesGrid");
  const loadMoreBtn = document.getElementById("loadMoreCertificates");

  if (certificatesGrid && loadMoreBtn) {
    const allCards = certificatesGrid.querySelectorAll(".certificate-card");
    
    if (allCards.length > 3) {
      // Initially show only 3 certificates
      allCards.forEach((card, index) => {
        if (index >= 3) {
          card.style.display = "none";
        }
      });
      
      loadMoreBtn.style.display = "block";

      loadMoreBtn.addEventListener("click", () => {
        const hiddenCards = Array.from(allCards).filter((card, index) => {
          return card.style.display === "none" || card.style.display === "";
        });

        if (hiddenCards.length > 0) {
          // Show next 3 certificates
          hiddenCards.slice(0, 3).forEach((card) => {
            card.style.display = "block";
          });

          // Hide button if all certificates are shown
          const remainingHidden = Array.from(allCards).filter((card) => {
            return card.style.display === "none";
          });

          if (remainingHidden.length === 0) {
            loadMoreBtn.style.display = "none";
          }
        } else {
          loadMoreBtn.style.display = "none";
        }
      });
    }
  }

  // Contact Form Handling - Gmail Integration
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Create Gmail compose link
      const gmailLink = `https://mail.google.com/mail/?view=cm&to=diraemonnn@gmail.com&su=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(
        `Hello Dira,\n\nMy name is ${name} (${email}).\n\n${message}\n\nBest regards,\n${name}`
      )}`;

      // Open Gmail compose in new tab
      window.open(gmailLink, "_blank");

      // Show success message
      formMessage.textContent = "Redirecting to Gmail...";
      formMessage.classList.remove("error");
      formMessage.classList.add("success");

      // Reset form after 2 seconds
      setTimeout(() => {
        contactForm.reset();
        formMessage.classList.remove("success");
        formMessage.textContent = "";
      }, 2000);
    });
  }

  // Fade in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document
    .querySelectorAll(
      ".about-content, .timeline-item, .certificate-card, .skill-list-item, .portfolio-item"
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });

  // CV Button Alert (for now, since we don't have the actual CV link)
  const cvButton = document.querySelector(".btn-cv");
  if (cvButton) {
    cvButton.addEventListener("click", function (e) {
      // Check if the link is still placeholder
      if (this.href.includes("YOUR_CV_FILE_ID")) {
        e.preventDefault();
        alert(
          "Please update the CV link in index.html by replacing 'YOUR_CV_FILE_ID' with your actual Google Drive file ID.\n\nExample: https://drive.google.com/file/d/YOUR_FILE_ID/view"
        );
      }
    });
  }
});

// Toggle Experience Details
function toggleExperienceDetails(button) {
  const timelineRole = button.closest(".timeline-role");
  const moreInfo = timelineRole.querySelector(".role-description-more");
  const btnText = button.querySelector(".btn-text");
  const icon = button.querySelector("i");

  if (moreInfo) {
    const isExpanded = moreInfo.style.display !== "none";
    
    if (isExpanded) {
      moreInfo.style.display = "none";
      btnText.textContent = "See More";
      button.classList.remove("active");
    } else {
      moreInfo.style.display = "block";
      btnText.textContent = "See Less";
      button.classList.add("active");
    }
  }
}
