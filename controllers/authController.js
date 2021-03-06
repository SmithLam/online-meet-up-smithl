const User = require("../models/user");
const passport = require("passport");
const axios = require("axios");

exports.loginWithEmail = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ status: "fail" });
  }
  const user = await User.loginWithEmail(email, password);
  if (!user) {
    return res
      .status(401)
      .json({ status: "fail", error: "wrong email or password" });
  }
  const token = await user.generateToken();
  res.status(200).json({
    status: "Logged In",
    data: { user: user, token: token },
  });
};

// exports.loginFacebook = passport.authenticate("facebook", { scope: ["email"] });

// exports.facebookAuthHandler = function (req, res, next) {
//   passport.authenticate("facebook", async function (err, profile) {
//     //if email exists in database => login the user and return token
//     //else email doesn't exist, we create a new user with such email
//     try {
//       console.log("what is profile in auth", profile);
//       const email = profile._json.email;
//       const name = profile._json.first_name + " " + profile._json.last_name;
//       const user = await User.findOneOrCreate({ email, name });
//       const token = await user.generateToken();
//       //if user successfully logs in, redirect to token page
//       return res.redirect(`https://localhost:3000/?token=${token}`);
//     } catch (err) {
//       console.log(err);
//       return res.redirect(`https://localhost:3000/login`);
//     }
//   })(req, res, next);
// };

// exports.loginGoogle = passport.authenticate("google", {
//   scope: ["email", "profile"],
// });

// exports.googleAuthHandler = function (req, res, next) {
//   passport.authenticate("google", async function (err, profile) {
//     //if email exists in database => login the user and return token
//     //else email doesn't exist, we create a new user with such email
//     try {
//       console.log("what is profile in auth", profile);
//       const email = profile._json.email;
//       const name = profile._json.name;
//       const user = await User.findOneOrCreate({ email, name });
//       const token = await user.generateToken();
//       //if user successfully logs in, redirect to token page
//       return res.redirect(`https://localhost:3000/?token=${token}`);
//     } catch (err) {
//       console.log(err);
//       return res.redirect(`https://localhost:3000/login`);
//     }
//   })(req, res, next);
// };

exports.loginFacebook = async (req, res, next) => {
  const fbToken = req.query.token;
  if (!fbToken) {
    return res
      .status(401)
      .json({ status: "fail", error: "need Facebook token" });
  }
  const data = await axios.get(
    `https://graph.facebook.com/me?fields=id,name,email&access_token=${fbToken}`
  );
  console.log("This is Facebook user data", data);
  const user = await User.findOneOrCreate({
    email: data.data.email,
    name: data.data.name,
  });
  const token = await user.generateToken();
  res.json({ status: "ok", data: user, token });
};

exports.loginGoogle = async (req, res, next) => {
  const googleToken = req.query.token;
  if (!googleToken) {
    return res.status(401).json({ status: "fail", error: "need Google token" });
  }
  const data = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${googleToken}`
  );
  console.log("This is Google user data", data);
  const user = await User.findOneOrCreate({
    email: data.data.email,
    name: data.data.name,
  });
  const token = await user.generateToken();
  res.json({ status: "ok", data: user, token });
};
