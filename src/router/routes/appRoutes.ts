import { createRoute } from './../../ts/createRoute';

const routerView = 'app';

const driversRoute = createRoute('drivers', 'drivers');
driversRoute.setComponent(import('../../views/app/DriversView.vue'), routerView);

const teamsRoute = createRoute('teams', 'teams');
teamsRoute.setComponent(import('@/views/app/TeamsView.vue'), routerView);

export { driversRoute, teamsRoute };
