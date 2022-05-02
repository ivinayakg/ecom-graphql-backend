const { Schema, model, Types } = require("mongoose");

const Wishlist = new Schema(
  {
    UserId: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    products: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = model("Wishlist", Wishlist);
