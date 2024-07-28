import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://sporthub.automatex.dev",
        changeOrigin: true,
        secure: false,
      },
    },
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
