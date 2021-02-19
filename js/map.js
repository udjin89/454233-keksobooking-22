// import '../../leaflet/leaflet.js'
import { activateState } from './state.js';
import { writeLatLng } from './form.js'

let map;

function initMap() {

  let state = false;

  map = L.map('map-canvas')
    .on('load', () => {
      console.log('Initializate!!!');
      state = true;
    })
    .setView({
      lat: 35.6895000,
      lng: 139.6917100,
    }, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  writeLatLng({
    lat: 35.6895000,
    lng: 139.6917100,
  });

  mainPin.addTo(map);
  return state;
}
const mainIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const commonIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPin = L.marker(
  {
    lat: 35.6895000,
    lng: 139.6917100,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);

mainPin.on('moveend', (evt) => {
  console.log(evt.target.getLatLng());
  writeLatLng(evt.target.getLatLng());
});

// marker.addTo(map);
function generatePin(ads, descriptions) {
  let j = 0;
  ads.forEach((element) => {
    console.log(element.location.x + ' > ' + element.location.y);
    const commonPin = L.marker(
      {
        lat: element.location.x,
        lng: element.location.y,
      },
      {
        icon: commonIcon,
      },
    );
    commonPin.addTo(map);
    const arrayDescription = descriptions.querySelectorAll('.popup');
    commonPin.bindPopup(arrayDescription[j]);
    j++;
  });
}
export { initMap, generatePin };
