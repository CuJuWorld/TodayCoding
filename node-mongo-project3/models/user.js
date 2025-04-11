const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // name: {
    //     type: String,
    //     required: true,
    // },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    //     immutable: true, // Prevent modification after creation
    // },
    
    UserName: {
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
    Enrollmentdate: {
        type: Date,
        default: Date.now,
    },
    UserAddress: { // Reverted from address to UserAddress
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
    UserRole: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    UserPhoneNumber: {
        type: String,
        required: true, // Ensure the field is required
        match: /^\+(852[569]\d{7}|861[3-9]\d{9})$/, // Match Hong Kong and Mainland China phone numbers
    },
    UserisVerified: {
        type: Boolean,
        default: false, // For email verification
    },
    UserCreatedAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true }); // Enable automatic updatedAt updates


module.exports = mongoose.model('User', userSchema);