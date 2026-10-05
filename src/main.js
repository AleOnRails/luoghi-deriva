import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LEVEL_COLORS, spots } from "./spots.js";

const filters = document.querySelectorAll(".filter");
const viewButtons = document.querySelectorAll("[data-view]");
const cards = document.querySelectorAll(".spot-card");
const rows = document.querySelectorAll(".spots-table tbody tr");
const sections = document.querySelectorAll("[data-section]");
const emptyState = document.getElementById("empty-state");
const listView = document.getElementById("list-view");
const mapView = document.getElementById("map-view");
const mapEl = document.getElementById("map");

let currentFilter = "all";
let currentView = "list";
let map = null;
let markerLayer = null;
const markersById = new Map();

function applyListFilter(level) {
  let visibleCards = 0;

  cards.forEach((card) => {
    const match = level === "all" || card.dataset.level === level;
    card.classList.toggle("is-hidden", !match);
    if (match) visibleCards += 1;
  });

  rows.forEach((row) => {
    const match = level === "all" || row.dataset.level === level;
    row.classList.toggle("is-hidden", !match);
  });

  sections.forEach((section) => {
    const match = level === "all" || section.dataset.section === level;
    section.classList.toggle("is-hidden", !match);
  });

  if (emptyState) {
    emptyState.hidden = visibleCards > 0;
  }
}

function levelIcon(level) {
  const color = LEVEL_COLORS[level] || "#134058";
  return L.divIcon({
    className: "spot-marker",
    html: `<span class="spot-marker__dot" style="--marker:${color}"></span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -12],
  });
}

function popupHtml(spot) {
  return `
    <div class="map-popup">
      <strong class="map-popup__title">${spot.name}</strong>
      <span class="badge badge--${spot.level}">${spot.levelLabel}</span>
      <p><span class="bacino">${spot.basin}</span> · ${spot.wind}</p>
      <p class="map-popup__boats">${spot.boats}</p>
    </div>
  `;
}

function initMap() {
  if (!mapEl || map) return;

  map = L.map(mapEl, {
    scrollWheelZoom: true,
    zoomControl: true,
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18,
  }).addTo(map);

  markerLayer = L.layerGroup().addTo(map);

  spots.forEach((spot) => {
    const marker = L.marker([spot.lat, spot.lng], {
      icon: levelIcon(spot.level),
      title: spot.name,
      riseOnHover: true,
    });
    marker.bindPopup(popupHtml(spot), { maxWidth: 280 });
    marker.spotLevel = spot.level;
    marker.spotId = spot.id;
    markersById.set(spot.id, marker);
  });

  applyMapFilter(currentFilter);
}

function applyMapFilter(level) {
  if (!map || !markerLayer) return;

  markerLayer.clearLayers();
  const bounds = [];

  markersById.forEach((marker) => {
    const match = level === "all" || marker.spotLevel === level;
    if (match) {
      marker.addTo(markerLayer);
      bounds.push(marker.getLatLng());
    }
  });

  if (bounds.length === 0) {
    map.setView([45.6, 10.2], 7);
    return;
  }

  if (bounds.length === 1) {
    map.setView(bounds[0], 10);
    return;
  }

  map.fitBounds(L.latLngBounds(bounds), {
    padding: [36, 36],
    maxZoom: 11,
  });
}

function setView(view) {
  currentView = view;

  viewButtons.forEach((btn) => {
    const active = btn.dataset.view === view;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });

  const showMap = view === "map";
  listView?.classList.toggle("is-hidden", showMap);
  mapView?.classList.toggle("is-hidden", !showMap);
  if (listView) listView.hidden = showMap;
  if (mapView) mapView.hidden = !showMap;

  if (showMap) {
    initMap();
    // Leaflet ha bisogno di invalidateSize dopo che il container diventa visibile
    requestAnimationFrame(() => {
      map?.invalidateSize();
      applyMapFilter(currentFilter);
    });
  }
}

function setFilter(level) {
  currentFilter = level;

  filters.forEach((other) => {
    const active = other.dataset.filter === level;
    other.classList.toggle("is-active", active);
    other.setAttribute("aria-pressed", active ? "true" : "false");
  });

  applyListFilter(level);
  if (currentView === "map") {
    applyMapFilter(level);
  }
}

filters.forEach((button) => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

viewButtons.forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});
