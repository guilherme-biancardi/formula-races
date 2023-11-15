import { getCurrentYear } from '@/ts/datetime';
import { useDark, useToggle, type BasicColorSchema } from '@vueuse/core';
import axios, { type AxiosInstance } from 'axios';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

export interface AppStoreState {
  api: AxiosInstance;
  season: number
}

export const useAppStore = defineStore('app', () => {
  const theme = useDark({
    initialValue: import.meta.env.VITE_THEME_DEFAULT as BasicColorSchema,
    attribute: 'theme',
    valueLight: 'light',
    storageKey: 'app-theme'
  });

  const state = reactive<AppStoreState>({
    api: axios.create({
      baseURL: import.meta.env.VITE_API_URL
    }),
    season: getCurrentYear()
  });

  const useApi = computed(() => state.api)
  const getSeason = computed(() => state.season)

  const toggleTheme = () => useToggle(theme)();

  return {
    theme,
    toggleTheme,
    useApi,
    getSeason,
  };
});
