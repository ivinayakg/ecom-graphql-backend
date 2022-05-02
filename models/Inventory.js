const { Schema, model, Types } = require("mongoose");

const Inventory = new Schema(
  {
    productId: {
      type: Types.ObjectId,
      required: true,
      ref: "Product",
    },
    quantity: {
      default: 0,
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = model("Inventory", Inventory);
