/* ============================================================
   FOLIO.JM — script.js  (fixed)
============================================================ */

// ============================================================
// THEME TOGGLE
// ============================================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const html        = document.documentElement;

function setTheme(dark) {
  if (dark) {
    html.classList.add('dark');
    if (themeIcon) themeIcon.className = 'fas fa-sun';
    localStorage.setItem('theme', 'dark');
  } else {
    html.classList.remove('dark');
    if (themeIcon) themeIcon.className = 'fas fa-moon';
    localStorage.setItem('theme', 'light');
  }
}

setTheme(localStorage.getItem('theme') === 'dark');
if (themeToggle) themeToggle.addEventListener('click', () => setTheme(!html.classList.contains('dark')));


// ============================================================
// MOBILE MENU
// ============================================================
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });
}


// ============================================================
// NAVBAR — shrink on scroll + active section highlight
// ============================================================
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});


// ============================================================
// SCROLL REVEAL
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ============================================================
// SKILL BARS
// ============================================================
const skillsSection = document.getElementById('skills');
if (skillsSection) {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.skill-bar').forEach(bar => {
          const target = bar.getAttribute('data-width');
          if (target) setTimeout(() => { bar.style.width = target + '%'; }, 200);
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  barObserver.observe(skillsSection);
}


// ============================================================
// TYPEWRITER
// ============================================================
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
  const phrases = [
    'Information Technology Student',
    'Functional Analyst',
    'Multidisciplinary Learner',
    'AI-Augmented Developer',
    "Xavier's Alumnus"
  ];
  let phraseIndex = 0, charIndex = 0, isDeleting = false;

  function typeWriter() {
    const current = phrases[phraseIndex];
    if (!isDeleting) {
      typewriterEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) { isDeleting = true; setTimeout(typeWriter, 2000); return; }
    } else {
      typewriterEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; }
    }
    setTimeout(typeWriter, isDeleting ? 45 : 80);
  }
  typeWriter();
}


// ============================================================
// EDUCATION EXPAND / COLLAPSE
// ============================================================
function toggleEdu(card) {
  const details = card.querySelector('.edu-details');
  const hint    = card.querySelector('.edu-toggle-hint');
  if (!details) return;
  const isHidden = details.classList.contains('hidden');
  details.classList.toggle('hidden', !isHidden);
  if (hint) hint.textContent = isHidden ? 'Tap to collapse ↑' : 'Tap to expand ↓';
}


// ============================================================
// PROJECT STORY EXPAND / COLLAPSE
// ============================================================
function toggleStory(btn) {
  const story = btn.nextElementSibling;
  if (!story) return;
  const isHidden = story.classList.contains('hidden');
  story.classList.toggle('hidden', !isHidden);
  btn.textContent = isHidden
    ? (btn.textContent.includes('Read') ? 'Hide story ↑' : 'Hide ↑')
    : (btn.textContent.includes('Read') ? 'Read the story ↓' : 'Story ↓');
}


// ============================================================
// GITHUB API
// ============================================================
const GITHUB_USERNAME = 'mendonzajoshua';
const LANG_COLORS = {
  Python:'#3572A5', JavaScript:'#f1e05a', HTML:'#e34c26',
  Dart:'#00B4AB', Java:'#b07219', CSS:'#563d7c', 'C++':'#f34b7d'
};

async function fetchGitHubRepos() {
  const container = document.getElementById('github-repos');
  if (!container) return;
  try {
    const res = await fetch('https://api.github.com/users/' + GITHUB_USERNAME + '/repos?sort=updated&per_page=9&type=public');
    if (!res.ok) throw new Error('Status ' + res.status);
    const repos = await res.json();
    const filtered = repos.filter(r => !r.fork).slice(0, 6);
    if (!filtered.length) {
      container.innerHTML = '<p style="color:#6b6b6b;font-size:14px;grid-column:1/-1;">No public repositories found.</p>';
      return;
    }
    container.innerHTML = filtered.map(repo => {
      const color = LANG_COLORS[repo.language] || '#6b6b6b';
      const desc  = repo.description ? repo.description.substring(0, 72) + (repo.description.length > 72 ? '...' : '') : 'No description.';
      return '<a href="' + repo.html_url + '" target="_blank" rel="noopener" class="repo-card">' +
        '<div style="display:flex;align-items:center;justify-content:space-between;">' +
          '<p style="font-size:14px;font-weight:500;">' + repo.name + '</p>' +
          '<i class="fab fa-github" style="color:#6b6b6b;font-size:14px;"></i>' +
        '</div>' +
        '<p style="font-size:12px;color:#6b6b6b;line-height:1.5;">' + desc + '</p>' +
        '<div style="display:flex;align-items:center;gap:14px;margin-top:6px;">' +
          (repo.language ? '<span style="display:flex;align-items:center;gap:5px;font-size:12px;color:#6b6b6b;"><span style="width:10px;height:10px;border-radius:50%;background:' + color + ';display:inline-block;"></span>' + repo.language + '</span>' : '') +
          (repo.stargazers_count > 0 ? '<span style="font-size:12px;color:#6b6b6b;"><i class="fas fa-star" style="color:#f59e0b;font-size:11px;"></i> ' + repo.stargazers_count + '</span>' : '') +
          '<span style="font-size:12px;color:#6b6b6b;"><i class="fas fa-code-branch" style="font-size:11px;"></i> ' + repo.forks_count + '</span>' +
        '</div></a>';
    }).join('');
  } catch(err) {
    container.innerHTML = '<p style="color:#6b6b6b;font-size:13px;grid-column:1/-1;"><i class="fab fa-github" style="margin-right:6px;"></i>Could not load repos. <a href="https://github.com/' + GITHUB_USERNAME + '" target="_blank" style="color:#c8622a;text-decoration:underline;">View on GitHub →</a></p>';
    console.warn('GitHub API:', err);
  }
}
fetchGitHubRepos();


// ============================================================
// CONTACT FORM — EmailJS
// Replace the three YOUR_* strings once you set up emailjs.com
// ============================================================
const EJS_KEY      = 'YOUR_PUBLIC_KEY';
const EJS_SERVICE  = 'YOUR_SERVICE_ID';
const EJS_TEMPLATE = 'YOUR_TEMPLATE_ID';

let emailjsReady = false;
try {
  if (typeof emailjs !== 'undefined' && EJS_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EJS_KEY);
    emailjsReady = true;
  }
} catch(e) { /* not configured yet */ }

function showToast(msg, type) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.className = type + ' show';
  setTimeout(() => t.classList.remove('show'), 4500);
}

function sendMessage() {
  const nameEl = document.getElementById('contactName');
  const emailEl = document.getElementById('contactEmail');
  const subjectEl = document.getElementById('contactSubject');
  const msgEl = document.getElementById('contactMessage');
  const btn = document.getElementById('sendBtn');
  if (!nameEl || !emailEl || !msgEl) return;

  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const subject = subjectEl ? subjectEl.value.trim() : '';
  const message = msgEl.value.trim();

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  let valid = true;
  const ne = document.getElementById('nameError');
  const ee = document.getElementById('emailError');
  const me = document.getElementById('messageError');
  if (ne) ne.classList.toggle('hidden', name.length > 0); else if (!name) valid = false;
  if (ee) ee.classList.toggle('hidden', emailRx.test(email)); else if (!emailRx.test(email)) valid = false;
  if (me) me.classList.toggle('hidden', message.length > 0); else if (!message) valid = false;
  if (!name || !emailRx.test(email) || !message) valid = false;
  if (!valid) return;

  if (!emailjsReady) {
    showToast('Form not configured yet — email me at mendonzajoshua@gmail.com', 'error');
    return;
  }

  if (btn) { btn.disabled = true; btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>'; }

  emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
    from_name: name, from_email: email,
    subject: subject || 'Portfolio Contact', message: message, to_name: 'Joshua'
  }).then(() => {
    showToast("Sent! I'll get back to you soon.", 'success');
    [nameEl, emailEl, subjectEl, msgEl].forEach(el => { if (el) el.value = ''; });
    if (btn) { btn.disabled = false; btn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>'; }
  }).catch(() => {
    showToast('Something went wrong. Email: mendonzajoshua@gmail.com', 'error');
    if (btn) { btn.disabled = false; btn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>'; }
  });
}


// ============================================================
// SMOOTH SCROLL
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
