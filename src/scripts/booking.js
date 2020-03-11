import prices from './booking-prices';

const residential = document.querySelector('#residential');
const commercial = document.querySelector('#commercial');
const residentialButton = document.querySelector('#residentialButton');
const commercialButton = document.querySelector('#commercialButton');
const type = document.querySelector('.booking-type');

const options = document.querySelector('.booking-options');
const bedrooms = document.querySelector('#bedrooms');
const bathrooms = document.querySelector('#bathrooms');
const facility = document.querySelector('.booking-option__select');
const area = document.querySelector('.booking-option__input');

const subtotalDescription = document.querySelector('.booking-subtotal__description');
const subtotalPrice = document.querySelector('.booking-subtotal__price');
const subtotalHours = document.querySelector('.booking-subtotal__hours');
const subtotalType = document.querySelector('.booking-subtotal__type');

const form = document.querySelector('.booking-form');
const fullName = document.querySelector('input[name="fullName"]');
const phone = document.querySelector('input[name="phone"]');
const email = document.querySelector('input[name="email"]');

function calculateSubtotal(facilityType) {
  if (facilityType) {
    subtotalPrice.textContent = (prices.commercial[facilityType].price || 100) * (area.value || 100);
    subtotalHours.textContent = `${Math.ceil((prices.commercial[facilityType].hours || 1) * ((area.value || 100) / 50))} hours`;
    return;
  }
  subtotalPrice.textContent =
    +bedrooms.dataset.value * prices.residential.bedroom.price + +bathrooms.dataset.value * prices.residential.bathroom.price;
  subtotalHours.textContent = `${+bedrooms.dataset.value * prices.residential.bedroom.time +
    +bathrooms.dataset.value * prices.residential.bathroom.time} hours`;
}

calculateSubtotal();

options.addEventListener('click', e => {
  if (e.target.closest('.booking-bedrooms__plus')) {
    bedrooms.dataset.value = +bedrooms.dataset.value + 1;
    bedrooms.dataset.value = bedrooms.dataset.value > 10 ? 10 : bedrooms.dataset.value;
    bedrooms.textContent = bedrooms.dataset.value;
    subtotalDescription.querySelector('.booking-subtotal__bedrooms').textContent = `${bedrooms.dataset.value} bedroom${
      bedrooms.dataset.value > 1 ? 's' : ''
    }`;
    calculateSubtotal();
  }

  if (e.target.closest('.booking-bedrooms__minus')) {
    bedrooms.dataset.value = +bedrooms.dataset.value - 1;
    bedrooms.dataset.value = bedrooms.dataset.value < 1 ? 1 : bedrooms.dataset.value;
    bedrooms.textContent = bedrooms.dataset.value;
    subtotalDescription.querySelector('.booking-subtotal__bedrooms').textContent = `${bedrooms.dataset.value} bedroom${
      bedrooms.dataset.value > 1 ? 's' : ''
    }`;
    calculateSubtotal();
  }

  if (e.target.closest('.booking-bathrooms__plus')) {
    bathrooms.dataset.value = +bathrooms.dataset.value + 1;
    bathrooms.dataset.value = bathrooms.dataset.value > 10 ? 10 : bathrooms.dataset.value;
    bathrooms.textContent = bathrooms.dataset.value;
    subtotalDescription.querySelector('.booking-subtotal__bathrooms').textContent = `${bathrooms.dataset.value} bathroom${
      bathrooms.dataset.value > 1 ? 's' : ''
    }`;
    calculateSubtotal();
  }

  if (e.target.closest('.booking-bathrooms__minus')) {
    bathrooms.dataset.value = +bathrooms.dataset.value - 1;
    bathrooms.dataset.value = bathrooms.dataset.value < 1 ? 1 : bathrooms.dataset.value;
    bathrooms.textContent = bathrooms.dataset.value;
    subtotalDescription.querySelector('.booking-subtotal__bathrooms').textContent = `${bathrooms.dataset.value} bathroom${
      bathrooms.dataset.value > 1 ? 's' : ''
    }`;
    calculateSubtotal();
  }
});

facility.addEventListener('change', e => {
  subtotalDescription.querySelector('.booking-subtotal__facility').textContent = e.target.value;
  calculateSubtotal(facility.value);
});

area.addEventListener('change', e => {
  e.target.value = e.target.value < 100 ? 100 : e.target.value;
  e.target.value = e.target.value > 10000 ? 10000 : e.target.value;
  subtotalDescription.querySelector('.booking-subtotal__area').textContent = e.target.value;
  calculateSubtotal(facility.value);
});

area.addEventListener('input', e => {
  subtotalDescription.querySelector('.booking-subtotal__area').textContent = e.target.value || 100;
  calculateSubtotal(facility.value);
});

type.addEventListener('click', e => {
  if (e.target.matches('#residentialButton')) {
    residentialButton.dataset.active = true;
    residentialButton.className = 'btn1';

    commercialButton.className = 'btn2';
    commercialButton.dataset.active = false;

    residential.style.display = 'flex';
    commercial.style.display = 'none';

    residential.dataset.active = 'true';
    commercial.dataset.active = 'false';

    subtotalType.textContent = 'Residential Cleaning - ';
    subtotalDescription.innerHTML = `Includes: <span class = "booking-subtotal__bedrooms">${bedrooms.dataset.value} bedroom${
      bedrooms.dataset.value > 1 ? 's' : ''
    }</span> <span class = "booking-subtotal__bathrooms">${bathrooms.dataset.value} bathroom${bathrooms.dataset.value > 1 ? 's' : ''}</span>`;
    calculateSubtotal();
  }

  if (e.target.matches('#commercialButton')) {
    residentialButton.dataset.active = false;
    residentialButton.className = 'btn2';

    commercialButton.className = 'btn1';
    commercialButton.dataset.active = true;

    residential.style.display = 'none';
    commercial.style.display = 'flex';

    residential.dataset.active = 'false';
    commercial.dataset.active = 'true';

    subtotalType.textContent = 'Commercial Cleaning - ';
    subtotalDescription.innerHTML = `Type: <span class = "booking-subtotal__facility">${
      facility.value
    }</span> Area: <span class = "booking-subtotal__area">${area.value || 100}</span>m²`;
    calculateSubtotal(facility.value);
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const description = subtotalDescription.querySelectorAll('span');
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const data = {
    price: subtotalPrice.textContent,
    time: subtotalHours.textContent.slice(0, -6),
    type: subtotalType.textContent.slice(0, -3),
    description: {
      1: description[0].textContent,
      2: description[1].textContent,
    },
    name: fullName.value,
    phone: phone.value,
    email: email.value,
  };
  try {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => console.log(json));
  } catch (error) {
    console.error('Error:', error);
  }
  e.target.reset();
});
