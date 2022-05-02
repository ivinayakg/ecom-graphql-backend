const { UserInputError } = require("apollo-server-express");
const Product = require("../models/Product");
const Inventory = require("../models/Inventory");
const Product_Catergory = require("../models/junctionBox/product_catergory");
const Product_Tag = require("../models/junctionBox/product_tag");

const { checkToken } = require("../utils/checkAuth");

module.exports = {
  Query: {
    async allProducts(_, { range }) {
      const allProducts = await Product.find().populate([
        "inventory",
        "discount",
      ]);
      return range ? allProducts.slice(range[0], range[1]) : allProducts;
    },
    async singleProduct(_, { productId }) {
      const product = await Product.findOne({ _id: productId }).populate([
        "inventory",
        "discount",
      ]);
      if (!product) {
        throw new UserInputError("Product Not Available");
      }
      return { ...product._doc };
    },
  },
  Mutation: {
    async addProduct(_, { productInput }, { req }) {
      const admin = checkToken(req);
      if (!admin.admin) {
        throw new UserInputError("Authorization is not enough for this action");
      }
      if (productInput.inventory) {
        throw new UserInputError('You can\'t pass any "inventory" arguement ');
      }

      let product = new Product({ ...productInput });
      await product.save();
      product = await Product.findOne({ _id: productInput._id }).populate([
        "inventory",
        "discount",
      ]);

      return {
        ...product._doc,
      };
    },
    async updateProduct(_, { productInput, productId }, { req }) {
      const admin = checkToken(req);
      if (!admin.admin) {
        throw new UserInputError("Authorization is not enough for this action");
      }
      if (productInput.inventory) {
        throw new UserInputError('You can\'t pass any "inventory" arguement ');
      }
      let product = await Product.findOne({ _id: productId });
      if (!product) {
        throw new UserInputError("Product Not Found");
      }
      await Product.updateOne({ _id: productId }, { ...productInput });
      product = await Product.findOne({ _id: productId }).populate([
        "inventory",
        "discount",
      ]);

      return {
        ...product._doc,
      };
    },
    async deleteProduct(_, { productId }, { req }) {
      const admin = checkToken(req);
      if (!admin.admin) {
        throw new UserInputError("Authorization is not enough for this action");
      }

      let product = await Product.findOne({ _id: productId }).populate([
        "inventory",
        "discount",
      ]);
      if (!product) {
        throw new UserInputError("Product Not Found");
      }
      await Product.deleteOne({ _id: productId });
      await Inventory.deleteOne({ productId });
      await Product_Catergory.deleteOne({ productId });
      await Product_Tag.deleteOne({ productId });

      return {
        ...product._doc,
      };
    },
    async updateProductInventory(_, { productId, quantity }, { req }) {
      const admin = checkToken(req);
      if (!admin.admin) {
        throw new UserInputError("Authorization is not enough for this action");
      }
      if (quantity <= 0)
        throw new UserInputError("Enter A Positive Quantity Value");

      let product = await Product.findOne({ _id: productId });
      if (!product) {
        throw new UserInputError("Product Not Found");
      }

      await Inventory.updateOne({ productId }, { quantity });
      product = await Product.findOne({ _id: productId }).populate([
        "inventory",
        "discount",
      ]);

      return {
        ...product._doc,
      };
    },
  },
};
