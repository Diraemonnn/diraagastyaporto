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

  // Certificates toggle
  const certificatesGrid = document.getElementById("certificatesGrid");
  const loadMoreBtn = document.getElementById("loadMoreCertificates");

  if (certificatesGrid && loadMoreBtn) {
    // Initialize state
    certificatesGrid.classList.add('collapsed');
    let isExpanded = false;
    
    const updateCertificatesView = () => {
      if (isExpanded) {
        certificatesGrid.classList.remove('collapsed');
        loadMoreBtn.querySelector('.btn-text').textContent = "Show Less";
        loadMoreBtn.querySelector('.fa-chevron-down').style.transform = 'rotate(180deg)';
      } else {
        certificatesGrid.classList.add('collapsed');
        loadMoreBtn.querySelector('.btn-text').textContent = "View More";
        loadMoreBtn.querySelector('.fa-chevron-down').style.transform = 'rotate(0deg)';
        // Smooth scroll back to top of certificates section
        const certificatesSection = document.getElementById('certificates');
        if (certificatesSection) {
          const headerHeight = document.querySelector("header").offsetHeight;
          const targetPosition = certificatesSection.offsetTop - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    };

    // Set initial state
    updateCertificatesView();
    
    loadMoreBtn.addEventListener("click", () => {
      isExpanded = !isExpanded;
      updateCertificatesView();
    });
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

  // Media modal for experience media
  const mediaModal = document.getElementById("mediaModal");
  const modalMedia = document.getElementById("modalMedia");
  const mediaClose = document.getElementById("mediaClose");
  const mediaOverlay = document.getElementById("mediaModalOverlay");

  function openMedia(src) {
    if (!mediaModal || !modalMedia) return;
    modalMedia.src = src;
    mediaModal.classList.add("open");
    mediaModal.setAttribute("aria-hidden", "false");
  }

  function closeMedia() {
    if (!mediaModal || !modalMedia) return;
    mediaModal.classList.remove("open");
    mediaModal.setAttribute("aria-hidden", "true");
    modalMedia.src = "";
  }

  document.querySelectorAll('.btn-view-media').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-media');
      if (!src) return;
      openMedia(src);
    });
  });

  if (mediaClose) mediaClose.addEventListener('click', closeMedia);
  if (mediaOverlay) mediaOverlay.addEventListener('click', closeMedia);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMedia(); });

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

// 'See More' behavior removed: experience entries show summary only; media is available via 'View Media'.
