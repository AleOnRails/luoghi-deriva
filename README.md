# Guida alla Vela in Deriva — Nord e Sud Italia

Due pagine separate (così lista e mappa restano leggere):

| URL | Contenuto |
|-----|-----------|
| [`/`](./index.html) / `index.html` | **Nord** — laghi e Alto Adriatico / Liguria |
| [`/sud.html`](./sud.html) | **Sud** — Campania, Puglia, Calabria, Sicilia + noleggio |
| [`/suggerisci.html`](./suggerisci.html) | **Suggerisci** — apre issue GitHub (template) |
| [`/privacy.html`](./privacy.html) | **Privacy** — cookie, analytics, terzi |

Entrambe le guide hanno filtri per livello Caprera e vista **Lista / Mappa** (Leaflet + tile CARTO/OSM).

### Suggerimenti spot

Il pulsante su [`suggerisci.html`](./suggerisci.html) apre:

`https://github.com/AleOnRails/luoghi-deriva/issues/new?template=suggerimento-spot.yml`

Serve un account GitHub. Nessun backend sul sito.

## Avvio locale

```bash
nvm use
npm install
npm run dev
```

- Nord: [http://127.0.0.1:43127/](http://127.0.0.1:43127/)
- Sud: [http://127.0.0.1:43127/sud.html](http://127.0.0.1:43127/sud.html)

## GitHub Pages

Dopo il push su `main` (con Source = **GitHub Actions**):

- `https://aleonrails.github.io/luoghi-deriva/`
- `https://aleonrails.github.io/luoghi-deriva/sud.html`

## Analytics (Cloudflare)

Il sito usa [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) (senza cookie).

1. Su Cloudflare: **Web Analytics → Add a site** → copia il **token** dallo snippet JS
2. Su GitHub (`AleOnRails/luoghi-deriva`): **Settings → Secrets and variables → Actions → New repository secret**
   - Name: `VITE_CF_ANALYTICS_TOKEN`
   - Value: il token
3. Rifai deploy (push su `main` o **Actions → Deploy GitHub Pages → Run workflow**)

**Escludere le tue visite** (Cloudflare non ha un toggle nativo): apri il sito e in console esegui una volta:

```js
localStorage.setItem('cf-analytics-optout', 'true')
```

Ripeti per ogni browser/dispositivo. Per riattivare: `localStorage.removeItem('cf-analytics-optout')`.

In locale (opzionale):

```bash
cp .env.example .env
# inserisci VITE_CF_ANALYTICS_TOKEN=...
npm run dev
```

## Documenti

| File | Descrizione |
|------|-------------|
| [`guida-vela-deriva-nord-italia.md`](guida-vela-deriva-nord-italia.md) | Markdown Nord |
| [`guida-vela-deriva-sud-italia.md`](guida-vela-deriva-sud-italia.md) | Markdown Sud |
| [`guida-vela-deriva-nord-italia.pdf`](guida-vela-deriva-nord-italia.pdf) | PDF Nord |
| [`generate_pdf.py`](generate_pdf.py) | Generatore PDF Nord |
