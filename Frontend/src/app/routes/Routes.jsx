import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import Home from "../components/pages/Home";
import ProtectedRoutes from "./ProtectedRouts";
import ChangePassword from "../components/auth/ChangePassword";
import TaskManagerDashboard from "../components/dashboard/TaskManagerDashboard ";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <TaskManagerDashboard />,
      },
      {
        path: "/forgot-password",
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;
