import React from "react";
import { Fab } from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";

const FloatingButton = ({ onClick }) => {
  return (
    <Fab
      color="primary"
      aria-label="save"
      onClick={onClick}
      sx={{ position: "fixed", bottom: 16, right: 16 }}
    >
      <SaveIcon />
    </Fab>
  );
};

export default FloatingButton;
