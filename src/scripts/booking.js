const residential = document.querySelector('#residential');
const commercial = document.querySelector('#commercial');
const residentialBtn = document.querySelector('#residentialBtn');
const commercialBtn = document.querySelector('#commercialBtn');
const type = document.querySelector('.booking-type');

const subtotalPrice = document.querySelector('.booking-subtotal span');
const subtotalType = document.querySelector('.booking-subtotal__type');
const subtotalValues = document.querySelectorAll('.booking-subtotal__value');

type.addEventListener('click', e => {
  if (e.target.matches('#residentialBtn')) {
    residentialBtn.dataset.active = true;
    residentialBtn.className = 'btn1';

    commercialBtn.className = 'btn2';
    commercialBtn.dataset.active = false;

    residential.style.display = 'flex';
    commercial.style.display = 'none';

    residential.dataset.active = 'true';
    commercial.dataset.active = 'false';
  }

  if (e.target.matches('#commercialBtn')) {
    residentialBtn.dataset.active = false;
    residentialBtn.className = 'btn2';

    commercialBtn.className = 'btn1';
    commercialBtn.dataset.active = true;

    residential.style.display = 'none';
    commercial.style.display = 'flex';

    residential.dataset.active = 'false';
    commercial.dataset.active = 'true';
  }
});
