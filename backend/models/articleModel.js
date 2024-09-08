const fs = require('fs');
const path = require('path');

// Define the path to the data directory (outside the current folder)
const DATA_DIR = path.join(__dirname, '../data');
const ARTICLES_FILE_PATH = path.join(DATA_DIR, 'articles.json');

// Ensure the data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Read articles from the JSON file
const readArticles = () => {
    if (!fs.existsSync(ARTICLES_FILE_PATH)) {
        // If the file doesn't exist, create it with an empty array as content
        fs.writeFileSync(ARTICLES_FILE_PATH, JSON.stringify([]));
    }

    const data = fs.readFileSync(ARTICLES_FILE_PATH, 'utf-8');
    return JSON.parse(data);
};

// Write articles to the JSON file
const writeArticles = (articles) => {
    fs.writeFileSync(ARTICLES_FILE_PATH, JSON.stringify(articles, null, 2));
};

// Export functions
module.exports = {
    readArticles,
    writeArticles,
};
