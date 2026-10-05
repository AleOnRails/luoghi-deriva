import { defineConfig } from 'vite'

// base relativo: funziona su GitHub Pages (project site) e in locale
export default defineConfig({
  base: './',
  server: {
    host: '127.0.0.1',
    port: 43127,
    strictPort: true,
  },
  preview: {
    host: '127.0.0.1',
    port: 43127,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
