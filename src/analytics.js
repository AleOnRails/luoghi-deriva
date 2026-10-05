/**
 * Cloudflare Web Analytics — privacy-friendly, senza cookie.
 * Token da: Cloudflare Dashboard → Web Analytics → Add a site → JS snippet
 *
 * Locale: crea `.env` con VITE_CF_ANALYTICS_TOKEN=...
 * GitHub: Settings → Secrets → Actions → VITE_CF_ANALYTICS_TOKEN
 */
export function initAnalytics() {
  const token = import.meta.env.VITE_CF_ANALYTICS_TOKEN;
  if (!token || typeof document === "undefined") return;
  if (document.querySelector("script[data-cf-beacon]")) return;

  const script = document.createElement("script");
  script.defer = true;
  script.src = "https://static.cloudflareinsights.com/beacon.min.js";
  script.setAttribute(
    "data-cf-beacon",
    JSON.stringify({ token: String(token) })
  );
  document.head.appendChild(script);
}
