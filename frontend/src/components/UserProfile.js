import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { getUserProfile, updateUserProfile } from '../services/api';

const UserProfile = () => {
    const [profile, setProfile] = useState({ name: '', email: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await getUserProfile();
            setProfile(data);
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateUserProfile(profile);
        setIsEditing(false);
    };

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>User Profile</Typography>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">Save</Button>
                    <Button onClick={() => setIsEditing(false)} variant="outlined">Cancel</Button>
                </form>
            ) : (
                <>
                    <Typography variant="h6">Name: {profile.name}</Typography>
                    <Typography variant="h6">Email: {profile.email}</Typography>
                    <Button onClick={() => setIsEditing(true)} variant="contained">Edit Profile</Button>
                </>
            )}
        </Container>
    );
};

export default UserProfile;
