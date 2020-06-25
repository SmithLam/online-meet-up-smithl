const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.loginRequired = async (req, res, next) => {
  try {
    console.log("headers", req.headers);
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    ) {
      return res.status(401).json({ status: "fail", error: "unauthorized" });
      }
      
    const token = req.headers.authorization.replace("Bearer ","");
    console.log(token);
    const decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded);
    const user = await User.findById(decoded._id);
    console.log(user);
    if (!user) {
      return res.status(401).json({ status: "fail", error: "unathorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err.message);
  }
};
