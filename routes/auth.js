var express = require("express");
var router = express.Router();

const { loginWithEmail } = require("../controllers/authController");

router
  .route("/login")
  .get(function (req, res, next) {
    res.send("respond with a resource");
  })
  .post(loginWithEmail);

module.exports = router;
