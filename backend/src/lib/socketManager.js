import { io } from '../main';

let enter_ids = {};

const socketManager = (socket) => {
  console.log('connect');

  // 1. 로그인 인증 확인

  socket.on('login', (user) => {
    console.log('사용자가 접속하였습니다.');
    console.dir(user);

    // login_ids에 유저아이디를 사용하여 socket.id 저장
    enter_ids[user.id] = socket.id;

    // socket에 userId 저장
    socket.userId = user.id;

    // 기존 클라이언트 ID가 없으면 클라이언트 ID를 맵에 추가
    console.log('사용자 id:', user.id);
    console.log('소켓 id:', socket.id);

    console.log(
      '접속한 클라이언트 ID 갯수 : %d',
      Object.keys(enter_ids).length,
    );
  });

  // 'message' 이벤트를 받았을 때의 처리
  socket.on('message', function (message) {
    console.log('message 이벤트를 받았습니다.');

    if (message.roomId) {
      console.log('group chat ');
      // 모든 namespace ('/') 내 roomId에 해당하는 room에 message를 송신
      io.sockets.in(message.roomId).emit('message', message);
    }
  });

  socket.on('room', (room) => {
    if (room.command == 'create') {
      console.log('create room : ', room);
      // 방 create
      socket.join(room.name);
    } else if (room.command == 'join') {
      console.log('join room : ', room);
      // 방 Join
      socket.join(room.name);
    } else if (room.command == 'leave') {
      // 방 Leave
      socket.leave(room.name);

      const message = {
        data: socket.userId + '님이 나가셨습니다',
      };

      io.sockets.in(room.name).emit('message', message);

      // 연결 종료
      socket.disconnect();

      delete enter_ids[socket.userId];

      console.log(
        roon.name,
        '방에 접속한 클라이언트 수 : %d',
        io.sockets.adapter.rooms[room.name].length,
      );
    }
  });
};

// 클라이언트에 처리 상태를 알려주기 위해 정의한 함수
// 응답 메소드;
function sendResponse(socket, command, code, message) {
  var statusObj = { command: command, code: code, message: message };
  socket.emit('response', statusObj);
}

export default socketManager;
