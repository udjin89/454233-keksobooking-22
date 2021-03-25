import './gen-element.js';
import { onCheckPrice, onResetButton, onSubmitForm } from './form.js';
import { disactivateState, activateState } from './state.js';
import { initMap, generatePin } from './map.js';
import { getData } from './get-data.js'
import { onFilterMap } from './map-filters.js'
import './img-preview.js'


disactivateState();
onCheckPrice();
if (initMap()) {
  activateState();
}

getData().then((data) => {

  const dataShowMap = data.slice(0, 10);
  generatePin(dataShowMap);
  onFilterMap(data);
  onSubmitForm(data);
  onResetButton(data);

});
