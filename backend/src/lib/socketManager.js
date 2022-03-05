import { io } from '../main';
import Push from '../models/push';
import Chat from '../models/chat';

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
  socket.on('message', async (message) => {
    console.log(socket.user);

    const res = {
      user: socket.user,
      data: message.data,
    };

    // 모든 namespace ('/') 내 roomId에 해당하는 room에 message를 송신
    io.sockets.in(socket.room.name).emit('message', res);

    // 채팅 내용 저장
    const chat = new Chat({
      sender: socket.user.id,
      room: socket.room.name,
      data: message.data,
    });

    try {
      await chat.save();
    } catch (e) {
      ctx.throw(500, e);
    }
  });

  /**
   * @brief push 알림 구현
   *
   * 푸쉬 방향 : socket.user.nicname -> data.receiver.nickname
   * 푸쉬 타입 : data.type => post, comment, reply, like, follow
   */
  socket.on('push', async (data) => {
    const res = {
      sender: socket.user.nickname,
      receiver: data.receiver.nickname,
      type: data.type,
      Info: data.info,
      publishedDate: {
        type: Date,
        default: Date.now, // 현재 날짜를 기본값으로 지정
      },
    };

    if (data.receiver.nickname in Object.keys(nicktoId)) {
      // 수신자가 현재 접속 중일 경우 바로 push
      socket.broadcast.to(nicktoId[data.receiver.nickname]).emit('push', res);
    } else {
      // 접속 중이지 않을 경우 DB에 해당 내역 삽입
      const push = new Push(res);

      try {
        await push.save();
      } catch (e) {
        console.log(500, e);
      }
    }
  });
};

export default socketManager;
