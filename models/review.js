const mongoose = require("mongoose");
const Exp = require("./experiences")

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
    experiencies: {
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


schema.pre("save", async function (next) {
  const id = this._id
  const duplicateReview = Exp.findIndex(item => item.reviews === id)
  if (duplicateReview != -1) { next() }
  Exp.reviews.push(id)
  next()
})

module.exports = mongoose.model("Review", schema);

