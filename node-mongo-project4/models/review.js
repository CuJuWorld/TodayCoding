const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    useremail: { type: String, required: true, unique: true },
    productName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);