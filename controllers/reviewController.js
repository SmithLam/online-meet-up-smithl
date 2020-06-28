const Review = require("../models/review");

const User = require("../models/user");
const Experiences = require("../models/experiences");

exports.getReview = async (req, res, next) => {
  try {
    const review = await Review.find({});
    if (!review) return res.status(404).send("There is no review");
    return res.status(200).json({ status: "OK", data: review });
  } catch (err) {
    return res.send("err.message");
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const { description, rating } = req.body;
    if (!description || !rating)
      return res
        .status(400)
        .json({ status: "fail", error: "requires review and rating" });

    // create review
    const review = await Review.findOneAndUpdate(
      { user: req.user._id, experience: req.exp._id },
      { description, rating },
      { upsert: true, new: true, runValidators: true }
      // upsert: allow add new document
      // new: true => return new doc instead of old doc as default
      // runValidators: true => use mongoose validator
    );
    res.status(201).json({ status: "success", data: review });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
