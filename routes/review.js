const router = require("express").Router({ mergeParams: true });

const {
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const { loginRequired } = require("../middleware/auth.js");
const { ExpIDValidate } = require("../middleware/authExp.js");

router.route("/reviews").post(loginRequired, ExpIDValidate, createReview);

router
  .route("/reviews/:revID")
  .patch(loginRequired, ExpIDValidate, updateReview)
  .delete(loginRequired, ExpIDValidate, deleteReview);

module.exports = router;
