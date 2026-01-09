const Listing = require("../models/listing");
const listing = require("../models/listing");
const { listingSchema } = require("../schema");

//Index Route
module.exports.index = async (req, res) => {
  const alllistings = await Listing.find({});
  res.render("./listings/index.ejs", { alllistings });
};

//New Form
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

//Show Listing
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const everylisting = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!everylisting) {
    req.flash("error", "Listing you trying to access is not Valid");
    return res.redirect("/listings");
  }
  // console.log(listing);
  res.render("listings/show.ejs", {listing: everylisting });
};

//create listing
module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  console.log(url, "..", filename);
  let result = listingSchema.validate(req.body);
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing Created!!");
  res.redirect("/listings");
};

//render edit form
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listingData = await Listing.findById(id);
  if (!listingData) {
    req.flash("error", "Listing you trying to edit is not Valid");
    return res.redirect("/listings");
  }

  let originalImageUrl = listingData.image?.url;

if (originalImageUrl) {
  originalImageUrl = originalImageUrl.replace(
    "/upload",
    "/upload/w_250,h_150,c_fill"
  );
}
res.render("listings/edit.ejs", { listing: listingData, originalImageUrl });
};

//Update Listing
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing Updated!!");
  return res.redirect(`/listings/${id}`);
};

//Delete Listing
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedlisting = await Listing.findByIdAndDelete(id);
  console.log(deletedlisting);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
