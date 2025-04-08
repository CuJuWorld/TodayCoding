const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
        match: /^(?:\+852[569]\d{7}|\+861[0-9]{10})$/, // Hong Kong or Mainland China phone number pattern
    },
    UserisVerified: {
        type: Boolean,
        default: false, // For email verification
    },
    UserCreatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);
// Here's a quick breakdown of the process:

// Model Name: User
// Lowercase: user
// Pluralization: users
// So, even if you don't explicitly provide the collection name, Mongoose recognizes it as users. 
// If you want to specify a different collection name, you can do so in the model definition like this:

// module.exports = mongoose.model('User', UserSchema, 'users');
