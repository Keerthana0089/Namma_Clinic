const jwt = require('jsonwebtoken');

const generateAuthToken = () => {
    const payload = {
        role: 'admin',  // You can use more details if needed
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { generateAuthToken };
