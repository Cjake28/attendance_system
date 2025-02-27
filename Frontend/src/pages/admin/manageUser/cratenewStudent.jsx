import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress, Backdrop } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import CaptureImageModal from "./captureImageModal.jsx";
import { createStudentAPI } from "./userApi.js";

const CreateStudentModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    section: "",
    role: "student",
    parent_email: "",
    rfid_tag: "",
    lrn: "",
    images: [],
  });

  const [errors, setErrors] = useState({});
  const [openCaptureModal, setOpenCaptureModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptureImages = (capturedImages) => {
    setFormData({ ...formData, images: capturedImages });
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "images" && formData[key].trim() === "") {
        newErrors[key] = "This field is required";
      }
    });
    if (formData.images.length < 5) {
      newErrors["images"] = "You must capture at least 5 images";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const mutation = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      return createStudentAPI(formData);
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
        lrn: "",
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

  const handleSubmit = () => {
    if (validateForm()) {
      mutation.mutate();
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Create Student</DialogTitle>
        <DialogContent>
          {Object.entries(formData).map(([key, value]) => (
            key !== "images" &&  key !== "role" && (
              <TextField
                key={key}
                fullWidth
                label={key.replace("_", " ").toUpperCase()}
                name={key}
                variant="outlined"
                margin="dense"
                autoComplete="off"
                type={key === "password" ? "password" : "text"}
                value={value}
                onChange={handleChange}
                error={!!errors[key]}
                helperText={errors[key]}
              />
            )
          ))}

          {formData.images.length > 0 && (
            <div style={{ display: "flex", gap: 8, overflowX: "auto", marginTop: 10 }}>
              {formData.images.map((img, index) => (
                <img key={index} src={img} alt={`Captured ${index}`} style={{ width: 80, height: 80, borderRadius: 8, objectFit: "cover" }} />
              ))}
            </div>
          )}
          {errors.images && <p style={{ color: "red" }}>{errors.images}</p>}

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={() => setOpenCaptureModal(true)}>
            Capture Image
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} color="secondary" disabled={mutation.isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={mutation.isLoading}>
            {isLoading ? <CircularProgress size={24} /> : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      <CaptureImageModal open={openCaptureModal} onClose={() => setOpenCaptureModal(false)} onCapture={handleCaptureImages} />

      <Backdrop open={isLoading} sx={{ color: "#fff", zIndex: 1201}}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CreateStudentModal;
