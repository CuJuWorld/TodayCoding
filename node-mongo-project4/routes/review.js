// /routes/review.js

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Define routes for reviews
router.get('/', reviewController.getAllReviews);
router.get('/:useremail', reviewController.getReviewByUseremail);
router.post('/', reviewController.createReview);
router.put('/:useremail', reviewController.updateReviewByUseremail);
router.delete('/:useremail', reviewController.deleteReviewByUseremail);

module.exports = router;
