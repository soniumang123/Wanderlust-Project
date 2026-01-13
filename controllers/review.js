const Review = require("../models/review");
const Listing = require("../models/listing");
const {reviewSchema} = require("../schema");

module.exports.createReview = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    let newreview = new Review(req.body.review);
    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
    }
    newreview.author = req.user._id;
    listing.reviews.push(newreview);
    console.log(newreview);
    await newreview.save();
    await listing.save();
    req.flash("success", "New Review Created!!");
    res.redirect(`/listings/${listing._id}`);
  };

  module.exports.deleteReview = async (req, res) => {
    let { id, reviewid } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await Review.findById(reviewid);
    req.flash("success", " Review Deleted!!");
    res.redirect(`/listings/${id}`);
  }