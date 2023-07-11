import { gql } from '@apollo/client';

export const GET_USER = gql`
 query GetUser {
  user {
    id
    first_name
    last_name
    email
    hobbies
  }
}

`;