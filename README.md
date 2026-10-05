# Guida alla Vela in Deriva nel Nord Italia

Mappatura tecnica degli spot di vela in deriva del Nord Italia, organizzata secondo i livelli del metodo Caprera.

## Web app (mobile-friendly)

Interfaccia responsive: su smartphone gli spot sono schede filtrabili; su desktop compare la tabella completa.

```bash
npm install
npm run dev
```

Apri [http://127.0.0.1:43127](http://127.0.0.1:43127).

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
