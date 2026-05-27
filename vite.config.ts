import inertia from "@inertiajs/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";
import { wayfinder } from "@laravel/vite-plugin-wayfinder";

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/css/app.css", "resources/js/app.tsx"],
      refresh: true,
    }),
    tailwindcss(),
    react(),
    inertia(),
    wayfinder(),
  ],
  server: {
    watch: {
      ignored: ["**/storage/framework/views/**"],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("AnalyticsWrapper")) {
            return "app";
          }
        },
      },
    },
  },
});
