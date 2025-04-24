const express = require('express');
const router = express.Router();
const ProductReview = require('../models/productreview'); // Import the ProductReview model
const Review = require('../models/review'); // Import the Review model

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

// Update a review by UserEmail and ProductName
router.put('/update', async (req, res) => {
    const { UserEmail, ProductName, ReviewText, Rating } = req.body;

    if (!UserEmail || !ProductName) {
        return res.status(400).json({ message: "UserEmail and ProductName are required" });
    }

    try {
        const updatedReview = await ProductReview.findAndUpdateReview(UserEmail, ProductName, { ReviewText, Rating });
        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.json({ message: "Review updated successfully", review: updatedReview });
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

router.get('/api/reviews', async (req, res) => {
    const { userRole, userEmail } = req.query;

    try {
        let reviews;
        if (userRole === 'admin') {
            reviews = await Review.find(); // Fetch all reviews for admin
        } else {
            reviews = await Review.find({ userEmail }); // Fetch only user's reviews
        }

        res.status(200).json({ reviews, userRole, userEmail });
    } catch (err) {
        console.error('Error fetching reviews:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
