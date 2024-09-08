const { readArticles, writeArticles } = require('../models/articleModel');

// Create a new article
const createArticle = (articleData) => {
    const articles = readArticles();
    const newArticle = { id: articles.length + 1, ...articleData, reviews: [] };
    articles.push(newArticle);
    writeArticles(articles);
    return newArticle;
};
// Get all articles with optional pagination
const getAllArticles = (page = 1, limit = 10) => {
    const articles = readArticles();
    return articles.slice((page - 1) * limit, page * limit);
};

// Get a specific article by ID
const getArticleById = (id) => {
    const articles = readArticles();
    return articles.find(article => article.id === id);
};

// Update an existing article
const updateArticle = (id, updateData) => {
    const articles = readArticles();
    const index = articles.findIndex(article => article.id === id);
    if (index !== -1) {
        articles[index] = { ...articles[index], ...updateData };
        writeArticles(articles);
        return articles[index];
    }
    return null;
};

// Delete an article
const deleteArticle = (id) => {
    const articles = readArticles();
    const index = articles.findIndex(article => article.id === id);
    if (index !== -1) {
        articles.splice(index, 1);
        writeArticles(articles);
        return true;
    }
    return false;
};

// Add a review to an article
const reviewArticle = (id, review) => {
    const articles = readArticles();
    const article = articles.find(article => article.id === id);
    if (article) {
        article.reviews = article.reviews || [];
        article.reviews.push(review); // Add the review to the article
        writeArticles(articles);
        return article; // Return the updated article
    }
    return null; // Indicate failure
};

module.exports = {
    createArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
    reviewArticle // pending average feature
};
