import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { signup } from '../services/api';
import { useHistory } from 'react-router-dom';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup({ username, password, role });
        history.push('/login');
    };

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>Signup</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">Signup</Button>
            </form>
        </Container>
    );
};

export default SignupForm;