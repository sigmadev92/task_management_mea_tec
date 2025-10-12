// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux_toolkit/store/hooks";
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ExposedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { loggedIn } = useAppSelector((state) => state.user);
  // or use context/store

  if (loggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ExposedRoute;
