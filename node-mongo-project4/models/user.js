const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    UserEmail: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Optimized email validation
    },
    UserPassword: {
        type: String,
        minlength: 6, // Minimum password length
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true, // Prevent modification after creation
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true }); // Enable automatic updatedAt updates

module.exports = mongoose.model('User', userSchema);