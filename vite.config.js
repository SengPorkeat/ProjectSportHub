import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  root: ".",
  plugins: [react()],
  assetsInclude: ["**/*.JPG", "**/*.jpg"],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  publicDir: "public",
});
