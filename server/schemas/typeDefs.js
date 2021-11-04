const { gql } = require('apollo-server-express');
const {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');

const typeDefs = gql`
  scalar Upload 
  type House{
    _id: ID!
    address: String!
    occupants: [User]!
    photo: String
    code: String!
  }

  type User {
    _id: ID!
    firstName: String
    lastName: String
    mobile: String
    email: String
    password: String
    house: House
    photo: String
  }
  
  type Bill {
    _id: ID!
    createdAt: String!
    name: String!
    dueAt: String
    house: House
    createdBy: User
    assignedTo: User
    amount: Float!
    paid: Boolean!
    paidAt: String
    photo: String
    isArchived:Boolean
  }

  type Chore{
    _id: ID!
    createdAt: String!
    name: String!
    dueAt: String
    house: House
    createdBy: User
    assignedTo: User
    complete: Boolean!
    completedAt: String
    photo: String
    isArchived:Boolean
  }
  type Message{
    _id: ID!
    createdAt: String!
    message: String
    house: House
    createdBy: User
    photo: String
  }
  
  type Auth{
    token: ID!
    user: User
  }

  type File {
    url: String!
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
    addUserAndHouse(
      firstName: String!, 
      lastName: String!, 
      email: String!, 
      mobile: String!,
      password: String!,
      photo: String!
      address: String!,
      code: String!     
      ): Auth
    login(email: String!, password: String!): Auth
    uploadFile(file: Upload!): File!
    addMessage(
      message: String!
      photo: String
      ): Message 
    addBill(
      name: String!
      dueAt: String
      photo: String
      amount: Float!
      assignedTo: String
      ): Bill
    addChore(
      name: String!
      dueAt: String
      assignedTo: String
      photo: String 
    ): Chore
    editChore(
      _id: ID!
      name: String
      dueAt: String
      assignedTo: String
      complete: Boolean
      photo: String 
      isArchived:Boolean
    ): Chore
    editBill(
      _id:ID!
      name:String
      dueAt:String
      assignedTo:String
      paid:Boolean
      photo:String
      isArchived:Boolean
    ): Bill
  }
`


module.exports = typeDefs;
