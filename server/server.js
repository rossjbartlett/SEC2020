const app = require('express')();
const http = require('http').createServer(app);
const parser = require('socket.io-json-parser');
const io = require('socket.io')(http, { parser });

io.on('connection', socket => {
  socket.on('request', msg => {
    const response = msg.toUpperCase();
    socket.emit('response', response);
  });
  socket.on('disconnect', () => {});
});

http.listen(process.env.PORT || 4000, () => {
  console.log('listening on:', http.address());
});
