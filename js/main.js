import { createAds } from './data.js';
import { generateElements } from './gen-element.js';
import { checkPrice } from './form.js';
import { disactivateState, activateState } from './state.js';
import { initMap, generatePin } from './map.js';
import { getData } from './get-data.js'

const COUNT_AD = 10; // количество объявлений которое нужно сгенерировать
// const ads = createAds(COUNT_AD);
// console.log(getData());

disactivateState();



getData().then((data) => {
  console.log('input -> ' + data);
  // try {
  const descriptions = generateElements(data);
  if (data) {
    generatePin(data, descriptions);
    checkPrice();
    if (initMap()) {
      activateState();
    }
    return 0;
  }
  else {
    checkPrice();
    if (initMap()) {
      activateState();
    }
  }

});



// const descriptions = generateElements(ads);
// // console.log(descriptions);




//

