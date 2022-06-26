import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const ADD_USER_AND_HOUSE = gql`
  mutation addUserAndHouse(
      $firstName: String!, 
      $lastName: String!, 
      $email: String!, 
      $mobile: String!,
      $password: String!,
      $photo: String!,
      $address: String!,
      $code: String!      
      ) {
    addUserAndHouse(
      firstName: $firstName, 
      lastName: $lastName, 
      email: $email, 
      mobile: $mobile,
      password: $password,
      photo: $photo,
      address: $address,
      code: $code
      ) {
      token
      user {
        _id
        firstName
        lastName
        house{
        _id
        address
      }
      }
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation addMessage(      
      $message: String!
      $photo: String
) {
    addMessage(message: $message, photo: $photo) {
      _id
      createdAt
      message
      createdBy {firstName}
      photo
    }
  }
`;

export const ADD_CHORE = gql`
  mutation addChore(      
      $name: String!
      $dueAt: String
      $photo: String 
      $assignedTo: String
) {
    addChore(name: $name, dueAt: $dueAt, photo: $photo, assignedTo: $assignedTo) {
      _id
      createdAt
      name
      createdBy {firstName}
      dueAt
      photo
    }
  }
`;

export const ADD_BILL = gql`
  mutation addBill(      
      $name: String!
      $dueAt: String
      $photo: String 
      $assignedTo: String
      $amount: Float!
) {
    addBill(name: $name, dueAt: $dueAt, photo: $photo, assignedTo: $assignedTo, amount: $amount) {
      _id
      createdAt
      name
      createdBy {firstName}
      amount
      dueAt
      photo
    }
  }
`;

export const EDIT_CHORE = gql`
  mutation editChore( 
      $_id:ID!     
      $name: String
      $dueAt: String
      $photo: String 
      $assignedTo: String
      $complete: Boolean
      $isArchived: Boolean
) {
    editChore(_id: $_id, name: $name, dueAt: $dueAt, photo: $photo, assignedTo: $assignedTo, complete:$complete, isArchived:$isArchived) {
      _id
      createdAt
      name
      createdBy {firstName}
      dueAt
      complete
      photo
      isArchived
    }
  }
`;

export const EDIT_BILL = gql`
  mutation editBill( 
      $_id:ID!     
      $name: String
      $dueAt: String
      $photo: String 
      $assignedTo: String
      $paid: Boolean
      $isArchived: Boolean
) {
    editBill(_id: $_id, 
    name: $name, 
    dueAt: $dueAt, 
    photo: $photo, 
    assignedTo: $assignedTo, 
    paid:$paid,
    isArchived: $isArchived
    ) {
      _id
      createdAt
      name
      createdBy {firstName}
      dueAt
      paid
      photo
      isArchived
    }
  }
`;

export const EDIT_HOUSE_PHOTO = gql`
  mutation editHousePhoto(      
      $_id: ID!
      $photo: String
  ) {
    editHousePhoto(_id: $_id, photo: $photo) {
      _id
      photo
    }
  }
`;
