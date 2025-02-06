const express = require('express');
const adminAuth = require('../../services/auth');
const router = express.Router();

// Admin login route (using Firebase authentication or JWT)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate email and password (this can be replaced with Firebase or JWT authentication)
    if (email === 'admin@example.com' && password === 'adminpassword') {
        const token = adminAuth.generateAuthToken();
        res.json({ message: 'Login successful', token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;
