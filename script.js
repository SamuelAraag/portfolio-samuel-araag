// Tema (dark/light)
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
  const now = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', now);
  localStorage.setItem('theme', now);
});

// Ano atual no footer
document.getElementById('year').textContent = new Date().getFullYear();

// Submit simulado do formulário
function handleSubmit(e) {
  e.preventDefault();
  const status = e.target.querySelector('.form-status');
  status.textContent = 'Enviando...';
  setTimeout(() => {
    status.textContent = 'Mensagem enviada! Obrigado pelo contato.';
    e.target.reset();
  }, 900);
}

// Animação suave ao rolar
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section, .card, .timeline-item').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});
