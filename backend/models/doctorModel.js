const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/doctors.json');

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
    writeDoctors
};
