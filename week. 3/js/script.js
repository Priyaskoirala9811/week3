// js/script.js

// 1. Reusable navigation template
const navTemplate = `
  <a class="brand" href="index.html">Learning Journal</a>
  <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav">Menu</button>
  <nav id="site-nav" class="site-nav" aria-label="Primary">
    <ul>
      <li><a href="index.html">Home</a></li>
      <li><a href="journal.html">Journal</a></li>
      <li><a href="projects.html">Projects</a></li>
      <li><a href="about.html">About</a></li>
    </ul>
    <button id="theme-toggle" class="theme-toggle" type="button">🌓 Dark</button>
  </nav>
`;

// Insert nav into header on every page
function initNav() {
  const header = document.getElementById("site-header");
  if (!header) return;

  header.innerHTML = navTemplate;

  // mobile nav toggle
  const toggle = header.querySelector(".nav-toggle");
  const navEl = header.querySelector("#site-nav");

  if (toggle && navEl) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", (!expanded).toString());
      navEl.classList.toggle("open");
    });
  }

  // highlight current page in nav
  const links = header.querySelectorAll(".site-nav a");
  const path = window.location.pathname.split("/").pop() || "index.html";
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === path) {
      link.setAttribute("aria-current", "page");
    }
  });
}

// 2. Theme switcher (dark <-> light)
function initThemeSwitcher() {
  const btn = document.querySelector("#theme-toggle");
  if (!btn) return;

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
  }

  updateButtonLabel();

  btn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const isLight = document.body.classList.contains("light-theme");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    updateButtonLabel();
  });

  function updateButtonLabel() {
    const isLight = document.body.classList.contains("light-theme");
    btn.textContent = isLight ? "🌙 Dark" : "🌓 Light";
  }
}

// 3. Live date on homepage
function initDate() {
  const dateSpan = document.getElementById("current-date");
  if (!dateSpan) return; // only exists on home page

  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  dateSpan.textContent = now.toLocaleDateString("en-GB", options);
}

// 4. Footer year
function initFooterYear() {
  const yearSpan = document.getElementById("year");
  if (!yearSpan) return;
  yearSpan.textContent = new Date().getFullYear();
}

// Initialise everything once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initNav();           // builds header
  initThemeSwitcher(); // needs nav to exist
  initDate();          // home page only
  initFooterYear();    // all pages
});
