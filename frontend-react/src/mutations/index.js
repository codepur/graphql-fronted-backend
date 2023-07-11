import { gql } from '@apollo/client';

export const CREATE_USER = gql`
 mutation  CreateUser($firstName: String!, $lastName: String! ,$email: String!,$hobbies: [String!] ){
  createUser(first_name: $firstName, last_name: $lastName ,email: $email,hobbies: $hobbies) {
    first_name,
    last_name,
    email,
    hobbies
  }
}
`
export const DELETE_USER = gql` 
 mutation deleteUser($email: String!){
  deleteUser(email: $email){
   email,
   first_name
  } 
}
`

;
