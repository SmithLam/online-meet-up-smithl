const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, "Country must have a name"],
    unique: true,
    trim: true,
    lowercase: true,
  },
});

module.exports = mongoose.model("Country", schema);
