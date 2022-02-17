const express = require('express');
const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');
const httpServer = createServer(app);
const io = new Server(httpServer);

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  console.log(token);
  if (token !== 'abc') return;
  next();
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('hello', 'world');
  socket.on('submitForm', () => {
    console.log('a form has been submitted');
    io.emit('newUser');
  });
});

const admin = require('./controllers/admin');
const authenticate = require('./controllers/authenticate');
const user = require('./controllers/user');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authenticate);
app.use('/api/admin', admin);
app.use('/api/user', user);

module.exports = { app, httpServer };
