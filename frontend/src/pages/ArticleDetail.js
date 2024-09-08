import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../services/api';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = React.useState(null);

    React.useEffect(() => {
        const fetchArticle = async () => {
            const data = await getArticleById(id);
            setArticle(data);
        };
        fetchArticle();
    }, [id]);

    if (!article) return <Typography>Loading...</Typography>;

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>{article.title}</Typography>
            <Paper sx={{ p: 4 }}>
                <Typography variant="body1">{article.content}</Typography>
            </Paper>
        </Container>
    );
};

export default ArticleDetail;
