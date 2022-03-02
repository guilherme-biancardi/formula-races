const maxPointsSeason = (year) => ({
    [year >= 1950 && year <= 1960]: 8,
    [year >= 1961 && year <= 1990]: 9,
    [year >= 1991 && year <= 2009]: 10,
    [year >= 2010]: 25
})

const season = {
    state:{
        season: 0
    },
    getters: {
        season: state => state.season,
        maxPoints: state => state.maxPoints
    },
    mutations: {
        setSeason: (state, year) => {
            state.season = year
            state.maxPoints = maxPointsSeason(year).true + 2
        },
    }
}

export default season