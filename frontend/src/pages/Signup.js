import React from 'react';
import SignupForm from '../components/SignupForm';
import { Container, Typography } from '@mui/material';

const Signup = () => {
    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>Signup</Typography>
            <SignupForm />
        </Container>
    );
};

export default Signup;
