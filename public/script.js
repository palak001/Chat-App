window.onload = function(){
  //Make connection
  var socket = io.connect('http://localhost:4000');

  // query dom
  var txt = document.getElementById('m');
  var btn = document.getElementById('btn');
  var messages = document.getElementById('messages');
  //emit events
  btn.addEventListener('click', function(e){
    e.preventDefault(); // prevents page reloading
    socket.emit('chat', {txt: txt.value});
    txt.value="";
  });

  //listen for events
  socket.on('chat', function(data){
    console.log(data.value);
    messages.innerHTML += '<li>' + data.txt;
  });
};
