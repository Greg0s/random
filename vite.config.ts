import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Configure Vite for GitHub Pages deployment
export default defineConfig({
  plugins: [vue()],
  // Replace with your actual repository name
  base: "/random/",
});
