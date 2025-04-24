// /services/userService.js

const userRepository = require('../repositories/userRepository');

// Get all users
async function getAllUsers() {
    try {
        return await userRepository.findAllUsers();
    } catch (error) {
        console.error("Error in User Service (getAllUsers):", error);
        throw error;
    }
}

// Get a single user by ID
async function getUserById(id) {
    try {
        return await userRepository.findUserById(id);
    } catch (error) {
        console.error("Error in User Service (getUserById):", error);
        throw error;
    }
}

// Create a new user
async function createUser(userData) {
    try {
        return await userRepository.createUser(userData);
    } catch (error) {
        console.error("Error in User Service (createUser):", error);
        throw error;
    }
}

// Update a user by ID
async function updateUser(id, updateData) {
    try {
        return await userRepository.updateUserById(id, updateData);
    } catch (error) {
        console.error("Error in User Service (updateUser):", error);
        throw error;
    }
}

// Delete a user by ID
async function deleteUser(id) {
    try {
        return await userRepository.deleteUserById(id);
    } catch (error) {
        console.error("Error in User Service (deleteUser):", error);
        throw error;
    }
}

async function registerUser(name, email, password) {
    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
        throw new Error('Email is already in use');
    }

    const userData = {
        name,
        UserEmail: email,
        UserPassword: password,
    };

    return await userRepository.createUser(userData);
}

async function loginUser(email, password) {
    const user = await userRepository.findUserByEmail(email);
    if (!user || user.UserPassword !== password) {
        throw new Error('Invalid email or password');
    }

    return user;
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    registerUser,
    loginUser,
};