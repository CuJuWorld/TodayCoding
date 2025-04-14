// userService.js
import userRepository from '../repositories/userRepository.js'; // Assuming userRepository is also using ES Modules

export const createUser = async (username, password) => {
    return await userRepository.createUser(username, password);
};

export const findUserByUsername = async (username) => {
    return await userRepository.findUserByUsername(username);
};

export const findUserById = async (id) => {
    return await userRepository.findUserById(id);
};

export const updateUser = async (id, updateData) => {
    return await userRepository.updateUser(id, updateData);
};

export const deleteUser = async (id) => {
    return await userRepository.deleteUser(id);
};

export const getAllUsers = async () => {
    return await userRepository.getAllUsers();
};