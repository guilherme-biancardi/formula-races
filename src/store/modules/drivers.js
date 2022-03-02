const drivers = {
    state: {
        drivers: [],
    },
    getters: {
        drivers: state => state.drivers,
    },
    mutations: {
        setDrivers: (state, drivers) => state.drivers = drivers,
    }
}

export default drivers