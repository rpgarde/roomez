const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { Bill, Chore, House, Message, User } = require("../models");
const path = require('path')
const {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');
// const { finished } = require('stream/promises');

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    house: async (_, args, context) => {
      console.log(args)
      const houseId = context.user.house._id
      // const params = _id ? { _id } : {};
      const houseData = await House.find({'_id':houseId}).populate("occupants");
      return houseData
    },
    user: async (_, { _id }, context) => {
      console.log('querying user')
      const params = _id ? { _id } : {};
            if (context.user) {
              const houseId = context.user.house._id
            const userData = await User.find({house: houseId}).populate("house")
            console.log(userData)
            return userData
    }
    throw new AuthenticationError('You need to be logged in to see this')
    },
    bill: async (_, { _id }, context) => {
      const params = _id ? { _id } : {};
      if (context.user) {
        const houseId = context.user.house._id
        const billData = await Bill.find({house: houseId,isArchived:{$ne:true}})
          .populate('createdBy')
          .populate('assignedTo')
          .populate('house')
        return(billData)
      }
      throw new AuthenticationError('You need to be logged in to see this')
    },
    chore: async (_, { _id }, context) => {
      const params = _id ? { _id } : {};
      if (context.user) {
        const houseId = context.user.house._id
        console.log(houseId)
        return await Chore.find({house: houseId,isArchived:{$ne:true}})
          .populate('createdBy')
          .populate('assignedTo')
          .populate('house')
      }
      throw new AuthenticationError('You need to be logged in to see this')
    },
    message: async (_, { _id }, context) => {
      const params = _id ? { _id } : {};
      console.log(context.user)
      if (context.user) {
        const houseId = context.user.house._id
        return await Message.find({house: houseId})
          .populate('createdBy')
          .populate('house')
          .sort({createdAt: -1})
      }
      throw new AuthenticationError('You need to be logged in to see this')
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in to see this');
    }
  },

  Mutation: {
    addUserAndHouse: async (parent, args) => {
      console.log(args)
      const { firstName, lastName, email, password, mobile, photo, address, code } = args

      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        mobile: mobile,
        photo: photo
      }
      console.log(userData)
      const houseData = {
        address: address,
        code: code
      }

      if(!houseData.address){
        let lookupHouse = await House.findOne({code:houseData.code})
        if(!lookupHouse){
          throw new AuthenticationError('No house found with this code')
        }
        let user = await User.create(args);
        await User.findOneAndUpdate({ email }, { $push: { house: lookupHouse } })
        await House.findOneAndUpdate({code:houseData.code}, { $push: { occupants: user } })
        user = await User.findOne({ email }).populate("house");
        const token = signToken(user);
        return { token, user };
      }
      else{
        console.log(houseData)
        let user = await User.create(args);
        const newHouse = await House.create(houseData);
        await User.findOneAndUpdate({ email }, { $push: { house: newHouse } })
        await House.findOneAndUpdate({ address }, { $push: { occupants: user } })
        user = await User.findOne({ email }).populate("house");
        const token = signToken(user);
        console.log(token)
        return { token, user };
      }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email }).populate("house");

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      console.log(user)
      const token = signToken(user);
      console.log('here is the token')
      console.log(token)
      return { token, user };
    },
    uploadFile: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;

      // Invoking the `createReadStream` will return a Readable Stream.
      // See https://nodejs.org/api/stream.html#stream_readable_streams
      const stream = createReadStream();
      const pathName = path.join(__dirname, '..', '..', `client/public/images/${filename}`)
      console.log(pathName)
      // This is purely for demonstration purposes and will overwrite the
      // local-file-output.txt in the current working directory on EACH upload.
      const out = require('fs').createWriteStream(pathName);
      await stream.pipe(out);
      // await finished(out);

      return { url: pathName };
    },

    addMessage: async (parent,args,context) =>{
      console.log('received message!')
      if (context.user) {
        console.log(context.user)
        const message = await Message.create(args)
        console.log(message)
        const messageId = message._id
        console.log('message ID: '+messageId)
        let userData = await User.findOne({'_id':context.user._id})
        console.log('context user id: '+context.user._id)
        console.log(userData)
        let houseData = await House.findOne({'_id':context.user.house._id})
        console.log(houseData)
        let messageData = await Message.findById(messageId)
        console.log(messageData)
        return Message.findOneAndUpdate({_id: messageId}, { house: houseData, createdBy: userData }, {new:true} )
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    addChore: async (parent, { name, assignedTo, dueAt },context) =>{
      console.log('adding a chore!')
      if (context.user) {
        let assignedToUser = await User.findOne({'_id':assignedTo})
        console.log(assignedToUser)
        console.log(context.user)
        const newChore = {
          name:name,
          dueAt: dueAt
        }
        const chore = await Chore.create(newChore)
        console.log(chore)
        const choreId = chore._id
        // console.log('message ID: '+messageId)
        let userData = await User.findOne({'_id':context.user._id})
        // console.log('context user id: '+context.user._id)
        console.log(userData)
        let houseData = await House.findOne({'_id':context.user.house._id})
        // console.log(houseData)
        // let choreData = await ChorefindById(choreId)
        // console.log(choreData)
        return Chore.findOneAndUpdate({_id: choreId}, { 
          house: houseData, 
          createdBy: userData, 
          assignedTo: assignedToUser
        }, {new:true} )
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    addBill: async (parent, { name, assignedTo, dueAt, amount },context) =>{
      console.log('adding a bill!')
      if (context.user) {
        let assignedToUser = await User.findOne({'_id':assignedTo})
        console.log(assignedToUser)
        console.log(context.user)
        const newBill = {
          name:name,
          dueAt: dueAt,
          amount: amount
        }
        const bill = await Bill.create(newBill)
        console.log(bill)
        const billId = bill._id
        // console.log('message ID: '+messageId)
        let userData = await User.findOne({'_id':context.user._id})
        // console.log('context user id: '+context.user._id)
        // console.log(userData)
        let houseData = await House.findOne({'_id':context.user.house._id})
        // console.log(houseData)
        // let choreData = await ChorefindById(choreId)
        // console.log(choreData)
        return Bill.findOneAndUpdate({_id: billId}, { 
          house: houseData, 
          createdBy: userData, 
          assignedTo: assignedToUser
        }, {new:true} )
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    editChore: async (parent, { _id, complete, isArchived }, context) =>{
      console.log('editing a chore!')
      if (context.user) {

        if(isArchived){
          let choreData = await Chore.findOneAndUpdate({'_id':_id},{
            isArchived:true
          }, {new:true} )
          console.log(choreData)
          return choreData  
        }

        if(!complete){
        var completedAt = new Date()
        }
        // let assignedToUser = await User.findOne({'_id':assignedTo})
        // console.log(assignedToUser)
        // console.log(context.user)
        // const editChore = {
        //   name:name,
        //   assignedTo,
        //   dueAt,
        //   complete
        // }
        // const chore = await Chore.create(newChore)
        // console.log(chore)
        // const choreId = chore._id
        // // console.log('message ID: '+messageId)
        // let userData = await User.findOne({'_id':context.user._id})
        // // console.log('context user id: '+context.user._id)
        // // console.log(userData)
        // let houseData = await House.findOne({'_id':context.user.house._id})
        // // console.log(houseData)
        let choreData = await Chore.findOneAndUpdate({'_id':_id},{
          completedAt:completedAt?completedAt:null,
          complete:!complete
        }, {new:true} )
        console.log(choreData)
        return choreData
        // // console.log(choreData)
        // return Chore.findOneAndUpdate({_id: choreId}, { 
        //   house: houseData, 
        //   createdBy: userData, 
        //   assignedTo: assignedToUser
        // }, {new:true} )
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    editBill: async (parent, { _id, paid, isArchived }, context) =>{
      console.log('editing a bill!')
      if (context.user) {
        
        if(isArchived){
          let billData = await Bill.findOneAndUpdate({'_id':_id},{
            isArchived:true
          }, {new:true} )
          console.log(billData)
          return billData  
        }

        if(!paid){
        var paidAt = new Date()
        }
        // let assignedToUser = await User.findOne({'_id':assignedTo})
        // console.log(assignedToUser)
        // console.log(context.user)
        // const editChore = {
        //   name:name,
        //   assignedTo,
        //   dueAt,
        //   complete
        // }
        // const chore = await Chore.create(newChore)
        // console.log(chore)
        // const choreId = chore._id
        // // console.log('message ID: '+messageId)
        // let userData = await User.findOne({'_id':context.user._id})
        // // console.log('context user id: '+context.user._id)
        // // console.log(userData)
        // let houseData = await House.findOne({'_id':context.user.house._id})
        // // console.log(houseData)
        let billData = await Bill.findOneAndUpdate({'_id':_id},{
          paidAt:paidAt?paidAt:null,
          paid:!paid
        }, {new:true} )
        console.log(billData)
        return billData
        // // console.log(choreData)
        // return Chore.findOneAndUpdate({_id: choreId}, { 
        //   house: houseData, 
        //   createdBy: userData, 
        //   assignedTo: assignedToUser
        // }, {new:true} )
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  
};

module.exports = resolvers;
