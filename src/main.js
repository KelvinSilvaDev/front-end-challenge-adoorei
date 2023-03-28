import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import store from "./store";

import "./tailwind.css";
import "./index.css";

store.dispatch("theme/initializeTheme"); // chamada do método initializeTheme

createApp(App).use(router).use(store).mount("#app");
