// /services/reviewService.js

const reviewRepository = require('../repositories/reviewRepository');

// Get all reviews
async function getAllReviews() {
    try {
        return await reviewRepository.findAllReviews();
    } catch (error) {
        console.error("Error in Review Service (getAllReviews):", error);
        throw error;
    }
}

// Get a review by useremail
async function getReviewByUseremail(useremail) {
    try {
        return await reviewRepository.findReviewByUseremail(useremail);
    } catch (error) {
        console.error("Error in Review Service (getReviewByUseremail):", error);
        throw error;
    }
}

// Get reviews by product name
async function getReviewsByProductName(productName) {
    try {
        return await reviewRepository.findReviewsByProductName(productName);
    } catch (error) {
        console.error("Error in Review Service (getReviewsByProductName):", error);
        throw error;
    }
}

// Create a new review
async function createReview(reviewData) {
    try {
        return await reviewRepository.createReview(reviewData);
    } catch (error) {
        console.error("Error in Review Service (createReview):", error);
        throw error;
    }
}

// Update a review by ID
async function updateReview(id, updateData) {
    try {
        return await reviewRepository.updateReviewById(id, updateData);
    } catch (error) {
        console.error("Error in Review Service (updateReview):", error);
        throw error;
    }
}

// Update a review by useremail
async function updateReviewByUseremail(useremail, updateData) {
    try {
        return await reviewRepository.updateReviewByUseremail(useremail, updateData);
    } catch (error) {
        console.error("Error in Review Service (updateReviewByUseremail):", error);
        throw error;
    }
}

// Delete a review by ID
async function deleteReview(id) {
    try {
        return await reviewRepository.deleteReviewById(id);
    } catch (error) {
        console.error("Error in Review Service (deleteReview):", error);
        throw error;
    }
}

// Delete a review by useremail
async function deleteReviewByUseremail(useremail) {
    try {
        return await reviewRepository.deleteReviewByUseremail(useremail);
    } catch (error) {
        console.error("Error in Review Service (deleteReviewByUseremail):", error);
        throw error;
    }

}

module.exports = {
    getAllReviews,
    getReviewByUseremail,
    createReview,
    updateReview,
    deleteReview,
    updateReviewByUseremail,
    deleteReviewByUseremail,
    getReviewsByProductName
};