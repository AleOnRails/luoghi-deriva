# Guida alla Vela in Deriva — Nord e Sud Italia

Due pagine separate (così lista e mappa restano leggere):

| URL | Contenuto |
|-----|-----------|
| [`/`](./index.html) / `index.html` | **Nord** — laghi e Alto Adriatico / Liguria |
| [`/sud.html`](./sud.html) | **Sud** — Campania, Puglia, Calabria, Sicilia + noleggio |

Entrambe hanno filtri per livello Caprera e vista **Lista / Mappa** (Leaflet + OpenStreetMap, senza API key).

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

## Documenti

| File | Descrizione |
|------|-------------|
| [`guida-vela-deriva-nord-italia.md`](guida-vela-deriva-nord-italia.md) | Markdown Nord |
| [`guida-vela-deriva-sud-italia.md`](guida-vela-deriva-sud-italia.md) | Markdown Sud |
| [`guida-vela-deriva-nord-italia.pdf`](guida-vela-deriva-nord-italia.pdf) | PDF Nord |
| [`generate_pdf.py`](generate_pdf.py) | Generatore PDF Nord |
