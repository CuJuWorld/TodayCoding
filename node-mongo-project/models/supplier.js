const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    SKUid: {
        type: Number,
        required: true,
        unique: true,
    },
    SupplierName: {
        type: String,
        required: true,
    },
    SupplierEmail: {
        type: String,
        required: true,
        unique: true, // Added for uniqueness
    },
    Category: {
        type: String,
        required: true,
    },
    Joineddate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Supplier', SupplierSchema);
// Here's a quick breakdown of the process:

// Model Name: User
// Lowercase: user
// Pluralization: users
// So, even if you don't explicitly provide the collection name, Mongoose recognizes it as users. 
// If you want to specify a different collection name, you can do so in the model definition like this:

// module.exports = mongoose.model('User', UserSchema, 'users');
