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
  
  type Auth{
    token: ID!
    user: User
  }
  
  type Query {
    house(_id: String): [House]
    user(_id: String): [User]
    bill(_id: String): [Bill]
    chore(_id: String): [Chore]
    message(_id: String): [Message]
    me: User
  }

  type Mutation{
    addUser(
      firstName: String!, 
      lastName: String!, 
      email: String!, 
      mobile: String!,
      password: String!,
      photo: String!): Auth
    login(email: String!, password: String!): Auth
  }
`


module.exports = typeDefs;
