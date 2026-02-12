import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SnackBar({ open, message, severity = "success", onClose }) {

    // Custom background colors
    const customColors = {
        success: "#20CA70",
        error: "#E63A3A",
        warning: "#F08B26",
        info: "#1468BA",
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={onClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert
                onClose={onClose}
                severity={severity}
                variant="filled"
                sx={{
                    width: "100%",
                    backgroundColor: customColors[severity],
                    color: "#fff",
                    borderRadius: 2,
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}
