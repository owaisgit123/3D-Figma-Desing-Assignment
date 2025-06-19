// Enhanced Loading Screen with Geometric Animation
document.addEventListener("DOMContentLoaded", () => {
  // Add loading class to body
  document.body.classList.add("loading")

  const loadingScreen = document.getElementById("loadingScreen")
  const progressFill = document.getElementById("progressFill")
  const progressPercent = document.getElementById("progressPercent")
  const progressLabel = document.getElementById("progressLabel")
  const loadingParticles = document.getElementById("loadingParticles")
  const skipBtn = document.getElementById("skipLoading")

  let progress = 0
  const loadingDuration = 10000 // 10 seconds
  const updateInterval = 80 // Update every 80ms
  const totalSteps = loadingDuration / updateInterval
  const progressStep = 100 / totalSteps

  // Loading status messages
  const statusMessages = [
    "Initializing",
    "Loading Assets",
    "Building Interface",
    "Setting Up 3D",
    "Optimizing",
    "Finalizing",
    "Ready!",
  ]

  let currentMessageIndex = 0

  // Create animated particles
  function createParticles() {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const particle = document.createElement("div")
        particle.className = "particle"
        particle.style.left = Math.random() * 100 + "%"
        particle.style.animationDelay = Math.random() * 6 + "s"
        particle.style.animationDuration = Math.random() * 2 + 4 + "s"
        loadingParticles.appendChild(particle)

        // Remove particle after animation
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle)
          }
        }, 6000)
      }, i * 100)
    }
  }

  // Start creating particles
  createParticles()
  const particleInterval = setInterval(createParticles, 3000)

  // Update loading status message
  function updateStatus() {
    if (currentMessageIndex < statusMessages.length - 1) {
      progressLabel.textContent = statusMessages[currentMessageIndex]
      currentMessageIndex++
    }
  }

  // Update status every 1.4 seconds
  const statusInterval = setInterval(updateStatus, 1400)

  // Progress animation with smooth easing
  const progressInterval = setInterval(() => {
    // Add easing for more natural progression
    const easeProgress = progress + progressStep * (1 + Math.sin(progress * 0.05) * 0.1)
    progress = Math.min(easeProgress, 100)

    if (progress >= 100) {
      progress = 100
      clearInterval(progressInterval)
      clearInterval(statusInterval)
      clearInterval(particleInterval)
      progressLabel.textContent = statusMessages[statusMessages.length - 1]

      // Complete loading after a short delay
      setTimeout(() => {
        completeLoading()
      }, 800)
    }

    // Update progress bar and text
    progressFill.style.width = progress + "%"
    progressPercent.textContent = Math.round(progress) + "%"
  }, updateInterval)

  // Skip button functionality
  skipBtn.addEventListener("click", () => {
    clearInterval(progressInterval)
    clearInterval(statusInterval)
    clearInterval(particleInterval)
    completeLoading()
  })

  function completeLoading() {
    // Final animation before hiding
    progressFill.style.width = "100%"
    progressPercent.textContent = "100%"
    progressLabel.textContent = "Ready!"

    // Fade out loading screen
    setTimeout(() => {
      loadingScreen.classList.add("fade-out")

      // Remove loading class from body and hide loading screen
      setTimeout(() => {
        document.body.classList.remove("loading")
        loadingScreen.style.display = "none"

        // Initialize main content animations
        initMainContentAnimations()
      }, 1000)
    }, 500)
  }

  function initMainContentAnimations() {
    // Animate hero content
    const heroContent = document.querySelector(".hero-content")
    if (heroContent) {
      heroContent.style.opacity = "0"
      heroContent.style.transform = "translateY(50px)"

      setTimeout(() => {
        heroContent.style.transition =
          "opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)"
        heroContent.style.opacity = "1"
        heroContent.style.transform = "translateY(0)"
      }, 300)
    }

    // Animate navbar
    const navbar = document.querySelector(".navbar")
    if (navbar) {
      navbar.style.transform = "translateY(-100%)"
      setTimeout(() => {
        navbar.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
        navbar.style.transform = "translateY(0)"
      }, 500)
    }

    // Animate background shapes with stagger
    const shapes = document.querySelectorAll(".shape")
    shapes.forEach((shape, index) => {
      shape.style.opacity = "0"
      shape.style.transform = "scale(0) rotate(0deg)"
      setTimeout(
        () => {
          shape.style.transition = "opacity 0.8s ease, transform 0.8s ease"
          shape.style.opacity = "0.6"
          shape.style.transform = "scale(1) rotate(0deg)"
        },
        700 + index * 100,
      )
    })
  }
})

// Custom Cursor Animation
const cursor = document.getElementById("cursor")
const cursorDot = cursor.querySelector(".cursor-dot")
const cursorOutline = cursor.querySelector(".cursor-outline")

let mouseX = 0
let mouseY = 0
let cursorX = 0
let cursorY = 0

// Update mouse position
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

// Smooth cursor animation
function animateCursor() {
  const speed = 0.15
  cursorX += (mouseX - cursorX) * speed
  cursorY += (mouseY - cursorY) * speed

  cursor.style.left = cursorX + "px"
  cursor.style.top = cursorY + "px"

  requestAnimationFrame(animateCursor)
}

// Start cursor animation
animateCursor()

// Cursor hover effects
const hoverElements = document.querySelectorAll("a, button, .card-3d, .project-card")
hoverElements.forEach((element) => {
  element.addEventListener("mouseenter", () => {
    cursor.classList.add("hover")
  })

  element.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover")
  })

  element.addEventListener("mousedown", () => {
    cursor.classList.add("click")
  })

  element.addEventListener("mouseup", () => {
    cursor.classList.remove("click")
  })
})

// Enhanced Theme Toggle with Animation
const themeToggle = document.getElementById("themeToggle")
if (themeToggle) {
  const body = document.body

  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem("theme") || "light"
  body.setAttribute("data-theme", currentTheme)

  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    // Add click animation
    themeToggle.classList.add("clicked")
    setTimeout(() => {
      themeToggle.classList.remove("clicked")
    }, 600)

    // Update theme
    body.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)

    // Animate theme transition
    body.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"

    // Update cursor color for theme
    document.documentElement.style.setProperty("--cursor-color", newTheme === "dark" ? "#34d399" : "#10b981")
  })
}

// Page Transition Animation
const pageTransition = document.getElementById("pageTransition")
const pageLinks = document.querySelectorAll(".page-link")

pageLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()

    const targetPage = link.getAttribute("data-page")

    // Start page transition
    pageTransition.classList.add("active")

    // Simulate page change (in a real app, this would navigate to a new page)
    setTimeout(() => {
      // Here you would typically change the page content
      console.log(`Navigating to: ${targetPage}`)

      // Exit transition
      pageTransition.classList.remove("active")
      pageTransition.classList.add("exit")

      setTimeout(() => {
        pageTransition.classList.remove("exit")
      }, 800)
    }, 400)
  })
})

// Mobile Navigation
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileNav = document.getElementById("mobileNav")
const closeBtn = document.getElementById("closeBtn")
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileNav.classList.add("active")
    document.body.style.overflow = "hidden"

    // Animate hamburger to X
    const hamburger = mobileMenuBtn.querySelector(".hamburger")
    if (hamburger) {
      hamburger.style.background = "transparent"
      hamburger.style.transform = "rotate(45deg)"
    }
  })

  if (closeBtn) {
    closeBtn.addEventListener("click", closeMobileNav)
  }

  // Close mobile nav when clicking on a link
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", closeMobileNav)
  })

  // Close mobile nav when clicking outside
  mobileNav.addEventListener("click", (e) => {
    if (e.target === mobileNav) {
      closeMobileNav()
    }
  })

  function closeMobileNav() {
    mobileNav.classList.remove("active")
    document.body.style.overflow = "auto"

    // Reset hamburger
    const hamburger = mobileMenuBtn.querySelector(".hamburger")
    if (hamburger) {
      hamburger.style.background = "var(--text-color)"
      hamburger.style.transform = "rotate(0deg)"
    }
  }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Optimized parallax effect
let ticking = false

function updateParallax() {
  const scrolled = window.pageYOffset
  const shapes = document.querySelectorAll(".shape")

  shapes.forEach((shape, index) => {
    const speed = 0.3 + index * 0.05
    const yPos = -(scrolled * speed)
    shape.style.transform = `translateY(${yPos}px)`
  })

  ticking = false
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax)
    ticking = true
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(50px)"
  card.style.transition = "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
  observer.observe(card)
})

// Enhanced 3D tilt effect for project cards
document.querySelectorAll(".project-card").forEach((card) => {
  let isHovering = false

  card.addEventListener("mouseenter", () => {
    isHovering = true
  })

  card.addEventListener("mouseleave", () => {
    isHovering = false
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
  })

  card.addEventListener("mousemove", (e) => {
    if (!isHovering) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
  })
})

// Enhanced button ripple effect
document.querySelectorAll(".btn-3d").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.4);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
    `

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add ripple animation CSS
const rippleStyle = document.createElement("style")
rippleStyle.textContent = `
  .btn-3d {
    position: relative;
    overflow: hidden;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`
document.head.appendChild(rippleStyle)

// Scroll-based navbar background
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.style.background = "var(--nav-bg)"
      navbar.style.backdropFilter = "blur(20px)"
    } else {
      navbar.style.background = "var(--nav-bg)"
      navbar.style.backdropFilter = "blur(10px)"
    }
  }
})

// Dynamic background shape generation
function createRandomShape() {
  const shapes = ["cube", "sphere", "pyramid", "torus"]
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)]
  const shape = document.createElement("div")

  shape.className = `shape ${randomShape}`
  shape.style.left = Math.random() * 100 + "%"
  shape.style.top = Math.random() * 100 + "%"
  shape.style.animationDelay = Math.random() * 5 + "s"

  const floatingShapes = document.querySelector(".floating-shapes")
  if (floatingShapes) {
    floatingShapes.appendChild(shape)

    // Remove shape after animation
    setTimeout(() => {
      if (shape.parentNode) {
        shape.remove()
      }
    }, 10000)
  }
}

// Create new shapes periodically
setInterval(createRandomShape, 4000)

// Performance optimization for mobile devices
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

if (isMobile) {
  // Reduce animation complexity on mobile
  document.documentElement.style.setProperty("--animation-duration", "6s")

  // Disable cursor on mobile
  document.body.style.cursor = "auto"
  if (cursor) {
    cursor.style.display = "none"
  }
}

console.log("🚀 SquareUp 3D Portfolio loaded with enhanced animations!")
