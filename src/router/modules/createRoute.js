/**
 *
 * @param {string} name determina o nome da rota
 * @param {string} path determina a rota ex: /login/entrar
 * @param {{}} component determina o componente a ser renderizado na rota
 * @param {string} view determina o nome do RouterView onde a rota será renderizada
 * @returns {{name: string, path: string, components: {}}}
 */

export const createRoute = (name, path, component, view) => ({
  name,
  path,
  components: {
    [view]: () => component,
  },
});
