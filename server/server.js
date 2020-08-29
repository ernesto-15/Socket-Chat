const express = require('express');
const path = require('path');
const http = require('http');
const socket = require('socket.io');

//Start Express
const app = express();

//Create a http server
let server = http.createServer(app);

//Port
const port = process.env.PORT || 8080;

//Static content
app.use('/', express.static(path.resolve(__dirname, '../public')));

//Backend communication - start
module.exports.io = socket(server);

//Socket configuration
require('./sockets/socket-back')

//Listen to port
server.listen(port, (err) => {
  if (err) throw new Error(err);
  console.log(`Listening to port ${port}`);
});
