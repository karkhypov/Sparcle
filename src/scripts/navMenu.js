const logo = document.querySelector('.nav-logo');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

function toggleMenu() {
  hamburger.classList.toggle('change');
  navMenu.classList.toggle('show');
}

function closeMenu() {
  hamburger.classList.remove('change');
  navMenu.classList.remove('show');
}

logo.addEventListener('click', () => closeMenu());
hamburger.addEventListener('click', () => toggleMenu());
navMenu.addEventListener('click', () => toggleMenu());
