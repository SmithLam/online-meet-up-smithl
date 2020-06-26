const Experiences = require("../models/experiencies");
const Tag = require("../models/tag");

exports.getExperiences = async (req, res, next) => {
  const exp = Experiences.find({}).populate();
  return res.status(200).json({
    status: "OK",
    data: exp,
  });
};

exports.createExperience = async (req, res, next) => {
  try {
    const { title, description, tags } = req.body;
    if (!title || !description || !tags) {
      return res.status(400).json({
        status: "fail",
        error: "title, description, tags are required",
      });
    }
    //tags is an array of string
    //we need to convert it to array of objectId
    //if a tag exists in tags collection, then we will use associate id as objectID
    //else, we need to create that Tag in the tag document, then return ID
    const newArr = await Tag.convertToObject(tags);
    const exp = await Experiences.create({
      title,
      description,
      tags: newArr,
      host: req.user.id,
    });

    return res.status(201).json({ status: "ok", data: exp });
  } catch (err) {
    return res.send(err.message);
  }
};
