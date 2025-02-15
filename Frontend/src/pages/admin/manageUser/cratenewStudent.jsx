import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress, Backdrop } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import CaptureImageModal from "./captureImageModal.jsx";
import { createStudentAPI } from "./userApi.js"; // Import your API function

const CreateStudentModal = ({ open, onClose }) => {

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    section: "",
    role: "student",
    parent_email: "",
    rfid_tag: "",
    images: [],
  });

  const [openCaptureModal, setOpenCaptureModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptureImages = (capturedImages) => {
    setFormData({ ...formData, images: capturedImages });
  };

  // React Query Mutation
  const mutation = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      if (formData.images.length < 5) throw new Error("You must capture 5 images before uploading.");
      return createStudentAPI(formData); // Use API function
    },
    onSuccess: () => {
      alert("Student created successfully!");
      setFormData({
        name: "",
        username: "",
        password: "",
        section: "",
        role: "student",
        parent_email: "",
        rfid_tag: "",
        images: [],
      });
      onClose();
    },
    onError: (error) => {
      alert(error.message);

    },
    onSettled: () => {
      setIsLoading(false);
    }
  });

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Create Student</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Name" name="name" variant="outlined" margin="dense" autoComplete="off"  value={formData.name} onChange={handleChange} />
          <TextField fullWidth label="Username" name="username" variant="outlined" margin="dense" autoComplete="off" value={formData.username} onChange={handleChange} />
          <TextField fullWidth label="Password" name="password" type="password" variant="outlined" autoComplete="off" margin="dense" value={formData.password} onChange={handleChange} />
          <TextField fullWidth label="Section" name="section" variant="outlined" margin="dense" autoComplete="off" value={formData.section} onChange={handleChange} />
          <TextField fullWidth label="Parent Email" name="parent_email" type="email" variant="outlined" autoComplete="off" margin="dense" value={formData.parent_email} onChange={handleChange} />
          <TextField fullWidth label="RFID Tag" name="rfid_tag" variant="outlined" margin="dense"  autoComplete="off" value={formData.rfid_tag} onChange={handleChange} />

          {formData.images.length > 0 && (
            <div style={{ display: "flex", gap: 8, overflowX: "auto", marginTop: 10 }}>
              {formData.images.map((img, index) => (
                <img key={index} src={img} alt={`Captured ${index}`} style={{ width: 80, height: 80, borderRadius: 8, objectFit: "cover" }} />
              ))}
            </div>
          )}

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={() => setOpenCaptureModal(true)}>
            Capture Image
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="secondary" disabled={mutation.isLoading}>
            Cancel
          </Button>
          <Button onClick={() => mutation.mutate()} color="primary" disabled={mutation.isLoading || formData.images.length < 5}>
            {isLoading ? <CircularProgress size={24} /> : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      <CaptureImageModal open={openCaptureModal} onClose={() => setOpenCaptureModal(false)} onCapture={handleCaptureImages} />

      {/* Loading Overlay */}
      <Backdrop open={isLoading} sx={{ color: "#fff", zIndex: 1201}}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CreateStudentModal;
