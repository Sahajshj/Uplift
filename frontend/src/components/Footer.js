// src/components/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 2, textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        © 2024 Uplift. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
