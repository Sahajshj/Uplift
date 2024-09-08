import React from 'react';
import LoginForm from '../components/LoginForm';
import { Container, Typography } from '@mui/material';

const Login = () => {
    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>Login</Typography>
            <LoginForm />
        </Container>
    );
};

export default Login;
