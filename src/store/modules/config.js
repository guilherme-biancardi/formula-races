const config = {
    state: {
        isDarkTheme: false,
    },
    getters: {
        isDarkTheme: state => state.isDarkTheme
    },
    mutations: {
        setTheme: (state, theme) => state.isDarkTheme = theme,
    },
}

export default config