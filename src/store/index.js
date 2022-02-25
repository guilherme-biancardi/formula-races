import {
  createStore
} from "vuex"

export default createStore({
  state: {
    season: 0,
    drivers: [],
    constructors: [],
    races: []
  },
  getters: {
    season: state => state.season,
    drivers: state => state.drivers,
    constructors: state => state.constructors,
    races: state => state.races
  },
  mutations: {
    setSeason: (state, year) => state.season = year,
    setDrivers: (state, drivers) => state.drivers = drivers,
    setConstructors: (state, constructors) => state.constructors = constructors,
    setRaces: (state, races) => state.races = races
  },
})