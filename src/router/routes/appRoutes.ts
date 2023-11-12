import { createRoute } from './../../ts/createRoute';

const routerView = 'app';

const driversRoute = createRoute('drivers', 'drivers');
driversRoute.setComponent(import('../../views/app/DriversView.vue'), routerView);

export { driversRoute };
