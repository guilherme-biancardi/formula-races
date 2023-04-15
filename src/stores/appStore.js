import { defineStore } from "pinia";
import { computed, reactive, watch } from "vue";
import { useLanguage } from "../utils/language";

export const useAppStore = defineStore(
  "app",
  () => {
    const state = reactive({
      theme: null,
      language: null,
      languageFile: null,
    });

    const getTheme = computed(() => state.theme);
    const getLanguage = computed(() => state.language);

    const getLanguageFile = computed(() => state.languageFile);

    const setTheme = (theme) => (state.theme = theme);
    const setLanguage = (language) => (state.language = language);

    watch(
      getTheme,
      (theme) => {
        const body = document.body;
        body.removeAttribute("class");
        body.classList.add(theme);
      },
      { immediate: true }
    );

    watch(getLanguage, async (language) => {
      const languageFile = await useLanguage(language);

      state.languageFile = languageFile.default;
    });

    return {
      getTheme,
      getLanguage,
      getLanguageFile,
      setTheme,
      setLanguage,
      state,
    };
  },
  {
    persist: {
      paths: ["state.theme", "state.language"],
    },
  }
);
