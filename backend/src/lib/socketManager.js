import { io } from '../main';
import Push from '../models/push';

// nickname: socket.id
let nicktoId = {};

const socketManager = (socket) => {
  console.log('사용자가 접속하였습니다.');
  console.log(socket.user);
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
    console.log(data);
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
      event: 'roomin',
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
      event: 'roomout',
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
    console.log(socket.user);
    console.log(socket.user.nickname + ':' + message.data);

    const res = {
      user: socket.user,
      data: message.data,
    };

    // 모든 namespace ('/') 내 roomId에 해당하는 room에 message를 송신
    io.sockets.in(socket.room.name).emit('message', res);
  });

  /**
   * @brief push 알림 구현
   *
   * 푸쉬 방향 : socket.user.nicname -> data.receiver.nickname
   * 푸쉬 타입 : data.type => post, comment, reply, like, follow
   */
  socket.on('push', async (data) => {
    // nicktoId array에 data.receiver.nickname이 존재할 경우 바로 push
    if (data.receiver.nickname in Object.keys(nicktoId)) {
      const res = {
        sender: socket.user.nickname,
        receiver: data.receiver.nickname,
        type: data.type,
        publishedDate: {
          type: Date,
          default: Date.now, // 현재 날짜를 기본값으로 지정
        },
      };

      socket.broadcast.to(nicktoId[data.receiver.nickname]).emit('push', res);
    } else {
      // 존재하지 않을 경우 DB에 해당 내역 삽입
      const push = new Push({
        sender: socket.user.nickname,
        receiver: data.receiver.nickname,
        type: data.type,
      });

      try {
        await push.save();
      } catch (e) {
        console.log(500, e);
      }
    }
  });
};

export default socketManager;
