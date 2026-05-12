// ── LOADER ──
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2200);
});

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  // Active link highlight
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), e.target.dataset.delay || 0);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el, i) => {
  el.dataset.delay = (i % 4) * 120;
  revealObserver.observe(el);
});

// ── GALLERY POPUP ──
const popup = document.getElementById('popup');
const popupImg = document.getElementById('popup-img');
const popupVideo = document.getElementById('popup-video');

function openMedia(type, src) {
  popup.classList.add('active');
  if (type === 'img') {
    popupImg.src = src; popupImg.style.display = 'block';
    popupVideo.style.display = 'none'; popupVideo.pause();
  } else {
    popupVideo.src = src; popupVideo.style.display = 'block'; popupVideo.play();
    popupImg.style.display = 'none';
  }
  document.body.style.overflow = 'hidden';
}

function closePopup() {
  popup.classList.remove('active');
  popupVideo.pause(); popupVideo.src = '';
  popupImg.src = '';
  document.body.style.overflow = '';
}

popup.addEventListener('click', (e) => { if (e.target === popup) closePopup(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePopup(); });

// ── CONTACT FORM ──
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.textContent = '✓ Sent!';
  btn.style.background = 'linear-gradient(135deg,#2d6a4f,#52b788)';
  setTimeout(() => {
    btn.textContent = 'Send Message →';
    btn.style.background = '';
    this.reset();
  }, 3000);
});
