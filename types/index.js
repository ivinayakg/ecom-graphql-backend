const { gql } = require("apollo-server");

const typeDefs = gql`
  type Catergory {
    _id: ID!
    name: String!
    discription: String
    image: String
  }

  type Inventory {
    _id: ID!
    productId: ID!
    quantity: Int!
  }

  type Tag {
    _id: ID!
    name: String!
    updatedAt: String
  }

  type Discount {
    _id: ID!
    name: String!
    percent: Int!
    active: Boolean
    updatedAt: String
  }

  type Product {
    _id: ID!
    name: String!
    description: String!
    price: Int!
    discount: Discount
    updatedAt: String
    inventory: Inventory!
  }

  type User {
    _id: ID!
    name: String!
    username: String!
    password: String!
    email: String!
    admin: Boolean
    token: String!
    address: [String!]!
    updatedAt: String
  }

  input RegisterInput {
    name: String!
    username: String!
    password: String!
    email: String!
    confirmPassword: String!
  }
  input ModifyUser {
    name: String
    username: String
    password: String
    email: String
    address: String
  }

  input ProductInput {
    name: String
    description: String
    price: Int
    discount: ID
  }

  input DiscountInput {
    name: String
    percent: Int
    active: Boolean
  }

  input CatergoryInput {
    name: String
    discription: String
  }

  type Mutation {
    #public querires
    createUser(registerInput: RegisterInput!): User!
    login(username: String!, password: String!, role: String): User!
    updateUser(modifyUser: ModifyUser!): User!

    ##admin queries
    MakeAdmin(registerInput: RegisterInput!): User!
    deleteUser(UserId: ID!): User
    #Product
    addProduct(productInput: ProductInput!): Product!
    updateProduct(productInput: ProductInput!, productId: ID!): Product!
    deleteProduct(productId: ID!): Product!
    updateProductInventory(productId: ID!, quantity: Int!): Product!
    #Tags
    addTag(tagName: String!): Tag!
    deleteTag(tagName: String!): Tag!
    #discount
    addDiscount(discountInput: DiscountInput!): Discount!
    deleteDiscount(discountId: ID!): Discount!
    updateDiscount(discountId: ID!, discountInput: DiscountInput!): Discount!
    #Catergory
    addCatergory(catergoryInput: CatergoryInput!): Catergory!
    deleteCatergory(catergoryId: ID!): Catergory!
    updateCatergory(
      catergoryId: ID!
      catergoryInput: CatergoryInput
    ): Catergory!
  }

  type Query {
    allProducts(range: [Int!]): [Product!]!
    singleProduct(productId: ID!): Product!
    allTags: [Tag!]!
    allDiscounts(isActive: Boolean): [Discount!]!
    allCatergory: [Catergory!]!
    singleCatergory(catergoryId: ID!): Catergory!
  }
`;

module.exports = typeDefs;
