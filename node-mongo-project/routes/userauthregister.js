const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Import the User model
const router = express.Router();

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

// Add validation for phone numbers
const validatePhoneNumber = (phoneNumber) => {
    return phoneNumber.match(/^\+(852[569]\d{7}|861[3-9]\d{9})$/); // Updated regex to match Hong Kong and Mainland China phone numbers
};

// User registration route
router.post('/register', async (req, res) => {
    console.log("Request body:", req.body); // Log the entire request body// Updated field name
    console.log("UserPhoneNumber:", req.body.UserPhoneNumber); // Log the phone number specifically

    const { UserName, UserEmail, UserPassword, UserPhoneNumber, UserAddress } = req.body;

    console.log("Register request received:", req.body); // Log the entire request body
    console.log("Phone number received:", UserPhoneNumber); // Log the phone number

    // Validate required fields
    if (!UserName || !UserEmail || !UserPassword || !UserPhoneNumber || !UserAddress) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!validateEmail(UserEmail)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    if (!validatePhoneNumber(UserPhoneNumber)) {
        console.log("Invalid phone number format:", UserPhoneNumber); // Log invalid phone numbers
        return res.status(400).json({ message: "Invalid phone number format" });
    }

    try {
        // Check for duplicate email
        const existingUser = await User.findOne({ UserEmail });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(UserPassword, 10);

        // Determine user role based on email
        const UserRole = UserEmail.includes('admin@') ? 'admin' : 'user';

        // Create a new user
        const user = new User({
            UserName,
            UserEmail,
            UserPassword: hashedPassword,
            UserPhoneNumber, // Correctly map the phone number
            UserAddress,
            UserRole // Add UserRole to the user object
        });

        // Save the user to the database
        const newUser = await user.save();
        console.log("User registered successfully:", newUser);
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// User login route
router.post('/login', async (req, res) => {
    const { UserEmail, UserPassword } = req.body;

    console.log("Login request received:", req.body);

    // Validate required fields
    if (!UserEmail || !UserPassword) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ UserEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(UserPassword, user.UserPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        console.log("Login successful for user:", user);

        // Include UserRole in the response
        return res.status(200).json({ 
            message: "Login successful", 
            userRole: user.UserRole, 
            userEmail: user.UserEmail 
        });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// User update route
router.put('/update', async (req, res) => {
    const { UserEmail, UserPassword, UserPhoneNumber, UserAddress } = req.body;

    console.log("Update request received for email:", UserEmail);

    if (!UserEmail || !UserPassword) {
        return res.status(400).json({ message: "Email and password are required for update" });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ UserEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(UserPassword, user.UserPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Update user details
        if (UserPhoneNumber) user.UserPhoneNumber = UserPhoneNumber;
        if (UserAddress) user.UserAddress = UserAddress;

        const updatedUser = await user.save();
        console.log("User updated successfully:", updatedUser);
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
        console.error("Error during user update:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// User deletion route
router.delete('/delete', async (req, res) => {
    const { UserEmail } = req.body;

    console.log("Delete request received for email:", UserEmail);

    if (!UserEmail) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        // Find and delete the user by email
        const deletedUser = await User.findOneAndDelete({ UserEmail });
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User deleted successfully:", deletedUser);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error("Error during user deletion:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
