import { defineStore } from "pinia";
import { computed, reactive, watch } from "vue";

export const useAppStore = defineStore(
  "app",
  () => {
    const state = reactive({
      theme: null,
    });

    const getTheme = computed(() => state.theme);
    const setTheme = (theme) => (state.theme = theme);

    watch(getTheme, (theme) => {
      const body = document.body;
      body.removeAttribute("class");
      body.classList.add(theme);
    });

    return {
      getTheme,
      setTheme,
      state,
    };
  },
  {
    persist: {
      enabled: true,
      strategies: [{ storage: localStorage, paths: ["state"] }],
    },
  }
);
