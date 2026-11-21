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




// sms email contact
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  const btn = document.getElementById('cfBtn');
  const status = document.getElementById('cfStatus');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      alert('Please fill in your name, email, and message.');
      return;
    }

    // No valid email -> tell the visitor to create an account first
    if (!emailPattern.test(email)) {
      alert('Please enter a real email address. If you do not have an email account, create a Gmail account first (https://accounts.google.com/signup), then send your message.');
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending...';
    status.className = '';
    status.textContent = '';

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
      });
      const data = await res.json();

      if (data.success) {
        status.className = 'ok';
        status.textContent = 'Message sent! Thank you, I will reply to your email soon.';
        alert('Your message was sent successfully.');
        contactForm.reset();
      } else {
        throw new Error(data.message || 'Failed');
      }
    } catch (err) {
      status.className = 'err';
      status.textContent = 'Could not send. Please check your internet and try again, or use Gmail/Telegram above.';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send message';
    }
  });
}

