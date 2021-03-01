const ALERT_SHOW_TIME = 3000;

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


const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.display = 'inline';
  alertContainer.style.minWidth = '500px';
  alertContainer.style.width = 'min-content';
  alertContainer.style.whiteSpace = 'pre-line';
  alertContainer.style.left = '50%';
  alertContainer.style.transform = 'translate(-50%, 0)';
  alertContainer.style.top = '150px';
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 5px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.border = '10px solid red';
  alertContainer.style.borderRadius = '10px';
  alertContainer.style.backgroundColor = 'white';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export { getRandomIntInclusive, getRandomFloat, getRandomArrayElement, getRandomArrayManyElements, showAlert };
