import { defineStore } from "pinia";
import { computed, reactive, watch } from "vue";

export const useAppStore = defineStore("app", () => {
  const state = reactive({
    theme: 'dark',
  });

  const getTheme = computed(() => state.theme);
  const setTheme = (theme) => (state.theme = theme);

  watch(
    getTheme,
    (theme) => {
      const html = document.querySelector("html");

      html.removeAttribute("class");
      html.classList.add(theme);
    },
    { immediate: true }
  );

  return {
    getTheme,
    setTheme,
  };
});
