import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import uuidv4 from 'uuid/v4';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';
import { users } from './__fixtures__/users';

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async () => ({
    models,
    me: await models.User.findByLogin('rbatsenko'),
  }),
});

server.applyMiddleware({ app, path: '/graphql' });

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  app.listen({ port: 4000 }, () => {
    console.log('Apollo Server on http://localhost:4000/graphql');
  });
});

const createUsersWithMessages = async () => {
  await models.User.create(users['rbatsenko'], {
    include: [models.Message],
  });

  await models.User.create(users['jdoe'], {
    include: [models.Message],
  });
};
