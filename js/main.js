import { createAds } from './data.js';
import { generateElements } from './gen-element.js';
import { checkPrice } from './form.js';
import { disactivateState, activateState } from './state.js';
import { initMap, generatePin } from './map.js';
import { getData } from './get-data.js'
import { onFilterMap } from './map-filters.js'
import './img-preview.js'

const COUNT_AD = 10; // количество объявлений которое нужно сгенерировать
// const ads = createAds(COUNT_AD);

disactivateState();
checkPrice();
if (initMap()) {
  activateState();
}

getData().then((data) => {
  // const descriptions = generateElements(data);
  // console.log('DATA ->', data);

  const dataShowMap = data.slice(0, 10);

  // console.log('New DATA ->', dataShowMap);

  if (data) generatePin(dataShowMap);

  onFilterMap(data);

});
