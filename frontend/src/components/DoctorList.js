import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, CircularProgress, ListItemButton } from '@mui/material';
import { getDoctors } from '../services/api'; // Adjust the path as necessary

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const data = await getDoctors(); // Fetch doctors from the API
                setDoctors(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Error loading doctors.</Typography>;

    return (
        <List>
            {doctors.map((doctor) => (
                <ListItem key={doctor.id} disablePadding>
                    <ListItemButton component={Link} to={`/doctors/${doctor.id}`}>
                        <ListItemText
                            primary={doctor.name}
                            secondary={`Specialization: ${doctor.specialization}`}
                        />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};

export default DoctorList;
