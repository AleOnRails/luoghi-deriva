/**
 * Cloudflare Web Analytics — privacy-friendly, senza cookie.
 * Il token site è pubblico (finisce nel JS del browser); per override usa
 * VITE_CF_ANALYTICS_TOKEN in .env o come secret Actions.
 */
const DEFAULT_TOKEN = "11df4abc21aa4009bf6d8940a0036a77";

export function initAnalytics() {
  const token = import.meta.env.VITE_CF_ANALYTICS_TOKEN || DEFAULT_TOKEN;
  if (!token || typeof document === "undefined") return;
  if (document.querySelector("script[data-cf-beacon]")) return;

  const script = document.createElement("script");
  script.type = "module";
  script.src = "https://static.cloudflareinsights.com/beacon.min.js";
  script.setAttribute(
    "data-cf-beacon",
    JSON.stringify({ token: String(token) })
  );
  document.head.appendChild(script);
}
