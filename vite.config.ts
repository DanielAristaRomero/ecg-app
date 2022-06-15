import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
        "medicina.svg",
      ],
      manifest: {
        start_url: "/inicio",
        name: "Heartly",
        short_name: "Heartly",
        description: "Aplicación para el análisis de ECG",
        theme_color: "#ffffff",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        shortcuts: [
          {
            name: "Inicio",
            short_name: "Inicio",
            url: "/inicio",
            icons: [
              {
                src: "/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
              },
            ],
          },
          {
            name: "Historial",
            short_name: "Historial",
            url: "/historial",
            icons: [
              {
                src: "/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
              },
            ],
          },
        ],
      },
    }),
  ],
});
