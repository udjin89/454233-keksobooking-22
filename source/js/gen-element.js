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
  if (data.offer.title) {
    popupTitle.textContent = data.offer.title;
  }
  else {
    popupTitle.classList.add('hidden');
  }
  // заменяем адрес
  const popupAdress = element.querySelector('.popup__text--address');
  if (data.offer.address) {
    popupAdress.textContent = data.offer.address;
  }
  else {
    popupAdress.classList.add('hidden');
  }
  // заменяем цену
  const popupPrice = element.querySelector('.popup__text--price');
  if (data.offer.price) {
    popupPrice.textContent = data.offer.price + ' ₽/ночь';
  }
  else {
    popupPrice.classList.add('hidden');
  }

  // заменяем тип квартиры
  const popupType = element.querySelector('.popup__type');
  if (data.offer.type) {
    popupType.textContent = typeFlat[data.offer.type];
  }
  else {
    popupType.classList.add('hidden');
  }


  const popupCapacity = element.querySelector('.popup__text--capacity');
  if (data.offer.rooms && data.offer.guests) {
    popupCapacity.textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  }
  else {
    popupCapacity.classList.add('hidden');
  }


  const popupTime = element.querySelector('.popup__text--time');
  if (data.offer.checkin && data.offer.checkout) {
    popupTime.textContent = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout;
  }
  else {
    popupCapacity.classList.add('hidden');
  }


  const popupFeatures = element.querySelector('.popup__features');

  popupFeatures.innerHTML = '';

  if (data.offer.features[0]) {
    data.offer.features.forEach((feature) => {
      const featureElement = document.createElement('li');

      featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
      popupFeatures.appendChild(featureElement);
    });
  }
  else {
    popupFeatures.classList.add('hidden');
  }
  const popupDescription = element.querySelector('.popup__description');
  if (data.offer.description) {
    popupDescription.textContent = data.offer.description;
  }
  else {
    popupDescription.classList.add('hidden');
  }


  const popupPhotos = element.querySelector('.popup__photos');
  const child = popupPhotos.querySelector('.popup__photo');
  popupPhotos.removeChild(child);

  if (data.offer.photos[0]) {
    data.offer.photos.forEach((elem) => {
      const cloneChild = child.cloneNode(true);
      popupPhotos.appendChild(cloneChild);
      cloneChild.src = elem;
    });
  }
  else {
    popupPhotos.classList.add('hidden');
  }


  const popupAvatar = element.querySelector('.popup__avatar');
  if (data.author.avatar) {
    popupAvatar.src = data.author.avatar;
  }
  else {
    popupAvatar.classList.add('hidden');
  }


  // Добавляем блок в "накопитель"

  return fragment.appendChild(element);


}
export { generateElementPopup };
