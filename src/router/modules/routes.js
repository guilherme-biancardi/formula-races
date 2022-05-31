import { createRoute } from './createRoute'

const driver = createRoute('/drivers', import('@/views/DriverView.vue'))
const race = createRoute('/races', import('@/views/RaceView.vue'))
const constructors = createRoute(
  '/constructors',
  import('@/views/ConstructorView.vue')
)
const stats = createRoute('/stats', import('../../views/StatsView.vue'))

export { driver, race, constructors, stats }
