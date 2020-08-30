const { io } = require('../server');
const { User } = require('../classes/user');
const {createMessage} = require('../utils/util')

const users = new User();

//Server connection
io.on('connection', (client) => {
  console.log('client connected');

  //Listen to joinChat event
  client.on('joinChat', (user, callback) => {
    if (!user.name || !user.room) {
      return callback({
        error: true,
        message: 'Name and room are required',
      });
    }
    
    //Join person to a specific room
    client.join(user.room)

    const person = users.addPerson(client.id, user.name, user.room);
    //List all people connected in the chat in a specific room
    client.broadcast.to(user.room).emit('listPerson', users.getPeopleByRoom(user.room));
    //Server response
    callback({
      joined: person,
      allInRoom: users.getPeopleByRoom(user.room)
    });

    //Client disconnection
    client.on('disconnect', () => {
      const deletedPerson = users.deletePerson(client.id);
      client.broadcast.to(deletedPerson.room).emit('sendMessage', createMessage('Admin', `${deletedPerson.name} left chat`));
      client.broadcast.to(deletedPerson.room).emit('listPerson', users.getPeopleByRoom(deletedPerson.room));
    });
  });


  //Listen to event sendMessage
  client.on('sendMessage', (data) => {
    const person = users.getPerson(client.id)
    const message = createMessage(person.name, data.message)
    //Send message to a specific room
    client.broadcast.to(person.room).emit('sendMessage', message)
  })

  //Listen to event privateMessage
  client.on('privateMessage', (data) => {
    const person = users.getPerson(client.id)
    const message = createMessage(person.name, data.message)
    client.broadcast.to(data.to).emit('privateMessage', message)
  })

});
