const passportGoogle = require("passport-google-oauth20");
const Strategy = passportGoogle.Strategy;
require("dotenv").config();

module.exports = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    profileFields: ["id", "email", "name"],
  },
  // verification function (callback) /auth/google/authorized
  function (accessToken, refreshToken, profile, next) {
    console.log(profile);
    next(null, profile);
  }
);
