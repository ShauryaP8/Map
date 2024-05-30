// scripts.js

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        if (page.id === pageId) {
            page.classList.add('active');
            page.classList.remove('hidden');
        } else {
            page.classList.remove('active');
            page.classList.add('hidden');
        }
    });

    // Initialize the map when the 'maps' or 'home' page is shown
    if (pageId === 'maps') {
        initMap('map', [48.8566, 2.3522], 13); // Paris coordinates
    } else if (pageId === 'home') {
        initMap('global-map', [20.5937, 78.9629], 2); // Center of the world (India)
    }
}

// Initialize the Leaflet Map
function initMap(elementId, centerCoords, zoomLevel) {
    const mapElement = document.getElementById(elementId);
    if (mapElement._leaflet_id) {
        mapElement._leaflet_map.setView(centerCoords, zoomLevel);
    } else {
        const map = L.map(elementId).setView(centerCoords, zoomLevel);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        mapElement._leaflet_map = map;
    }
}

function showDetailedMap(destination) {
    document.getElementById('detailed-map-view').classList.remove('hidden');
    document.getElementById('destination-name').textContent = destination;

    let coords;
    if (destination === 'Paris') {
        coords = [48.8566, 2.3522]; // Paris coordinates
    } else if (destination === 'London') {
        coords = [51.5074, -0.1278]; // London coordinates
    } else if (destination === 'New York') {
        coords = [40.7128, -74.0060]; // New York coordinates
    }

    // Initialize the map for the detailed view
    initMap('detailed-map', coords, 13);
}

// Initially show the home page
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});
