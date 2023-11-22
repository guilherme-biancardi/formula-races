import { useDatetime } from '@/ts/datetime';
import { useDark, useToggle, type BasicColorSchema } from '@vueuse/core';
import axios, { type AxiosInstance } from 'axios';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

const { getCurrentYear } = useDatetime();

export interface AppStoreState {
  api: AxiosInstance;
  season: number;
  minYear: 1950;
  maxYear: number;
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
    season: getCurrentYear(),
    minYear: 1950,
    maxYear: getCurrentYear()
  });

  const useApi = computed(() => state.api);
  const getSeason = computed(() => state.season);
  const getMinimumYear = computed(() => state.minYear);
  const getMaximumYear = computed(() => state.maxYear);

  const toggleTheme = () => useToggle(theme)();

  const setSeason = (season: number) => {
    if (season >= state.minYear && season <= state.maxYear) {
      state.season = season;
    }
  };

  return {
    theme,
    toggleTheme,
    useApi,
    getSeason,
    getMinimumYear,
    getMaximumYear,
    setSeason
  };
});
