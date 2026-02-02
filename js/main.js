const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const root = document.body;

const setTheme = (theme) => {
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
    themeToggle.setAttribute("aria-pressed", "true");
  } else {
    root.removeAttribute("data-theme");
    themeToggle.setAttribute("aria-pressed", "false");
  }
  localStorage.setItem("theme", theme);
};

const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  setTheme(storedTheme);
}

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  setTheme(nextTheme);
});

const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const updateActiveLink = () => {
  const scrollPos = window.scrollY + 120;
  sections.forEach((section) => {
    const { top, bottom } = section.getBoundingClientRect();
    const offsetTop = top + window.scrollY;
    const offsetBottom = bottom + window.scrollY;
    if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
      navAnchors.forEach((link) => link.classList.remove("active"));
      const activeLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
      activeLink?.classList.add("active");
    }
  });
};

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));