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

// Botão voltar ao topo
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

const projectModal = document.getElementById('projectModal');
const modalVideo = document.getElementById('modalVideo');
const closeModalBtn = document.getElementById('closeModal');
const detailButtons = document.querySelectorAll('.btn-details');

detailButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const videoSrc = btn.getAttribute('data-video');
    if (videoSrc) {
      modalVideo.src = videoSrc;
      projectModal.classList.add('show');
      modalVideo.play();
      document.body.style.overflow = 'hidden'; 
    }
  });
});

function hideModal() {
  projectModal.classList.remove('show');
  modalVideo.pause();
  modalVideo.src = ""; // Limpa o src para parar o download/processamento
  modalVideo.currentTime = 0; 
  document.body.style.overflow = ''; 
}

closeModalBtn?.addEventListener('click', hideModal);

projectModal?.addEventListener('click', (e) => {
  if (e.target === projectModal) hideModal();
});
