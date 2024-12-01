import { createRouter, createWebHistory } from 'vue-router';
import { useSystemRoutes } from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: useSystemRoutes()
});

export default router;
