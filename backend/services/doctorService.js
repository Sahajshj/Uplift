const { readDoctors, writeDoctors } = require('../models/doctorModel');

// Get all doctors with optional filters
const getAllDoctors = (filters = {}) => {
    const doctors = readDoctors();
    // Implement filtering based on filters object (if needed)
    return doctors;
};

const applyForDoctor = (name, specialty, qualifications, contact) => {
    const doctors = readDoctors();
    const newDoctor = { id: doctors.length + 1, name, specialty, qualifications, contact };
    doctors.push(newDoctor);
    writeDoctors(doctors);
    return newDoctor;
};

// Get a specific doctor by ID
const getDoctorById = (id) => {
    const doctors = readDoctors();
    return doctors.find(doctor => doctor.id === id);
};

// Update a doctor's information
const updateDoctor = (id, updateData) => {
    const doctors = readDoctors();
    const index = doctors.findIndex(doctor => doctor.id === id);
    if (index !== -1) {
        doctors[index] = { ...doctors[index], ...updateData };
        writeDoctors(doctors);
        return doctors[index];
    }
    return null;
};

// Delete a doctor
const deleteDoctor = (id) => {
    const doctors = readDoctors();
    const index = doctors.findIndex(doctor => doctor.id === id);
    if (index !== -1) {
        doctors.splice(index, 1);
        writeDoctors(doctors);
        return true;
    }
    return false;
};

module.exports = {
    getAllDoctors,
    applyForDoctor,
    getDoctorById,
    updateDoctor,
    deleteDoctor
};
