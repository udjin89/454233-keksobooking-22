import { postData } from './post-data.js'
import { showAlert, showMessage } from './util.js';
import { resetMainPin } from './map.js';
import { resetFilters } from './map-filters.js';
import { clearImage } from './img-preview.js'
const COORDINATE_PRECISION = 5;
const TYPE_PRICE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
};
const roomsMap = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '4': [1, 2, 3, 4],
  '100': [0],
};
// Тип и цена++++++++++++++++++++++++++++++++++++++++++++++++
const type = document.querySelector('#type');
const price = document.querySelector('#price');

type.addEventListener('change', () => {
  checkPrice();
});

function checkPrice() {
  price.min = TYPE_PRICE[type.value];
  price.placeholder = TYPE_PRICE[type.value];
}
// console.log(' -> ' + price.value);

// Время заезда и выезда+++++++++++++++++++++++++++++++++++++++++

const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');


timeIn.addEventListener('change', () => {
  assign(timeOut, timeIn);
});

timeOut.addEventListener('change', () => {
  assign(timeIn, timeOut);
});

function assign(a, b) {
  a.value = b.value;
}
// Адрес +++++++++++++++++++++++++++++++++++++++++

const address = document.querySelector('#address');

function writeLatLng(coordinate) {

  address.value = coordinate.lat.toFixed(COORDINATE_PRECISION) + ' - ' + coordinate.lng.toFixed(COORDINATE_PRECISION);
}

// Количество комнат +++++++++++++++++++++++++++++++++++++++++
const rooms = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

capacity.addEventListener('input', () => {
  validationRoom();
});
rooms.addEventListener('input', () => {
  validationRoom();
});

function validationRoom() {

  const result = roomsMap[rooms.value].some((value) => {
    return value === parseInt(capacity.value, 10);
  });

  if (!result) {
    capacity.setCustomValidity('Ошибка количества комнат!');
  }
  else capacity.setCustomValidity('');

  capacity.reportValidity();
  return result;
}
// Отправка Формы+++++++++++++++++++++++++++++++++++++++++
const adForm = document.querySelector('.ad-form');

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  if (validationRoom()) {

    const formData = new FormData(evt.target);
    postData(() => resetForm(), () => onFail(), formData);
  }

});
// Сброс формы++++++++++++++++++++++++++++++++++++++++++++
function resetForm() {
  showAlert('Form send Success \n start reset');
  showMessage('success');
  adForm.reset();
  checkPrice();
  clearImage();
  resetMainPin();
}

function onFail() {
  showAlert('Form NOT send');
  showMessage('error');
}
// Сброс формы  по кнопке Reset +++++++++++++++++++++++++++++++++++++
const adFormResetButton = adForm.querySelector('.ad-form__reset');
adFormResetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  resetFilters();
  clearImage();
  resetMainPin();
});

export { checkPrice, writeLatLng };
