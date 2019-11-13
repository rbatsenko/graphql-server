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

export default {
  users,
  messages,
};
