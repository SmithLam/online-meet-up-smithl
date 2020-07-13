var express = require("express");
var router = express.Router();

const {
  loginWithEmail,
  loginFacebook,
  facebookAuthHandler,
  loginGoogle,
  googleAuthHandler,
} = require("../controllers/authController");

const {
  createUser,
  getMyProfile,
  updateMyProfile,
  logoutMyProfile,
} = require("../controllers/userController");
const { loginRequired } = require("../middleware/auth.js");
const { route } = require(".");

router.route("/login/facebook").get(loginFacebook);

router.route("/login/google").get(loginGoogle);

router
  .route("/login")
  .get(function (req, res, next) {
    res.send("respond with a resource");
  })
  .post(loginWithEmail);

router.route("/logout").get(loginRequired, logoutMyProfile);

// router.route("/facebook/login").get(loginFacebook);
// router.route("/facebook/authorized").get(facebookAuthHandler);

// router.route("/google/login").get(loginGoogle);
// router.route("/google/authorized").get(googleAuthHandler);

module.exports = router;
