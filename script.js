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
  const data = new FormData(form);
  const subject = encodeURIComponent(`Quote request from ${data.get("firstName")} ${data.get("lastName")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("firstName")} ${data.get("lastName")}\nEmail: ${data.get("email")}\nService: ${data.get("service")}\nTown: ${data.get("town")}\n\nProject details:\n${data.get("message") || "Not provided"}`
  );
  document.getElementById("formSuccess").textContent = "Your email app is opening with your request. Review it and press Send to contact Hot Shot.";
  window.location.href = `mailto:hotshotpressurewashingsc@gmail.com?subject=${subject}&body=${body}`;
});

document.getElementById("year").textContent = new Date().getFullYear();
