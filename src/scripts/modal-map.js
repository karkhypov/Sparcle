const modalButton = document.querySelector('.hero .btn2');
const modalMap = document.querySelector('.modal-map');
const modalOverlay = document.querySelector('.modal-overlay');

modalButton.addEventListener('click', () => {
  modalMap.classList.add('modal-show');
  modalOverlay.classList.add('modal-show');
});

modalOverlay.addEventListener('click', () => {
  modalMap.classList.remove('modal-show');
  modalOverlay.classList.remove('modal-show');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    modalMap.classList.remove('modal-show');
    modalOverlay.classList.remove('modal-show');
  }
});
