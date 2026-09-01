const root = document.documentElement;
const themeIcons = {
  sun: '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>',
  moon: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>'
};
const themeIconEl = document.getElementById('themeIcon');
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');

const updateIcon = (theme) => {
  if (themeIconEl) themeIconEl.innerHTML = theme === 'dark' ? themeIcons.sun : themeIcons.moon;
};

const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const initialTheme = savedTheme || (systemPrefersLight ? 'light' : 'dark');
document.documentElement.setAttribute('data-theme', initialTheme);
updateIcon(initialTheme);

themeToggle?.addEventListener('click', () => {
  const isDark = root.getAttribute('data-theme') === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';
  root.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);
  updateIcon(nextTheme);
});

document.getElementById('year').textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll('.hero-image, .section, .card, .case, .timeline-item');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px 15% 0px' });

  revealTargets.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const dicas = document.querySelectorAll('.dica');

dicas.forEach((dica) => {
  dica.addEventListener('pointerleave', () => dica.classList.remove('dica-oculta'));
  dica.addEventListener('focusin', () => dica.classList.remove('dica-oculta'));
});

document.addEventListener('keydown', (evento) => {
  if (evento.key !== 'Escape') return;
  dicas.forEach((dica) => {
    dica.classList.add('dica-oculta');
    dica.querySelector('.dica-gatilho')?.blur();
  });
});
