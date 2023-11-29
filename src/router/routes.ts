import { createRoute } from './../ts/createRoute';
import { driversRoute, teamsRoute } from './routes/appRoutes';

const rootRoute = createRoute('', 'root');
rootRoute.setRedirect('app');

const appRoute = createRoute('/app', 'app');
appRoute.setComponent(import('@/views/app/AppView.vue'), 'root');

appRoute.setChildren([driversRoute.get(), teamsRoute.get()]);
appRoute.setRedirect('drivers');

export const useRoutes = () => [rootRoute.get(), appRoute.get()];
