const Experiences = require("../models/experiences");

exports.ExpIDValidate = async (req, res, next) => {
  try {
    const expID = req.params.expID;
    console.log("what is expID", expID);
    if (!expID) return res.status(400).send("There is no ID of experiences");
    const exp = await Experiences.findById(expID);
    if (!exp) return res.status(404);
    req.exp = exp;
    next();
  } catch (err) {
    return res.send(err.message);
  }
};
