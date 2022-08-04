import { defineStore } from 'pinia'

export const useQualifyngStore = defineStore('qualifying', {
  state: () => ({
    qualifyings: []
  }),
  getters: {
    getQualifying: state => driverId =>
      state.qualifyings.find(driver => driver.driverId === driverId) || false
  },
  actions: {
    setQualifying (results, driverId) {
      if (!this.getQualifying(driverId)) {
        this.qualifyings.push({ results, driverId })
      }
    },
    cleanStats () {
      this.qualifyings.splice(0, this.qualifyings.length)
    }
  }
})
