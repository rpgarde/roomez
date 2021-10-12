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

    // Create house
    await House.insertMany(houses)
    // Store house data
    let seededHouses = await House.find({})

    // Create users
    await User.insertMany(users)

    // Store user data
    let seededUsers = await User.find({})

    // Push user data into house
    await House.findOneAndUpdate({},{$push:{ users: seededUsers }})
    // Push house data into user
    await User.updateMany({},{$push:{house:seededHouses[0]}})

    // await Bill.insertMany(bills)
    // await Chore.insertMany(chores)
    // await Message.insertMany(messages)

    console.log('DATABASE SEEDED')
}

seedDb().then(()=>mongoose.connection.close())