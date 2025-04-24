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

// Get a single user by email
async function findUserByEmail(email) {
    try {
        return await User.findOne({ UserEmail: email });
    } catch (error) {
        console.error("Error in User Repository (findUserByEmail):", error);
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

// Update a user by email
async function updateUserByEmail(email, updateData) {
    try {
        const user = await User.findOneAndUpdate({ UserEmail: email }, updateData, { new: true, runValidators: true });
        return user; // Return the updated document
    } catch (error) {
        console.error("Error in User Repository (updateUserByEmail):", error);
        throw error;
    }
}

// Delete a user by email
async function deleteUserByEmail(email) {
    try {
        const user = await User.findOneAndDelete({ UserEmail: email });
        return user; // Return the deleted document (can be null if not found)
    } catch (error) {
        console.error("Error in User Repository (deleteUserByEmail):", error);
        throw error;
    }
}

module.exports = {
    findAllUsers,
    findUserById,
    findUserByEmail,
    createUser,
    updateUserByEmail, // Updated to use email
    deleteUserByEmail, // Updated to use email
};