# Guida alla Vela in Deriva — Nord e Sud Italia

Due pagine separate (così lista e mappa restano leggere):

| URL | Contenuto |
|-----|-----------|
| [`/`](./index.html) / `index.html` | **Nord** — laghi e Alto Adriatico / Liguria |
| [`/sud.html`](./sud.html) | **Sud** — Campania, Puglia, Calabria, Sicilia + noleggio |
| [`/suggerisci.html`](./suggerisci.html) | **Suggerisci** — form → issue GitHub |
| [`/privacy.html`](./privacy.html) | **Privacy** — cookie, analytics, terzi |

### Suggerimenti spot → issue a tuo nome

Il form invia i dati a un **Cloudflare Worker** che crea l’issue con il tuo PAT
(il token non è mai nel frontend).

1. Crea un PAT fine-grained su GitHub con permesso **Issues: Read and write** solo su `AleOnRails/luoghi-deriva`
2. Crea l’etichetta `suggerimento-spot` nel repo se manca
3. Dalla cartella `worker/`:

```bash
cd worker
npx wrangler login
npx wrangler deploy
npx wrangler secret put GITHUB_TOKEN
# incolla il PAT
```

4. Copia l’URL del worker (es. `https://luoghi-deriva-suggest.<tuo-subdomain>.workers.dev`)
5. Se diverso da quello in `src/suggest.js`, imposta in build:
   - secret Actions `VITE_SUGGEST_API_URL` = URL del worker
   - oppure aggiorna il default in `src/suggest.js`
6. Aggiorna `ALLOWED_ORIGINS` in `worker/suggest-issue.js` se serve
7. Push + deploy Pages

Fino a quando il worker non è online, il form mostrerà un errore in invio.

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
