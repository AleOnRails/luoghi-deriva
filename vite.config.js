import { defineConfig } from 'vite'

// base relativo: funziona su GitHub Pages (project site) e in locale
export default defineConfig({
  base: './',
  server: {
    host: '127.0.0.1',
    port: 43127,
    // se la porta è occupata, Vite ne sceglie un'altra libera
    strictPort: false,
  },
  preview: {
    host: '127.0.0.1',
    port: 43127,
    strictPort: false,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
