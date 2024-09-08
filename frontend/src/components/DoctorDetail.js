// src/components/DoctorDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { getDoctorById } from '../services/api'; // Adjust the path as necessary

const DoctorDetail = () => {
    const { id } = useParams(); // Get doctor ID from URL params
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const data = await getDoctorById(id); // Fetch doctor details by ID
                setDoctor(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchDoctor();
    }, [id]);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Error loading doctor details.</Typography>;
    if (!doctor) return <Typography>No doctor found.</Typography>;

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{doctor.name}</Typography>
                <Typography variant="body1">Specialization: {doctor.specialization}</Typography>
                <Typography variant="body2">Contact: {doctor.contact}</Typography>
                <Typography variant="body2">Email: {doctor.email}</Typography>
            </CardContent>
        </Card>
    );
};

export default DoctorDetail;