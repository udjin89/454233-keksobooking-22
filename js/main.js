'use strict'
/*  */
function getRandomIntInclusive(min, max) {

  if (min >= max || min < 0 || max < 0) {
    return 'Error';
  }

  min = Math.ceil(min); //Округление в большую сторону
  max = Math.floor(max); //Округление в меньшую сторону
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

alert(getRandomIntInclusive(2, 4));

function getRandomArbitrary(min, max, symbols = 5) {
  if (min >= max || min < 0 || max < 0) {
    return 'Error';
  }

  let count = 10 ** symbols;
  return (Math.floor((Math.random() * (max - min) + min) * count)) / count;
}

alert(getRandomArbitrary(-1, 4, 2));
