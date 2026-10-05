import { defineConfig } from 'vite'

// base del project site GitHub Pages (repo luoghi-deriva)
export default defineConfig({
  base: '/luoghi-deriva/',
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
