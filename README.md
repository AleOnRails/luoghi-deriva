# Guida alla Vela in Deriva nel Nord Italia

Mappatura tecnica degli spot di vela in deriva del Nord Italia, organizzata secondo i livelli del metodo Caprera.

## File

| File | Descrizione |
|------|-------------|
| [`guida-vela-deriva-nord-italia.md`](guida-vela-deriva-nord-italia.md) | Guida in Markdown |
| [`guida-vela-deriva-nord-italia.pdf`](guida-vela-deriva-nord-italia.pdf) | PDF A4 orizzontale, stile marinaresco |
| [`guida-vela-deriva-nord-italia.html`](guida-vela-deriva-nord-italia.html) | Sorgente HTML del PDF |
| [`generate_pdf.py`](generate_pdf.py) | Script di generazione PDF |

## Generare il PDF

```bash
pip install weasyprint
python3 generate_pdf.py
```

Il PDF usa layout landscape, wrapping delle celle (`word-wrap` / `hyphens`) e colonne a larghezza fissa per evitare il taglio delle parole italiane lunghe.
