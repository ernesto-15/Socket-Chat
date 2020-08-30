const socket = io();

//Get params
const params = new URLSearchParams(window.location.search);
//Check name param
if (!params.has('name') || !params.has('room')) {
  window.location = 'index.html';
  throw new Error('Name and group are necessary');
}
//User from param
const user = {
  name: params.get('name'),
  room: params.get('room'),
};

//Client connection
socket.on('connect', () => {
  console.log('Connected to the server');
  //Emit joinChat event, Send user connected
  socket.emit('joinChat', user, (resp) =>
    console.log('You are connected', resp)
  );
});

//Client disconnection
socket.on('disconnect', () => console.log('Connection lost'));

//Listen to the message
socket.on('sendMessage', (message) => {
  console.log('Sever message', message);
});

//Send a private message
socket.on('privateMessage', (message) => {
  console.log('Private message', message);
});

//Sending a message
// socket.emit('sendMessage', {
//   user:
// })

//Users joining and leaving chat
socket.on('listPerson', (people) => {
  console.log('People in chat', people);
});