import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import inertia from "@inertiajs/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/css/app.css", "resources/js/app.jsx"],
      refresh: true,
    }),
    tailwindcss(),
    react(),
    inertia({
      ssr: true,
    }),
  ],
  server: {
    watch: {
      ignored: ["**/storage/framework/views/**"],
    },
  },
});