const { Schema, model, Types } = require("mongoose");

const Product_Tag = new Schema({
  productId: {
    type: Types.ObjectId,
    ref: "Product",
  },
  tagId: {
    type: Types.ObjectId,
    ref: "Catergory",
  },
});

module.exports = model("Product_Tag", Product_Tag);
