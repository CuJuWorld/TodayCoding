// /repositories/reviewRepository.js

const Review = require('../models/review');

// Get all reviews
async function findAllReviews() {
    try {
        return await Review.find();
    } catch (error) {
        console.error("Error in Review Repository (findAllReviews):", error);
        throw error;
    }
}

// Get a single review by useremail
async function findReviewByUseremail(useremail) {
    try {
        return await Review.findOne({ useremail });
    } catch (error) {
        console.error("Error in Review Repository (findReviewByUseremail):", error);
        throw error;
    }
}

// Find reviews by product name
async function findReviewsByProductName(productName) {
    try {
        return await Review.find({ productName });
    } catch (error) {
        console.error("Error in Review Repository (findReviewsByProductName):", error);
        throw error;
    }
}

// Create a new review
async function createReview(reviewData) {
    try {
        const review = new Review(reviewData);
        return await review.save();
    } catch (error) {
        console.error("Error in Review Repository (createReview):", error);
        throw error;
    }
}

// Update a review by useremail
async function updateReviewByUseremail(useremail, updateData) {
    try {
        const review = await Review.findOneAndUpdate({ useremail }, updateData, { new: true, runValidators: true });
        return review; // Return the updated document
    } catch (error) {
        console.error("Error in Review Repository (updateReviewByUseremail):", error);
        throw error;
    }
}

// Delete a review by useremail
async function deleteReviewByUseremail(useremail) {
    try {
        const review = await Review.findOneAndDelete({ useremail });
        return review; // Return the deleted document (can be null if not found)
    } catch (error) {
        console.error("Error in Review Repository (deleteReviewByUseremail):", error);
        throw error;
    }
}

module.exports = {
    findAllReviews,
    findReviewByUseremail,
    findReviewsByProductName,
    createReview,
    updateReviewByUseremail,
    deleteReviewByUseremail,
};