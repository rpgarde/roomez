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

const sample = (array) => array[Math.floor(Math.random()*array.length)]

const seedDb = async() => {
    // clear db 
    await Bill.deleteMany({})
    await Chore.deleteMany({})
    await House.deleteMany({})
    await Message.deleteMany({})
    await User.deleteMany({})

    console.log('db cleared')

    // Create house
    let seededHouses = await House.insertMany(houses)

    // Create users
    let seededUsers = await User.insertMany(users)

    // Push user data into house
    await House.findOneAndUpdate({},{$push:{ occupants: seededUsers }})
    console.log('house seeded')
    // Push house data into user
    await User.updateMany({},{$push:{house:seededHouses[0]}})
    console.log('users seeded')

    for(let i = 0; i<bills.length; i++){
        const billData = new Bill({
            createdAt: bills[i].createdAt,
            name: bills[i].name,
            dueAt: bills[i].dueAt,
            house: seededHouses[0],
            createdBy: sample(seededUsers),
            assignedTo: sample(seededUsers),
            amount: bills[i].amount,
            paid:bills[i].paid,
            paidAt:bills[i].paidAt,
            photo:bills[i].photo
        })
        await billData.save()
    }
    console.log('bills seeded')

    for(let i = 0; i<chores.length; i++){
        const choreData = new Chore({
            createdAt: chores[i].createdAt,
            name: chores[i].name,
            dueAt: chores[i].dueAt,
            house: seededHouses[0],
            createdBy: sample(seededUsers),
            assignedTo: sample(seededUsers),
            complete: chores[i].complete,
            completedAt:chores[i].completedAt,
            photo:chores[i].photo
        })
        await choreData.save()
    }
    console.log('chores seeded')

    for(let i = 0; i<messages.length; i++){
        const messageData = new Message({
            createdAt: messages[i].createdAt,
            message: messages[i].message,
            house: seededHouses[0],
            createdBy: sample(seededUsers),
            photo: messages[i].photo
        })
        await messageData.save()
    }
    console.log('messages seeded')

    console.log('DATABASE SEEDED')
}

seedDb().then(()=>mongoose.connection.close())