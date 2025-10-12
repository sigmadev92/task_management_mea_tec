import { createBrowserRouter } from "react-router-dom";
import LayoutSecond from "../layouts/LayoutSecond";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
// import { store } from "../app/store";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import ExposedRoute from "../components/ExposedRoute";
import ProtectedRoute from "../components/ProtectedRoute";

// custom guard function

export const router = createBrowserRouter([
  {
    element: <LayoutSecond />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: (
          <ExposedRoute>
            <Login />
          </ExposedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
