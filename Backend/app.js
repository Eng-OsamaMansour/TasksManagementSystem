require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const rootValue = require("./GraphQL/Resolvers/RootValue");
const GraphQLSchema = require('./GraphQL/Schema/SchemaQL');
const app = express();
exports.app = app;
app.use(bodyParser.json());

/* ──────────── GraphQL ──────────── */
app.use(
  "/graphql",
  graphqlHTTP({
    schema: GraphQLSchema,
    rootValue: rootValue,
    graphiql: true,
  })
);

/* ──────────── MongoDB ──────────── */
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}` +
      `@cluster0.dbzdwkd.mongodb.net/${process.env.MONGO_DB}` +
      `?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() =>
    app.listen(5000, () =>
      console.log("🚀  Server ready at http://localhost:5000/graphql")
    )
  )
  .catch((err) => console.error(err));
