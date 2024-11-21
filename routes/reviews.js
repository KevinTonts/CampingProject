const express = require("express");
const router = express.Router({mergeParams: true}); //to get id from url
const catchAsync = require("../helpers/catchAsync");
const reviews = require("../controllers/reviews");
const {isLoggedIn, validateReview, isReviewAuthor} = require("../middleware");

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;