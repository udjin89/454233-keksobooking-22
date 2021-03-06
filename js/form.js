import { postData } from './post-data.js'
import { showAlert, showMessage } from './util.js';
import { COORDINATE_INIT, resetMainPin } from './map.js';

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

type.addEventListener('change', function () {
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


timeIn.addEventListener('change', function () {
  assign(timeOut, timeIn);
});

timeOut.addEventListener('change', function () {
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
    // console.log(value);
    // console.log(capacity.value);
    return value === parseInt(capacity.value, 10);
  });
  // console.log('->' + result);
  // let  error = false;
  // if (rooms.value == 1 && capacity.value != 1) {
  //   capacity.setCustomValidity('Для одной комнаты подходит только один гость!');
  //   // error = true;
  // } else if (rooms.value == 2 && capacity.value != 1 && capacity.value != 2) {
  //   capacity.setCustomValidity('Для двух комнат подходит только один или два гостя!');
  //   // error = true;
  // } else if (rooms.value == 3 && capacity.value != 1 && capacity.value != 2 && capacity.value != 3) {
  //   capacity.setCustomValidity('Для трех комнат подходит от одного до трех гостей!');
  //   // error = true;
  // } else if (rooms.value == 100 && capacity.value != 0) {
  //   capacity.setCustomValidity('Не подходит для гостей!');
  //   // error = true;
  // }
  // else capacity.setCustomValidity('');
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
    // adForm.submit();

    const formData = new FormData(evt.target);
    // console.log(evt.target);
    // console.log(formData);
    console.log('send form' + '\n data -> \n' + formData);
    postData(() => resetForm(), () => onFail(), formData);
  }

});
// Сброс формы++++++++++++++++++++++++++++++++++++++++++++
function resetForm() {
  showAlert('Form send Success \n start reset');
  showMessage('success');
  adForm.reset();
  checkPrice();
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
  console.log('Click RESET');
  adForm.reset();
  resetMainPin();
  // resetValue();
}
);

// function resetValue() {
//   type.value = 'flat';
//   price.value = '';
//   checkPrice();
//   rooms.value = 1;
//   capacity.value = 3;
//   timeIn.value = '12:00';
//   timeOut.value = '12:00';
// }
export { checkPrice, writeLatLng };
