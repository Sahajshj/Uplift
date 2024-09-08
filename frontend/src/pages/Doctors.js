import React from 'react';
import DoctorList from '../components/DoctorList';
import { Container, Typography } from '@mui/material';

const Doctors = () => {
    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h3" gutterBottom>Doctors</Typography>
            <DoctorList />
        </Container>
    );
};

export default Doctors;
