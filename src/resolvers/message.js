import uuidv4 from 'uuid/v4';

export default {
  Query: {
    messages: async (parent, args, { models }) =>
      await models.Message.findAll(),
    message: async (parent, { id }, { models }) =>
      await models.Message.findByPk(id),
  },

  Mutation: {
    createMessage: async (parent, { text }, { me, models }) =>
      await models.Message.create({
        text,
        userId: me.id,
      }),
    deleteMessage: async (parent, { id }, { models }) =>
      await models.Message.destroy({
        where: { id },
      }),
  },

  Message: {
    user: async (message, args, { models }) =>
      await models.User.findByPk(message.userId),
  },
};
