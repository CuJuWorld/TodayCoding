const User = require('../models/user');

// ...existing code...

// Update user registration logic
exports.registerUser = async (req, res) => {
    try {
        const { UserName, UserEmail, UserPassword, UserAddress, UserRole, UserPhoneNumber } = req.body;
        const newUser = new User({
            UserName,
            UserEmail,
            UserPassword,
            UserAddress,
            UserRole,
            UserPhoneNumber,
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update user update logic
exports.updateUser = async (req, res) => {
    try {
        const updates = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ...existing code...