const ALERT_SHOW_TIME = 3000;
const ALERT_STYLE = 'z-index: 1000; position: absolute; display: inline; min-width: 500px; width: min-content; whitespace: pre-line; left: 50%; transform: translate(-50%, 0); top: 150px; right: 0; padding: 10px 5px; fontSize: 30px; text-align: center; border: 10px solid red; border-radius: 10px; background-color: white; ';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
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
}
function showMessage(type, textMessage) {

  switch (type) {
    case 'success':
      successNode.style.zIndex = 1000;
      if (textMessage) 
      {
        successMessageText.textContent = textMessage;
      }
      currentMessage = mainArea.appendChild(successNode);
      window.addEventListener('keydown', onEscKeydown);
      window.addEventListener('click', onOverlayClick);
      break;
    case 'error':
      errorNode.style.zIndex = 1000;
      if (textMessage) 
      {
        errorMessageText.textContent = textMessage;
      }
      currentMessage = mainArea.appendChild(errorNode);
      window.addEventListener('keydown', onEscKeydown);
      window.addEventListener('click', onOverlayClick);
      break;
    default: throw new Error('Неизвестный тип сообщения!');
  }

}

export { showAlert, showMessage };
