// Criar mapa
const map = L.map('mapid').setView([-22.7585364,-43.4540157], 15);

// Criar e adicionar tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(map);

// Criar icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68]
})

// Criar e adicionar marcador

let marker;

map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    // Remover ícone anterior
    marker && map.removeLayer(marker)

    // Adicionar ícone
    marker = L.marker([lat, lng], { icon })
    .addTo(map)
})

// Adicionar campo de fotos
function addPhotoField() {
    // Pegar o container de fotos #images
    const container = document.querySelector('#images');
    
    // Pegar o container para duplicar .new-image
    const fieldsContainer = document.querySelectorAll('.new-upload');

    // Realizar o clone da última imagem adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true);

    // Verificar se o campo está vazio, se sim não criar ao container de imagens
    const input = newFieldContainer.children[0];
    
    if (input.value == '') {
        return
    }

    // Limpar o campo antes de adicionar ao container de imagens
    input.value = '';

    // Adicionar o clone ao container de #images
    container.appendChild(newFieldContainer);
}

function deleteField(event) {
    const span = event.currentTarget;
    const fieldsContainer = document.querySelectorAll('.new-upload');

    if (fieldsContainer.length <= 1) {
        // Limpar o valor do campo
        span.parentNode.children[0].value = '';
        return
    }

    // Deletar campo
    span.parentNode.remove();
}

// Selecionar sim e não
function toggleSelect(event) {
    // Remover a classe .active dos botões
    document.querySelectorAll('.button-select button')
    .forEach((button) => button.classList.remove('active'));


    // Colocar a class .active no botão clicado
    const button = event.currentTarget;
    button.classList.add('active');

    // Atualizar meu input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]');

    // Verifica se é sim ou não
    input.value = button.dataset.value;
}