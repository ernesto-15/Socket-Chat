const socket = io();

//Get params
const params = new URLSearchParams(window.location.search)
//Check name param
if(!params.has('name')) {
  window.location = 'index.html'
  throw new Error('Name is necessary')
}
//User from param
const user = {
  name: params.get('name')
}

//Client conecction
socket.on('connect', () => {
  console.log('Connected to the server')
  //Emint joinChat event
  socket.emit('joinChat', user, (resp) => console.log('Users connected', resp))
});

//Client disconecction
socket.on('disconnect', () => console.log('Connection lost'));

//Send Information
socket.emit(
  'sendMessage',
  {
    user: 'Ernesto',
    message: 'Hello World',
  },
  (response) => {
    console.log('Server Response: ', response);
  }
);

//Escuchar informacion
socket.on('sendMessage', (message) => {
  console.log('Sever', message);
});
