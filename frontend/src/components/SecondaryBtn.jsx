import React from "react";
import { Button } from "@mui/material";

const SecondaryButton = ({
  children = "View Demo",
  onClick,
  sx = {},
  ...props
}) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      {...props}
      sx={{
        px: "36px",
        py: "14px",
        fontSize: "16px",
        fontWeight: 600,
        textTransform: "none",
        borderRadius: "999px",

        /* Background */
        backgroundColor: "#FFFFFF",
        color: "#1F2937",

        /* Border */
        border: "2px solid #E5E7EB",

        /* Soft floating shadow */
        boxShadow:
          "0px 2px 10px rgba(15, 23, 42, 0.08)",

        position: "relative",
        overflow: "hidden",

        /* Top inner light gloss */
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0) 70%)",
          pointerEvents: "none",
        },

        /* Keep text above gloss */
        "& > *": {
          position: "relative",
          zIndex: 1,
        },

        /* Hover */
        "&:hover": {
          backgroundColor: "#FFFFFF",
          boxShadow:
            "0px 10px 25px rgba(15, 23, 42, 0.12)",
        },

        /* Active / Pressed */
        "&:active": {
          boxShadow:
            "0px 10px 25px rgba(15, 23, 42, 0.12)",
          transform: "translateY(1px)",
        },

        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
