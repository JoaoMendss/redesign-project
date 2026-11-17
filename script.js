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

document.getElementById("quoteForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const firstName = form.elements.firstName.value.trim();
  document.getElementById("formSuccess").textContent =
    `Thanks, ${firstName}! This demo request is complete. No information was sent to Hot Shot.`;
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
