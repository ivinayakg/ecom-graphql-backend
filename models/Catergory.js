const { Schema, model } = require("mongoose");

const Catergory = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide catergory name"],
    },
    discription: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("Catergory", Catergory);
