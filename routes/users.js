var express = require("express");
var router = express.Router();

const {
  createUser,
  getMyProfile,
  updateMyProfile,
  logoutMyProfile,
} = require("../controllers/userController");
const { loginRequired } = require("../middleware/auth.js");

router
  .route("/")
  .get(function (req, res, next) {
    res.send("respond with a resource");
  })
  .post(createUser);

//get all current information on me
router
  .route("/me")
  .get(loginRequired, getMyProfile)
  .patch(loginRequired, updateMyProfile)




module.exports = router;
