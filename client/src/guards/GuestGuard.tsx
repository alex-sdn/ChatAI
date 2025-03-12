import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";

export default function GuestGuard() {
  const token = Cookies.get("access_token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />
}
