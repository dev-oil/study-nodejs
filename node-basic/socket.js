const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http').createServer(app);
const io = new Server(http);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/socket', (req, res) => {
  res.render('socket.ejs');
});

io.on('connection', (socket) => {
  console.log('클라이언트 접속');

  // 모든 클라이언트에게 메시지 보내기
  socket.on('user-send', (data) => {
    console.log(data);
    io.emit('broadcast', `[전체] ${data}`);
  });

  socket.on('joinroom', () => {
    socket.join('room1');
    console.log('채팅방1에 입장했습니다.');
  });

  socket.on('room1-send', (data) => {
    io.to('room1').emit('broadcast', `[채팅방1] ${data}`);
  });
});

http.listen(2300, () => {
  console.log('2300 포트로 대기중...');
});
