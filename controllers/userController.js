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
  return res.json({ status: "OK", data: req.user });
};

exports.updateMyProfile = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);
    console.log(req.body);
    if (!req.body) {
      throw new Error("Your update is unknown");
    }
    const fields = Object.keys(req.body); //get the field from new input
    fields.map((field) => (user[field] = req.body[field]));
    user.save();
    return res.json({ status: "Updated", data: user });
  } catch (err) {
    return res.send(err.message);
  }
};

exports.logoutMyProfile = async (req, res, next) => {
  try {
    const user = req.user;
    delete user.token;
    user.save();
    return res.status(204).json({ status: "Logout" });
  } catch (err) {
    return res.send(err.message);
  }
};
