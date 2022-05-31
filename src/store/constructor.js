import { defineStore } from 'pinia'

export const useConstructorsStore = defineStore('constructors', {
  state: () => ({
    standing: []
  }),
  getters: {
    getStanding: (state) => state.standing
  },
  actions: {
    setConstructorStanding (value) {
      this.standing = value
    }
  }
})
