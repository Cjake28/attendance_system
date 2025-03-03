import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import { createAdminOrTeacher } from "./userApi.js";
import { useSnackbar } from "../../../context/SnackbarContext.jsx";
import { useQueryClient } from "@tanstack/react-query";

const CreateTeacherAdminModal = ({ open, onClose }) => {
  const showSnackbar = useSnackbar();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    role: "teacher",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.username || !formData.password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await createAdminOrTeacher(formData);
      if (response?.success) {
        const formattedData = {
          is_verified: 1,
          parent_email: null,
          rfid_tag: null,
          section: null,
        };
        const newUser = { user_id: response.user_id, ...formData, ...formattedData };

        queryClient.setQueryData(["users"], (oldUsers) => [...oldUsers, newUser]);
        onClose();
        showSnackbar("Created successfully!", "success");
      } else {
        setError("Failed to create user");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create Teacher/Admin</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          margin="dense"
          autoComplete="off"
        />
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          variant="outlined"
          margin="dense"
          autoComplete="off"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          margin="dense"
          autoComplete="off"
        />
        <TextField
          select
          fullWidth
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          variant="outlined"
          margin="dense"
          autoComplete="off"
        >
          <MenuItem value="teacher">Teacher</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </TextField>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTeacherAdminModal;
