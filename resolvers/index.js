const userResolver = require("./users");
const productResolver = require("./prdoucts");
const tagResolver = require("./tag");
const discountResolver = require("./discount");
const catergoryResolver = require("./catergory");

const resolvers = {
  Query: {
    ...productResolver.Query,
    ...tagResolver.Query,
    ...discountResolver.Query,
    ...catergoryResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...productResolver.Mutation,
    ...tagResolver.Mutation,
    ...discountResolver.Mutation,
    ...catergoryResolver.Mutation,
  },
};

module.exports = resolvers;
