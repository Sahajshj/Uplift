const articleService = require('../../services/articleService');

// Handle article creation
exports.createArticle = (req, res) => {
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const newArticle = articleService.addArticle(title, content, author);
    res.status(201).json(newArticle);
};

exports.getArticles = (req, res) => {
    const articles = articleService.getArticles();
    res.json(articles);
};

exports.getArticleById = (req, res) => {
    const article = articleService.getArticleById(req.params.id);
    if (!article) {
        return res.status(404).json({ message: "Article not found." });
    }
    res.json(article);
};

exports.updateArticle = (req, res) => {
    const article = articleService.updateArticle(req.params.id, req.body);
    if (!article) {
        return res.status(404).json({ message: "Article not found." });
    }
    res.json(article);
};

exports.deleteArticle = (req, res) => {
    const result = articleService.deleteArticle(req.params.id, req.user.role);
    if (result === 'not found') {
        return res.status(404).json({ message: "Article not found." });
    } else if (result === 'unauthorized') {
        return res.status(403).json({ message: "Unauthorized." });
    }
    res.json({ message: "Article deleted successfully." });
};

exports.addReview = (req, res) => {
    const result = articleService.addReview(req.params.id, req.body.review);
    if (!result) {
        return res.status(404).json({ message: "Article not found." });
    }
    res.json(result);
};
