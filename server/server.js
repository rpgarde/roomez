const mongoose = require('mongoose')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');
const { typeDefs, resolvers } = require('./schemas')
const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/roomez', {})

const { authMiddleware } = require('./utils/auth');

const db = mongoose.connection;
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});

const path = require('path')
const morgan = require('morgan')

app.use(morgan('tiny'))

app.use(express.urlencoded({ extended: true }))

app.use(graphqlUploadExpress());

// Step 1:
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});


db.on('error', console.error.bind(console, 'connection error:'));

async function startApolloServer(typeDefs, resolvers){
    await server.start();
    server.applyMiddleware({app, path: '/graphql'});
    
    db.once('open', () => {
        app.listen(PORT, () => {
          console.log(`API server running on port ${PORT}!`);
          console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        });
      });    
}

startApolloServer(typeDefs, resolvers);

  