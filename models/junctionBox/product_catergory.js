const { Schema, model, Types } = require("mongoose");

const Product_Catergory = new Schema({
  productId: {
    type: Types.ObjectId,
    ref: "Product",
  },
  CatergoryId: {
    type: Types.ObjectId,
    ref: "Tag",
  },
});

module.exports = model("Product_Catergory", Product_Catergory);
