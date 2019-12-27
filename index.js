var express = require('express');
var socket = require('socket.io');

//Express app setup
var app = express();
var port = process.env.PORT || 3000;
var server = app.listen(port, function(){
  console.log('listening for requests on port' + port);
});

// Static files
app.use(express.static('public'));

//Socket setup & pass server
var io = socket(server);
io.on('connection', function(socket) {
  console.log('made socket connection', socket.id);

  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
    });

  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
  });

});
