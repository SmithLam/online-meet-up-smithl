const User = require("../models/user");

exports.createUser = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({
        status: "failed",
        error: "email, name, password are all required",
      });
    }
    const user = await User.create({
      email: email,
      name: name,
      password: password,
    });

    res.status(201).json({
      status: "OK",
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failed",
      error: err.message,
    });
  }
};


exports.getMyProfile = async (req, res, next) => {
    return res.json({status: "OK", data: req.user})
}