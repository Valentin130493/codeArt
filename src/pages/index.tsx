import { RouteObject} from 'react-router-dom';
// import {AuthWrapper} from "./auth/AuthWrapper.tsx";
import {Routes} from "../routes";
import SingIn from "./auth/SingIn.tsx";
import ErrorPage from "./errorPage";

export const routes: RouteObject[] = [
    {
        path: Routes.auth,
        Component: SingIn,
    },
    // {
    //     Component: AuthWrapper,
    //     children: [
    //         {
    //             index: true,
    //             element: <Navigate to={Routes.auth}/>
    //         },
    //         {
    //             path: Routes.auth,
    //             Component: SingIn,
    //         },
    //
    //     ],
    // },
    {
        Component: ErrorPage,
        path: Routes.notFount,
    },
]