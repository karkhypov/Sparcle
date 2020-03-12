const slider = document.querySelector('.slider');

let prev;
let current;
let next;

function startSlider() {
  current = slider.querySelector('.current') || slider.firstElementChild;
  prev = current.previousElementSibling || slider.lastElementChild;
  next = current.nextElementSibling || slider.firstElementChild;
}

function applyClasses() {
  current.classList.add('current');
  prev.classList.add('prev');
  next.classList.add('next');
}

function move() {
  prev.classList.remove('prev');
  current.classList.remove('current');
  next.classList.remove('next');
  [prev, current, next] = [current, next, next.nextElementSibling || slider.firstElementChild];
  applyClasses();
}

startSlider();
applyClasses();

setInterval(() => {
  move();
}, 10000);
