import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { postArticle } from '../services/api';

const ArticleForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await postArticle({ title, content, author });
        // Redirect or update UI
    };

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>Submit New Article</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    margin="normal"
                    multiline
                    rows={4}
                />
                <TextField
                    fullWidth
                    label="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
        </Container>
    );
};

export default ArticleForm;