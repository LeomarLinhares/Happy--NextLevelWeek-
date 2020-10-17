const options = {
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false
}

// Pegar valores salvos no html
const lat = document.querySelector('span[data-lat]').dataset.lat;
const lng = document.querySelector('span[data-lng]').dataset.lng;

// Criar mapa
const map = L.map('mapid', options).setView([lat, lng], 15);

// Criar e adicionar tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(map);

// Criar icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})

// Criar e adicionar um marcador
L.marker([lat, lng], {icon}).addTo(map);

// Image Galery
function selectImage(event) {
    const button = event.currentTarget;

    // Remover todas as classes "active"
    const buttons = document.querySelectorAll('.images button');
    buttons.forEach((button) => {
        button.classList.remove('active');
    })

    // Selecionar a imagem clicada
    const image = button.children[0];
    const imageContainer = document.querySelector('.orphanage-details > img');

    // Atualizar o container de imagem
    imageContainer.src = image.src;

    // Adicionar a classe "active" para esse botão
    button.classList.add('active')
}