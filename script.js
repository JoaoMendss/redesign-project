const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

document.querySelectorAll(".faq-list details").forEach(detail => {
  detail.addEventListener("toggle", () => {
    if (detail.open) {
      document.querySelectorAll(".faq-list details").forEach(other => {
        if (other !== detail) other.open = false;
      });
    }
  });
});

// Hero carousel controls
const heroSlides = Array.from(document.querySelectorAll(".hero-slide"));
const heroDots = Array.from(document.querySelectorAll(".hero-dot"));
const previousSlide = document.querySelector(".hero-prev");
const nextSlide = document.querySelector(".hero-next");
let activeHeroSlide = 0;
let heroTimer;

function showHeroSlide(index) {
  activeHeroSlide = (index + heroSlides.length) % heroSlides.length;
  heroSlides.forEach((slide, i) => {
    const active = i === activeHeroSlide;
    slide.classList.toggle("is-active", active);
    slide.setAttribute("aria-hidden", String(!active));
  });
  heroDots.forEach((dot, i) => {
    const active = i === activeHeroSlide;
    dot.classList.toggle("is-active", active);
    if (active) dot.setAttribute("aria-current", "true");
    else dot.removeAttribute("aria-current");
  });
}

function restartHeroTimer() {
  window.clearInterval(heroTimer);
  heroTimer = window.setInterval(() => showHeroSlide(activeHeroSlide + 1), 6000);
}

previousSlide.addEventListener("click", () => {
  showHeroSlide(activeHeroSlide - 1);
  restartHeroTimer();
});
nextSlide.addEventListener("click", () => {
  showHeroSlide(activeHeroSlide + 1);
  restartHeroTimer();
});
heroDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showHeroSlide(index);
    restartHeroTimer();
  });
});
restartHeroTimer();

// Pause automatic rotation while visitors interact with the carousel.
const heroCarousel = document.querySelector(".hero-carousel");
heroCarousel.addEventListener("mouseenter", () => window.clearInterval(heroTimer));
heroCarousel.addEventListener("mouseleave", restartHeroTimer);
heroCarousel.addEventListener("focusin", () => window.clearInterval(heroTimer));
heroCarousel.addEventListener("focusout", event => {
  if (!heroCarousel.contains(event.relatedTarget)) restartHeroTimer();
});

// Demo quote form: show a fictional success confirmation without sending data.
document.getElementById("quoteForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const success = document.getElementById("formSuccess");
  success.textContent = "Message sent successfully! (Demo only — no information was actually sent.)";
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
