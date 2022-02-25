export const setRoute = (path, component, object = {}) => {
    const route = {
        path,
        component: () => component
    }

    return Object.assign(route, object)
}