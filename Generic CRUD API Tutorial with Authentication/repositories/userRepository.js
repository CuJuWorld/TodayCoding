import User from '../models/User.js'; 
const userRepository = {
    createUser: async (username, password) => {
        const user = new User({ username, password });
        return await user.save();
    },

    findUserByUsername: async (username) => {
        return await User.findOne({ username });
    },

    findUserById: async (id) => {
        return await User.findById(id);
    },

    updateUser: async (id, updateData) => {
        return await User.findByIdAndUpdate(id, updateData, { new: true });
    },

    deleteUser: async (id) => {
        return await User.findByIdAndDelete(id);
    },

    getAllUsers: async () => {
        return await User.find();
    }
};

export default userRepository;