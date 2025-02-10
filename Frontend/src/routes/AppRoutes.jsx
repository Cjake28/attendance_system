import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import Login from "../pages/auth/loginPage.jsx";
import NotFound from "../pages/NotpoundPage.jsx";
import RoleBasedRedirect from './RolebaseProtectedRoute.jsx'
import ProtectedsigninRoute from './SigninProtectedRoute.jsx'
const router = createBrowserRouter([
  // Auth Routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <ProtectedsigninRoute />, // Prevent logged-in users from accessing login
        children: [{ index: true, element: <Login /> }],
      },
    ],
  },
  
  // Main Routes
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true,  // Default route for '/'
        element: <RoleBasedRedirect/>,
      },
      {
        path: "admin",
        element: <h1>Admin Dashboard</h1>,
      },
      {
        path: "teacher",
        element: <h1>Teacher Dashboard</h1>,
      },
      {
        path: "student",
        element: <h1>Student Dashboard</h1>,
      }
      
  
    ]
  },

  // Catch-All Not Found Route
  { path: "*", element: <NotFound /> },
]);

export default router;
