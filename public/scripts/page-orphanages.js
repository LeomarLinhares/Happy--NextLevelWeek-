// Criar mapa
const map = L.map('mapid').setView([-22.7585364,-43.4540157], 15);

// Criar e adicionar tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(map);

// Criar icon
const icon = L.icon({
    iconUrl: "./public/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})

// Criar popup overlay
const popup = L.popup({
    closeButton: false,
    className: 'map-popup',
    minWidth: 240,
    minHeight: 240
}).setContent('Lar das meninas <a href="orphanage.html?id=1" class="choose-orphanage"><img src ="./public/images/arrow-white.svg"></a>')

// Criar e adicionar um marcador
L.marker([-22.7585364,-43.4540157], {icon}).addTo(map)
    .bindPopup(popup)