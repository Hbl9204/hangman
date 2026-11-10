// Rok w stopce
document.getElementById('year').textContent = new Date().getFullYear();

// Menu mobilne
const toggle = document.querySelector('.nav__toggle');
const links = document.querySelector('.nav__links');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Animacja pojawiania się sekcji
const items = document.querySelectorAll('.section h2, .work, .features li, .about__photo, .contact > *');
items.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.15 });
items.forEach(el => io.observe(el));

// Powiększanie zdjęć w galerii
const lightbox = document.querySelector('.lightbox');
if (lightbox && lightbox.showModal) {
  const lbImg = lightbox.querySelector('img');
  document.querySelectorAll('.work__img').forEach(btn => btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    lbImg.src = btn.dataset.full;
    lbImg.alt = img.alt;
    lightbox.showModal();
  }));
  lightbox.querySelector('.lightbox__close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });
}

// Zakładki cennika
const tabs = [...document.querySelectorAll('.tab')];
function selectTab(tab) {
  tabs.forEach(t => {
    const on = t === tab;
    t.setAttribute('aria-selected', on);
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  });
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', e => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    const next = tabs[(i + d + tabs.length) % tabs.length];
    selectTab(next); next.focus();
  });
});
