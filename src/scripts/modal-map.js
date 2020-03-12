const modalButton = document.querySelector('.hero .btn2');
const modalMap = document.querySelector('.modal-map');
const modalOverlay = document.querySelector('.modal-overlay');

function showModal() {
  modalMap.classList.add('modal-show');
  modalOverlay.classList.add('modal-show');
}

function closeModal() {
  modalMap.classList.remove('modal-show');
  modalOverlay.classList.remove('modal-show');
}

modalButton.addEventListener('click', () => showModal());
modalOverlay.addEventListener('click', () => closeModal());
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
