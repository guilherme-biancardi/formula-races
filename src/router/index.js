import { createRouter, createWebHistory } from 'vue-router'
import { constructors, driver, race, stats } from './modules/routes.js'

const routes = [
  { path: '/', redirect: '/drivers' },
  driver,
  race,
  stats,
  constructors
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
