const router = require("express").Router({ mergeParams: true });

const { createReview } = require("../controllers/reviewController");
const { loginRequired } = require("../middleware/auth.js");
const { ExpIDValidate } = require("../middleware/authExp.js");

router.route("/").post(loginRequired, ExpIDValidate, createReview);

module.exports = router;
