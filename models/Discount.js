const { Schema, model } = require("mongoose");

const Discount = new Schema(
  {
    name: {
      type: String,
      required: [true, "Enter A Name for the discount"],
    },
    percent: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Discount", Discount);
