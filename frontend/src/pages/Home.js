import React, { useEffect, useRef } from 'react';
import { Container, Typography, Box, Button, Grid, Paper, Card, CardContent, CardMedia, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import anime from 'animejs';
import { blue, grey } from '@mui/material/colors';

const Home = () => {
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const callToActionRef = useRef(null);

    useEffect(() => {
        // Animate hero section
        anime({
            targets: heroRef.current,
            opacity: [0, 1],
            translateY: [-50, 0],
            easing: 'easeOutExpo',
            duration: 1000,
        });

        // Animate features section
        anime({
            targets: featuresRef.current.children,
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(200),
            easing: 'easeOutExpo',
            duration: 1000,
        });

        // Animate call to action
        anime({
            targets: callToActionRef.current,
            opacity: [0, 1],
            translateY: [50, 0],
            easing: 'easeOutExpo',
            duration: 1000,
            delay: 800,
        });
    }, []);

    return (
        <Container sx={{ py: 4 }}>
            {/* Hero Section */}
            <Box ref={heroRef} sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: blue[800] }}>
                    Welcome to Uplift
                </Typography>
                <Typography variant="h6" paragraph sx={{ color: grey[600] }}>
                    Your go-to platform for connecting with mental health professionals and exploring valuable articles.
                </Typography>
                <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 600, width: '100%', mx: 'auto', borderRadius: 3, boxShadow: 3 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Discover a path to better mental health
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ mb: 3 }}>
                        Our platform provides easy access to licensed psychologists with resources. Start your journey with us today.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button variant="contained" color="primary" component={Link} to="/articles" sx={{ borderRadius: 20 }}>
                            Explore Articles
                        </Button>
                        <Button variant="outlined" color="primary" component={Link} to="/doctors" sx={{ borderRadius: 20 }}>
                            Find a Doctor
                        </Button>
                    </Box>
                </Paper>
            </Box>

            {/* Features Section */}
            <Typography variant="h4" gutterBottom align="center" ref={featuresRef} sx={{ fontWeight: 'bold', mb: 4 }}>
                Our Features
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/images/articles.png" // Replace with your image path
                            alt="Explore Articles"
                            sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
                        />
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Explore Articles</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Read articles written by experts to better understand and manage your mental health.
                            </Typography>
                            <Button variant="contained" color="primary" component={Link} to="/articles" sx={{ mt: 2, borderRadius: 20 }}>
                                Read Articles
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/images/doctors.jpg" // Replace with your image path
                            alt="Find a Doctor"
                            sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
                        />
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Find a Doctor</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Connect with licensed mental health professionals who can offer personalized support.
                            </Typography>
                            <Button variant="contained" color="primary" component={Link} to="/doctors" sx={{ mt: 2, borderRadius: 20 }}>
                                Find a Doctor
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/images/community.png" // Replace with your image path
                            alt="Join the Community"
                            sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
                        />
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Join the Community</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Engage in discussions with peers and experts to share experiences and advice.
                            </Typography>
                            <Button variant="contained" color="primary" component={Link} to="/community" sx={{ mt: 2, borderRadius: 20 }}>
                                Join Community
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Call to Action */}
            <Box ref={callToActionRef} sx={{ textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Ready to make a change?
                </Typography>
                <Button variant="contained" color="secondary" component={Link} to="/signup" sx={{ borderRadius: 20 }}>
                    Sign Up Now
                </Button>
            </Box>
        </Container>
    );
};

export default Home;
