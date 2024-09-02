const fs = require('fs');
const path = require('path');

// Define the path to the data directory
const DATA_PATH = path.join(__dirname, 'data');

// Ensure the data directory exists
if (!fs.existsSync(DATA_PATH)) {
    fs.mkdirSync(DATA_PATH);
}

// Function to read data from a file
const readFile = (filename) => {
    const filePath = path.join(DATA_PATH, filename);
    if (!fs.existsSync(filePath)) {
        // If the file doesn't exist, create it with an empty array as content
        fs.writeFileSync(filePath, JSON.stringify([]));
    }

    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (error) {
        console.error(`Error reading or parsing ${filename}:`, error);
        return []; // Return an empty array if JSON parsing fails
    }
};

// Function to write data to a file
const writeFile = (filename, data) => {
    const filePath = path.join(DATA_PATH, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Specific functions for handling users, articles, and doctors
const readUsers = () => readFile('users.json');
const writeUsers = (users) => writeFile('users.json', users);

const readArticles = () => readFile('articles.json');
const writeArticles = (articles) => writeFile('articles.json', articles);

const readDoctors = () => readFile('doctors.json');
const writeDoctors = (doctors) => writeFile('doctors.json', doctors);

module.exports = {
    readUsers,
    writeUsers,
    readArticles,
    writeArticles,
    readDoctors,
    writeDoctors
};
