import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: '#f5f5f5' }}>
            <Typography variant="body2" color="text.secondary" align="center">
                &copy; 2024 Uplift. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
