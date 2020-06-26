const { route } = require("./users");
const {
  getExperiences,
  createExperience,
} = require("../controllers/expController");

const { loginRequired, hostRequired } = require("../middleware/auth");

const router = require("express").Router({ mergeParams: true });

router
  .route("/")
  .get(getExperiences)
  .post(loginRequired, hostRequired, createExperience);

module.exports = router;
