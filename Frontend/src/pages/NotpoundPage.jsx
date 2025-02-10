import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h2" color="error">
        404
      </Typography>
      <Typography variant="h5">Page Not Found</Typography>
      <Button component={Link} to="/" sx={{ mt: 2 }} variant="contained" color="primary">
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound;
