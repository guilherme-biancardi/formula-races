const cache = {
    state: {
        resultsCache: {}
    },
    getters: {
        resultsCache: state => state.resultsCache
    },
    mutations: {
        setTheme: (state, theme) => state.isDarkTheme = theme,
        setCache: (state, cache) => state.resultsCache[cache.index] = cache.obj,
        resetCache: (state) => state.resultsCache = {}
    },
}

export default cache