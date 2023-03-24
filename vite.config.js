import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  define: {
    "process.env": JSON.stringify("production"),
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(new URL(".", import.meta.url).pathname),
      "@services": path.resolve(
        new URL("src/services", import.meta.url).pathname
      ),
      "@components": path.resolve(
        new URL("src/components", import.meta.url).pathname
      ),
      "@views": path.resolve(new URL("src/views", import.meta.url).pathname),
      "vue3-dropdown-navbar": path.resolve(
        new URL(
          "node_modules/vue3-dropdown-navbar/dist/vue3-dropdown-navbar.esm.js",
          import.meta.url
        ).pathname
      ),
    },
  },
});
