import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;

/* const users = {
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

export default {
  users,
  messages,
}; */
