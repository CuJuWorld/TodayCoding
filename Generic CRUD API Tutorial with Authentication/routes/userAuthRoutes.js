import { register, login } from '../controllers/userAuthController.js'; // Renamed controller
// Keep authMiddleware if needed for future auth-related routes (e.g., get profile)
// import authMiddleware from '../middlewares/authMiddleware.js';
import express from 'express';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Example: Add a route to get the currently logged-in user's profile
// import { getMyProfile } from '../controllers/userAuthController.js'; // Need to create this function
// router.get('/me', authMiddleware, getMyProfile);

export default router;