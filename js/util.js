function getRandomIntInclusive(min, max) {

  if (min >= max || min < 0 || max < 0) {
    throw new RangeError('Ошибка параметров');
  }

  min = Math.ceil(min); //Округление в большую сторону
  max = Math.floor(max); //Округление в меньшую сторону
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function getRandomFloat(min, max, symbols = 5) {
  if (min >= max || min < 0 || max < 0 || symbols < 0) {
    throw new RangeError('Ошибка параметров');
  }

  const count = 10 ** symbols;
  return (Math.floor((Math.random() * (max - min) + min) * count)) / count;
}

function getRandomArrayElement(array) {
  return array[getRandomIntInclusive(0, array.length - 1)];
}

function getRandomArrayManyElements(array) {
  const randomArray = [];

  for (let i = 0; i < getRandomIntInclusive(0, array.length); i++) {
    const currentElement = getRandomArrayElement(array);

    let status = randomArray.find((elem) => {
      return elem === currentElement;
    });
    if (!status) randomArray.push(currentElement);


  }
  return randomArray;
}

export { getRandomIntInclusive, getRandomFloat, getRandomArrayElement, getRandomArrayManyElements };
