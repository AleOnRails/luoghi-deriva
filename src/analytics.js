/**
 * Cloudflare Web Analytics — privacy-friendly, senza cookie di tracking.
 *
 * Opt-out visite personali (una volta per browser), dalla console sul sito:
 *   localStorage.setItem('cf-analytics-optout', 'true')
 * Per riattivare:
 *   localStorage.removeItem('cf-analytics-optout')
 */
const DEFAULT_TOKEN = "11df4abc21aa4009bf6d8940a0036a77";
const OPT_OUT_KEY = "cf-analytics-optout";

export function initAnalytics() {
  const token = import.meta.env.VITE_CF_ANALYTICS_TOKEN || DEFAULT_TOKEN;
  if (!token || typeof document === "undefined") return;
  if (document.querySelector("script[data-cf-beacon]")) return;

  try {
    if (localStorage.getItem(OPT_OUT_KEY) === "true") return;
  } catch {
    // private mode / storage blocked: carica comunque il beacon
  }

  const script = document.createElement("script");
  script.defer = true;
  script.src = "https://static.cloudflareinsights.com/beacon.min.js";
  script.setAttribute(
    "data-cf-beacon",
    JSON.stringify({ token: String(token) })
  );
  document.head.appendChild(script);
}
