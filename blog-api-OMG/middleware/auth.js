const jwt = require('jsonwebtoken');

// Secret key used to sign and verify JWT tokens
const SECRET_KEY = 'your-secret-key';

// Middleware to authenticate requests using JWT tokens
const authenticateToken = (req, res, next) => {
    // Extract the Authorization header from the request
    const authHeader = req.headers['authorization'];
    // Extract the token from the "Bearer <token>" format
    const token = authHeader && authHeader.split(' ')[1];
    
    // If no token is provided, return a 401 Unauthorized response
    if (!token) {
        return res.status(401).json({ message: '請提供認證 token' });
    }

    // Verify the token using the secret key
    jwt.verify(token, SECRET_KEY, (err, user) => {
        // If the token is invalid or expired, return a 403 Forbidden response
        if (err) {
            return res.status(403).json({ message: '無效的 token' });
        }
        // Attach the decoded user information to the request object
        req.user = user;
        // Proceed to the next middleware or route handler
        next();
    });
};

// Export the middleware for use in other parts of the application
module.exports = authenticateToken;