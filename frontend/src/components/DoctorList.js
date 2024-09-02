import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { getDoctors } from '../services/api';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            const data = await getDoctors();
            setDoctors(data);
        };
        fetchDoctors();
    }, []);

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>Doctors</Typography>
            <Grid container spacing={4}>
                {doctors.map(doctor => (
                    <Grid item key={doctor.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{doctor.name}</Typography>
                                <Typography variant="body2" color="text.secondary">{doctor.specialization}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={Link} to={`/doctors/${doctor.id}`}>View Details</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default DoctorList;