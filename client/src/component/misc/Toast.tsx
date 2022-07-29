import React, {useState, } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface Props {
  message: string;
  severity?: string;
}

const Toast = ({message, severity}: Props) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert variant="filled" onClose={handleClose} severity={severity ? "success" : "error"} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
export default Toast;
