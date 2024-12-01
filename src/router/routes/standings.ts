import { routeFactory, useRouterViewComponent } from '@/ts/modules/route';

const driversStandings = routeFactory({
  path: 'pilotos',
  name: 'driversStandings',
  components: useRouterViewComponent('standings', import('@/views/standings/DriversPage.vue')),
  meta: {
    title: 'Campeonato de Pilotos',
    subtitle: 'Acompanhe a classificação da temporada'
  }
});

const teamsStandings = routeFactory({
  path: 'construtores',
  name: 'teamsStandings',
  components: useRouterViewComponent('standings', import('@/views/standings/TeamsPage.vue')),
  meta: {
    title: 'Campeonato de Construtores',
    subtitle: 'Acompanhe a classificação da temporada'
  }
});

export const useStandingsRoutes = () => [driversStandings, teamsStandings];
