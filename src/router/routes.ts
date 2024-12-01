import { routeFactory, useRouterViewComponent } from '@/ts/modules/route';
import type { RouteRecordRaw } from 'vue-router';
import { useStandingsRoutes } from './routes/standings';

const root = routeFactory({
  path: '/',
  redirect: {
    name: 'standings'
  }
});

const standings = routeFactory({
  path: '/campeonato',
  name: 'standings',
  redirect: {
    name: 'driversStandings'
  },
  children: useStandingsRoutes(),
  components: useRouterViewComponent('app', import('@/views/StandingsPage.vue'))
});

const races = routeFactory({
  path: '/corridas',
  name: 'races',
  components: useRouterViewComponent('app', import('@/views/RacesPage.vue')),
  meta: {
    title: 'Corridas',
    subtitle: 'Acompanhe os resultados da temporada'
  }
});

const stats = routeFactory({
  path: '/estatisticas',
  name: 'stats',
  components: useRouterViewComponent('app', import('@/views/StatsPage.vue')),
  meta: {
    title: 'Estatísticas',
    subtitle: 'Acompanhe os dados da temporada e compare entre pilotos'
  }
})

export const useSystemRoutes = (): RouteRecordRaw[] => [root, standings, races, stats];
