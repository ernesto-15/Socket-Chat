const { io } = require('../server');
const { User } = require('../classes/user');

const users = new User();

//Server connection
io.on('connection', (client) => {
  console.log('client connected');

  //Listen to joinChat event
  client.on('joinChat', (user, callback) => {
    if (!user.name) {
      return callback({
        error: true,
        message: 'Name is required',
      });
    }
    const people = users.addPerson(client.id, user.name);
    callback(people)
  });
});
