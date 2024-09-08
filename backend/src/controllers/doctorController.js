const doctorService = require('../../services/doctorService');

// Handle doctor application
exports.applyForDoctor = (req, res) => {
    const { name, specialty, qualifications, contact } = req.body;

    if (!name || !specialty || !qualifications || !contact) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const newDoctor = doctorService.applyForDoctor(name, specialty, qualifications, contact);
    res.status(201).json(newDoctor);
};

exports.getDoctors = (req, res) => {
    const doctors = doctorService.getDoctors();
    res.json(doctors);
};

exports.getDoctorById = (req, res) => {
    const doctor = doctorService.getDoctorById(req.params.id);
    if (!doctor) {
        return res.status(404).json({ message: "Doctor not found." });
    }
    res.json(doctor);
};

exports.updateDoctor = (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied." });
    }
    const doctor = doctorService.updateDoctor(req.params.id, req.body);
    if (!doctor) {
        return res.status(404).json({ message: "Doctor not found." });
    }
    res.json(doctor);
};

exports.deleteDoctor = (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied." });
    }
    const result = doctorService.deleteDoctor(req.params.id);
    if (result === 'not found') {
        return res.status(404).json({ message: "Doctor not found." });
    }
    res.json({ message: "Doctor deleted successfully." });
};
