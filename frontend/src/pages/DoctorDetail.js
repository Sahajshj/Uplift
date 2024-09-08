// src/pages/DoctorDetail.js

import React from 'react';
import DoctorDetail from '../components/DoctorDetail'; // Ensure this path is correct
import { Container } from '@mui/material';

const DoctorDetailPage = () => {
    return (
        <Container sx={{ py: 4 }}>
            <DoctorDetail />
        </Container>
    );
};

export default DoctorDetailPage;
