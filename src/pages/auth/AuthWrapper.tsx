import { Navigate, Outlet } from "react-router";
import { ROUTES } from "../../routes";
import { TOKEN } from "../../static/storage.ts";
import { useEffect } from "react";

export const AuthWrapper = () => {
  const token = localStorage.getItem(TOKEN);

  useEffect(() => {}, [token]);

  if (!token) {
    return <Navigate to={ROUTES.auth} />;
  }

  return <Outlet />;
};
