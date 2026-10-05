import { pageUrl, wirePageLinks } from "./links.js";

const REPO_NEW_ISSUE =
  "https://github.com/AleOnRails/luoghi-deriva/issues/new";

const form = document.getElementById("suggest-form");
const errorEl = document.getElementById("suggest-error");

wirePageLinks();

function showError(message) {
  if (!errorEl) return;
  errorEl.hidden = !message;
  errorEl.textContent = message || "";
}

function buildIssueBody(data) {
  const lines = [
    "### Suggerimento spot (dal sito)",
    "",
    `| Campo | Valore |`,
    `| --- | --- |`,
    `| **Area** | ${data.area} |`,
    `| **Località** | ${data.localita} |`,
    `| **Livello stimato** | ${data.livello} |`,
  ];
  if (data.contatto) {
    lines.push(`| **Contatto** | ${data.contatto} |`);
  }
  lines.push("", "### Perché aggiungerlo", "", data.perche, "");
  return lines.join("\n");
}

form?.addEventListener("submit", (event) => {
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

  const title = `[Spot] ${data.localita} (${data.area})`;
  const url = `${REPO_NEW_ISSUE}?${new URLSearchParams({
    title,
    body: buildIssueBody(data),
    labels: "suggerimento-spot",
  }).toString()}`;

  window.location.assign(url);
});

document.querySelectorAll("a[data-page='suggerisci.html']").forEach((a) => {
  a.setAttribute("href", pageUrl("suggerisci.html"));
});
