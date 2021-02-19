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
  // timeOut.value = timeIn.value;
  // assign(timeOut.value, timeIn.value);
  // console.log(' -> ' + timeOut.value + '-> ' + timeIn.value);
  // timeOut.value = timeIn.value;
  assign(timeOut, timeIn);
});

timeOut.addEventListener('change', function () {
  // timeIn.value = timeOut.value;
  assign(timeIn, timeOut);
});

function assign(a, b) {
  a.value = b.value;
}
// Адрес +++++++++++++++++++++++++++++++++++++++++

const address = document.querySelector('#address');

function writeLatLng(coordinate) {

  // address.placeholder = coordinate;
  // address.innerHTML = coordinate;
  address.textContent = coordinate.lat.toFixed(COORDINATE_PRECISION) + ' - ' + coordinate.lng.toFixed(COORDINATE_PRECISION);
}
export { checkPrice, writeLatLng };
