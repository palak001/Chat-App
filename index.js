var express = require('express');
var socket = require('socket.io');

//Express app setup
var app = express();

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html')
// });

var server = app.listen(4000, function(){
  console.log('listening for requests on port 4000');
});

// Static files
app.use(express.static('public'));

//Socket setup & pass server
var io = socket(server);//socket.io now works on this server
io.on('connection', function(socket) {
  console.log('made socket connection', socket.id);

  //handle chat events
  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });
});
