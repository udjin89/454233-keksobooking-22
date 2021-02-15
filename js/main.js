import { createAds } from './data.js';
import { generateElements } from './gen-element.js';

const COUNT_AD = 10; // количество объявлений которое нужно сгенерировать
const ads = createAds(COUNT_AD);
console.log(ads);
generateElements(ads);

