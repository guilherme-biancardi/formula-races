import { defineStore } from 'pinia'

export const useDriversStore = defineStore('drivers', {
  state: () => ({
    standing: []
  }),
  getters: {
    getStanding: (state) => state.standing
  },
  actions: {
    setDriverStanding (value) {
      this.standing = value
    }
  }
})
