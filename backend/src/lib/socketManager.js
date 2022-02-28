import { io } from '../main';

// nickname: socket.id
let nicktoId = {};

const socketManager = (socket) => {
  console.log('사용자가 접속하였습니다.');

  socket.on('login', (data) => {
    console.log(data.user.nickname, '님이 로그인하였습니다.');

    socket.user = data.user;

    nicktoId[data.user.id] = socket.id;

    const rep = {
      user: socket.user,
    };

    io.sockets.in(socket.room.name).emit('roomin', rep);
  });

  socket.on('join', (data) => {
    console.log(
      data.user.nickname,
      '님이 ',
      data.room.name,
      '에 입장하셨습니다.',
    );

    socket.user = data.user;
    socket.room = data.room;

    socket.join(socket.room.name);

    const rep = {
      user: socket.user,
      room: socket.room,
    };

    io.sockets.in(socket.room.name).emit('roomin', rep);
  });

  socket.on('leave', (data) => {
    console.log(
      socket.user.nickname,
      '님이 ',
      //  socket.room이라는 객체가 원래 없다면 변경
      socket.room.name,
      '에서 퇴장하셨습니다.',
    );

    const rep = {
      user: socket.user,
      room: socket.room,
    };

    io.sockets.in(socket.room.name).emit('roomout', rep);

    socket.leave(socket.room.name);
    // socket.room 초기화
    socket.room = undefined;
  });

  socket.on('disconnecton', () => {
    console.log(socket.user.nickname, '님이 연결을 끊었습니다.');
  });

  // 'message' 이벤트를 받았을 때의 처리
  socket.on('message', function (message) {
    console.log(socket.user.nickname + ':' + message.data);

    const res = {
      user: socket.user,
      data: message.data,
    };

    // 모든 namespace ('/') 내 roomId에 해당하는 room에 message를 송신
    io.sockets.in(socket.room.name).emit('message', res);
  });
};

export default socketManager;
