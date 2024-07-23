import {RouteObject} from 'react-router-dom';

import {ROUTES} from "../routes";
import SingIn from "./auth/SingIn.tsx";
import ErrorPage from "./errorPage";
import {AuthWrapper} from "./auth/AuthWrapper.tsx";
import HomePage from "./home";

export const routes: RouteObject[] = [
    {
        path: ROUTES.auth,
        Component: SingIn,
    },
    {
        Component: AuthWrapper,
        children: [

            {
                path: ROUTES.home,
                Component: HomePage,
            },

        ],
    },
    {
        Component: ErrorPage,
        path: ROUTES.notFount,
    },
]