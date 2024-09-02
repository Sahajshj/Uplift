import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getDoctorById } from '../services/api';

const DoctorDetail = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        const fetchDoctor = async () => {
            const data = await getDoctorById(id);
            setDoctor(data);
        };
        fetchDoctor();
    }, [id]);

    if (!doctor) return <Typography>Loading...</Typography>;

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>{doctor.name}</Typography>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h6">Specialization: {doctor.specialization}</Typography>
                <Typography variant="body1">{doctor.description}</Typography>
            </Paper>
        </Container>
    );
};

export default DoctorDetail;
