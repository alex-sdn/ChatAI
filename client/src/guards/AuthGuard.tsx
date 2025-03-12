import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";

export default function AuthGuard() {
  const token = Cookies.get("access_token");

  if (!token) {
    return <Navigate to="/sign-up" replace />;
  }

  return <Outlet />
}
