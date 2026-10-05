import { defineConfig } from 'vite'

// In produzione (GitHub Pages project site) serve il prefisso del repo.
// In locale resta '/' così npm run dev apre subito la root.
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/luoghi-deriva/" : "/",
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
