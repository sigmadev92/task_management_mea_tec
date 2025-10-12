// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux_toolkit/store/hooks";
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { loggedIn } = useAppSelector((state) => state.user);
  // or use context/store

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
