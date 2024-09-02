const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/articles.json');

// Read articles from the JSON file
const readArticles = () => {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
};

// Write articles to the JSON file
const writeArticles = (articles) => {
    fs.writeFileSync(dataPath, JSON.stringify(articles, null, 2));
};

// Export functions
module.exports = {
    readArticles,
    writeArticles
};
