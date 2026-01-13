const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const {
  listingSchema,
  reviewSchema,
  validateReview,
  isLoggedIN,
  isreviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controllers/review.js");

router.post(
  "/",
  isLoggedIN,
  validateReview,
  wrapAsync(reviewController.createReview)
);

router.delete(
  "/:reviewid",isLoggedIN,isreviewAuthor,
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;
