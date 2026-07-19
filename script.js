const loader = document.getElementById("pageLoader");
window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hidden"), 250);
});

const header = document.getElementById("siteHeader");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen);
  document.body.classList.toggle("nav-open", isOpen);
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 30));

    const update = () => {
      current += step;
      if (current >= target) {
        el.textContent = target + "+";
      } else {
        el.textContent = current;
        requestAnimationFrame(update);
      }
    };

    update();
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });

counters.forEach(counter => counterObserver.observe(counter));

document.getElementById("year").textContent = new Date().getFullYear();
