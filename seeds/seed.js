const mongoose = require('mongoose')
const {Bill,Chore,House,Message,User} = require("../models");
const bills = require('./bills')
const chores = require('./chores')
const houses = require('./houses')
const messages = require('./messages')
const users = require('./users')

mongoose.connect('mongodb://localhost:27017/roomez',{
    // useNewUrlParser:true,
    // useCreateIndex:true,
    // useUnifiedTopology:true
})

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',() => {
    console.log('Database Connected')
})

const seedDb = async() => {
    // clear db 
    await Bill.deleteMany({})
    await Chore.deleteMany({})
    await House.deleteMany({})
    await Message.deleteMany({})
    await User.deleteMany({})

    console.log('db cleared')

    await House.insertMany(houses)
    // await Bill.insertMany(bills)
    // await Chore.insertMany(chores)
    // await Message.insertMany(messages)
    // await User.insertMany(users)

    console.log('DATABASE SEEDED')
}

seedDb().then(()=>mongoose.connection.close())