const express = require("express");
const router = express.Router();
const authorization = require('../middlewares/authUser')
const {createReview, getReviews} = require('../controllers/reviewController')

router.get('/:productId/reviews', getReviews);
router.post('/:productId/addreview', authorization, createReview);

module.exports = router;