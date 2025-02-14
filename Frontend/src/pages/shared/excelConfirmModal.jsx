import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    Typography 
    } from "@mui/material";

const ExcelConfirmModal = ({ open, onClose, onConfirm, actionText, color="primary" }) => {

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <Typography align="center">
          Are you sure you want to download to excel this attendance?
        </Typography>
      </DialogTitle>
      <DialogContent />
      <DialogActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color={color} >
          {actionText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExcelConfirmModal;
