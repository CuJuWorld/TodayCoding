const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    SupplierName: {
        type: String,
        required: true, // Ensure this field is required
    },
    SupplierDescription: {
        type: String,
        required: false, // Explicitly mark as optional
    },
    SupplierEmail: {
        type: String,
        required: true, // Ensure this field is required
        unique: true, // Ensure uniqueness
    },
    SupplierJoineddate: {
        type: Date,
        default: Date.now, // Default value for joined date
    },
});

module.exports = mongoose.model('Supplier', SupplierSchema);
