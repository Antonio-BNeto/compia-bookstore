import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthContext";

export function ProtectedRoute({ role }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
