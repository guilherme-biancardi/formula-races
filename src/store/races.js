import { defineStore } from 'pinia'

export const useRacesStore = defineStore('races', {
  state: () => ({
    table: []
  }),
  getters: {
    getTable: (state) => state.table
  },
  actions: {
    setRaceTable (value) {
      this.table = value
    }
  }
})
