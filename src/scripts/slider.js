const slider = document.querySelector('.slider');

let current = slider.querySelector('.current') || slider.firstElementChild;
let prev = current.previousElementSibling || slider.lastElementChild;
let next = current.nextElementSibling || slider.firstElementChild;

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

applyClasses();

setInterval(() => {
  move();
}, 10000);
