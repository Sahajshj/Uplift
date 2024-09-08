const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/doctorController');
const authMiddleware = require('../utils/authMiddleware');

// Routes for doctors
router.get('/doctors', DoctorController.getAllDoctors);
// Doctor application route
router.post('/doctors', authMiddleware, doctorController.applyForDoctor);
router.get('/doctors/:id', DoctorController.getDoctorById);
router.put('/doctors/:id', authMiddleware, DoctorController.updateDoctor);
router.delete('/doctors/:id', authMiddleware, DoctorController.deleteDoctor);

module.exports = router;
