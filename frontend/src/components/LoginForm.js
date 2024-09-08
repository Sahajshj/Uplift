import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { login } from '../services/api'; // Adjust path if necessary

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = await login({ email, password });
            // Handle successful login, e.g., save token and redirect
            console.log('Login successful, token:', token);
        } catch (error) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <Container component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
            <Typography variant="h6" gutterBottom>Login</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
            </Button>
        </Container>
    );
};

export default LoginForm;
