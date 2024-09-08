const express = require('express');
const router = express.Router();
const ArticleController = require('../src/controllers/articleController'); // Ensure the path is correct
const authMiddleware = require('../utils/authMiddleware');

// Routes for articles
router.post('/articles', authMiddleware, ArticleController.createArticle);
router.get('/articles', ArticleController.getAllArticles);
router.get('/articles/:id', ArticleController.getArticleById);
router.put('/articles/:id', authMiddleware, ArticleController.updateArticle);
router.delete('/articles/:id', authMiddleware, ArticleController.deleteArticle);
router.post('/articles/:id/reviews', authMiddleware, ArticleController.reviewArticle);

module.exports = router;
