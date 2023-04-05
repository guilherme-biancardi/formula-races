import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import { pinia } from "./stores";
import { useAppStore } from "./stores/appStore";

const appStore = useAppStore(pinia);

// verifica se há um tema na store app, caso não seta o tema padrão
appStore.setTheme(appStore.getTheme || import.meta.env.VITE_APP_THEME);

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
