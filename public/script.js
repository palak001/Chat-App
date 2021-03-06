//   //Make connection
//   var socket = io.connect('http://localhost:`${port}`');
  var socket = io();

  // query dom
  var output = document.getElementById('output');
  var send = document.getElementById('send');
  var message = document.getElementById('message');
  var typing = document.getElementById('typing');
  var handle = document.getElementById('handle');
  //emit events

  send.addEventListener('click', function(e){
    e.preventDefault(); // prevents page reloading
    if(message.value == "" || message.value == " "){
      alert("Empty string now allowed!");
      return false;
    }
    if(handle.value == ""){
      alert("Enter handle !");
      return false;
    }
    socket.emit('chat', {message: message.value, handle: handle.value});
    message.value="";
  });

  message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
  });

  //listen for events
  socket.on('chat', function(data){
    console.log(data.value);
    typing.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
  });
  //listen for typing
  socket.on('typing', function(data){
    typing.innerHTML = '<p><em>' + data + ' is typing </em></p>';
  });
