const { Schema, model } = require("mongoose");

const User = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
    },
    username: {
      type: String,
      required: [true, "Please provide username"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
    },
    address: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

User.pre("save", function () {
  this.model("Wishlist").create({ UserId: this._id });
  this.model("Cart").create({ UserId: this._id });
});

module.exports = model("User", User);
