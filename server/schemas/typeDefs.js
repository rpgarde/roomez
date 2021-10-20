const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type House{
    _id: ID!
    address: String!
    occupants: [User]!
    photo: String
    code: String!
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    mobile: String!
    email: String!
    password: String!
    house: House
  }
  
  type Bill {
    _id: ID!
    createdAt: String!
    name: String!
    dueAt: String
    house: House!
    createdBy: User!
    assignedTo: User
    amount: Int!
    paid: Boolean!
    paidAt: String
    photo: String
  }

  type Chore{
    _id: ID!
    createdAt: String!
    name: String!
    dueAt: String
    house: House!
    createdBy: User!
    assignedTo: User
    complete: Boolean!
    completedAt: String
    photo: String
  }
  type Message{
    _id: ID!
    createdAt: String!
    message: String
    house: House!
    createdBy: User!
    photo: String
  }
  type Query {
    house: [House]
    user: [User]
    bill: [Bill]
    chore: [Chore]
    message: [Message]
  }
`

// const typeDefs = gql`
//   type Tech {
//     _id: ID!
//     name: String!
//   }

//   type Matchup {
//     _id: ID!
//     tech1: String!
//     tech2: String!
//     tech1_votes: Int
//     tech2_votes: Int
//   }

//   type Query {
//     tech: [Tech]
//     matchups(_id: String): [Matchup]
//   }

//   type Mutation {
//     createMatchup(tech1: String!, tech2: String!): Matchup
//     createVote(_id: String!, techNum: Int!): Matchup
//   }
// `;

module.exports = typeDefs;
