const mongoose = require("mongoose");
const Experiences = require("./experiences");

const schema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "author of review is required"],
    },
    rating: {
      type: Number,
      required: [true, "rating is required"],
      min: 1,
      max: 5,
    },
    description: {
      type: String,
      trim: true,
      mixlength: 5,
      maxlength: 500,
    },
    exp: {
      type: mongoose.Schema.ObjectId,
      ref: "Experiences",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObjectL: { virtuals: true },
  }
);

schema.pre("save", async function (req, res, next) {
  const reviewID = this._id;
  const expID = this.exp;
  const exp = await Experiences.findOne({ _id: expID });
  const expReviews = exp.reviews;
  console.log("This is the review id", reviewID);
  console.log("This is the exp id", expID);
  console.log("this is the exp targeted", expReviews);
  const match = await Experiences.findOne({ reviews: reviewID });
  console.log("does it match or not", match);
  if (match) {
    return next();
  } else {
    await expReviews.push(reviewID);
    const addReview = await Experiences.findOneAndUpdate(
      { _id: expID },
      { reviews: expReviews },
      { upsert: true, new: true, runValidators: true }
    );
    next();
  }
});

module.exports = mongoose.model("Review", schema);
