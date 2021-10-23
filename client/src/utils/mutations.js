import { gql } from '@apollo/client';


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

export const ADD_USER = gql`
  mutation addUser(
      $firstName: String!, 
      $lastName: String!, 
      $email: String!, 
      $mobile: String!,
      $password: String!,
      $photo: String!      
      ) {
    addUser(
      firstName: $firstName, 
      lastName: $lastName, 
      email: $email, 
      mobile: $mobile,
      password: $password,
      photo: $photo
      ) {
      token
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;
