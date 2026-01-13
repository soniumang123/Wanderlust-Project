const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type:String,
        required:[true, 'Title is required'],
},
     description: {
    type: String,
    required: [true, 'Description is required']
  },
    image:{
        url: String,
        filename: String,
    },
     price: {
    type: Number,
    required: [true, 'Price is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  country: {
    type: String,
    required: [true, 'Country is required']
  },
  reviews:[{type: Schema.Types.ObjectId,ref:"Review"}],

  owner: {
    type: Schema.Types.ObjectId,
    ref:"User",
  }
});

listingSchema.post("findOneAndDelete", async (listing)=> {
  if(listing){
await Review.deleteMany({_id: {$in : listing.reviews}});
  }
})

const listing = mongoose.model("listing",listingSchema);
module.exports = listing;