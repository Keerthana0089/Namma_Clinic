const express = require('express');
const Patient = require('../models/patient');

const router = express.Router();

// Route to get all patients
router.get('/patients', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to get patient details by ID
router.get('/patient/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to "simulate" AI prediction for a patient's X-ray
router.post('/make_prediction/:patientId', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.patientId);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Placeholder for prediction, no AI logic here yet
        const prediction = {
            result: "No Prediction",  // Placeholder result
            confidence: 0.0,          // Placeholder confidence
        };

        patient.ai_prediction = prediction.result;
        patient.ai_confidence = prediction.confidence;
        await patient.save();

        res.json({
            message: 'Prediction made successfully (placeholder)',
            prediction: prediction.result,
            confidence: prediction.confidence,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
