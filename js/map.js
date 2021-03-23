/* global L:readonly */
import './state.js';
import { writeLatLng } from './form.js';
import { generateElementPopup } from './gen-element.js';

let map;
let currentMarkers = [];

const ICON_WIDTH = 40;
const ICON_HEIGHT = 40;
const ICON_ANCHOR_WIDTH = 20;
const ICON_ANCHOR_HEIGHT = 40;
const MAP_ZOOM = 12;
const COORDINATE_INIT = {
  lat: 35.6895000,
  lng: 139.6917100,
};

function initMap() {

  let state = false;

  map = L.map('map-canvas')
    .on('load', () => {
      state = true;
    })
    .setView(COORDINATE_INIT, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  writeLatLng(COORDINATE_INIT);

  mainPin.addTo(map);
  return state;
}
const mainIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [ICON_WIDTH, ICON_HEIGHT],
  iconAnchor: [ICON_ANCHOR_WIDTH, ICON_ANCHOR_HEIGHT],
});

const commonIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [ICON_WIDTH, ICON_HEIGHT],
  iconAnchor: [ICON_ANCHOR_WIDTH, ICON_ANCHOR_HEIGHT],
});

const mainPin = L.marker(
  COORDINATE_INIT,
  {
    draggable: true,
    icon: mainIcon,
  },
);

mainPin.on('move', (evt) => {
  writeLatLng(evt.target.getLatLng());
});


function generatePin(ads) {

  ads.forEach((element) => {
    const commonPin = L.marker(
      {
        lat: element.location.lat,
        lng: element.location.lng,
      },
      {
        icon: commonIcon,
      },
    );
    currentMarkers.push(commonPin);
    commonPin.addTo(map);
    commonPin.addEventListener('click', () => generateDescriptionPin(element, commonPin));
  });
}
function clearOldPin() {

  currentMarkers.forEach((elem) => {
    map.removeLayer(elem);
  });

}
function generateDescriptionPin(element, commonPin) {
  const pinDescription = generateElementPopup(element);
  commonPin.bindPopup(pinDescription);
}

function resetMainPin() {
  mainPin.setLatLng(COORDINATE_INIT);
  writeLatLng(COORDINATE_INIT);
}
export { initMap, generatePin, COORDINATE_INIT, resetMainPin, clearOldPin };
