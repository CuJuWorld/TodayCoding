const reviewRepository = require('../repositories/reviewRespository');

// Get all reviews
async function getAllReviews() {
    return await reviewRepository.findAllReviews();
}

// Get a review by useremail
async function getReviewByUseremail(useremail) {
    return await reviewRepository.findReviewByUseremail(useremail);
}

// Create a new review
async function createReview(reviewData) {
    return await reviewRepository.createReview(reviewData);
}

// Update a review by useremail
async function updateReviewByUseremail(useremail, updateData) {
    return await reviewRepository.updateReviewByUseremail(useremail, updateData);
}

// Delete a review by useremail
async function deleteReviewByUseremail(useremail) {
    return await reviewRepository.deleteReviewByUseremail(useremail);
}

module.exports = {
    getAllReviews,
    getReviewByUseremail,
    createReview,
    updateReviewByUseremail,
    deleteReviewByUseremail,
};
