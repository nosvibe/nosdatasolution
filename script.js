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

document.addEventListener("DOMContentLoaded", function () {

  const dashboardImages =
    document.querySelectorAll(".dashboard-image");

  const lightbox =
    document.getElementById("dashboardLightbox");

  const fullImage =
    document.getElementById("dashboardFullImage");

  const closeButton =
    document.querySelector(".dashboard-lightbox-close");


  /* -----------------------------------------
     MỞ DASHBOARD
     ----------------------------------------- */

  dashboardImages.forEach(function (dashboard) {

    dashboard.addEventListener("click", function () {

      const image =
        dashboard.querySelector("img");

      if (!image) return;

      fullImage.src = image.src;
      fullImage.alt = image.alt || "Dashboard";

      lightbox.classList.add("active");

      lightbox.setAttribute(
        "aria-hidden",
        "false"
      );

      document.body.style.overflow = "hidden";

    });

  });


  /* -----------------------------------------
     ĐÓNG DASHBOARD
     ----------------------------------------- */

  function closeLightbox() {

    lightbox.classList.remove("active");

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    fullImage.src = "";

    document.body.style.overflow = "";

  }


  /* Click nút X */

  closeButton.addEventListener(
    "click",
    closeLightbox
  );


  /* Click vùng tối bên ngoài ảnh */

  lightbox.addEventListener(
    "click",
    function (event) {

      if (event.target === lightbox) {
        closeLightbox();
      }

    }
  );


  /* Phím ESC */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        lightbox.classList.contains("active")
      ) {
        closeLightbox();
      }

    }
  );

});
