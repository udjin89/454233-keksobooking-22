/* global _:readonly */
import { checkPrice } from './form.js';
import { generatePin, clearOldPin } from './map.js';

const MAX_COUNT_ADS = 10;
const RERENDER_DELAY = 500;

const TYPE_FILTER = {
  'housing-type': 'type',
  'housing-price': 'price',
  'housing-rooms': 'rooms',
  'housing-guests': 'guests',
};
const PRICES = {

  'low': {
    'min': 0,
    'max': 10000,
  },
  'middle': {
    'min': 10000,
    'max': 50000,
  },
  'high': {
    'min': 50000,
    'max': Infinity,
  },
};
const filtersFormElement = document.querySelector('.map__filters');
const formFilter = document.querySelector('.map__filters-container');
const mapFiltres = formFilter.querySelectorAll('.map__filter');
const mapFeatures = formFilter.querySelectorAll('.map__feature');
//---
const mapFeaturesWifi = formFilter.querySelector('#filter-wifi');
const mapFeaturesDishwasher = formFilter.querySelector('#filter-dishwasher');
const mapFeaturesParking = formFilter.querySelector('#filter-parking');
const mapFeaturesWasher = formFilter.querySelector('#filter-washer');
const mapFeaturesElevator = formFilter.querySelector('#filter-elevator');
const mapFeaturesConditioner = formFilter.querySelector('#filter-conditioner');
//---
const mapFeaturesValue = formFilter.querySelectorAll('.map__checkbox');
const filterType = formFilter.querySelector('#housing-type');
const filterPrice = formFilter.querySelector('#housing-price');
const filterRooms = formFilter.querySelector('#housing-rooms');
const filterGuests = formFilter.querySelector('#housing-guests');

let filtredData = [];
/*
function onFilterMap(data) {
  mapFiltres.forEach((filter) => {
    filter.addEventListener('input', _.debounce(() => applyFilter(filter, data), RERENDER_DELAY));
    // filter.addEventListener('input', () => applyFilter(filter, data));
  });

  mapFeaturesValue.forEach((filter) => {
    filter.addEventListener('change', _.debounce(() => applyFilter(filter, data), RERENDER_DELAY));
    // filter.addEventListener('change', () => applyFilter(filter, data));
  });
}

function applyFilter(filter, data) {
  filtredData = [];

  filtredData = startFilters(data, filter);
  clearOldPin();
  // _.debounce(() => generatePin(filtredData), RERENDER_DELAY);
  generatePin(filtredData)
}

function startFilters(data, filter) {
  filtredData = checkType(data);
  filtredData = checkPrices(filtredData);
  filtredData = checkRooms(filtredData);
  filtredData = checkGuests(filtredData);
  filtredData = checkFeatures(filtredData, filter);

  return filtredData;
}
function checkFeatures(data, filter) {
  const ON_FEATURE = mapFeaturesWifi.checked || mapFeaturesDishwasher.checked || mapFeaturesParking.checked || mapFeaturesWasher.checked || mapFeaturesElevator.checked || mapFeaturesConditioner.checked;
  // console.log(data);
  console.log(ON_FEATURE);
  if (ON_FEATURE) {
    filtredData = checkWifi(checkDishwasher(checkParking(checkWasher(checkElevator(checkConditioner(data))))));
    return filtredData;
  }
  else return data;
}

function checkWifi(data) {

  if (mapFeaturesWifi.checked) {
    filtredData = [];

    for (let i = 0; i < Math.min(data.length, MAX_COUNT_ADS); i++) {
      if (data[i].offer.features.some((value) => {
        return value === 'wifi';
      })) {
        filtredData.push(data[i]);
      }
    }
    return filtredData;
  }
  else return data;
}

function checkDishwasher(data) {

  if (mapFeaturesDishwasher.checked) {
    filtredData = [];

    for (let i = 0; i < Math.min(data.length, MAX_COUNT_ADS); i++) {
      if (data[i].offer.features.some((value) => {
        return value === 'dishwasher';
      })) {
        filtredData.push(data[i]);
      }
    }
    return filtredData;
  }
  else return data;
}
function checkParking(data) {

  if (mapFeaturesParking.checked) {
    filtredData = [];

    for (let i = 0; i < Math.min(data.length, MAX_COUNT_ADS); i++) {
      if (data[i].offer.features.some((value) => {
        return value === 'parking';
      })) {
        filtredData.push(data[i]);
      }
    }
    return filtredData;
  }
  else return data;
}
function checkWasher(data) {

  if (mapFeaturesWasher.checked) {
    filtredData = [];

    for (let i = 0; i < Math.min(data.length, MAX_COUNT_ADS); i++) {
      if (data[i].offer.features.some((value) => {
        return value === 'washer';
      })) {
        filtredData.push(data[i]);
      }
    }
    return filtredData;
  }
  else return data;
}
function checkElevator(data) {
  if (mapFeaturesElevator.checked) {
    filtredData = [];

    for (let i = 0; i < Math.min(data.length, MAX_COUNT_ADS); i++) {
      if (data[i].offer.features.some((value) => {
        return value === 'elevator';
      })) {
        filtredData.push(data[i]);
      }
    }
    return filtredData;
  }
  else return data;
}
function checkConditioner(data) {
  if (mapFeaturesConditioner.checked) {
    filtredData = [];

    for (let i = 0; i < Math.min(data.length, MAX_COUNT_ADS); i++) {
      if (data[i].offer.features.some((value) => {
        return value === 'conditioner';
      })) {
        filtredData.push(data[i]);
      }
    }
    return filtredData;
  }
  else return data;
}
function checkType(data) {
  // console.log('_>>>> ' + data[0]);
  // console.log('_>>>> ' + data.length);
  let count = 0;
  if (filterType.value === 'any') return data;

  for (let i = 0; i < data.length; i++) {
    if (data[i].offer.type === filterType.value) {
      filtredData.push(data[i]);
      count++;
    }
    if (count >= 10) return filtredData;
  }

  return filtredData;

}

function checkPrices(data) {

  filtredData = [];

  if (filterPrice.value === 'any') {

    return data;
  }
  for (let i = 0; i < data.length; i++) {

    // console.log('->' + PRICES[filterPrice.value].min);

    if (data[i].offer.price >= PRICES[filterPrice.value].min && data[i].offer.price < PRICES[filterPrice.value].max) {
      filtredData.push(data[i]);
    }
  }
  return filtredData;
}

function checkRooms(data) {
  filtredData = [];
  let count = 0;

  if (filterRooms.value === 'any') return data;

  for (let i = 0; i < data.length; i++) {

    if (data[i].offer.rooms == filterRooms.value) {
      console.log(data[i].offer.rooms + '  -> ' + filterRooms.value);
      filtredData.push(data[i]);
      count++;
    }
    if (count >= 10) return filtredData;
  }

  return filtredData;
}

function checkGuests(data) {
  filtredData = [];
  let count = 0;

  if (filterGuests.value === 'any') return data;

  for (let i = 0; i < data.length; i++) {
    if (data[i].offer.guests == filterGuests.value) {
      filtredData.push(data[i]);
      count++;
    }
    if (count >= 10) return filtredData;
  }
  return filtredData;
}
*/
//----------------------------
const filter = {
  'housing-type': (evt, datum) => {
    return (evt.target.value === datum.offer.type) || evt.target.value === 'any';
  },
  'housing-rooms': (evt, datum) => {
    return (evt.target.value == datum.offer.rooms) || evt.target.value === 'any';
  },
  'housing-price': (evt, datum) => {
    return evt.target.value === 'any' || (datum.offer.price >= PRICES[filterPrice.value].min && datum.offer.price < PRICES[filterPrice.value].max);
  },
  'housing-guests': (evt, datum) => {
    return (evt.target.value == datum.offer.guests) || evt.target.value === 'any';
  },
  'filter-wifi': (evt, datum) => {
    if (mapFeaturesWifi.checked) {
      return datum.offer.features.some((value) => {
        return value === 'wifi';
      });
    }
    else return datum;
  },
  'filter-dishwasher': (evt, datum) => {
    if (mapFeaturesDishwasher.checked) {
      return datum.offer.features.some((value) => {
        return value === 'dishwasher';
      });
    }
    else return datum;
  },
  'filter-parking': (evt, datum) => {
    if (mapFeaturesParking.checked) {
      return datum.offer.features.some((value) => {
        return value === 'parking';
      });
    }
    else return datum;
  },
  'filter-washer': (evt, datum) => {
    if (mapFeaturesWasher.checked) {
      return datum.offer.features.some((value) => {
        return value === 'washer';
      });
    }
    else return datum;
  },
  'filter-elevator': (evt, datum) => {
    if (mapFeaturesElevator.checked) {
      return datum.offer.features.some((value) => {
        return value === 'elevator';
      });
    }
    else return datum;
  },
  'filter-conditioner': (evt, datum) => {
    if (mapFeaturesConditioner.checked) {
      return datum.offer.features.some((value) => {
        return value === 'conditioner';
      });
    }
    else return datum;
  },
};

let filteredData = [];

const filterData = (evt, data, cb) => {
  for (let i = 0; i < Math.min(data.length, MAX_COUNT_ADS); i++) {
    if (cb(evt, data[i])) {
      filteredData.push(data[i]);
    }
  }

  return filteredData;
};
function onFilterMap(data) {
  filtersFormElement.addEventListener('change', (evt) => {

    let newPin = filterData(evt, data, filter[evt.target.id]);
    // Object.keys(filter).forEach((elem) => { newPin = filterData(evt, newPin, filter[elem]); });
    // filterData(newPin);
    clearOldPin();
    generatePin(newPin);
    // console.log(evt.target.id);
  });
}
export { onFilterMap }
