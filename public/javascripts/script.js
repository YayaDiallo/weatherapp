// Openstreetmap
let mymap = L.map('worldmap', {
  center: [48.866667, 2.333333],
  zoom: 10,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '(c) <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(mymap);

// Custom icon
let customIcon = L.icon({
  iconUrl: '/images/leaf-green.png',
  shadowUrl: '/images/leaf-shadow.png',

  iconSize: [38, 95],
  shadowSize: [50, 64],

  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],

  popupAnchor: [-3, -76],
});

// Marker & Popup
let markers = document.getElementsByClassName('list-group-item');

for (let i = 0; i < markers.length; i++) {
  let lat = markers[i].dataset.lat;
  let lng = markers[i].dataset.lng;
  let name = markers[i].dataset.name;

  L.marker([lat, lng], { icon: customIcon }).addTo(mymap).bindPopup(name);
}

// City not found
let messageErr = document.querySelector('form .alert');
messageErr.style.textTransform = 'capitalize';

setTimeout(() => {
  messageErr.remove();
}, 3000);
