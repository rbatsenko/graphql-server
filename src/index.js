import cors from 'cors';
import express from 'express';
import uuidv4 from 'uuid/v4';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users[1],
  },
});

server.applyMiddleware({ app, path: '/graphql' });

sequelize.sync().then(async () => {
  app.listen({ port: 4000 }, () => {
    console.log('Apollo Server on http://localhost:4000/graphql');
  });
});
