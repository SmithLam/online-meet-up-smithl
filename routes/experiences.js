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
  .delete(loginRequired, hostRequired, deleteExperience)
  .patch(loginRequired, hostRequired, updateExperience);

module.exports = router;
