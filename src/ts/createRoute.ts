import type { RouteRecordRaw } from 'vue-router';

type RouterKeys = keyof RouteRecordRaw;

export const createRoute = (path: string, name: string) => {
  const route: Map<RouterKeys, RouteRecordRaw[RouterKeys]> = new Map();

  route.set('path', path);
  route.set('name', name);

  const setComponent = (component: Promise<typeof import('.vue')>, routerView: string) => {
    route.set('components', {
      [routerView]: () => component
    });
  };

  const setRedirect = (name: string) => route.set('redirect', { name });

  const setBeforeEnter = (callback: RouteRecordRaw['beforeEnter']) => route.set('beforeEnter', callback);

  const setChildren = (children: RouteRecordRaw['children'] = []) => route.set('children', children);

  return {
    setComponent,
    setRedirect,
    setBeforeEnter,
    setChildren,
    get: () => Object.fromEntries(route) as unknown as RouteRecordRaw
  };
};