import React from 'react';
import { Button } from '@mui/material';

const PrimaryButton = ({
  children = "Create Activate Order",
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
        padding: "10px 30px",
        fontSize: "14px",
        fontWeight: 600,
        textTransform: "none",
        borderRadius: "999px",
        background: "#0F0F0F",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        color: "#FFFFFF",
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.00) 65%)',
        },
        '& .MuiButton-startIcon, & .MuiButton-endIcon, & .MuiButton-icon': {
          position: 'relative',
          zIndex: 1,
        },
        '& > *': {
          position: 'relative',
          zIndex: 1,
        },
        // boxShadow: "0px 10px 25px rgba(15, 23, 42, 0.35)",
        "&:hover": {
          background: "#020617",
          // boxShadow: "0px 10px 25px rgba(15, 23, 42, 0.4)",
        },
        "&:active": {
          background: "#111827",
          // boxShadow: "0px 6px 18px rgba(15, 23, 42, 0.32)",
        },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
