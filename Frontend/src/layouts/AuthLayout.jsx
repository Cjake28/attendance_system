import { Outlet } from "react-router-dom";
import { Box, Paper } from "@mui/material";

const AuthLayout = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}>
      <Paper elevation={3} sx={{ padding: "20px", maxWidth: "400px", width: "100%" }}>
        <Outlet />
      </Paper>
    </Box>
  );
};

export default AuthLayout;
