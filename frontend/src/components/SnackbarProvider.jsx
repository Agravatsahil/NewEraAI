import React, { createContext, useContext, useState } from "react";
import SnackBar from "../components/SnackBar";

const SnackbarContext = createContext();
export const useSnackbar = () => useContext(SnackbarContext);

export default function SnackbarProvider({ children }) {
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnack({
      open: true,
      message,
      severity,
    });
  };

  const showSuccess = (msg) => showSnackbar(msg, "success");
  const showError = (msg) => showSnackbar(msg, "error");
  const showWarning = (msg) => showSnackbar(msg, "warning");
  const showInfo = (msg) => showSnackbar(msg, "info");

  const handleClose = () => {
    setSnack((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSuccess, showError, showWarning, showInfo }}>
      {children}
      <SnackBar
        open={snack.open}
        message={snack.message}
        severity={snack.severity}
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
}
