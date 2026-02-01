
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIN, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});



//router.route
router.route("/").get(wrapAsync(listingController.index))
.post(
  isLoggedIN,
  
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.createListing)
)

router.get("/search", async (req, res) => {
  const { destination } = req.query;

  if (!destination || destination.trim() === "") {
    req.flash("error", "Please enter a destination");
    return res.redirect("/listings");
  }

  const listings = await Listing.find({
    location: { $regex: destination, $options: "i" }
  });

  if (listings.length === 0) {
    req.flash("error", "Listings not found");
    return res.redirect("/listings");
  }

  res.render("listings/index.ejs", { listings });
});

// new Route
router.get("/new", isLoggedIN, listingController.renderNewForm);

router.route("/:id").get( isLoggedIN, wrapAsync(listingController.showListing))
.put(
  isLoggedIN,
  upload.single('listing[image]'),
  validateListing,
  isOwner,
  wrapAsync(listingController.updateListing)
).delete(
  isLoggedIN,
  isOwner,
  wrapAsync(listingController.deleteListing)
)


//Edit route
router.get(
  "/:id/edit",
  isLoggedIN,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);


module.exports = router;
