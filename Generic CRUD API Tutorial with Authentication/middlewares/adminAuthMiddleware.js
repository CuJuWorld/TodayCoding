import authMiddleware from './authMiddleware.js';

const adminAuthMiddleware = async (req, res, next) => {
    await authMiddleware(req, res, () => {
        if (req.user && req.user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ message: 'Not authorized, admin role required' });
        }
    });
};

export default adminAuthMiddleware;