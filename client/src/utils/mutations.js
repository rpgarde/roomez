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
