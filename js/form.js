import { postData } from './post-data.js'
import { showAlert, showMessage } from './util.js';
import { resetMainPin, generatePin } from './map.js';
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
  onCheckPrice();
});

function onCheckPrice() {
  price.min = TYPE_PRICE[type.value];
  price.placeholder = TYPE_PRICE[type.value];
}

// Время заезда и выезда+++++++++++++++++++++++++++++++++++++++++

const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');


timeIn.addEventListener('change', () => {
  onTimeAssign(timeOut, timeIn);
});

timeOut.addEventListener('change', () => {
  onTimeAssign(timeIn, timeOut);
});

function onTimeAssign(a, b) {
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
  onValidationRoom();
});
rooms.addEventListener('input', () => {
  onValidationRoom();
});

function onValidationRoom() {

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

function onSubmitForm(data) {
  adForm.addEventListener('submit', (evt) => onPost(evt, data));
}

function onPost(evt, data) {
  evt.preventDefault();
  if (onValidationRoom()) {

    const formData = new FormData(evt.target);
    postData(() => resetForm(data), () => onFail(), formData);
  }

}
// Сброс формы++++++++++++++++++++++++++++++++++++++++++++
function resetForm(data) {
  showAlert('Form send Success \n start reset');
  showMessage('success');
  adForm.reset();
  onCheckPrice();
  resetFilters();
  clearImage();
  resetMainPin();
  generatePin(data);
}

function onFail() {
  showAlert('Form NOT send');
  showMessage('error');
}
// Сброс формы  по кнопке Reset +++++++++++++++++++++++++++++++++++++
const adFormResetButton = adForm.querySelector('.ad-form__reset');
function onResetButton(data) {
  adFormResetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    adForm.reset();
    resetFilters();
    clearImage();
    resetMainPin();
    generatePin(data);
  });
}
export { onCheckPrice, writeLatLng, onResetButton, onSubmitForm }
