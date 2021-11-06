const mongoose = require('mongoose')
const AWS = require('aws-sdk')
const fs = require('fs')
const FileType = require('file-type')
const multiparty = require('multiparty')

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

AWS.config.update({
  accessKeyId:process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
})

const s3 = new AWS.S3()

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return s3.upload(params).promise();
};


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.post('/test-upload', (request, response) => {
  console.log('Uploading File via Axios')
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) {
      return response.status(500).send(error);
    };
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = await FileType.fromBuffer(buffer);
      const fileName = `bucketFolder/${Date.now().toString()}`;
      const data = await uploadFile(buffer, fileName, type);
      return response.status(200).send(data);
    } catch (err) {
      return response.status(500).send(err);
    }
  });
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

  