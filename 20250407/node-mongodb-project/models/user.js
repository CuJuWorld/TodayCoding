const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Optimized email validation
    },
    password: {
        type: String,
        minlength: 6, // Minimum password length
    },
    date: {
        type: Date,
        default: Date.now,
    },
    address: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        zip: {
            type: String
        },
        country: {
            type: String
        },
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    phoneNumber: {
        type: String,
        match: /^(?:\+852|852)?[569]\d{7}$/, // Hong Kong phone number pattern
    },
    isVerified: {
        type: Boolean,
        default: false, // For email verification
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);