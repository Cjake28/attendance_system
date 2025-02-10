import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Assuming you're using AuthContext

const Navbar = () => {
  const [role, setRole] = useState(null);
  const { signout, isAuthenticated, user } = useAuth(); // Get signout function from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = user?.role;
    setRole(storedRole);
  }, []);

  const handleLogout = async () => {
    await signout();
    navigate("/auth/login"); // Redirect to login page
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#121212" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Left side: Logo/Title */}
        <Typography variant="h6">Attendance System</Typography>

        {/* Centered Navigation */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", alignItems: "center",flexGrow: 1 }}>
          {role === "admin" && (
            <>
              <Button component={Link} to="/admin" sx={{ color: "white" }}>Dashboard</Button>
              <Button component={Link} to="/admin/manage-users" sx={{ color: "white" }}>Manage Users</Button>
            </>
          )}
          {role === "teacher" && (
            <>
              <Button component={Link} to="/teacher" sx={{ color: "white" }}>Dashboard</Button>
              <Button component={Link} to="/teacher/attendance" sx={{ color: "white" }}>View Attendance</Button>
            </>
          )}
          {role === "student" && (
            <>
              <Button component={Link} to="/student" sx={{ color: "white" }}>Dashboard</Button>
              <Button component={Link} to="/student/attendance" sx={{ color: "white" }}>My Attendance</Button>
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
