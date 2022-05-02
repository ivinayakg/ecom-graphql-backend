const { Schema, model } = require("mongoose");

const Tag = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide tag name"],
    },
  },
  { timestamps: true }
);

module.exports = model("Tag", Tag);
