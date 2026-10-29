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

// Game carousel: arrows step one screen of cards, progress bar tracks the scroll
const wall = document.querySelector('.collection');
if (wall && wall.closest('.collection-carousel')) {
  const [prev, next] = document.querySelectorAll('.collection-arrow');
  const bar = document.querySelector('.collection-progress span');
  const update = () => {
    const max = wall.scrollWidth - wall.clientWidth;
    bar.style.width = (max > 0 ? (wall.clientWidth + wall.scrollLeft) / wall.scrollWidth * 100 : 100) + '%';
    prev.disabled = wall.scrollLeft <= 2;
    next.disabled = wall.scrollLeft >= max - 2;
  };
  const step = () => wall.clientWidth + parseFloat(getComputedStyle(wall).columnGap || 0);
  [prev, next].forEach((btn) => btn.addEventListener('click', () => wall.scrollBy({ left: step() * Number(btn.dataset.dir) })));
  wall.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

// Footer year
document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
