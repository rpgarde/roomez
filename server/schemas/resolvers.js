const {Bill,Chore,House,Message,User} = require("../models");

const resolvers = {
  Query: {
    house: async (_,{ _id }) => {
      const params = _id ? { _id } : {};
      return await House.find(params).populate("occupants");
    },
    user: async (_,{ _id }) => {
      const params = _id ? { _id } : {};
      return await User.find(params).populate("house")
    },
    bill: async(_,{ _id }) => {
      const params = _id ? { _id } : {};
      return await Bill.find(params)
        .populate('createdBy')
        .populate('assignedTo')
        .populate('house')
    },
    chore: async(_,{ _id }) => {
            const params = _id ? { _id } : {};
      return await Chore.find(params)
        .populate('createdBy')
        .populate('assignedTo')
        .populate('house')
    },
    message: async(_,{ _id }) => {
      const params = _id ? { _id } : {};
      return await Message.find(params)
        .populate('createdBy')
        .populate('house')
    }
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

module.exports = resolvers;
