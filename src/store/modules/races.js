const races = {
    state:{
        races: [],
    },
    getters: {
        races: state => state.races,
    },
    mutations: {
        setRaces: (state, races) => state.races = races,
    }
}

export default races