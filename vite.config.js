import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/luoghi-deriva/" : "/",
  server: {
    host: "127.0.0.1",
    port: 43127,
    strictPort: false,
  },
  preview: {
    host: "127.0.0.1",
    port: 43127,
    strictPort: false,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        sud: resolve(__dirname, "sud.html"),
        privacy: resolve(__dirname, "privacy.html"),
        livelli: resolve(__dirname, "livelli.html"),
        suggerisci: resolve(__dirname, "suggerisci.html"),
      },
    },
  },
});
