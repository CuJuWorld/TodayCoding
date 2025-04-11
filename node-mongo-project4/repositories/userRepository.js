// /repositories/userRepository.js

const User = require('../models/user');

// Get all users
async function findAllUsers() {
    try {
        return await User.find();
    } catch (error) {
        console.error("Error in User Repository (findAllUsers):", error);
        throw error;
    }
}

// Get a single user by ID
async function findUserById(id) {
    try {
        return await User.findById(id);
    } catch (error) {
        console.error("Error in User Repository (findUserById):", error);
        throw error;
    }
}

// Create a new user
async function createUser(userData) {
    try {
        const user = new User(userData);
        return await user.save();
    } catch (error) {
        console.error("Error in User Repository (createUser):", error);
        throw error;
    }
}

// Update a user by ID
async function updateUserById(id, updateData) {
    try {
        const user = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        return user; // Return the updated document
    } catch (error) {
        console.error("Error in User Repository (updateUserById):", error);
        throw error;
    }
}

// Delete a user by ID
async function deleteUserById(id) {
    try {
        const user = await User.findByIdAndDelete(id);
        return user; // Return the deleted document (can be null if not found)
    } catch (error) {
        console.error("Error in User Repository (deleteUserById):", error);
        throw error;
    }
}

module.exports = {
    findAllUsers,
    findUserById,
    createUser,
    updateUserById,
    deleteUserById,
};