const {Bill,Chore,House,Message,User} = require("../models");

const resolvers = {
  Query: {
    house: async () => {
      return await House.find({}).populate("occupants");
    },
    user: async () => {
      return await User.find({}).populate("house")
    },
  },
  // Mutation: {
  //   createMatchup: async (parent, args) => {
  //     const matchup = await Matchup.create(args);
  //     return matchup;
  //   },
  //   createVote: async (parent, { _id, techNum }) => {
  //     const vote = await Matchup.findOneAndUpdate(
  //       { _id },
  //       { $inc: { [`tech${techNum}_votes`]: 1 } },
  //       { new: true }
  //     );
  //     return vote;
  //   },
  // },
};
// app.get('/api/houses', async (req, res) => {
//   let data = await House.find({}).populate("occupants")
//   res.status(200).json(data)
// })

// app.get('/api/users', async (req, res) => {
//   let data = await User.find({}).populate('house')
//   res.status(200).json(data)
// })

module.exports = resolvers;
