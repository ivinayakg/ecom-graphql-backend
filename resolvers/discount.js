const { UserInputError } = require("apollo-server-express");
const Discount = require("../models/Discount");
const { checkToken } = require("../utils/checkAuth");

module.exports = {
  Query: {
    async allDiscounts(_, { isActive }) {
      let discounts = await (isActive !== null && isActive !== undefined
        ? Discount.find({ active: isActive })
        : Discount.find());
      return discounts;
    },
  },
  Mutation: {
    async addDiscount(_, { discountInput }, { req }) {
      const admin = checkToken(req);
      if (!admin.admin) {
        throw new UserInputError("Authorization is not enough for this action");
      }

      let discount = await Discount.findOne({ name: discountInput.name });
      if (discount) {
        throw new UserInputError("A discount with the same name exists");
      }

      discount = new Discount({ ...discountInput });
      await discount.save();

      return {
        ...discount._doc,
      };
    },

    async deleteDiscount(_, { discountId }, { req }) {
      const admin = checkToken(req);
      if (!admin.admin) {
        throw new UserInputError("Authorization is not enough for this action");
      }
      let discount = await Discount.findOne({ _id: discountId });
      if (!discount) {
        throw new UserInputError("Invalid Id, Discount Doesnt exist");
      }
      await Discount.deleteOne({ _id: discountId });

      return {
        ...discount._doc,
      };
    },
    async updateDiscount(_, { discountId, discountInput }, { req }) {
      const admin = checkToken(req);
      if (!admin.admin) {
        throw new UserInputError("Authorization is not enough for this action");
      }

      let discount = await Discount.findOne({ _id: discountId });
      if (!discount) {
        throw new UserInputError("Invalid Id, Discount Doesnt exist");
      }

      await Discount.updateOne({ _id: discountId }, { ...discountInput });

      return {
        ...discount._doc,
        ...discountInput,
      };
    },
  },
};
