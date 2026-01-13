<<<<<<< HEAD
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min:1,
        max:5
    },
    createdAt: {
        type:Date,
        default: Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});

=======
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min:1,
        max:5
    },
    createdAt: {
        type:Date,
        default: Date.now()
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
});

>>>>>>> 73859dbc517a6651d4ba007b0089f8536e5da0d4
module.exports = mongoose.model("Review",reviewSchema);