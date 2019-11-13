import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User
    car: Car

    messages: [Message!]!
    message(id: ID!): Message!
  }

  type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
  }

  type User {
    id: ID!
    username: String!
    age: Int
    messages: [Message!]
  }

  type Message {
    id: ID!
    text: String!
    user: User!
  }

  type Car {
    manufacturer: String!
    model: String!
    productionYear: Int!
  }
`;

export default typeDefs;