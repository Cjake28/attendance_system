import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, CircularProgress } from "@mui/material";
import { useAuth } from "../../context/AuthContext"; // Import Auth Context

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth(); // Use login function from context
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(""); // Clear previous errors
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      await login(email, password); // Call login function
      // console.log("Logged in user:", user);
      navigate("/"); // Redirect to home page
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Login
        </Typography>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
