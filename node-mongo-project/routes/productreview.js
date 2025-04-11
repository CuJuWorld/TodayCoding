const express = require('express');
const router = express.Router();
const ProductReview = require('../models/productreview'); // Import the ProductReview model

// Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await ProductReview.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get reviews by ProductName
router.get('/:productName', async (req, res) => {
    try {
        const reviews = await ProductReview.find({ ProductName: req.params.productName });
        if (reviews.length === 0) return res.status(404).json({ message: 'No reviews found for this product' });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new review
router.post('/', async (req, res) => {
    const { UserEmail, ProductName, ReviewText, Rating } = req.body;

    // Validate required fields
    if (!UserEmail) return res.status(400).json({ message: "Missing UserEmail field" });
    if (!ProductName) return res.status(400).json({ message: "Missing ProductName field" });
    if (!ReviewText) return res.status(400).json({ message: "Missing ReviewText field" });
    if (!Rating || Rating < 1 || Rating > 5) return res.status(400).json({ message: "Invalid Rating value" });

    const review = new ProductReview({
        UserEmail,
        ProductName,
        ReviewText,
        Rating
    });

    try {
        const newReview = await review.save();
        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a review by ID
router.delete('/:id', async (req, res) => {
    try {
        const review = await ProductReview.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json({ message: 'Review deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
