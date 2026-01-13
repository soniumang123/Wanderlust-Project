
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

// ----------------- LOGIN CHECK -----------------
module.exports.isLoggedIN = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to do that");
    return res.redirect("/login");
  }
  next();
};

// ----------------- SAVE REDIRECT URL -----------------
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// ----------------- LISTING OWNER CHECK -----------------
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;

  // listing exist?
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect(`/listings/${id}`);
  }

  // owner field exist?
  if (!listing.owner) {
    req.flash("error", "This listing has no owner assigned.");
    return res.redirect(`/listings/${id}`);
  }

  // current user exist?
  if (!res.locals.currUser) {
    req.flash("error", "You must be logged in.");
    return res.redirect("/login");
  }

  // actual ownership check
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

// ----------------- LISTING VALIDATION (JOI) -----------------
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// ----------------- REVIEW VALIDATION (JOI) -----------------
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// ----------------- REVIEW AUTHOR CHECK -----------------
module.exports.isreviewAuthor = async (req, res, next) => {
  let { id, reviewid } = req.params;

  // review exist?
  let review = await Review.findById(reviewid);
  if (!review) {
    req.flash("error", "Review not found!");
    return res.redirect(`/listings/${id}`);
  }

  // author field exist?
  if (!review.author) {
    req.flash("error", "This review has no author assigned.");
    return res.redirect(`/listings/${id}`);
  }

  // current user exist?
  if (!res.locals.currUser) {
    req.flash("error", "You must be logged in.");
    return res.redirect("/login");
  }

  // actual author check
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You did not create this review");
    return res.redirect(`/listings/${id}`);
  }

  next();
};
// const Listing = require("./models/listing.js");
// const {listingSchema} = require("./schema.js");
// const ExpressError = require("./utils/ExpressError.js");
// const Review = require("./models/review.js");
// const {reviewSchema} = require("./schema.js");

// module.exports.isLoggedIN = (req,res,next) =>{
//     if(!req.isAuthenticated()){
//       req.session.redirectUrl = req.originalUrl;
//     req.flash("error","you must be logged in to create listing")
//     return res.redirect("/login");
//   }
//   next();
// }

// module.exports.saveRedirectUrl = (req,res,next)=>{
//   if(req.session.redirectUrl){
//     res.locals.redirectUrl = req.session.redirectUrl;
//   }
//   next();
// }

// module.exports.isOwner = async(req,res,next)=>{
//   let { id } = req.params;
//     let listing = await Listing.findById(id);
//    if( !listing.owner.equals(res.locals.currUser._id)){
//       req.flash("error","You are not the owner of this listing");
//      return  res.redirect(`/listings/${id}`)
//     }

//     next();
// }

// module.exports.validateListing = (req,res,next)=> {
//     let {error} = listingSchema.validate(req.body);
//     console.log(error);
//     if(error){
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, error);
//     }else{
//         next();
//     }
// }

// module.exports.validateReview = (req,res,next)=> {
//     let {error} = reviewSchema.validate(req.body);
//     console.log(error);
//     if(error){
//         let errMsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(400, error);
//     }else{
//         next();
//     }
// }

// module.exports.isreviewAuthor = async(req,res,next)=>{
//   let { id, reviewid } = req.params;
//     let listing = await Review.findById(reviewid);
//    if( !Review.author.equals(res.locals.currUser._id)){
//       req.flash("error","You did not create this review");
//      return  res.redirect(`/listings/${id}`)
//     }

//     next();
// }
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

// ----------------- LOGIN CHECK -----------------
module.exports.isLoggedIN = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to do that");
    return res.redirect("/login");
  }
  next();
};

// ----------------- SAVE REDIRECT URL -----------------
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// ----------------- LISTING OWNER CHECK -----------------
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;

  // listing exist?
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect(`/listings/${id}`);
  }

  // owner field exist?
  if (!listing.owner) {
    req.flash("error", "This listing has no owner assigned.");
    return res.redirect(`/listings/${id}`);
  }

  // current user exist?
  if (!res.locals.currUser) {
    req.flash("error", "You must be logged in.");
    return res.redirect("/login");
  }

  // actual ownership check
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

// ----------------- LISTING VALIDATION (JOI) -----------------
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// ----------------- REVIEW VALIDATION (JOI) -----------------
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// ----------------- REVIEW AUTHOR CHECK -----------------
module.exports.isreviewAuthor = async (req, res, next) => {
  let { id, reviewid } = req.params;

  // review exist?
  let review = await Review.findById(reviewid);
  if (!review) {
    req.flash("error", "Review not found!");
    return res.redirect(`/listings/${id}`);
  }

  // author field exist?
  if (!review.author) {
    req.flash("error", "This review has no author assigned.");
    return res.redirect(`/listings/${id}`);
  }

  // current user exist?
  if (!res.locals.currUser) {
    req.flash("error", "You must be logged in.");
    return res.redirect("/login");
  }

  // actual author check
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You did not create this review");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

