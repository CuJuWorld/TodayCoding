const express = require('express');
const router = express.Router();
const authRoutes = require('./auth'); // Import auth routes

// Use the register route from auth.js
router.use('/register', authRoutes);

// Update user update route to handle new fields
router.put('/update/:id', async (req, res) => {
    try {
        const updates = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;