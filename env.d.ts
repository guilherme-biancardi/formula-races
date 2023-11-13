/// <reference types="vite/client" />
/// <reference types="luxon" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_THEME_DEFAULT: string;
  readonly VITE_API_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '@jamescoyle/vue-icon';
