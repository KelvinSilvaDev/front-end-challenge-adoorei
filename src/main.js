import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes";
import store from "./store";

import "./tailwind.css";
import "./index.css";

createApp(App).use(router).use(store).mount("#app");
