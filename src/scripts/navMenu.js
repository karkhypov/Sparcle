const logo = document.querySelector('.nav-logo');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

function toggle() {
  hamburger.classList.toggle('change');
  navMenu.classList.toggle('show');
}

logo.addEventListener('click', () => {
  hamburger.classList.remove('change');
  navMenu.classList.remove('show');
});

hamburger.addEventListener('click', () => toggle());

navMenu.addEventListener('click', () => toggle());
