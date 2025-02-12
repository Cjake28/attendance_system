import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import { useState } from "react";

const CreateTeacherAdminModal = ({ open, onClose, onConfirm }) => {
  const [role, setRole] = useState("teacher");

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Teacher/Admin</DialogTitle>
      
      <DialogContent>
        <TextField fullWidth label="Name" variant="outlined" margin="dense" />
        <TextField fullWidth label="Username" variant="outlined" margin="dense" />
        <TextField fullWidth label="Password" type="password" variant="outlined" margin="dense" />
        <TextField
          select
          fullWidth
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          variant="outlined"
          margin="dense"
        >
          <MenuItem value="teacher">Teacher</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={onConfirm} color="primary">Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTeacherAdminModal;
