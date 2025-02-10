import { CircularProgress, Box } from "@mui/material";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import router from "./routes/AppRoutes";

export default function App() {
  const { checkAuth, isCheckingAuth } = useAuth();

  useEffect(() => {
    checkAuth();
    console.log('App.jsx');
  }, []);

  if (isCheckingAuth) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return <RouterProvider router={router} />;
}
