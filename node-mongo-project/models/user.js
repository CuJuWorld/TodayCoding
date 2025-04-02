const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true,
    },
    UserEmail: {
        type: String,
        required: true,
        unique: true, // Added for uniqueness
    },
    Enrollmentdate: {
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
