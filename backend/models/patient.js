const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    xray_file: {
        type: String,
        required: true,
    },
    ai_prediction: {
        type: String,
        required: true,
    },
    ai_confidence: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Patient', patientSchema);
