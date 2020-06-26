const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const round = 5;
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    token: [String],
    type: {
      type: String,
      enum: ["normal", "host"],
      required: [true, "Type of user is required"],
      default:"normal"
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

schema.methods.toJSON = function () {
  //inside schema.methods, this. will refer to the instance (object inherited from a class)
  const Object = this.toObject();
  delete Object.password;
  delete Object.token;
  return Object;
};

schema.statics.loginWithEmail = async function (email, password) {
  //inside schema.methods, this. will refer to the whole class
  //finder user from database using email
  const user = await this.findOne({ email: email });
  if (!user) {
    return null;
  }
  //compare raw password with hash password
  const match = await bcrypt.compare(password, user.password); //match is a boolean
  //if true return user
  if (match) return user;
  return null;
  //else return null
};

//generate token
schema.methods.generateToken = async function () {
  //this will refer to the instance of user
  //example: {name:"}
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.SECRET,
    { expiresIn: "7d" }
  );
  this.token.push(token);
  await this.save();
  return token;
};

//scheme.save
schema.pre("save", async function (next) {
  //.pre & .post is a special middleware in mongoose (user.save(), user.update())
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, round);
  }
  next();
});

module.exports = mongoose.model("User", schema);
