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
    house: async (_, { _id }) => {
      const params = _id ? { _id } : {};
      return await House.find(params).populate("occupants");
    },
    user: async (_, { _id }) => {
      const params = _id ? { _id } : {};
      return await User.find(params).populate("house")
    },
    bill: async (_, { _id }, context) => {
      const params = _id ? { _id } : {};
      if (context.user) {
        const houseId = context.user.house._id
        return await Bill.find(params)
          .populate('createdBy')
          .populate('assignedTo')
          .populate('house')
          .where('._id').in('house').equals(houseId)
      }
      throw new AuthenticationError('You need to be logged in to see this')
    },
    chore: async (_, { _id }, context) => {
      const params = _id ? { _id } : {};
      if (context.user) {
        const houseId = context.user.house._id
        return await Chore.find(params)
          .populate('createdBy')
          .populate('assignedTo')
          .populate('house')
          .where('._id').in('house').equals(houseId)
      }
      throw new AuthenticationError('You need to be logged in to see this')
    },
    message: async (_, { _id }, context) => {
      const params = _id ? { _id } : {};
      console.log(context.user)
      if (context.user) {
        const houseId = context.user.house._id
        return await Message.find(params)
          .populate('createdBy')
          .populate('house')
          .where('._id').in('house').equals(houseId)
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
      console.log(houseData)
      let user = await User.create(args);
      const newHouse = await House.create(houseData);
      await User.findOneAndUpdate({ email }, { $push: { house: newHouse } })
      await House.findOneAndUpdate({ address }, { $push: { occupants: user } })
      user = await User.findOne({ email }).populate("house");

      // TODO: Add a condition where if the address is null, look for a current house. 

      const token = signToken(user);
      console.log(token)
      return { token, user };

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
        let userData = await User.findOne({id:context.user._id}).exec()
        console.log('context user id: '+context.user._id)
        console.log(userData)
        let houseData = await House.findOne({id:context.user.house._id}).exec()
        console.log(houseData)
        let messageData = await Message.findById(messageId)
        console.log(messageData)
        return Message.findOneAndUpdate({_id: messageId}, { house: houseData, createdBy: userData }, {new:true} )
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },
};

module.exports = resolvers;
