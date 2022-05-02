const { Schema, model, Types } = require("mongoose");

const Product = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product Price"],
    },
    discount: {
      default: null,
      type: Types.ObjectId,
      ref: "Discount",
    },
    description: {
      type: String,
      default: "This is our Product",
    },
    inventory: {
      type: Types.ObjectId,
      ref: "Inventory",
    },
  },
  { timestamps: true }
);

Product.pre("save", async function () {
  this.model("Inventory").create({ productId: this._id });
  let inventory = await this.model("Inventory").findOne({
    productId: this._id,
  });
  this.inventory = inventory._id;
});

module.exports = model("Product", Product);
