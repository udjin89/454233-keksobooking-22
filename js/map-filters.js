/* global _:readonly */
import './form.js';
import './img-preview.js';
import './map.js';
import { generatePin, clearOldPin } from './map.js';

const MAX_COUNT_ADS = 10;
const RERENDER_DELAY = 500;

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

const formFilter = document.querySelector('.map__filters-container');
const mapFiltres = formFilter.querySelectorAll('.map__filter');
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

function onFilterMap(data) {
  mapFiltres.forEach((filter) => {
    filter.addEventListener('input', _.debounce(() => applyFilter(filter, data), RERENDER_DELAY));

  });

  mapFeaturesValue.forEach((filter) => {
    filter.addEventListener('change', _.debounce(() => applyFilter(filter, data), RERENDER_DELAY));
  });

}

function applyFilter(filter, data) {
  filtredData = [];
  filtredData = startFilters(data, filter);
  clearOldPin();
  generatePin(filtredData);
}

function startFilters(data, filter) {
  filtredData = checkType(data);
  filtredData = checkPrices(filtredData);
  filtredData = checkRooms(filtredData);
  filtredData = checkGuests(filtredData);
  filtredData = checkFeatures(filtredData, filter);

  return filtredData;
}
function checkFeatures(data) {
  const ON_FEATURE = mapFeaturesWifi.checked || mapFeaturesDishwasher.checked || mapFeaturesParking.checked || mapFeaturesWasher.checked || mapFeaturesElevator.checked || mapFeaturesConditioner.checked;

  if (ON_FEATURE) {
    filtredData = checkWifi(checkDishwasher(checkParking(checkWasher(checkElevator(checkConditioner(data))))));
    return filtredData;
  }
  return data;
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

  return data;

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

  return data;

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

  return data;

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

  return data;

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

  return data;

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

  return data;

}
function checkType(data) {
  let count = 0;
  if (filterType.value === 'any') return data;

  for (let i = 0; i < data.length; i++) {
    if (data[i].offer.type === filterType.value) {
      filtredData.push(data[i]);
      count++;
    }
    if (count >= MAX_COUNT_ADS) {
      return filtredData;
    }
  }

  return filtredData;

}

function checkPrices(data) {

  filtredData = [];

  if (filterPrice.value === 'any') {

    return data;
  }
  for (let i = 0; i < data.length; i++) {

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

    if (data[i].offer.rooms === Number(filterRooms.value)) {

      filtredData.push(data[i]);
      count++;
    }
    if (count >= MAX_COUNT_ADS) {
      return filtredData;
    }
  }

  return filtredData;
}

function checkGuests(data) {
  filtredData = [];
  let count = 0;

  if (filterGuests.value === 'any') return data;

  for (let i = 0; i < data.length; i++) {
    if (data[i].offer.guests === Number(filterGuests.value)) {

      filtredData.push(data[i]);
      count++;
    }
    if (count >= MAX_COUNT_ADS) {
      return filtredData;
    }

  }
  return filtredData;
}

function resetFilters() {

  mapFeaturesWifi.checked = false;
  mapFeaturesDishwasher.checked = false;
  mapFeaturesParking.checked = false;
  mapFeaturesWasher.checked = false;
  mapFeaturesElevator.checked = false;
  mapFeaturesConditioner.checked = false;
  filterType.value = 'any';
  filterPrice.value = 'any';
  filterRooms.value = 'any';
  filterGuests.value = 'any';
}
export { onFilterMap, resetFilters }
