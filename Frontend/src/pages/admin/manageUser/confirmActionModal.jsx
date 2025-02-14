import { useSnackbar } from "../../../context/SnackbarContext.jsx"; // Import the custom hook
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, CircularProgress } from "@mui/material";
import { useMutation } from "@tanstack/react-query";

const ConfirmActionModal = ({ open, onClose, mutationFn, actionText = "Confirm", onSuccessCallback, color = "error" }) => {
  const showSnackbar = useSnackbar(); // Access the global Snackbar function

  const mutation = useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      showSnackbar(`${actionText} successful!`, "success"); // Show success alert
      onSuccessCallback?.(variables);
      onClose(); // Close the modal, but the Snackbar stays
    },
    onError: (error) => {
      showSnackbar(error.message || "Something went wrong", "error"); // Show error alert
    },
  });

  return (
    <Dialog open={open} onClose={mutation.isLoading ? null : onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <Typography align="center">
          Are you sure you want to {actionText.toLowerCase()} this user?
        </Typography>
      </DialogTitle>
      <DialogContent />
      <DialogActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
        <Button onClick={onClose} variant="outlined" color="secondary" disabled={mutation.isLoading}>
          Cancel
        </Button>
        <Button onClick={() => mutation.mutate()} variant="contained" color={color} disabled={mutation.isLoading}>
          {mutation.isLoading ? <CircularProgress size={24} color="inherit" /> : actionText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmActionModal;
