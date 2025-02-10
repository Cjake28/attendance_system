import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
    },
    primary: {
      main: "#00ff95", // Neon Green
    },
    secondary: {
      main: "#2979ff", // Neon Blue
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

export default theme;
