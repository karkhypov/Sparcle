const nav = document.querySelector('#sticky');

const navObserverOptions = {
  rootMargin: '100px 0px 0px 0px',
};

const stickyNavObserver = new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting && document.body.clientWidth > 640) {
    nav.classList.add('sticky-nav');
  } else {
    nav.classList.remove('sticky-nav');
  }
}, navObserverOptions);

stickyNavObserver.observe(nav);