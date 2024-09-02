import React from 'react';
import DoctorDetailComponent from '../components/DoctorDetail';
import { Container } from '@mui/material';

const DoctorDetail = () => {
    return (
        <Container sx={{ py: 4 }}>
            <DoctorDetailComponent />
        </Container>
    );
};

export default DoctorDetail;
