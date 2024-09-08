const fs = require('fs');
const path = require('path');

// Path to store the data of doctors
const dataPath = path.join(__dirname, '..', 'data', 'doctors.json');

// Ensure the data file exists; if not, create it with an empty array
if (!fs.existsSync(dataPath)) {
    fs.mkdirSync(path.dirname(dataPath), { recursive: true });
    fs.writeFileSync(dataPath, JSON.stringify([]));
}

// Read doctors from the JSON file
const readDoctors = () => {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
};

// Write doctors to the JSON file
const writeDoctors = (doctors) => {
    fs.writeFileSync(dataPath, JSON.stringify(doctors, null, 2));
};

// Export functions
module.exports = {
    readDoctors,
    writeDoctors,
};
