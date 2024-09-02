import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h2" gutterBottom>Welcome to Uplift</Typography>
            <Typography variant="h6" paragraph>
                Your go-to platform for connecting with mental health professionals and exploring valuable articles.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" color="primary" component={Link} to="/articles">Explore Articles</Button>
                <Button variant="outlined" color="primary" component={Link} to="/doctors">Find a Doctor</Button>
            </Box>
        </Container>
    );
};

export default Home;
