import cors from 'cors';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import uuidv4 from 'uuid/v4';
import typeDefs from './schema';

const app = express();

app.use(cors());

const users = {
  1: {
    id: '1',
    username: 'Roman Batsenko',
    age: 24,
    messageIds: [1],
  },
  2: {
    id: '2',
    username: 'Dave Graham',
    messageIds: [2],
  },
};

let messages = {
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
  },

  Mutation: {
    createMessage: (parent, { text }, { me }) => {
      const id = uuidv4();
      const message = {
        id,
        text,
        userId: me.id,
      };

      messages[id] = message;
      users[me.id].messageIds.push(id);

      return message;
    },
    deleteMessage: (parent, { id }) => {
      if (!messages[id]) {
        return false;
      }
      messages = Object.values(messages).filter(
        message => message.id === id,
      );
      return true;
    },
  },

  User: {
    username: ({ username }) => username,
    messages: user =>
      Object.values(messages).filter(
        message => message.userId === user.id,
      ),
  },

  Message: {
    user: ({ userId }) => users[userId],
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    me: users[1],
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 4000 }, () => {
  console.log('Apollo Server on http://localhost:4000/graphql');
});
