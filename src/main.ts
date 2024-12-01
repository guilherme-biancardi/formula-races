import { createApp } from 'vue';

import App from './App.vue';
import { initApp } from './ts/modules/initApp';

const app = createApp(App);
initApp(app);