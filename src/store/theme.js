import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: false
  }),
  getters: {
    getTheme: (state) => state.theme
  },
  actions: {
    setTheme () {
      this.theme = !this.theme
    }
  },
  persist: true
})
