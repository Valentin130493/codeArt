import { RouteObject } from "react-router-dom";

import { ROUTES } from "../routes";
import SingIn from "./auth/SingIn.tsx";
import ErrorPage from "./errorPage";
import { AuthWrapper } from "./auth/AuthWrapper.tsx";
import HomePage from "./home";
import MainLayout from "../components/layout/mainLayout.tsx";

export const routes: RouteObject[] = [
  {
    path: ROUTES.auth,
    Component: SingIn,
  },
  {
    Component: AuthWrapper,
    children: [
      {
        Component: MainLayout,
        children: [
          {
            path: ROUTES.home,
            Component: HomePage,
          },
        ],
      },
    ],
  },
  {
    Component: ErrorPage,
    path: ROUTES.notFount,
  },
];
