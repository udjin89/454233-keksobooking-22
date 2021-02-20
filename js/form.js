const COORDINATE_PRECISION = 5;
const TYPE_PRICE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
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
  let error = false;
  if (rooms.value == 1 && capacity.value != 1) {
    capacity.setCustomValidity('Для одной комнаты подходит только один гость!');
    error = true;
  } else if (rooms.value == 2 && capacity.value != 1 && capacity.value != 2) {
    capacity.setCustomValidity('Для двух комнат подходит только один или два гостя!');
    error = true;
  } else if (rooms.value == 3 && capacity.value != 1 && capacity.value != 2 && capacity.value != 3) {
    capacity.setCustomValidity('Для трех комнат подходит от одного до трех гостей!');
    error = true;
  } else if (rooms.value == 100 && capacity.value != 0) {
    capacity.setCustomValidity('Не подходит для гостей!');
    error = true;
  }
  else capacity.setCustomValidity('');

  capacity.reportValidity();
  return error;
}
// Отправка Формы +++++++++++++++++++++++++++++++++++++++++
const adForm = document.querySelector('.ad-form');
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!validationRoom()) {
    adForm.submit();
  }

});
export { checkPrice, writeLatLng };
