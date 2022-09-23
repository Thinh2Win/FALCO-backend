const express = require('express');
const reviewsRoutes = express.router();
const { getReviewsByProductId, getReviewsMetaData, postReview, markReviewAsHelpful, reportReview } = require('../controllers/reviews_controller.js');

reviewsRoutes.get('/reviews', getReviewsByProductId);

reviewsRoutes.get('/reviews/meta', getReviewsMetaData);

reviewsRoutes.post('/reviews', postReview);

reviewsRoutes.put('/reviews/helpful', markReviewAsHelpful);

reviewsRoutes.put('/reviews/report', reportReview);

module.exports = reviewsRoutes;