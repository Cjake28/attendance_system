import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Assuming you're using AuthContext

const Navbar = () => {
  const [role, setRole] = useState(null);
  const { signout, isAuthenticated, user } = useAuth(); // Get signout function from AuthContext
  const navigate = useNavigate();
  const location = useLocation(); // Get current path

  useEffect(() => {
    const storedRole = user?.role;
    setRole(storedRole);
  }, []);

  const handleLogout = async () => {
    await signout();
    navigate("/auth/login"); // Redirect to login page
  };

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <AppBar position="static" sx={{ backgroundColor: "#121212" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Left side: Logo/Title */}
        <Typography variant="h6">Attendance System</Typography>

        {/* Centered Navigation */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
          {role === "admin" && (
            <>
              <Button
                component={Link}
                to="/admin"
                sx={{ color: isActive("/admin") ? "yellow" : "white" }}
              >
                Dashboard
              </Button>
              <Button
                component={Link}
                to="/admin/manage-users"
                sx={{ color: isActive("/admin/manage-users") ? "yellow" : "white" }}
              >
                Manage Users
              </Button>
            </>
          )}
          {role === "teacher" && (
            <>
              <Button
                component={Link}
                to="/teacher"
                sx={{ color: isActive("/teacher") ? "yellow" : "white" }}
              >
                Dashboard
              </Button>
              <Button
                component={Link}
                to="/teacher/attendance"
                sx={{ color: isActive("/teacher/attendance") ? "yellow" : "white" }}
              >
                View Attendance
              </Button>
            </>
          )}
          {role === "student" && (
            <>
              <Button
                component={Link}
                to="/student"
                sx={{ color: isActive("/student") ? "yellow" : "white" }}
              >
                Dashboard
              </Button>
              <Button
                component={Link}
                to="/student/attendance"
                sx={{ color: isActive("/student/attendance") ? "yellow" : "white" }}
              >
                My Attendance
              </Button>
            </>
          )}
        </Box>

        {/* Right side: Logout Button */}
        <Button onClick={handleLogout} sx={{ color: "white", marginLeft: "auto" }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
