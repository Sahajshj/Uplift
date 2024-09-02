import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { getArticles } from '../services/api';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            const data = await getArticles();
            setArticles(data);
        };
        fetchArticles();
    }, []);

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>Articles</Typography>
            <Grid container spacing={4}>
                {articles.map(article => (
                    <Grid item key={article.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{article.title}</Typography>
                                <Typography variant="body2" color="text.secondary">{article.author}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" component={Link} to={`/articles/${article.id}`}>Read More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ArticleList;