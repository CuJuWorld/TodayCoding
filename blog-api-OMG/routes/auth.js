const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Import the User model

const router = express.Router();
const SECRET_KEY = 'your-secret-key'; // Secret key for signing JWT tokens

// Route to handle user registration
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the username is already taken
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: '用戶名已被註冊' });
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: '電子郵件已被註冊' });
        }

        // Enforce a minimum password length of 6 characters
        if (password.length < 6) {
            return res.status(400).json({ message: '密碼長度不能少於 6 個字符' });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: '註冊成功' });
    } catch (error) {
        res.status(500).json({ message: '服務器錯誤', error: error.message });
    }
});

// Route to handle user login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: '無效的電子郵件或密碼' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: '無效的電子郵件或密碼' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: '服務器錯誤', error: error.message });
    }
});

// Export the router for use in the main application
module.exports = router;