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


/* =========================================================
   REVEAL ANIMATION
   ========================================================= */

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener('click', e => {

    const target = document.querySelector(
      anchor.getAttribute('href')
    );

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

  });

});


/* =========================================================
   DASHBOARD LIGHTBOX
   ========================================================= */

const dashboardImages =
  document.querySelectorAll('.dashboard-image');

const lightbox =
  document.getElementById('dashboardLightbox');

const fullImage =
  document.getElementById('dashboardFullImage');

const closeButton =
  document.querySelector('.dashboard-lightbox-close');


if (
  dashboardImages.length &&
  lightbox &&
  fullImage &&
  closeButton
) {

  /* =======================================================
     OPEN DASHBOARD
     ======================================================= */

  dashboardImages.forEach(dashboard => {

    dashboard.addEventListener('click', () => {

      const image =
        dashboard.querySelector('img');

      if (!image) return;

      fullImage.src = image.src;

      fullImage.alt =
        image.alt || 'Dashboard';

      /* Reset zoom mỗi lần mở */
      fullImage.classList.remove('zoomed');

      lightbox.classList.add('active');

      lightbox.setAttribute(
        'aria-hidden',
        'false'
      );

      document.body.style.overflow = 'hidden';

    });

  });


  /* =======================================================
     CLOSE
     ======================================================= */

  function closeDashboard() {

    lightbox.classList.remove('active');

    lightbox.setAttribute(
      'aria-hidden',
      'true'
    );

    fullImage.classList.remove('zoomed');

    fullImage.src = '';

    document.body.style.overflow = '';

  }


  /* =======================================================
     CLOSE BUTTON ×
     ======================================================= */

  closeButton.addEventListener(
    'click',
    closeDashboard
  );


  /* =======================================================
     CLICK OUTSIDE IMAGE
     ======================================================= */

  lightbox.addEventListener(
    'click',
    event => {

      if (event.target === lightbox) {
        closeDashboard();
      }

    }
  );


  /* =======================================================
     ZOOM IMAGE
     ======================================================= */

  fullImage.addEventListener(
    'click',
    event => {

      event.stopPropagation();

      fullImage.classList.toggle('zoomed');

    }
  );


  /* =======================================================
     ESC TO CLOSE
     ======================================================= */

  document.addEventListener(
    'keydown',
    event => {

      if (
        event.key === 'Escape' &&
        lightbox.classList.contains('active')
      ) {

        closeDashboard();

      }

    }
  );

}
