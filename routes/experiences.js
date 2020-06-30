const {
  getExperiences,
  getSingleExperience,
  createExperience,
  deleteExperience,
  updateExperience,
} = require("../controllers/expController");

const { loginRequired, hostRequired } = require("../middleware/auth");

const router = require("express").Router({ mergeParams: true });

router
  .route("/")
  .get(getExperiences)
  .post(loginRequired, hostRequired, createExperience);

router
  .route("/:expID")
  .get(getSingleExperience)
  .patch(loginRequired, hostRequired, updateExperience)
  .delete(loginRequired, hostRequired, deleteExperience);

module.exports = router;
