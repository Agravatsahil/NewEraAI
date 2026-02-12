import React from 'react';
import { Box, Typography } from '@mui/material';

// Feature card used on the NewEra AI main content hero section
// Accepts optional bgImage/icon so you can swap in your own assets later.
const FeatureCard = ({
  title,
  description,
  bgImage,
  gradient,
  icon,
  color,
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        minHeight: 170,
        p: 2.5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        color: '#FFFFFF',
        backgroundImage: bgImage
          ? `url(${bgImage})`
          : gradient || 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // boxShadow: bgImage
        //   ? '0px 18px 40px rgba(15, 23, 42, 0.12)'
        //   : '0px 18px 40px rgba(15, 23, 42, 0.22)',
        border: '1px solid #E7E7E7',
      }}
    >
      {icon && (
        <Box
            component="img"
            src={icon}
            alt={title}
            sx={{ width: 40, height: 40,  }}
          />
      )}

      <Typography
        sx={{
          fontWeight: 500,
          fontSize: 24,
          mb: 0.5,
          color:{color}
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: 16,
          lineHeight: 1.5,
          opacity: 0.9,
          color: '#000000',
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default FeatureCard;
