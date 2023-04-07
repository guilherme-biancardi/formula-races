import { createRoute } from "./createRoute";

const view = "app";

const drivers = createRoute(
  "drivers",
  "/drivers",
  import("../../views/DriversView.vue"),
  view
);

const teams = createRoute(
  "teams",
  "/teams",
  import("../../views/TeamsView.vue"),
  view
);

const races = createRoute(
  "races",
  "/races",
  import("../../views/RacesView.vue"),
  view
);

const graphics = createRoute(
  "graphics",
  "/graphics",
  import("../../views/GraphicsView.vue"),
  view
);

export const useRoutes = () => [
  {
    path: "/",
    redirect: "drivers",
  },
  drivers,
  teams,
  races,
  graphics
];
