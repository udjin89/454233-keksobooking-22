const ALERT_SHOW_TIME = 3000;
const ALERT_STYLE = 'zIndex: 1000; position: absolute; display: inline; minWidth: 500px; width: min - content; whiteSpace: pre - line; left: 50 % ; transform: translate(-50 %, 0); top: 150px; right: 0; padding: 10px 5px; fontSize: 30px; textAlign: center; border: 10px solid red; borderRadius: 10px; backgroundColor: white; ';

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
  // alertContainer.style.zIndex = 1000;
  // alertContainer.style.position = 'absolute';
  // alertContainer.style.display = 'inline';
  // alertContainer.style.minWidth = '500px';
  // alertContainer.style.width = 'min-content';
  // alertContainer.style.whiteSpace = 'pre-line';
  // alertContainer.style.left = '50%';
  // alertContainer.style.transform = 'translate(-50%, 0)';
  // alertContainer.style.top = '150px';
  // alertContainer.style.right = 0;
  // alertContainer.style.padding = '10px 5px';
  // alertContainer.style.fontSize = '30px';
  // alertContainer.style.textAlign = 'center';
  // alertContainer.style.border = '10px solid red';
  // alertContainer.style.borderRadius = '10px';
  // alertContainer.style.backgroundColor = 'white';
  alertContainer.style.cssText = ALERT_STYLE;
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
const successNode = successMessage.cloneNode(true);
const successMessageText = successNode.querySelector('.success__message');

const templateErrorMessage = document.querySelector('#error').content;
const errorMessage = templateErrorMessage.querySelector('.error');
// Клонируем элемент со всеми "внутренностями"
const errorNode = errorMessage.cloneNode(true);
const errorMessageText = errorNode.querySelector('.success__message');

let currentMessage;

function onEscKeydown(evt) {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    removeMessage();
  }
}

function onOverlayClick() {
  removeMessage();
}

function removeMessage() {
  currentMessage.remove();
  window.removeEventListener('keydown', onEscKeydown);
  window.removeEventListener('click', onOverlayClick);
  console.log('Удалили обработчики событий и сообщение');
}
function showMessage(type, textMessage) {
  console.log('Show message(function SHOW MESSAGE): type-> ' + type + '\n text-> ' + textMessage);

  switch (type) {
    case 'success':
      successNode.style.zIndex = 1000;
      if (textMessage) successMessageText.textContent = textMessage;
      currentMessage = mainArea.appendChild(successNode);
      // mainArea.appendChild(successNode);
      window.addEventListener('keydown', onEscKeydown);
      window.addEventListener('click', onOverlayClick);
      console.log('Успех! слушаем события');
      break;
    case 'error':
      errorNode.style.zIndex = 1000;
      if (textMessage) errorMessageText.textContent = textMessage;
      currentMessage = mainArea.appendChild(errorNode);
      // mainArea.appendChild(errorNode);
      window.addEventListener('keydown', onEscKeydown);
      window.addEventListener('click', onOverlayClick);
      console.log('ошибка отправки! слушаем события');
      break;
    default: console.log('Неизвестный тип сообщения!')
  }

}

export { getRandomIntInclusive, getRandomFloat, getRandomArrayElement, getRandomArrayManyElements, showAlert, showMessage };
