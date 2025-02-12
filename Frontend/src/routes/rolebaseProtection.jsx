import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleBasedProtection({ userRole }) {
  const { isAuthenticated, user } = useAuth();
  const role = user?.role;

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (role !== userRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
