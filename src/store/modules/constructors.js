const constructors = {
    state: {
        constructors: [],
    },
    getters: {
        constructors: state => state.constructors,
    },
    mutations: {
        setConstructors: (state, constructors) => state.constructors = constructors,
    }
}

export default constructors