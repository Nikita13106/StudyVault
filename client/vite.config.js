import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Vite dev server config.
 * The proxy forwards "/api" requests to the Express backend so the
 * frontend can call relative "/api/..." paths without CORS issues in dev.
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
