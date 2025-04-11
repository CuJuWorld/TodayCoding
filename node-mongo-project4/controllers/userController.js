const userService = require('../services/userService');
const mongoose = require('mongoose');

// Utility function to handle errors
const handleApiError = (res, error, statusCode = 500, message = 'Internal server error') => {
    console.error(message + ':', error);
    res.status(statusCode).json({ message: error.message || message });
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        handleApiError(res, err);
    }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid User ID format' });
    }
    try {
        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        handleApiError(res, err, 500, 'Error fetching user');
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ message: 'User name is required' });
    }
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        handleApiError(res, err, 500, 'Error creating user');
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid User ID format' });
    }
    try {
        const updatedUser = await userService.updateUser(id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        handleApiError(res, err, 400, 'Error updating user'); // Could be 400 if validation fails in service
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Invalid User ID format' });
    }
    try {
        const deletedUser = await userService.deleteUser(id);
        if (!deletedUser) {
            return res.status(404).json({ message: `User ${id} not found or already deleted.` });
        }
        res.json({ message: `User ${id} deleted successfully` });
    } catch (err) {
        handleApiError(res, err, 500, 'Error deleting user');
    }
};