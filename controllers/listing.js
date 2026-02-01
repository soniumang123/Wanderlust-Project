const Listing = require("../models/listing");
const { listingSchema } = require("../schema");

// Index
module.exports.index = async (req, res) => {
  const listings = await Listing.find({});
  res.render("./listings/index.ejs", { listings });
};

// New form
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// Show
module.exports.showListing = async (req, res) => {
  let { id } = req.params;

  const everylisting = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!everylisting) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing: everylisting });
};

// Create
module.exports.createListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

// Edit form
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listingData = await Listing.findById(id);

  if (!listingData) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  let originalImageUrl = listingData.image?.url;

  if (originalImageUrl) {
    originalImageUrl = originalImageUrl.replace(
      "/upload",
      "/upload/w_250,h_150,c_fill"
    );
  }

  res.render("listings/edit.ejs", {
    listing: listingData,
    originalImageUrl,
  });
};

module.exports.index = async (req, res) => {
  const { category } = req.query;
  let listings;
  if (category) {
    listings = await Listing.find({ category });
  } else {
    listings = await Listing.find({});
  }
  res.render("./listings/index.ejs", { listings });
};

// Update
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// Delete
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
