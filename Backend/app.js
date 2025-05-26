// app.js
require('dotenv').config();
const express        = require('express');
const bodyParser     = require('body-parser');
const { graphqlHTTP} = require('express-graphql');
const mongoose       = require('mongoose');

const rootValue     = require('./GraphQL/Resolvers/RootValue');
const GraphQLSchema = require('./GraphQL/Schema/SchemaQL');
const isAuth        = require('./middleware/isAuth');
const socketInit    = require('./socket');

const app  = express();
const http = require('http');
exports.app = app;


app.use(bodyParser.json());
app.use(isAuth);


app.use(
  '/graphql',
  graphqlHTTP({
    schema   : GraphQLSchema,
    rootValue,
    graphiql : true
  })
);



mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}` +
  `@cluster0.dbzdwkd.mongodb.net/${process.env.MONGO_DB}` +
  `?retryWrites=true&w=majority&appName=Cluster0`
)
.then(() => {
  const server = http.createServer(app);
  socketInit(server);
  server.listen(5000, () =>
    console.log('🚀  API & WS ready at http://localhost:5000/graphql')
  );
})
.catch(err => console.error(err));
