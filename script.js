const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});
/* =========================================================
   DASHBOARD LIGHTBOX
   ========================================================= */

function openDashboard(imageSrc) {
  const lightbox = document.getElementById('dashboardLightbox');
  const fullImage = document.getElementById('dashboardFullImage');

  fullImage.src = imageSrc;

  lightbox.classList.add('active');

  document.body.style.overflow = 'hidden';
}

function closeDashboard(event) {

  // Nếu click vào chính ảnh thì không đóng
  if (
    event &&
    event.target &&
    event.target.id === 'dashboardFullImage'
  ) {
    return;
  }

  const lightbox = document.getElementById('dashboardLightbox');

  lightbox.classList.remove('active');

  document.body.style.overflow = '';
}


/* Đóng bằng phím ESC */

document.addEventListener('keydown', function(event) {

  if (event.key === 'Escape') {

    const lightbox =
      document.getElementById('dashboardLightbox');

    if (lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

  }

});
