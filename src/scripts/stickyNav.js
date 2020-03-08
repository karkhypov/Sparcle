const nav = document.querySelector('#sticky');

window.addEventListener('scroll', () => {
  if (document.body.clientWidth > 640 && (document.body.scrollTop > 125 || document.documentElement.scrollTop > 125)) {
    nav.classList.add('sticky-nav');
  } else {
    nav.classList.remove('sticky-nav');
  }
});
