import { createRouter, createWebHistory } from 'vue-router'
import { useRoutes } from './modules/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: useRoutes()
})

export default router
