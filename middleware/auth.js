const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.loginRequired = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      return res.status(401).json({
        status: "fail",
        error: "You are unauthorized to perform this action",
      });
    }
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log("Token in auth header", token);
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id: decoded._id, token: token });
    if (!user) {
      return res
        .status(401)
        .json({ status: "fail", error: "No user detected" });
    }
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    return res.send(err.message);
  }
};

exports.hostRequired = (req, res, next) => {
  if (req.user.type !== "host") {
    return res.status(401).json({ status: "fail", message: "Host required" });
  }
  next();
};
