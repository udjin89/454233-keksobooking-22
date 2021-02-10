'use strict'
/*  */
function getRandomIntInclusive(min, max) {

  if (min >= max || min < 0 || max < 0) {
    throw new RangeError('Ошибка параметров');
  }

  min = Math.ceil(min); //Округление в большую сторону
  max = Math.floor(max); //Округление в меньшую сторону
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

// alert(getRandomIntInclusive(2, 4));

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
  // console.log(status);
  // console.log(randomArray);
  return randomArray;
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const COUNT_AD = 10; // количество объявлений

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const ads = [];

function createAds(count) {
  for (let i = 0; i < count; i++) {
    ads[i] = createDescriptionAd();
  }

  console.log(ads);
}

function createDescriptionAd() {
  const ad = [];

  ad[0] = createAuthor();
  ad[2] = createLocation();
  ad[1] = createOffer();

  return ad;
}

function createAuthor() {
  const author = {};

  author.avatar = 'img/avatars/user0' + getRandomIntInclusive(1, 8) + '.png';
  // console.log(author.avatar);
  return author;
}

function createOffer() {

  const offer = {};

  offer.title = 'Мое обьявление';
  offer.address = 'координаты';
  offer.price = getRandomIntInclusive(0, 100000);
  offer.type = getRandomArrayElement(TYPE);
  offer.rooms = getRandomIntInclusive(0, 50);
  offer.guests = getRandomIntInclusive(0, 200);
  offer.checkin = getRandomArrayElement(CHECKIN);
  offer.checkout = getRandomArrayElement(CHECKOUT);
  offer.features = getRandomArrayManyElements(FEATURES);
  offer.description = 'Мое описание';
  offer.photos = createPhotos();
  // console.log(offer.features);
  return offer;
}

function createPhotos() {
  const photos = [];
  const countPhotos = getRandomIntInclusive(0, 50);

  for (let i = 0; i < countPhotos; i++) {
    photos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg';
  }

  return photos;
}

function createLocation() {
  const location = {};

  location.x = getRandomFloat(35.65000, 35.70000);
  location.y = getRandomFloat(139.70000, 139.80000);

  return location;
}
createAds(COUNT_AD);
