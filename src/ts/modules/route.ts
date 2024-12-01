import type { Component } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

export const routeFactory = (options: RouteRecordRaw): RouteRecordRaw => options;

export const useRouterViewComponent = (view: string, component: Promise<Component>) => ({
  [view]: () => component
});
