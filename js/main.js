'use strict'

const COUNT_AD = 10; // количество объявлений
const MAX_COUNT_PHOTOS = 3;
const MIN_COUNT_PHOTOS = 0;
const MAX_PRICE_PER_NIGHT = 1000000;
const MIN_PRICE_PER_NIGHT = 0;
const MAX_ROOMS = 100;
const MIN_ROOMS = 0;
const MAX_GUESTS = 50;
const MIN_GUESTS = 0;
const MAX_X = 35.70000;
const MIN_X = 35.65000;
const MAX_Y = 139.80000;
const MIN_Y = 139.70000;

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
const PHOTO_BANK = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
/*  */
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
const ads = [];

function createAds(count) {
  for (let i = 0; i < count; i++) {
    ads[i] = createDescriptionAd();
  }

  console.log(ads);
}

function createDescriptionAd() {
  const ad = {};

  ad.author = createAuthor();
  ad.location = createLocation();
  ad.offer = createOffer();

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
  offer.price = getRandomIntInclusive(MIN_PRICE_PER_NIGHT, MAX_PRICE_PER_NIGHT);
  offer.type = getRandomArrayElement(TYPE);
  offer.rooms = getRandomIntInclusive(MIN_ROOMS, MAX_ROOMS);
  offer.guests = getRandomIntInclusive(MIN_GUESTS, MAX_GUESTS);
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
  const countPhotos = getRandomIntInclusive(MIN_COUNT_PHOTOS, MAX_COUNT_PHOTOS);

  for (let i = 0; i < countPhotos; i++) {
    photos[i] = PHOTO_BANK[i];
  }

  return photos;
}

function createLocation() {
  const location = {};

  location.x = getRandomFloat(MIN_X, MAX_X);
  location.y = getRandomFloat(MIN_Y, MAX_Y);

  return location;
}
createAds(COUNT_AD);
