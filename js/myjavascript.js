/* =========================
   TESTIMONIAL SLIDESHOW
========================= */


// Initialize slideshow AFTER DOM loads
document.addEventListener("DOMContentLoaded", function () {
  showSlides(slideIndex);
});


/* =========================
   GALLERY LIGHTBOX (SAFE)
========================= */

const items = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');

if (items.length && lightbox) {

  const lightboxImg = document.getElementById('lightbox-img');
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');

  let currentIndex = 0;
  let images = Array.from(items).map(img => img.src);

  items.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      showImage();
      lightbox.classList.add('active');
    });
  });

  function showImage() {
    lightboxImg.src = images[currentIndex];
  }

  if (nextBtn && prevBtn) {
    nextBtn.onclick = (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % images.length;
      showImage();
    };

    prevBtn.onclick = (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage();
    };
  }

  // Swipe support
  let startX = 0;

  lightbox.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  lightbox.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextBtn?.onclick(e);
    if (endX - startX > 50) prevBtn?.onclick(e);
  });

  // Close lightbox
  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
}


/* =========================
   BUBBLES PARALLAX
========================= */

document.addEventListener("mousemove", function(e) {
  const bubbles = document.querySelectorAll(".bubbles span");

  if (!bubbles.length) return;

  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  bubbles.forEach((bubble, index) => {
    const speed = (index % 5) + 1;

    const moveX = (x - 0.5) * 30 * speed;
    const moveY = (y - 0.5) * 30 * speed;

    bubble.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});




/* =========================
   LESSON MODAL (SAFE)
========================= */

document.addEventListener('DOMContentLoaded', function () {
  try {
    const modalEl = document.getElementById('lessonModal');
    if (!modalEl) return; // skip if not on lessons page

    const modalTitle = document.getElementById('lessonModalLabel');
    const modalImg = document.getElementById('lessonModalImg');
    const modalDesc = document.getElementById('lessonModalDesc');

    const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);

    document.querySelectorAll('.view-lesson').forEach(function(btn){
      btn.addEventListener('click', function(){

        const title = btn.getAttribute('data-title') || '';
        const img = btn.getAttribute('data-img') || '';
        const desc = btn.getAttribute('data-desc') || '';

        modalTitle.textContent = title;
        modalImg.src = img;
        modalImg.alt = title;

        const items = desc.split('|');

        let html = '<ul>';
        items.forEach(item => {
          html += `<li>${item}</li>`;
        });
        html += '</ul>';

        modalDesc.innerHTML = html;

        bsModal.show();
      });
    });

  } catch (err) {
    console.error('Lesson modal init error:', err);
  }
});


document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     SAFE SLIDESHOW (ONLY IF EXISTS)
  ========================= */
  if (typeof showSlides === "function" && typeof slideIndex !== "undefined") {
    showSlides(slideIndex);
  }

  /* =========================
     FORM VALIDATION
  ========================= */
  const forms = document.querySelectorAll(".needs-validation");

  forms.forEach(function (form) {
    form.addEventListener("submit", function (event) {

      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add("was-validated");
    });
  });

});