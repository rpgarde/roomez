const mongoose = require('mongoose')
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./schemas')
const PORT = process.env.PORT || 3001;
mongoose.connect('mongodb://localhost:27017/roomez', {})

const db = mongoose.connection;
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const path = require('path')
const morgan = require('morgan')
const { Bill, Chore, House, Message, User } = require("./models");


app.use(morgan('tiny'))

app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"));

// Update Express.js to use Apollo server features


db.on('error', console.error.bind(console, 'connection error:'));

// app.get('/', (req, res) => {
//     res.redirect('/')
// })

// app.get('/api/houses', async (req, res) => {
//     let data = await House.find({}).populate("occupants")
//     res.status(200).json(data)
// })

app.get('/api/users', async (req, res) => {
    let data = await User.find({}).populate('house')
    res.status(200).json(data)
})

// app.get('/api/bills', async (req, res) => {
//     let data = await Bill.find({})
//         .populate('createdBy')
//         .populate('assignedTo')
//         .populate('house')
//     res.status(200).json(data)
// })

// app.get('/api/chores', async (req, res) => {
//     let data = await Chore.find({})
//         .populate('createdBy')
//         .populate('assignedTo')
//         .populate('house')
//     res.status(200).json(data)
// })

// app.get('/api/messages', async (req, res) => {
//     let data = await Message.find({})
//         .populate('createdBy')
//         .populate('house')
//     res.status(200).json(data)
// })


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

  