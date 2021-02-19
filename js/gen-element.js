const typeFlat = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
// console.log('Start generate element');
// находим наш шаблон
const templateCard = document.querySelector('#card').content;
// записываем сам блок
const templatePopup = templateCard.querySelector('.popup');
// создаем элемент "накопитель", куда запишем все созданные блоки
const fragment = document.createDocumentFragment();

function generateElements(arrayElements) {
  for (let i = 0; i < arrayElements.length; i++) {
    // Клонируем элемент со всеми "внутренностями"
    const element = templatePopup.cloneNode(true);
    // заменяем заголовок
    const popupTitle = element.querySelector('.popup__title');
    popupTitle.textContent = arrayElements[i].offer.title;
    // заменяем адрес
    const popupAdress = element.querySelector('.popup__text--address');
    popupAdress.textContent = arrayElements[i].offer.address;
    // заменяем цену
    const popupPrice = element.querySelector('.popup__text--price');
    popupPrice.textContent = arrayElements[i].offer.price + ' ₽/ночь';
    // заменяем тип квартиры
    const popupType = element.querySelector('.popup__type');
    popupType.textContent = typeFlat[arrayElements[i].offer.type];

    const popupCapacity = element.querySelector('.popup__text--capacity');
    popupCapacity.textContent = arrayElements[i].offer.rooms + ' комнаты для ' + arrayElements[i].offer.guests + ' гостей';

    const popupTime = element.querySelector('.popup__text--time');
    popupTime.textContent = 'Заезд после ' + arrayElements[i].offer.checkin + ' выезд до ' + arrayElements[i].offer.checkout;

    const popupFeatures = element.querySelector('.popup__features');

    popupFeatures.innerHTML = '';

    arrayElements[i].offer.features.forEach((feature) => {
      const featureElement = document.createElement('li');

      featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
      popupFeatures.appendChild(featureElement);
    });

    const popupDescription = element.querySelector('.popup__description');
    popupDescription.textContent = arrayElements[i].offer.description;

    const popupPhotos = element.querySelector('.popup__photos');
    const child = popupPhotos.querySelector('.popup__photo');
    popupPhotos.removeChild(child);

    for (let j = 0; j < arrayElements[i].offer.photos.length; j++) {
      const cloneChild = child.cloneNode(true);
      popupPhotos.appendChild(cloneChild);
      cloneChild.src = arrayElements[i].offer.photos[j];
    }
    // console.log(popupPhotos);

    const popupAvatar = element.querySelector('.popup__avatar');
    popupAvatar.src = arrayElements[i].author.avatar;

    // console.log(popupAvatar);

    // Добавляем блок в "накопитель"
    fragment.appendChild(element);

  }
  //Вставка данных
  // const mapCanvas = document.querySelector('#map-canvas');
  // mapCanvas.appendChild(fragment);
  return fragment;
}
// console.log(mapCanvas);

// console.log(mapCanvas);
export { generateElements };
