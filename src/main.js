import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import piniaPersist from "pinia-plugin-persistedstate";

import { pinia } from "./stores";
import { useAppStore } from "./stores/appStore";

import "./assets/css/main.css";
import { Settings } from "luxon";

const app = createApp(App);
pinia.use(piniaPersist);

app.use(pinia);
app.use(router);

const appStore = useAppStore();

// verifica se há um tema na store app, caso não seta o tema padrão
await appStore.setTheme(appStore.getTheme || import.meta.env.VITE_APP_THEME);

// verifica se há um idioma na store app, caso não seta o idioma padrão
await appStore.setLanguage(
  appStore.getLanguage || import.meta.env.VITE_APP_LANGUAGE
);

Settings.defaultLocale = appStore.getLanguage;

app.mount("#app");
