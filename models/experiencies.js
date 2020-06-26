const mongoose = require("mongoose");
const { schema } = require("./user");
const Tag = require("./tag");

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      mixlength: 5,
      maxlength: 500,
    },
    host: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Tag",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObjectL: { virtuals: true },
  }
);




// schema.pre("save", async function (next) {
//   let arr = [...this.tags]; //array of strings
//   //change it into an arr of Object
//   //find the document tag from string
//   let foo = arr.map(
//     async (item) =>
//       await Tag.findOne({
//         tag: item.toLowerCase().trim(),
//       })
//   );
//     let result = Promise.all(foo);

//   this.tag = result;
//   next();
// });

module.exports = mongoose.model("Experiences", Schema);
