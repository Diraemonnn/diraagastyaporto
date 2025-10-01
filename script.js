// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Header scroll effect
  const header = document.querySelector("header")
  window.addEventListener("scroll", () => {
    const headerHeight = header.offsetHeight
    const sections = document.querySelectorAll("section")
    let isOverDark = false

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      const isBehindHeader = rect.top <= headerHeight && rect.bottom >= headerHeight
      if (isBehindHeader) {
        const theme = section.getAttribute("data-theme")
        isOverDark = theme === "dark"
      }
    })

    if (isOverDark) {
      header.classList.remove("light")
      header.classList.add("dark")
    } else {
      header.classList.remove("dark")
      header.classList.add("light")
    }
  })

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navLinks.classList.toggle("active")
  })

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })

  // Disable portfolio modal behavior; make cards click-through via anchor wrappers
  const modal = document.querySelector(".portfolio-modal")
  if (modal) {
    modal.remove()
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetElement.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".about-content, .timeline-item, .certificate-card, .skill-list-item, .portfolio-item",
    )

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.classList.add("animate")
      }
    })
  }

  // Add animation class to elements
  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // Run once on page load
})
