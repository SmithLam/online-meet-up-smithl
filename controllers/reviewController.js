const Review = require("../models/review");
const { deleteOne } = require("./handleFactory");
const User = require("../models/user");
const Experiences = require("../models/experiences");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getReview = async (req, res, next) => {
  try {
    const review = await Review.find({});
    if (!review) return res.status(404).send("There is no review");
    return res.status(200).json({ status: "OK", data: review });
  } catch (err) {
    return res.send("err.message");
  }
};

exports.updateReview = catchAsync(async (req, res, next) => {
  // const { description, rating } = req.body;
  // if (!description || !rating)
  //   return res
  //     .status(400)
  //     .json({ status: "fail", error: "requires review and rating" });

  // create review
  const review = await Review.findOneAndUpdate(
    { exp: req.params.expID, _id: req.params.revID, author: req.user._id },
    {
      ...req.body,
      author: req.user._id,
      exp: req.params.expID,
    },
    { new: true, runValidators: true }
    // upsert: allow add new document
    // new: true => return new doc instead of old doc as default
    // runValidators: true => use mongoose validator
  );
  console.log("have I reached here");
  review.save();
  res.status(201).json({ status: "success", data: review });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const check = await Review.exists({
    exp: req.params.expID,
    author: req.user_id,
  });
  if (check) {
    return next(new AppError(404, "Already reviewed"));
  }
  console.log("have I reached here");
  const review = await Review.create({
    ...req.body,
    author: req.user._id,
    exp: req.params.expID,
  });
  console.log("I have recheaed here", review);
  res.status(201).json({ status: "ok", data: review });
});

exports.deleteReview = deleteOne(Review);
