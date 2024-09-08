import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { getUserProfile } from '../services/api'; // Ensure the path is correct

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile(); // Fetch user profile data
                setProfile(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Error loading profile.</Typography>;
    if (!profile) return <Typography>No profile found.</Typography>;

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Name: {profile.name}</Typography>
                <Typography variant="body1">Email: {profile.email}</Typography>
                <Typography variant="body2">Role: {profile.role}</Typography>
            </CardContent>
        </Card>
    );
};

export default UserProfile;
