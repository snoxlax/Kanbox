import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Build to dist directory (separate from backend)
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  // If we want to build a local version (that uses local services)
  // define: {
  // 	'process.env.VITE_LOCAL': 'true'
  // }
});
