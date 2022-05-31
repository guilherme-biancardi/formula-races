import { defineStore } from 'pinia'

export const useStatsStore = defineStore('stats', {
  state: () => ({
    driverStats: []
  }),
  getters: {
    getDriverStat: state => driverId =>
      state.driverStats.find(driver => driver.driverId === driverId) || false
  },
  actions: {
    setDriverStat (graphic, results, driverId) {
      if (!this.getDriverStat(driverId)) {
        this.driverStats.push({ graphic, results, driverId })
      }
    },
    cleanStats () {
      this.driverStats.splice(0, this.driverStats.length)
    }
  }
})
