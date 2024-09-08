import React from 'react';
import UserProfile from '../components/UserProfile';
import { Container, Typography } from '@mui/material';

const Profile = () => {
    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>User Profile</Typography>
            <UserProfile />
        </Container>
    );
};

export default Profile;
