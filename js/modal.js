// Universal Modal Logic
const universalModal = document.getElementById('universal-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');

export function openModal(title, content) {
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    universalModal.classList.add('open');
}
function closeModal() {
    universalModal.classList.remove('open');
    // Clear content after closing for next use
    setTimeout(() => {
        modalTitle.textContent = '';
        modalBody.textContent = '';
    }, 300); // Allow transition to complete
}

modalCloseBtn.addEventListener('click', closeModal);
universalModal.addEventListener('click', (e) => {
    if (e.target === universalModal) { // Close only if clicking on overlay, not content
        closeModal();
    }
});