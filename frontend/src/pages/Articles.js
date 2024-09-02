import React from 'react';
import ArticleList from '../components/ArticleList';
import { Container, Typography } from '@mui/material';

const Articles = () => {
    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h3" gutterBottom>Articles</Typography>
            <ArticleList />
        </Container>
    );
};

export default Articles;
