/** Link interni stabili con Vite base (`/` in locale, `/luoghi-deriva/` in produzione). */

export function baseUrl() {
  const base = import.meta.env.BASE_URL || "/";
  return base.endsWith("/") ? base : `${base}/`;
}

export function pageUrl(page) {
  return new URL(page, window.location.origin + baseUrl()).href;
}

/** Aggiorna tutti gli <a data-page="file.html"> al path corretto. */
export function wirePageLinks() {
  document.querySelectorAll("a[data-page]").forEach((link) => {
    const page = link.getAttribute("data-page");
    if (!page) return;
    link.setAttribute("href", pageUrl(page));
  });
}
