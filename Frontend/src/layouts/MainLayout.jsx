import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, Container } from "@mui/material";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Container sx={{ flex: 1, padding: "20px", backgroundColor: "#121212", color: "white" }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default MainLayout;
