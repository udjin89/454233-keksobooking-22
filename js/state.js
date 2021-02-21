const adForm = document.querySelector('.ad-form');
const elements = adForm.querySelectorAll('fieldset'); // все интерактивные элементы
const mapFilter = document.querySelector('.map__filters');
const mapFilters = mapFilter.querySelectorAll('.map__filter');
const mapFeature = mapFilter.querySelector('.map__features');

function disactivateState() {
  adForm.classList.add('ad-form--disabled');
  elements.forEach((currentValue) => {
    disableElement(currentValue);
  });

  mapFilter.classList.add('map__filters--disabled');
  mapFilters.forEach((currentValue) => {
    disableElement(currentValue);
  });
  disableElement(mapFeature);
}

function disableElement(element) {
  element.setAttribute('disabled', 'disabled');
}
function enableElement(element) {
  element.removeAttribute('disabled', 'disabled');
}

function activateState() {
  adForm.classList.remove('ad-form--disabled');

  elements.forEach((currentValue) => {
    enableElement(currentValue);
  });

  mapFilter.classList.remove('map__filters--disabled');
  mapFilters.forEach((currentValue) => {
    enableElement(currentValue);
  });
  enableElement(mapFeature);
}

export { disactivateState, activateState };
