const bcrypt = require("bcryptjs");
const { UserInputError } = require("apollo-server");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../utils/validators");
const { createToken, checkToken } = require("../utils/checkAuth");
const User = require("../models/User");
const Admin = require("../models/Admin");
const Wishlist = require("../models/Wishlist");
const Cart = require("../models/Cart");

module.exports = {
  Mutation: {
    // to create a new user
    async createUser(
      _,
      { registerInput: { name, username, password, email, confirmPassword } }
    ) {
      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Errors", {
          username: "Username already taken",
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        name,
        username,
        password,
        email,
        address: [],
      });

      const res = await newUser.save();
      const token = createToken(res);

      return {
        ...res._doc,
        token,
      };
    },

    //to login any user
    async login(_, { username, password, role }, { req }) {
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await (role === "Admin" && role ? Admin : User).findOne({
        username,
      });
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong crendetials";
        throw new UserInputError("Wrong crendetials", { errors });
      }

      const token = createToken(user);

      return {
        ...user._doc,
        token,
      };
    },

    //to create a new admin
    async MakeAdmin(
      _,
      { registerInput: { name, username, password, email, confirmPassword } }
    ) {
      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Errors", {
          username: "Username already taken",
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new Admin({
        name,
        username,
        password,
        email,
        admin: true,
      });

      const res = await newUser.save();
      const token = createToken(res);

      return {
        ...res._doc,
        token,
      };
    },

    //to delete a new user (will not work for admin)
    async deleteUser(_, { UserId }, { req }) {
      const admin = checkToken(req);
      if (!admin.admin) {
        throw new UserInputError("Authorization is not enough for this action");
      }
      const user = await User.findOne({ _id: UserId });
      if (!user) {
        throw new UserInputError("User Not Found");
      }
      await User.deleteOne({ _id: UserId });
      await Wishlist.deleteOne({ UserId });
      await Cart.deleteOne({ UserId });

      return {
        ...user._doc,
        token: "",
      };
    },

    //to update user data,(will not work for admin)
    async updateUser(_, { modifyUser }, { req }) {
      let user = checkToken(req);
      if (!user) {
        throw new UserInputError("Authorization is not enough for this action");
      }

      let password = modifyUser.password
        ? await bcrypt.hash(modifyUser.password, 12)
        : user.password;
      await User.updateOne({ _id: user._id }, { ...modifyUser, password });

      return {
        ...user._doc,
        token: req.headers.authorization.trim().split("Bearer ")[1],
        ...modifyUser,
        password,
      };
    },
  },
};
