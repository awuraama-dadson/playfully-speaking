// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Product gallery
const mainImg = document.querySelector('.gallery .main img');
document.querySelectorAll('.thumbs button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    mainImg.style.opacity = 0;
    setTimeout(() => { mainImg.src = img.src; mainImg.alt = img.alt; mainImg.style.opacity = 1; }, 180);
    document.querySelectorAll('.thumbs button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
  });
});

// Sticky buy bar (mobile) appears once the main buy box scrolls away
const buyBox = document.querySelector('.buy-box');
const sticky = document.querySelector('.sticky-buy');
if (buyBox && sticky) {
  new IntersectionObserver(([e]) => {
    sticky.classList.toggle('show', !e.isIntersecting && e.boundingClientRect.top < 0);
  }).observe(buyBox);
}

// Footer year
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
