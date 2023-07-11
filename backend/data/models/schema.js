export const typeDefs = `#graphql
 type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    hobbies:[String!]
 }
 type Address {
    id: ID
    flat_no: Int!
    address_field: String!
 }
 type Query{
    address: [Address]
    user: [User]
 } 
 type Mutation {
    createUser(first_name: String!, last_name: String!, email: String!, hobbies: [String!]): User,
    createAddress(flat_no: Int!, address_field: String!): Address,
    deleteUser(email: String!): User,
    updateUser(email: String!): User,
  }
`