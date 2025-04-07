const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    SupplierName: {
        type: String,
        required: true,
    },
    SupplierDescription: {
        type: String,
      },
    SupplierEmail: {
        type: String,
        required: true,
        unique: true, // Added for uniqueness
    },
    SupplierJoineddate: {
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
