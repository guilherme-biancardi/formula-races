import { createRouter, createWebHistory } from 'vue-router'
import drivers from './modules/drivers';
import constructors from './modules/constructors';
import races from './modules/races';
import graphics from './modules/graphics';

const routes = [
  {
    path: '/',
    redirect: '/drivers'
  },
  drivers,
  constructors,
  races,
  graphics
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router