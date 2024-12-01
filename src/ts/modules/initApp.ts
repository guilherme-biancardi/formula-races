import { systemColorKey, systemFontKey } from '@/css/types';
import router from '@/router';
import { piniaInstance } from '@/stores';
import fonts from '@/css/modules/fonts.module.css';
import colors from '@/css/modules/colors.module.css';

import type { App } from 'vue';

export const initApp = (app: App<Element>) => {
  app.use(piniaInstance);
  app.use(router);

  // injetando as fontes do sistema
  app.provide(systemFontKey, fonts);

  // injetando as cores do sistema
  app.provide(systemColorKey, colors);

  app.mount('#app');
};
