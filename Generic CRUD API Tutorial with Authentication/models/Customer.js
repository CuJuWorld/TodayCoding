import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'] // Basic email format validation
    },
    phone: { type: String, trim: true },
    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        zip: { type: String, trim: true }
    },
    registeredAt: { type: Date, default: Date.now }
});

const Customer = mongoose.model('Customer', CustomerSchema);
export default Customer;