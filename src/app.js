import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LEVEL_COLORS, LEVEL_META } from "./levels.js";

const LEVEL_ORDER = ["base", "inter", "trans", "adv"];

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function baseUrl() {
  const base = import.meta.env.BASE_URL || "/";
  return base.endsWith("/") ? base : `${base}/`;
}

function regionHref(page) {
  return new URL(page, window.location.origin + baseUrl()).pathname;
}

function wireRegionNav(activeId) {
  document.querySelectorAll("[data-region]").forEach((link) => {
    const id = link.dataset.region;
    const page = id === "sud" ? "sud.html" : "index.html";
    link.setAttribute("href", regionHref(page));
    const active = id === activeId;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

function renderCards(spots) {
  const root = document.getElementById("spot-cards");
  if (!root) return;
  root.innerHTML = spots
    .map(
      (spot) => `
      <article class="spot-card" data-level="${spot.level}">
        <div class="spot-card__top">
          <h3>${escapeHtml(spot.name)}</h3>
          <span class="badge badge--${spot.level}">${escapeHtml(spot.levelLabel)}</span>
        </div>
        <dl class="spot-card__meta">
          <div><dt>Bacino</dt><dd class="bacino">${escapeHtml(spot.basin)}</dd></div>
          ${spot.region ? `<div><dt>Regione</dt><dd>${escapeHtml(spot.region)}</dd></div>` : ""}
          <div><dt>Vento tipico</dt><dd>${escapeHtml(spot.wind)}</dd></div>
          <div><dt>Deriva ideale</dt><dd>${escapeHtml(spot.boats)}</dd></div>
          ${spot.rental ? `<div><dt>Noleggio / base</dt><dd>${escapeHtml(spot.rental)}</dd></div>` : ""}
        </dl>
      </article>`
    )
    .join("");
}

function renderTable(spots) {
  const table = document.querySelector(".spots-table");
  const body = document.getElementById("spots-tbody");
  if (!body) return;
  const showRegion = spots.some((s) => s.region);
  table?.classList.toggle("spots-table--regions", showRegion);

  const head = document.getElementById("spots-thead");
  if (head) {
    head.innerHTML = `
      <tr>
        <th scope="col">Località</th>
        ${showRegion ? `<th scope="col">Regione</th>` : ""}
        <th scope="col">Bacino</th>
        <th scope="col">Livello</th>
        <th scope="col">Vento tipico</th>
        <th scope="col">Deriva ideale</th>
        ${showRegion ? `<th scope="col">Noleggio / base</th>` : ""}
      </tr>`;
  }
  body.innerHTML = spots
    .map((spot) => {
      if (showRegion) {
        return `
      <tr data-level="${spot.level}">
        <td>${escapeHtml(spot.name)}</td>
        <td>${escapeHtml(spot.region)}</td>
        <td class="bacino">${escapeHtml(spot.basin)}</td>
        <td><span class="badge badge--${spot.level}">${escapeHtml(spot.levelLabel)}</span></td>
        <td>${escapeHtml(spot.wind)}</td>
        <td>${escapeHtml(spot.boats)}</td>
        <td>${escapeHtml(spot.rental || "—")}</td>
      </tr>`;
      }
      return `
      <tr data-level="${spot.level}">
        <td>${escapeHtml(spot.name)}</td>
        <td class="bacino">${escapeHtml(spot.basin)}</td>
        <td><span class="badge badge--${spot.level}">${escapeHtml(spot.levelLabel)}</span></td>
        <td>${escapeHtml(spot.wind)}</td>
        <td>${escapeHtml(spot.boats)}</td>
      </tr>`;
    })
    .join("");
}

function renderDetails(spots) {
  const root = document.getElementById("detail-sections");
  if (!root) return;

  root.innerHTML = LEVEL_ORDER.map((level) => {
    const group = spots.filter((s) => s.level === level);
    if (!group.length) return "";
    const meta = LEVEL_META[level];
    const articles = group
      .map(
        (spot) => `
        <article class="detail">
          <h3>${escapeHtml(spot.shortName || spot.name)} <span class="badge badge--${spot.level}">${escapeHtml(meta.badge)}</span></h3>
          ${spot.place ? `<p class="place">${escapeHtml(spot.place)}</p>` : ""}
          <p>${escapeHtml(spot.description)}</p>
          ${spot.rental ? `<p class="rental"><strong>Noleggio / base:</strong> ${escapeHtml(spot.rental)}</p>` : ""}
        </article>`
      )
      .join("");

    return `
      <section class="section section--${level}" id="${level}" data-section="${level}" aria-labelledby="${level}-title">
        <h2 id="${level}-title"><span class="level-dot level-dot--${level}" aria-hidden="true"></span> ${escapeHtml(meta.title)}</h2>
        ${meta.intro ? `<p class="intro">${escapeHtml(meta.intro)}</p>` : ""}
        ${articles}
      </section>`;
  }).join("");
}

function updateChrome(regionMeta) {
  const title = document.getElementById("hero-title");
  const lead = document.getElementById("hero-lead");
  const eyebrow = document.getElementById("hero-eyebrow");
  const tableTitle = document.getElementById("tabella-title");
  const noteEl = document.getElementById("region-note");
  const docTitle = document.getElementById("doc-title");

  if (regionMeta.id === "sud") {
    if (docTitle) docTitle.textContent = "Deriva Sud Italia · Guida spot e noleggio";
    if (eyebrow) eyebrow.textContent = "Metodo Caprera · Campania · Puglia · Calabria · Sicilia";
    if (title) title.textContent = "Guida alla Vela in Deriva nel Sud Italia";
    if (lead) lead.textContent = "Spot marini e centri che noleggiano derive, mappati per livello tecnico.";
    if (tableTitle) tableTitle.textContent = "Tabella riassuntiva — Sud e noleggio";
  } else {
    if (docTitle) docTitle.textContent = "Deriva Nord Italia · Guida spot";
    if (eyebrow) eyebrow.textContent = "Metodo Caprera · Laghi e Alto Adriatico";
    if (title) title.textContent = "Guida alla Vela in Deriva nel Nord Italia";
    if (lead) lead.textContent = "Mappatura tecnica degli spot basata sui livelli del metodo Caprera.";
    if (tableTitle) tableTitle.textContent = "Tabella riassuntiva degli spot";
  }

  if (noteEl) {
    if (regionMeta.note) {
      noteEl.textContent = regionMeta.note;
      noteEl.hidden = false;
    } else {
      noteEl.textContent = "";
      noteEl.hidden = true;
    }
  }

  wireRegionNav(regionMeta.id);
  document.body.dataset.region = regionMeta.id;
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
      <strong class="map-popup__title">${escapeHtml(spot.name)}</strong>
      <span class="badge badge--${spot.level}">${escapeHtml(spot.levelLabel)}</span>
      <p><span class="bacino">${escapeHtml(spot.basin)}</span>${spot.region ? ` · ${escapeHtml(spot.region)}` : ""} · ${escapeHtml(spot.wind)}</p>
      <p class="map-popup__boats">${escapeHtml(spot.boats)}</p>
      ${spot.rental ? `<p class="map-popup__boats"><strong>Noleggio:</strong> ${escapeHtml(spot.rental)}</p>` : ""}
    </div>
  `;
}

/**
 * @param {{ spots: Array, regionMeta: object }} initial
 */
export function initApp(initial) {
  let spots = initial.spots;
  let regionMeta = initial.regionMeta;
  let currentFilter = "all";
  let currentView = "list";
  let map = null;
  let markerLayer = null;
  const markersById = new Map();

  const listView = document.getElementById("list-view");
  const mapView = document.getElementById("map-view");
  const mapEl = document.getElementById("map");
  const emptyState = document.getElementById("empty-state");

  function destroyMap() {
    if (map) {
      map.remove();
      map = null;
      markerLayer = null;
      markersById.clear();
    }
  }

  function applyListFilter(level) {
    const cards = document.querySelectorAll(".spot-card");
    const rows = document.querySelectorAll(".spots-table tbody tr");
    const sections = document.querySelectorAll("[data-section]");
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

    if (emptyState) emptyState.hidden = visibleCards > 0;
  }

  function initMap() {
    if (!mapEl) return;
    destroyMap();

    map = L.map(mapEl, { scrollWheelZoom: true, zoomControl: true });
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
      marker.bindPopup(popupHtml(spot), { maxWidth: 300 });
      marker.spotLevel = spot.level;
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
      map.setView(regionMeta.mapCenter, regionMeta.mapZoom);
      return;
    }
    if (bounds.length === 1) {
      map.setView(bounds[0], 10);
      return;
    }
    map.fitBounds(L.latLngBounds(bounds), { padding: [36, 36], maxZoom: 11 });
  }

  function setView(view) {
    currentView = view;
    document.querySelectorAll(".view-btn").forEach((btn) => {
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
      // mostra prima il container, poi inizializza (Leaflet misura la size)
      requestAnimationFrame(() => {
        initMap();
        map?.invalidateSize();
        applyMapFilter(currentFilter);
      });
    }
  }

  function setFilter(level) {
    currentFilter = level;
    document.querySelectorAll(".filter").forEach((other) => {
      const active = other.dataset.filter === level;
      other.classList.toggle("is-active", active);
      other.setAttribute("aria-pressed", active ? "true" : "false");
    });
    applyListFilter(level);
    if (currentView === "map") applyMapFilter(level);
  }

  function renderAll() {
    updateChrome(regionMeta);
    renderCards(spots);
    renderTable(spots);
    renderDetails(spots);
    setFilter(currentFilter);
    if (currentView === "map") {
      requestAnimationFrame(() => {
        initMap();
        map?.invalidateSize();
      });
    }
  }

  async function switchRegion(id, { push = true } = {}) {
    if (id === regionMeta.id) return;
    const mod =
      id === "sud"
        ? await import("./spots-sud.js")
        : await import("./spots-nord.js");
    spots = mod.spots;
    regionMeta = mod.regionMeta;
    destroyMap();
    renderAll();
    if (push) {
      const page = id === "sud" ? "sud.html" : "index.html";
      history.pushState({ region: id }, "", regionHref(page));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", () => setFilter(button.dataset.filter));
  });

  document.querySelectorAll(".view-btn").forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });

  document.querySelectorAll("[data-region]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      switchRegion(link.dataset.region);
    });
  });

  window.addEventListener("popstate", () => {
    const path = window.location.pathname;
    const id = path.endsWith("sud.html") || path.endsWith("/sud") ? "sud" : "nord";
    switchRegion(id, { push: false });
  });

  renderAll();
}
