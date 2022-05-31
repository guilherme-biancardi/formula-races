import { defineStore } from 'pinia'

const maxPointsSeason = (year) => ({
  [year >= 1950 && year <= 1960]: 8,
  [year >= 1961 && year <= 1990]: 9,
  [year >= 1991 && year <= 2009]: 10,
  [year >= 2010]: 25
})

export const useStore = defineStore('main', {
  state: () => ({
    season: 0,
    currentYear: 0,
    maxPoints: 0
  }),
  getters: {
    getSeason: (state) => state.season,
    getCurrentYear: (state) => state.currentYear,
    getMaxPoints: state => state.maxPoints
  },
  actions: {
    setSeason (year) {
      this.season = year
      this.maxPoints = maxPointsSeason(year).true + 2
    },
    setCurrentYear (year) {
      this.currentYear = year
    }
  }
})
