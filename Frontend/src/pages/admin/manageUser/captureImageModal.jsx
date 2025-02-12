import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

const CaptureImageModal = ({ open, onClose, onCapture }) => {
  const webcamRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);

  const handleCapture = () => {
    if (capturedImages.length < 5) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImages([...capturedImages, imageSrc]);
    }
  };

  const handleRemoveImage = (index) => {
    setCapturedImages(capturedImages.filter((_, i) => i !== index));
  };

  const handleConfirm = () => {
    onCapture(capturedImages); // Pass images back
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Capture Image</DialogTitle>

      <DialogContent>
        <Webcam 
          ref={webcamRef} 
          screenshotFormat="image/jpeg" 
          width="100%" 
          style={{ borderRadius: 8 }} 
        />
        
        {/* Captured Images Preview */}
        {capturedImages.length > 0 && (
          <div style={{ display: "flex", gap: 8, overflowX: "auto", marginTop: 10 }}>
            {capturedImages.map((img, index) => (
              <div key={index} style={{ position: "relative" }}>
                <img src={img} alt={`Captured ${index}`} style={{ width: 80, height: 80, borderRadius: 8, objectFit: "cover" }} />
                <IconButton 
                  size="small" 
                  onClick={() => handleRemoveImage(index)} 
                  style={{ position: "absolute", top: -8, right: -8, backgroundColor: "rgba(0,0,0,0.6)", color: "#fff" }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </div>
            ))}
          </div>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCapture} disabled={capturedImages.length >= 5} variant="contained">Capture</Button>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleConfirm} color="primary" disabled={capturedImages.length === 0}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CaptureImageModal;
