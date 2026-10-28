// Stop images from being dragged around with the mouse
document.querySelectorAll('img').forEach((img) => { img.draggable = false; });
document.addEventListener('dragstart', (e) => { if (e.target.closest && e.target.closest('a, img, svg')) e.preventDefault(); });

// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Product gallery
const mainImg = document.querySelector('.gallery .main img');
document.querySelectorAll('.thumbs button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    mainImg.src = img.src;
    mainImg.alt = img.alt;
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
