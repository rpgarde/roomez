import { gql } from '@apollo/client';

export const QUERY_HOUSE = gql`
  query house($_id: String) {
    house(_id: $_id) {
      _id
      address
      photo
      code
      occupants{
        firstName
        lastName
        mobile
        email
      }
    }
 }
 `;

export const QUERY_USER = gql`
 query user($_id: String) {
   user(_id: $_id) {
     _id
     address
     photo
     code
     occupants{
       firstName
       lastName
       mobile
       email
     }
   }
}
`;

export const QUERY_BILL = gql`
query bill($_id: String) {
  bill(_id: $_id) {
   _id
    createdAt
    name
    dueAt
    house {
      address
    }
    createdBy {
      firstName
    }
    assignedTo {
      firstName
    }
    amount
    paid
    paidAt
    photo
  }
} `;

export const QUERY_CHORE = gql`
 query chore($_id: String) {
  chore(_id: $_id) {
    _id
    createdAt
    name
    dueAt
    house {
      address
    }
    createdBy {
      firstName
    }
    assignedTo {
      firstName
    }
    complete
    completedAt
    photo
  }
} `;

export const QUERY_MESSAGE = gql`
 query message($_id:String){
  message(_id:$_id){
      _id
      createdAt
      message
      createdBy{
        firstName
      }
      photo
    }
  }
   `;