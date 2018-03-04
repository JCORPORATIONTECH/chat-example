var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// 소켓연결 구문이 겨우 이정도에서 끝
// 클라이언트에서 chatMsg로 방출한 메시지를 서버에서 받고
// 클라이언트에서도 받는다
// 서버에서 받아주는 구문이 없이는 클라이언트에서 보여줄 수가 없다.
io.on('connection', (socket) => {
  socket.on('chatMsg', (msg) =>{
  	console.log(msg);
    io.emit('chatMsg', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
