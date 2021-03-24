import './gen-element.js';
import { checkPrice } from './form.js';
import { disactivateState, activateState } from './state.js';
import { initMap, generatePin } from './map.js';
import { getData } from './get-data.js'
import { onFilterMap } from './map-filters.js'
import './img-preview.js'


disactivateState();
checkPrice();
if (initMap()) {
  activateState();
}

getData().then((data) => {

  const dataShowMap = data.slice(0, 10);

  if (data) generatePin(dataShowMap);

  onFilterMap(data);

});
