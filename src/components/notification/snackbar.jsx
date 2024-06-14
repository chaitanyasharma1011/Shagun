import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AppSnackbar = ({
  sx = {},
  open,
  onClose,
  message,
  severity,
  variant = "standard",
  icon = null,
  anchorOrigin = {
    vertical: "bottom",
    horizontal: "left",
  },
  autoHideDuration = 4000,
}) => (
  <Snackbar
    open={open}
    autoHideDuration={autoHideDuration}
    anchorOrigin={anchorOrigin}
    onClose={onClose}
  >
    <Alert
      sx={sx}
      {...(icon && { icon })}
      onClose={onClose}
      severity={severity}
      variant={variant}
    >
      {message}
    </Alert>
  </Snackbar>
);

export default AppSnackbar;
