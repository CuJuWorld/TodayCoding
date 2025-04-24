const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensure product name is unique
    },
    productPrice: {
        type: Number,
        required: true,
        min: 0, // Ensure positive integers
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

module.exports = mongoose.model('Product', productSchema);