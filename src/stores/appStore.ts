import { getCurrentYear } from '@/ts/datetime';
import { useLocalStorage } from '@vueuse/core';
import axios, { type AxiosInstance } from 'axios';
import { defineStore } from 'pinia';
import { computed, reactive, watch } from 'vue';

export interface AppStoreStorage {
  theme: 'light' | 'dark' | null;
}

export interface AppStoreState {
  api: AxiosInstance;
  season: number
}

export const useAppStore = defineStore('app', () => {
  const storage = useLocalStorage('app', {
    theme: import.meta.env.VITE_THEME_DEFAULT
  } as AppStoreStorage);

  const state = reactive<AppStoreState>({
    api: axios.create({
      baseURL: import.meta.env.VITE_API_URL
    }),
    season: getCurrentYear()
  });

  const getTheme = computed(() => storage.value.theme);
  const useApi = computed(() => state.api)
  const getSeason = computed(() => state.season)

  const setTheme = (theme: AppStoreStorage['theme']) => (storage.value.theme = theme);

  watch(
    getTheme,
    (theme) => {
      if (theme) {
        const body = document.body;
        body.removeAttribute('class');
        body.classList.add(theme);
      }
    },
    { immediate: true }
  );

  return {
    getTheme,
    useApi,
    getSeason,
    setTheme
  };
});
