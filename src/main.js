import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import piniaPersist from "pinia-plugin-persist";

import { pinia } from "./stores";

import './assets/css/main.css'

const app = createApp(App);
pinia.use(piniaPersist);

app.use(pinia);
app.use(router);

app.mount("#app");