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
  alertContainer.style.zIndex = 1000;
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

const mainArea = document.querySelector('main');

const templateSuccessMessage = document.querySelector('#success').content;
const successMessage = templateSuccessMessage.querySelector('.success');
// Клонируем элемент со всеми "внутренностями"
const element = successMessage.cloneNode(true);
const successMessageText = element.querySelector('.success__message');

const templateErrorMessage = document.querySelector('#error').content;
const errorMessage = templateErrorMessage.querySelector('.error');
// Клонируем элемент со всеми "внутренностями"
const errorNode = errorMessage.cloneNode(true);
const errorMessageText = errorNode.querySelector('.success__message');
const typeSuccess = 1;

const pushEscKeydown = (type, evt) => {
  console.log('Type $$$ - > ' + type);
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    removeMessage(type);
  }
}
const onClickArea = (evt) => {
  removeMessage();
}

function removeMessage(type) {
  // mainArea.removeChild(element);
  // mainArea.removeChild(errorNode);
  console.log('Type - > ' + type);
  type === 1 ? mainArea.removeChild(element) : mainArea.removeChild(errorNode);

  window.removeEventListener('keydown', pushEscKeydown);
  window.removeEventListener('click', onClickArea);
}
//--
function showSuccessMessage(textMessage) {

  element.style.zIndex = 1000;
  successMessageText.textContent = textMessage;
  mainArea.appendChild(element);

  window.addEventListener('keydown', pushEscKeydown(typeSuccess));
  window.addEventListener('click', onClickArea);
}

function showErrorMessage(textMessage) {

  errorNode.style.zIndex = 1000;
  successMessageText.textContent = textMessage;
  mainArea.appendChild(errorNode);

  window.addEventListener('keydown', pushEscKeydown);
  window.addEventListener('click', onClickArea);
}

export { getRandomIntInclusive, getRandomFloat, getRandomArrayElement, getRandomArrayManyElements, showAlert, showSuccessMessage, showErrorMessage };
