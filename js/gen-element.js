const typeFlat = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};
// находим наш шаблон
const templateCard = document.querySelector('#card').content;
// записываем сам блок
const templatePopup = templateCard.querySelector('.popup');
// создаем элемент "накопитель", куда запишем все созданные блоки
const fragment = document.createDocumentFragment();

function generateElementPopup(data) {
  // Клонируем элемент со всеми "внутренностями"
  const element = templatePopup.cloneNode(true);
  // заменяем заголовок
  const popupTitle = element.querySelector('.popup__title');
  popupTitle.textContent = data.offer.title;
  // заменяем адрес
  const popupAdress = element.querySelector('.popup__text--address');
  popupAdress.textContent = data.offer.address;
  // заменяем цену
  const popupPrice = element.querySelector('.popup__text--price');
  popupPrice.textContent = data.offer.price + ' ₽/ночь';
  // заменяем тип квартиры
  const popupType = element.querySelector('.popup__type');
  popupType.textContent = typeFlat[data.offer.type];

  const popupCapacity = element.querySelector('.popup__text--capacity');
  popupCapacity.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';

  const popupTime = element.querySelector('.popup__text--time');
  popupTime.textContent = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout;

  const popupFeatures = element.querySelector('.popup__features');

  popupFeatures.innerHTML = '';

  data.offer.features.forEach((feature) => {
    const featureElement = document.createElement('li');

    featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
    popupFeatures.appendChild(featureElement);
  });

  const popupDescription = element.querySelector('.popup__description');
  popupDescription.textContent = data.offer.description;

  const popupPhotos = element.querySelector('.popup__photos');
  const child = popupPhotos.querySelector('.popup__photo');
  popupPhotos.removeChild(child);


  data.offer.photos.forEach((elem) => {
    const cloneChild = child.cloneNode(true);
    popupPhotos.appendChild(cloneChild);
    cloneChild.src = elem;
  });

  const popupAvatar = element.querySelector('.popup__avatar');
  popupAvatar.src = data.author.avatar;

  // Добавляем блок в "накопитель"

  return fragment.appendChild(element);


}
export { generateElementPopup };
