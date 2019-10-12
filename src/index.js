import cors from 'cors';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

app.use(cors());

const schema = gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User
    car: Car

    messages: [Message!]!
    message(id: ID!): Message!
  }

  type User {
    id: ID!
    username: String!
    age: Int
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

const users = {
  1: {
    id: '1',
    username: 'Roman Batsenko',
    age: 24,
  },
  2: {
    id: '2',
    username: 'Dave Graham',
  },
};

const messages = {
  1: {
    id: '1',
    text: 'Hello World!',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'Hey!',
    userId: '2',
  },
};

const resolvers = {
  Query: {
    users: () => Object.values(users),
    user: (parent, { id }) => users[id],
    me: (parent, args, { me }) => me,
    messages: () => Object.values(messages),
    message: (parent, { id }) => messages[id],
    car: () => ({
      manufacturer: 'Ford',
      model: 'Focus',
      productionYear: 2015,
    }),
  },

  User: {
    username: ({ username }) => username,
  },

  Message: {
    user: ({ userId }) => users[userId],
  },
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1],
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
  console.log('Apollo Server on http://localhost:8000/graphql');
});
