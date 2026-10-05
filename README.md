# Guida alla Vela in Deriva nel Nord Italia

Mappatura tecnica degli spot di vela in deriva del Nord Italia, organizzata secondo i livelli del metodo Caprera.

## Web app (mobile-friendly)

Interfaccia responsive: su smartphone gli spot sono schede filtrabili; su desktop compare la tabella completa.

```bash
nvm use   # legge .nvmrc (Node 22+)
npm install
npm run dev
```

Di default apre [http://127.0.0.1:43127](http://127.0.0.1:43127). Se la porta è già occupata, Vite ne sceglie un’altra e la stampa in terminale.

Build di produzione:

```bash
npm run build
npm run preview
```

## Pubblicare su GitHub Pages

Il workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) pubblica automaticamente su Pages a ogni push su `main`.

Dopo aver creato il repository su GitHub:

1. **Settings → Pages → Build and deployment → Source**: seleziona **GitHub Actions**
2. Fai push su `main` (o rilancia il workflow da Actions)
3. Il sito sarà su `https://<utente>.github.io/<nome-repo>/`

## File documento

| File | Descrizione |
|------|-------------|
| [`index.html`](index.html) | Guida web responsive |
| [`guida-vela-deriva-nord-italia.md`](guida-vela-deriva-nord-italia.md) | Guida in Markdown |
| [`guida-vela-deriva-nord-italia.pdf`](guida-vela-deriva-nord-italia.pdf) | PDF A4 orizzontale |
| [`generate_pdf.py`](generate_pdf.py) | Script generazione PDF |

## Generare il PDF

```bash
pip install -r requirements.txt
python3 generate_pdf.py
```
