import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Assuming User model exists

const authMiddleware = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            const user = await User.findById(decoded.userId);
            if (user) {
                req.user = { id: user._id, role: user.role };
                next();
            } else {

                return res.status(401).json({ message: 'Not authorized, user not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export default authMiddleware;