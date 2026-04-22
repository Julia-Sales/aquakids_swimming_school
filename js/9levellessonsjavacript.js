// Lesson modal: move code from 9 Level Lessons inline script here
document.addEventListener('DOMContentLoaded', function () {
  try {
    const modalEl = document.getElementById('lessonModal');
    if (!modalEl) return; // nothing to do on pages without the modal
    const modalTitle = document.getElementById('lessonModalLabel');
    const modalImg = document.getElementById('lessonModalImg');
    const modalDesc = document.getElementById('lessonModalDesc');
    const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);

    document.querySelectorAll('.view-lesson').forEach(function(btn){
      btn.addEventListener('click', function(ev){
        const title = btn.getAttribute('data-title') || '';
        const img = btn.getAttribute('data-img') || '';
        const desc = btn.getAttribute('data-desc') || '';
        modalTitle.textContent = title;
        modalImg.src = img;
        modalImg.alt = title;
        const items = desc.split('|');

        let html = '<ul>';
        items.forEach(item => { html += `<li>${item}</li>`; });
        html += '</ul>';

        modalDesc.innerHTML = html;
        bsModal.show();
      });
    });
  } catch (err) {
    console.error('Lesson modal init error:', err);
  }
});