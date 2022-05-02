const { UserInputError } = require("apollo-server-express");
const Catergory = require("../models/Catergory");
const { checkToken } = require("../utils/checkAuth");

module.exports = {
  Query: {
    async allCatergory() {
      return await Catergory.find();
    },
    async singleCatergory(_, { catergoryId }) {
      return await Catergory.findOne({ _id: catergoryId });
    },
  },
  Mutation: {
    async addCatergory(_, { catergoryInput }, { req }) {
      const admin = checkToken(req);
      if (!admin.admin) {
        throw new UserInputError("Authorization is not enough for this action");
      }

      let catergory = await Catergory.findOne({ name: catergoryInput.name });
      if (catergory) {
        throw new UserInputError("A catergory with the same name exists");
      }

      catergory = new Catergory({ ...catergoryInput });
      await catergory.save();

      return {
        ...catergory._doc,
      };
    },

    async deleteCatergory(_, { catergoryId }, { req }) {
      const admin = checkToken(req);
      if (!admin.admin) {
        throw new UserInputError("Authorization is not enough for this action");
      }
      let catergory = await Catergory.findOne({ _id: catergoryId });
      if (!catergory) {
        throw new UserInputError("catergory doesnt exists");
      }
      await Catergory.deleteOne({ _id: catergoryId });

      return {
        ...catergory._doc,
      };
    },
    async updateCatergory(_, { catergoryId, catergoryInput }, { req }) {
      const admin = checkToken(req);
      if (!admin.admin) {
        throw new UserInputError("Authorization is not enough for this action");
      }

      let catergory = await Catergory.findOne({ _id: catergoryId });
      if (!catergory) {
        throw new UserInputError("Invalid Id, catergory Doesnt exist");
      }

      await Catergory.updateOne({ _id: catergoryId }, { ...catergoryInput });

      return {
        ...catergory._doc,
        ...catergoryInput,
      };
    },
  },
};
