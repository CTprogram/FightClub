import React, { useState } from "react";
import styles from "./CopyDialog.module.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CopyDialog({ text }) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setOpen(true);
      })
      .catch(() => {
        setCopied(false);
      });
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <div>Game Code: </div>
        <div className={styles.text}>{text}</div>
        <div className={styles.icon} onClick={copyToClipboard}>
          {copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
        </div>
      </div>
      <Snackbar style={{ position: "fixed", top: "350px", left: "100px" }} open={open && copied} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Copied to Clipboard!
        </Alert>
      </Snackbar>
      <Snackbar style={{ position: "fixed", top: "350px", left: "80px" }} open={open && !copied} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Failed to copy to Clipboard!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CopyDialog;
