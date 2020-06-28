const {
  getExperiences,
  getSingleExperience,
  createExperience,
} = require("../controllers/expController");

const { loginRequired, hostRequired } = require("../middleware/auth");

const router = require("express").Router({ mergeParams: true });

router
  .route("/")
  .get(getExperiences)
  .post(loginRequired, hostRequired, createExperience);

router.route("/:expID").get(getSingleExperience);

module.exports = router;
