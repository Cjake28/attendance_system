import { createBrowserRouter } from "react-router-dom";

// Layouts
import AuthLayout from "../layouts/AuthLayout.jsx";
import MainLayout from "../layouts/MainLayout.jsx";

// Routes Protection
import RoleBasedRedirect from './RolebaseProtectedRoute.jsx'
import ProtectedsigninRoute from './SigninProtectedRoute.jsx'
import RoleBasedProtection from './rolebaseProtection.jsx'

// Pages
// Auth Pages
import Login from "../pages/auth/loginPage.jsx";

// Error Pages
import NotFound from "../pages/NotpoundPage.jsx";

// Admin Pages
import ManageUsers from '../pages/admin/manageUser/ManageUsers.jsx'
import Dashboard from '../pages/admin/dashboard/Dashboard.jsx'

// teacher pages
import TeacherPage from '../pages/teacher/TeacherPage.jsx'

//student pages
import StudentPage from '../pages/student/StudentPage.jsx'

//shared pages
import AttendacePage from '../pages/shared/attendance.Page.jsx'

const router = createBrowserRouter([
  // Auth Routes
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { 
        index: true,  // Default route for '/auth'
        element: <RoleBasedRedirect />,
      },
      {
        path: 'login', // Default route for '/auth'
        element: <ProtectedsigninRoute/>,
        children: [
          { index: true, element: <Login /> }, // Fixed index
        ]
      },
    ],
  },
  
  // Main Routes
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { 
        index: true,  // Default route for '/'
        element: <RoleBasedRedirect />,
      },
      {
        path: "admin",
        element: <RoleBasedProtection userRole="admin" />,
        children: [
          // { index: true, element: <Dashboard /> }, // Fixed index
          { index: true, element: <ManageUsers /> }, // Fixed path
          {path: "attendance", element: <AttendacePage/>}
        ],
      },
      {
        path: "teacher",
        element: <RoleBasedProtection userRole="teacher" />,
        children: [
          { index: true, element: <TeacherPage /> }, // Fixed index
        ],
      },
      {
        path: "student",
        element: <RoleBasedProtection userRole="student" />,
        children: [
          { index: true, element: <StudentPage /> }, // Fixed index
        ],
      },
    ],
  },

  // Catch-All Not Found Route
  { path: "*", element: <NotFound /> },
]);

export default router;
