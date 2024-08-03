const express = require("express");
const campgroundModel = require("../model/campground");
const catchAsync = require("../utils/CatchAsync");
const expressError = require("../utils/ExpressError");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware");
const ReviewModel = require("../model/review");
const review = require("../controllers/review");
const router = express.Router({ mergeParams: true});


router.post("/",isLoggedIn ,validateReview, catchAsync(review.createReview));

router.delete("/:reviewId", isLoggedIn,isReviewAuthor,catchAsync(review.deleteReview));

module.exports = router;
