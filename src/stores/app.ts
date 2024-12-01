import { useDatetime } from '@/ts/composables/datetime';
import { useColorMode, type UseColorModeReturn } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

interface AppStore {
  season: number;
  theme: UseColorModeReturn;
}

export const useAppStore = defineStore('app', () => {
  const { currentDate } = useDatetime();

  const state = reactive<AppStore>({
    season: currentDate.value.year,
    theme: useColorMode({
      attribute: 'theme',
      selector: 'html',
      initialValue: 'dark',
      storageKey: 'app-theme',
    })
  });

  const getSeason = computed(() => state.season);
  const getTheme = computed(() => state.theme);

  const setSeason = (season: number) => (state.season = season);
  const setTheme = (theme: 'light' | 'dark' | 'auto') => (state.theme = theme);

  return {
    getSeason,
    getTheme,
    setSeason,
    setTheme
  };
});
