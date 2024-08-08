// Snackbar.tsx
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
interface CustomSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  width?: string;
  marginTop?: string;
  marginRight?: string;
  anchorOrigin: any;
}
const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  onClose,
  message,
  width,
  marginTop,
  marginRight,
  anchorOrigin,
}) => (
  <Snackbar
    anchorOrigin={anchorOrigin}
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    sx={{ width: { xs: "90%", md: width } }}
  >
    <MuiAlert onClose={onClose} severity="error" elevation={6} variant="filled">
      {message}
    </MuiAlert>
  </Snackbar>
);
export default CustomSnackbar;
