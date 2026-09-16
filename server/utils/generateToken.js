const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id || user._id,
            name: user.name,
            email: user.email,
            role: user.role || 'user',
        },
        process.env.JWT_SECRET || 'devblog-secret-key',
        { expiresIn: '7d' }
    );
};

module.exports = generateToken;

