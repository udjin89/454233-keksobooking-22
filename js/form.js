const TYPE_PRICE = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalow': 0,
};
// Тип и цена++++++++++++++++++++++++++++++++++++++++++++++++
const type = document.querySelector('#type');
const price = document.querySelector('#price');

type.onchange = function () {
  // console.log(type.options[type.selectedIndex].value);
  price.min = TYPE_PRICE[type.options[type.selectedIndex].value];
  price.placeholder = TYPE_PRICE[type.options[type.selectedIndex].value];
  // console.log(price.min);
};
// function checkPrice() {

// };

// price.onchange = function () {
//   console.log(' -> ' + price.value);
// };
// console.log(' -> ' + price.value);

// Время заезда и выезда+++++++++++++++++++++++++++++++++++++++++

const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

timeIn.onchange = function () {
  timeOut.value = timeIn.value;
};
timeOut.onchange = function () {
  timeIn.value = timeOut.value;
};
