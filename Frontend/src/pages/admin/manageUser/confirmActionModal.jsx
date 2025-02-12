import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, CircularProgress } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

const ConfirmActionModal = ({ open, onClose, mutationFn, actionText = "Confirm", onSuccessCallback, color = 'error' }) => {
  
  const mutation = useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      alert(`${actionText} successful!`);
      onSuccessCallback?.(variables); // Call the success callback to update cache
      onClose();
    },
    onError: (error) => {
      alert(error.message || "Something went wrong");
    },
  });

  return (
    <Dialog open={open} onClose={mutation.isLoading ? null : onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <Typography variant="h6" align="center">
          Are you sure you want to {actionText.toLowerCase()} this user?
        </Typography>
      </DialogTitle>
      <DialogContent />

      <DialogActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
        <Button onClick={onClose} variant="outlined" color="secondary" disabled={mutation.isLoading}>
          Cancel
        </Button>
        <Button onClick={() => mutation.mutate()} variant="contained" color = {color} disabled={mutation.isLoading}>
          {mutation.isLoading ? <CircularProgress size={24} color="inherit" /> : actionText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmActionModal;
