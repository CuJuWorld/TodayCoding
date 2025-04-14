import dotenv from 'dotenv';
dotenv.config();

import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Import the updated User model

// Load JWT Secret from environment variables - Critical check!
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not defined in .env file.");
    // Optionally exit or prevent server start if JWT is essential
    // process.exit(1);
}

// --- Registration Controller ---
export const register = async (req, res) => {
    const { username, email, password, firstName, lastName, role } = req.body;

    // Basic validation - Mongoose schema validation will handle more specifics
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    try {
        // The User model's 'pre save' hook will automatically hash the password
        const newUser = await User.create({
            username,
            email,
            password, // Pass the plain password, hashing happens before save
            firstName,
            lastName,
            // Only allow specific roles if provided and valid, otherwise default applies
            role: role && ['user', 'admin', 'editor'].includes(role) ? role : undefined
        });

        // Exclude sensitive data from response - use toObject to apply virtuals if needed
        const userResponse = newUser.toObject({ virtuals: true });
        delete userResponse.password; // Ensure password is not in the response object
        delete userResponse.__v; // Often excluded

        // Respond with success message and user info (excluding password)
        return res.status(201).json({
            message: 'User registered successfully',
            user: userResponse // Send back the created user data (without password)
        });

    } catch (error) {
        console.error('Registration Error:', error);
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message, details: error.errors });
        }
        // Handle duplicate key errors (username or email)
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0]; // Find out which field was duplicate
            return res.status(409).json({ error: `An account with that ${field} already exists.` }); // 409 Conflict
        }
        // Generic server error
        return res.status(500).json({ error: 'Server error during registration' });
    }
};

// --- Login Controller ---
export const login = async (req, res) => {
    const { identifier, password } = req.body; // Allow login with username OR email

    // Basic validation
    if (!identifier || !password) {
        return res.status(400).json({ error: 'Username/email and password are required' });
    }

    try {
        // Find user by username or email
        // IMPORTANT: Explicitly select the password field as it's excluded by default in the schema
        const user = await User.findOne({
            $or: [{ username: identifier.toLowerCase() }, { email: identifier.toLowerCase() }]
        }).select('+password'); // <-- Crucial to select password for comparison

        // Check if user exists
        if (!user) {
            console.log(`Login attempt failed: User not found for identifier "${identifier}"`);
            return res.status(401).json({ message: 'Invalid credentials' }); // Use 401 Unauthorized
        }

        // User found, now compare password using the method defined in the User model
        const isMatch = await user.comparePassword(password);

        // Check if password matches
        if (!isMatch) {
            console.log(`Login attempt failed: Incorrect password for user "${user.username}"`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // --- Credentials are valid ---

        // Update lastLogin timestamp (optional, run concurrently without awaiting if performance is critical)
        try {
            user.lastLogin = new Date();
            // Save without running full validations again, only update timestamp
            await user.save({ validateBeforeSave: false });
        } catch (updateError) {
            console.error(`Error updating lastLogin for user ${user.username}:`, updateError);
            // Log error but don't block login response
        }


        // Generate JWT token
        const payload = {
            userId: user._id,
            role: user.role // Include role for potential frontend/backend authorization checks
            // Add other non-sensitive data if needed
        };

        if (!JWT_SECRET) {
            console.error("Login Error: JWT_SECRET is missing, cannot generate token.");
            return res.status(500).json({ error: "Server configuration error, unable to login." });
        }

        const token = jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '30d' } // Use env var for expiry or default
        );

        // Exclude sensitive data from user object sent in response
        const userResponse = user.toObject({ virtuals: true });
        delete userResponse.password;
        delete userResponse.__v;

        // Send token and user info (without password) to the client
        return res.json({
            message: 'Login successful',
            token,
            user: userResponse // Send back user data for frontend state
        });

    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({ error: 'Server error during login' });
    }
};

// If you add other specific auth routes like /me, add their controllers here too.
// Example:
// export const getMyProfile = async (req, res) => { ... };