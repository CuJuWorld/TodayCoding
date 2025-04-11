const mongoose = require('mongoose');

const ProductReviewSchema = new mongoose.Schema({
    UserEmail: {
        type: String,
        required: true,
        ref: 'User' // Reference to the User model
    },
    ProductName: {
        type: String,
        required: true,
        ref: 'Product' // Reference to the Product model
    },
    ReviewText: {
        type: String,
        required: true
    },
    Rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    ReviewCreatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ProductReview', ProductReviewSchema);
