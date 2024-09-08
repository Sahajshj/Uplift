const fs = require('fs');
const path = require('path');

// Define the path to the data directory (outside the models folder)
const DATA_DIR = path.join(__dirname, '../data');
const USERS_FILE_PATH = path.join(DATA_DIR, 'users.json');

// Ensure the data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Function to read data from a file
const readFile = (filePath) => {
    if (!fs.existsSync(filePath)) {
        // If the file doesn't exist, create it with an empty array as content
        fs.writeFileSync(filePath, JSON.stringify([]));
    }

    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (error) {
        console.error(`Error reading or parsing ${filePath}:`, error);
        return []; // Return an empty array if JSON parsing fails
    }
};

// Function to write data to a file
const writeFile = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Specific functions for handling users
const readUsers = () => readFile(USERS_FILE_PATH);
const writeUsers = (users) => writeFile(USERS_FILE_PATH, users);

module.exports = {
    readUsers,
    writeUsers,
};
