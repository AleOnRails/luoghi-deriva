import { pageUrl, wirePageLinks } from "./links.js";

/** URL del Cloudflare Worker (dopo il deploy). Override: VITE_SUGGEST_API_URL */
const SUGGEST_API =
  import.meta.env.VITE_SUGGEST_API_URL ||
  "https://luoghi-deriva-suggest.alessandra-cannata.workers.dev";

const form = document.getElementById("suggest-form");
const errorEl = document.getElementById("suggest-error");
const successEl = document.getElementById("suggest-success");
const submitBtn = form?.querySelector('button[type="submit"]');

wirePageLinks();

function showError(message) {
  if (errorEl) {
    errorEl.hidden = !message;
    errorEl.textContent = message || "";
  }
  if (successEl) successEl.hidden = true;
}

function showSuccess(url, number) {
  if (errorEl) errorEl.hidden = true;
  if (!successEl) return;
  successEl.hidden = false;
  successEl.innerHTML = url
    ? `Grazie! Issue <a href="${url}" target="_blank" rel="noopener">#${number}</a> creata.`
    : "Grazie! Suggerimento inviato.";
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  showError("");

  const fd = new FormData(form);
  const data = {
    area: String(fd.get("area") || "").trim(),
    localita: String(fd.get("localita") || "").trim(),
    livello: String(fd.get("livello") || "").trim(),
    perche: String(fd.get("perche") || "").trim(),
    contatto: String(fd.get("contatto") || "").trim(),
  };

  if (!data.area || !data.localita || !data.livello || !data.perche) {
    showError("Compila tutti i campi obbligatori.");
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Invio…";
  }

  try {
    const res = await fetch(SUGGEST_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const payload = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(payload.error || payload.detail || "Invio non riuscito");
    }
    form.reset();
    showSuccess(payload.url, payload.number);
  } catch (err) {
    showError(
      err?.message ||
        "Non riesco a contattare il servizio. Riprova più tardi."
    );
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Invia suggerimento";
    }
  }
});

document.querySelectorAll("a[data-page='suggerisci.html']").forEach((a) => {
  a.setAttribute("href", pageUrl("suggerisci.html"));
});
