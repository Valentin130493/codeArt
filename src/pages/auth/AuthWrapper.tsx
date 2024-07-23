import {Navigate, Outlet} from "react-router";
import {ROUTES} from "../../routes";


export const AuthWrapper = () => {
   const token = localStorage.getItem("token");

   if(!token){
      return <Navigate to={ROUTES.auth} />;
   }

   return <Outlet/>
};

