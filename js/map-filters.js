import { checkPrice } from './form.js';
import { generatePin, clearOldPin } from './map.js';

const TYPE_FILTER = {
  'housing-type': 'type',
  'housing-price': 'price',
  'housing-rooms': 'rooms',
  'housing-guests': 'guests',
};

const formFilter = document.querySelector('.map__filters-container');
const mapFiltres = formFilter.querySelectorAll('.map__filter');
const mapFeatures = formFilter.querySelectorAll('.features');

let filtredData;

function onFilterMap(data) {
  mapFiltres.forEach((filter) => {
    filter.addEventListener('input', () => applyFilter(filter, data));
  });
}

function applyFilter(filter, data) {
  // console.log(TYPE_FILTER[filter.name] + ' -> CHANGE OPTION -> ' + filter.value);
  // console.log('DATA in ->', data);
  console.log('**********');
  // console.log(mapFiltres[0].name + ' -> ' + mapFiltres[0].value);
  // console.log(mapFiltres[1].value);
  // console.log(mapFiltres[2].value);
  // console.log(mapFiltres[3].value);
  // for (let i = 0; i < mapFiltres.length; i++) {
  // console.log(mapFiltres[i].value + ' -> fuck filter START');
  filtredData = startFilters(data);
  // }
  console.log('filtredData -> ' + filtredData);
  clearOldPin();
  generatePin(filtredData);
}

function startFilters(data) {
  filtredData = checkType(data);
  filtredData = checkPrices(filtredData);
  filtredData = checkRooms(filtredData);
  filtredData = checkGuests(filtredData);

  return filtredData;
}

function checkType(data) {
  filtredData = data.filter((element) => {
    if (element.offer.type === mapFiltres[0].value || mapFiltres[0].value === 'any') {
      return true;
    }
    return false;
  });
  return filtredData;
}

function checkPrices(data) {
  filtredData = data.filter((element) => {
    // console.log(element.offer.price + '  -> ' + mapFiltres[1].value);
    if (mapFiltres[1].value === 'any') {
      return true;
    }
    else {
      switch (mapFiltres[1].value) {
        case 'low':
          if (element.offer.price <= 10000) return true;
          else return false;
        case 'middle':
          if (element.offer.price > 10000 && element.offer.price < 50000) return true;
          else return false;
        case 'high':
          if (element.offer.price >= 50000) return true;
          else return false;
      }
    }
    return false;
  });
  return filtredData;
}

function checkRooms(data) {
  filtredData = data.filter((element) => {
    // console.log(element.offer.rooms + '  -> ' + mapFiltres[2].value);
    if (mapFiltres[2].value === 'any' || element.offer.rooms == mapFiltres[2].value) {
      return true;
    }
    return false;
  });
  return filtredData;
}

function checkGuests(data) {
  filtredData = data.filter((element) => {
    console.log(element.offer.guests + '  -> ' + mapFiltres[3].value);
    if (mapFiltres[3].value === 'any' || element.offer.guests == mapFiltres[3].value) {
      return true;
    }
    return false;
  });
  return filtredData;
}
export { onFilterMap }
