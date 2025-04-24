const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    images: {
        type: [String], // Array of image paths
        validate: [arrayLimit, '{PATH} exceeds the limit of 3 images']
    }
});

function arrayLimit(val) {
    return val.length <= 3; // Maximum 3 images
}

module.exports = mongoose.model('Blog', blogSchema);