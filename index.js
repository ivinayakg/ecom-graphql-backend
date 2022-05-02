require("dotenv").config();
require("./models/index");
const { ApolloServer } = require("apollo-server-express");
// const { PubSub } = require("apollo-server");
const mongoose = require("mongoose");
const resolvers = require("./resolvers");
const typeDefs = require("./types/index");

//express app
const express = require("express");
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});
(async () => {
  await server.start();
  server.applyMiddleware({ app });
})();

const Start = () => {
  mongoose
    .connect(process.env.MONGODB_, { useNewUrlParser: true })
    .then(() => {
      console.log("MongoDB Connected");
      app.listen({ port: 8080 }, () => console.log("Server running at 8080"));
    })
    .catch((err) => {
      console.error(err);
    });
};

Start();
