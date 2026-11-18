// ---------- DARK / LIGHT THEME ----------
const themeBtn = document.getElementById("themeBtn");
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeBtn.textContent = theme === "dark" ? "🌙" : "☀️";
  try { localStorage.setItem("theme", theme); } catch (e) {}
}

let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
setTheme(saved || "dark");

themeBtn.addEventListener("click", () => {
  setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

// ---------- MOBILE MENU ----------
const menu = document.getElementById("menu");
document.getElementById("menuBtn").addEventListener("click", () => {
  menu.classList.toggle("open");
});
menu.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => menu.classList.remove("open"))
);

// ---------- TYPING EFFECT ----------
// EDIT: change these job titles
const words = ["Web Developer", "Full-Stack Learner", "Computer Science Student", "Problem Solver"];
const typingEl = document.getElementById("typing");
let w = 0, c = 0, deleting = false;

function type() {
  const word = words[w];
  typingEl.textContent = word.substring(0, c);
  if (!deleting && c < word.length) { c++; setTimeout(type, 90); }
  else if (!deleting) { deleting = true; setTimeout(type, 1400); }
  else if (c > 0) { c--; setTimeout(type, 45); }
  else { deleting = false; w = (w + 1) % words.length; setTimeout(type, 300); }
}
if (typingEl) type();

// ---------- SCROLL REVEAL ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ---------- CV PRINT ----------
const printCvBtn = document.getElementById("printCvBtn");
if (printCvBtn) printCvBtn.addEventListener("click", () => window.print());

// ---------- FOOTER YEAR ----------
document.getElementById("year").textContent = new Date().getFullYear();
