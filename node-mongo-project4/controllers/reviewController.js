// /controllers/reviewController.js

const reviewService = require('../service/reviewService');

// Get all reviews
async function getAllReviews(req, res) {
    try {
        const reviews = await reviewService.getAllReviews();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a review by useremail
async function getReviewByUseremail(req, res) {
    try {
        const review = await reviewService.getReviewByUseremail(req.params.useremail);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Create a new review
async function createReview(req, res) {
    try {
        const review = await reviewService.createReview(req.body);
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a review by useremail
async function updateReviewByUseremail(req, res) {
    try {
        const review = await reviewService.updateReviewByUseremail(req.params.useremail, req.body);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a review by useremail
async function deleteReviewByUseremail(req, res) {
    try {
        const review = await reviewService.deleteReviewByUseremail(req.params.useremail);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllReviews,
    getReviewByUseremail,
    createReview,
    updateReviewByUseremail,
    deleteReviewByUseremail,
};