import React from "react";
import { Button } from "@mui/material";

const TertiaryButton = ({
  children = "Tertiary Button",
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
        padding: "8px 30px",
        fontSize: "16px",
        fontWeight: 600,
        textTransform: "none",
        borderRadius: "12px",
        background: "#FFAD00",
        border: '1px solid #ffffff8e',
        color: "white",
        boxShadow: "0px 10px 24px rgba(250, 176, 5, 0.5)",
        "&:hover": {
          background: "#F59E0B",
          boxShadow: "0px 10px 24px rgba(250, 176, 5, 0.7)",
        },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export default TertiaryButton;
