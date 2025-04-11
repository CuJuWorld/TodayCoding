const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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