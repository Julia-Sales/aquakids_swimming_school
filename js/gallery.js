// Simple, dependency-free gallery/lightbox script for About Us gallery
document.addEventListener('DOMContentLoaded', function () {
  try {
    const galleryImgs = Array.from(document.querySelectorAll('.gallery-item img'));
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    if (!galleryImgs.length || !lightbox || !lightboxImg) return;

    let currentIndex = 0;

    function openLightbox(index) {
      currentIndex = index;
      lightboxImg.src = galleryImgs[currentIndex].src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      // focus the image for keyboard events
      lightboxImg.focus && lightboxImg.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      lightboxImg.src = '';
      document.body.style.overflow = '';
    }

    function showRelative(offset) {
      currentIndex = (currentIndex + offset + galleryImgs.length) % galleryImgs.length;
      lightboxImg.src = galleryImgs[currentIndex].src;
    }

    // Click handlers for thumbnails
    galleryImgs.forEach(function (img, idx) {
      img.style.cursor = 'pointer';
      img.setAttribute('tabindex', '0');
      img.addEventListener('click', function () { openLightbox(idx); });
      img.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') openLightbox(idx);
      });
      // Preload
      const p = new Image(); p.src = img.src;
    });

    // Arrow handlers
    prevBtn && prevBtn.addEventListener('click', function (ev) { ev.stopPropagation(); showRelative(-1); });
    nextBtn && nextBtn.addEventListener('click', function (ev) { ev.stopPropagation(); showRelative(1); });

    // Close when clicking on backdrop
    lightbox.addEventListener('click', function (ev) {
      if (ev.target === lightbox) closeLightbox();
    });

    // Don't close when clicking the image itself
    lightboxImg && lightboxImg.addEventListener('click', function (ev) { ev.stopPropagation(); });

    // Keyboard navigation
    document.addEventListener('keydown', function (ev) {
      if (!lightbox.classList.contains('active')) return;
      if (ev.key === 'Escape') closeLightbox();
      if (ev.key === 'ArrowLeft') showRelative(-1);
      if (ev.key === 'ArrowRight') showRelative(1);
    });
  } catch (err) {
    // Fail silently but log to console for debugging
    console.error('Gallery script error:', err);
  }
});
