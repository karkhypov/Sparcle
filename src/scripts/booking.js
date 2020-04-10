/* eslint-disable no-param-reassign */
import prices from './bookingPrices';

const residential = document.querySelector('#residential');
const commercial = document.querySelector('#commercial');
const residentialButton = document.querySelector('#residentialButton');
const commercialButton = document.querySelector('#commercialButton');
const type = document.querySelector('.booking-type');

const bedrooms = document.querySelector('#bedrooms');
const bathrooms = document.querySelector('#bathrooms');
const facility = document.querySelector('.booking-option__select');
const area = document.querySelector('.booking-option__input');

const subtotalDescription = document.querySelector('.booking-subtotal__description');
const subtotalBedrooms = document.querySelector('.booking-subtotal__bedrooms');
const subtotalBathrooms = document.querySelector('.booking-subtotal__bathrooms');
const subtotalPrice = document.querySelector('.booking-subtotal__price');
const subtotalHours = document.querySelector('.booking-subtotal__hours');
const subtotalType = document.querySelector('.booking-subtotal__type');

const form = document.querySelector('.booking-form');
const fullName = document.querySelector('input[name="fullName"]');
const phone = document.querySelector('input[name="phone"]');
const email = document.querySelector('input[name="email"]');
const submitted = document.querySelector('.form-submitted');
const submitResult = document.querySelector('.form-submitted__result');

function swapType(activeButton, inactiveButton, activeType, inactiveType) {
  activeButton.className = 'btn1';
  inactiveButton.className = 'btn2';

  activeType.style.display = 'flex';
  inactiveType.style.display = 'none';

  if (activeType === residential) {
    subtotalType.textContent = 'Residential Cleaning - ';
    subtotalDescription.innerHTML = `Includes: <span class = "booking-subtotal__bedrooms">${bedrooms.dataset.value} bedroom${
      bedrooms.dataset.value > 1 ? 's' : ''
    }</span> <span class = "booking-subtotal__bathrooms">${bathrooms.dataset.value} bathroom${bathrooms.dataset.value > 1 ? 's' : ''}</span>`;
  } else if (activeType === commercial) {
    subtotalType.textContent = 'Commercial Cleaning - ';
    subtotalDescription.innerHTML = `Type: <span class = "booking-subtotal__facility">${
      facility.value
    }</span> Area: <span class = "booking-subtotal__area">${area.value || 100}</span>m²`;
  }
}

function calculateSubtotal(facilityType) {
  if (facilityType) {
    subtotalPrice.textContent = (prices.commercial[facilityType].price || 100) * (area.value || 100);
    subtotalHours.textContent = `${Math.ceil((prices.commercial[facilityType].time || 1) * ((area.value || 100) / 40))} hours`;
    return;
  }
  subtotalPrice.textContent =
    +bedrooms.dataset.value * prices.residential.bedroom.price + +bathrooms.dataset.value * prices.residential.bathroom.price;
  subtotalHours.textContent = `${+bedrooms.dataset.value * prices.residential.bedroom.time +
    +bathrooms.dataset.value * prices.residential.bathroom.time} hours`;
}

function calculateResidential(roomType, operator, result, postfix) {
  if (operator === 'plus') {
    roomType.dataset.value = +roomType.dataset.value + 1;
    roomType.dataset.value = roomType.dataset.value > 10 ? 10 : roomType.dataset.value;
  } else if (operator === 'minus') {
    roomType.dataset.value = +roomType.dataset.value - 1;
    roomType.dataset.value = roomType.dataset.value < 1 ? 1 : roomType.dataset.value;
  }
  roomType.textContent = roomType.dataset.value;
  result.textContent = `${roomType.dataset.value} ${postfix}${roomType.dataset.value > 1 ? 's' : ''}`;
}

function formSubmitted(data, header) {
  if (data) {
    submitResult.querySelector('p').textContent = header;
    submitResult.querySelector('pre').textContent = data;
    submitResult.classList.add('form-submitted-show');
    setTimeout(() => submitResult.classList.remove('form-submitted-show'), 7000);
  } else {
    submitted.classList.add('form-submitted-show');
    setTimeout(() => submitted.classList.remove('form-submitted-show'), 2000);
  }
}

function submitForm() {
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
    .then(json => modalSubmitted(JSON.stringify(json, null, ' '), 'Data sent successfully'));
  } catch (error) {
    modalSubmitted(error, 'Error');
  }
}



calculateSubtotal();

residential.addEventListener('click', e => {
  if (e.target.closest('.booking-bedrooms__plus')) {
    calculateResidential(bedrooms, 'plus', subtotalBedrooms, 'bedroom');
  }
  if (e.target.closest('.booking-bedrooms__minus')) {
    calculateResidential(bedrooms, 'minus', subtotalBedrooms, 'bedroom');
  }

  if (e.target.closest('.booking-bathrooms__plus')) {
    calculateResidential(bathrooms, 'plus', subtotalBathrooms, 'bathroom');
  }

  if (e.target.closest('.booking-bathrooms__minus')) {
    calculateResidential(bathrooms, 'minus', subtotalBathrooms, 'bathroom');
  }
  calculateSubtotal();
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
    swapType(residentialButton, commercialButton, residential, commercial);
    calculateSubtotal();
  } else if (e.target.matches('#commercialButton')) {
    swapType(commercialButton, residentialButton, commercial, residential);
    calculateSubtotal(facility.value);
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();
  submitForm();
  e.target.reset();
  formSubmitted();
});
