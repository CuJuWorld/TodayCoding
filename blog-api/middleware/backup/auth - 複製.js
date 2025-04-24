const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your-secret-key';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: '請提供認證 token' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: '無效的 token' });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;