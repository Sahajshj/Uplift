// src/components/ArticleList.js

import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { getArticles } from '../services/api'; // Ensure this path is correct

const ArticleList = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const data = await getArticles();
                setArticles(data);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    return (
        <List>
            {articles.map(article => (
                <ListItem key={article.id}>
                    <ListItemText primary={article.title} secondary={article.author} />
                </ListItem>
            ))}
        </List>
    );
};

export default ArticleList;