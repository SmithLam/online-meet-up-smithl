const User = require("../models/user");

exports.loginWithEmail = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ status: "fail" });
  }
  const user = await User.loginWithEmail( email, password);
  if (!user) {
    return res
      .status(401)
      .json({ status: "fail", error: "wrong email or password" });
    }
    const token = await user.generateToken()
  res.status(200).json({
    status: "Logged",
    data: {user: user, token: token}
  });
};
