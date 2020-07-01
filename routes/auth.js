var express = require("express");
var router = express.Router();

const {
  loginWithEmail,
  loginFacebook,
  facebookAuthHandler,
} = require("../controllers/authController");

const {
  createUser,
  getMyProfile,
  updateMyProfile,
  logoutMyProfile,
} = require("../controllers/userController");
const { loginRequired } = require("../middleware/auth.js");

router
  .route("/login")
  .get(function (req, res, next) {
    res.send("respond with a resource");
  })
  .post(loginWithEmail);

router.route("/logout").get(loginRequired, logoutMyProfile);

router.route("/facebook/login").get(loginFacebook);

router.route("/facebook/authorized").get(facebookAuthHandler);

module.exports = router;
