const mongoose = require("mongoose");
const { schema } = require("./user");
const Tag = require("./tag");

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      mixlength: 5,
      maxlength: 500,
    },
    host: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Tag",
        required: true,
      },
    ],
    // reviews: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "review",
    //     unique: true,
    //   },
    // ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObjectL: { virtuals: true },
  }
);

module.exports = mongoose.model("Experiences", Schema);
