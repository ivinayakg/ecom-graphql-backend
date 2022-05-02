const { UserInputError } = require("apollo-server-express");
const Tag = require("../models/Tags");
const Product_Tag = require("../models/junctionBox/product_tag");

const { checkToken } = require("../utils/checkAuth");

module.exports = {
  Query: {
    async allTags() {
      let tags = await Tag.find();
      return tags;
    },
  },
  Mutation: {
    async addTag(_, { tagName }, { req }) {
      const admin = checkToken(req);
      if (!admin.admin) {
        throw new UserInputError("Authorization is not enough for this action");
      }
      let tag = await Tag.findOne({ name: tagName.toLowerCase() });

      if (tag) {
        throw new UserInputError("Tag Already exist with this name");
      }
      tag = new Tag({ name: tagName });
      await tag.save();
      return {
        ...tag._doc,
      };
    },
    async deleteTag(_, { tagName }, { req }) {
      const admin = checkToken(req);
      if (!admin.admin) {
        throw new UserInputError("Authorization is not enough for this action");
      }
      let tag = await Tag.findOne({ name: tagName.toLowerCase() });

      if (!tag) {
        throw new UserInputError("Tag Doesn't Exist");
      }

      await Tag.deleteOne({ name: tagName.toLowerCase() });
      await Product_Tag.deleteOne({ tagId: tag._id });

      return {
        ...tag._doc,
      };
    },
  },
};
