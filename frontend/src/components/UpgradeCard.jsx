import React from 'react';
import { Box, Typography } from '@mui/material';
import proIcon from '../assets/images/pro-icon.svg';
import cardBgImage from '../assets/images/image.png';
import TertiaryBtn from './TertiaryBtn';

const UpgradeCard = () => {
  return (
    <Box
      sx={{
        mt: 2,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          bgcolor: '#E7E7E7',
          borderRadius: '20px',
          p: 4,
          textAlign: 'center',
          color: '#111827',
          backgroundImage: `url(${cardBgImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // boxShadow: '0px 8px 10px rgba(15, 23, 42, 0.22)',
        }}
      >
         <Box
            component="img"
            src={proIcon}
            alt="Pro icon"
            sx={{ height: 64, width: 64 }}
          />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: 24,
            mb: 0.5,
          }}
        >
          Go Pro
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: 18,
            color: '#111827',
            opacity: 0.9,
            mb: 2,
          }}
        >
          More power. More possibilities.
        </Typography>
        <TertiaryBtn
          fullWidth
          sx={{
            py: '8px',
            px: '8px',
            borderRadius: '12px',
            mt: 0.5,
          }}
        >
          Upgrade Plan
        </TertiaryBtn>
      </Box>
    </Box>
  );
};

export default UpgradeCard;
