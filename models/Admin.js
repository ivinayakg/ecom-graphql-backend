const { Schema, model } = require("mongoose");

const Admin = new Schema(
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
    admin: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Admin", Admin);
