import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default {
  plugins: [vue()],
  resolve: {
    alias: {
      "vue3-dropdown-navbar": path.resolve(
        __dirname,
        "node_modules/vue3-dropdown-navbar/dist/vue3-dropdown-navbar.esm.js"
      ),
    },
  },
};
