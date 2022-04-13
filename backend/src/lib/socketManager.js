import { io } from '../main';
import Push from '../models/push';
import Chat from '../models/chat';
import mongoose from 'mongoose';
// nickname: socket.id
let nicktoId = {};

// 모든 방에 대해 현재 방 내부 사람들의 값을 알려줌
const EmitNumberofPeople = () => {
  for (const room of io.sockets.adapter.rooms.keys()) {
    console.log(
      'room : ',
      room,
      ' 인원 : ',
      io.sockets.adapter.rooms.get(room).size,
    );
    io.sockets
      .in(room)
      .emit('numberOfpeople', io.sockets.adapter.rooms.get(room).size);
  }
};

const socketManager = (socket) => {
  console.log('사용자가 접속하였습니다.');

  // 모든 방에 대해서 10초 마다 현재 방 인원의 개수를 보냄
  // let RoomCount = setInterval(EmitNumberofPeople, 10 * 1000);

  socket.on('login', (data) => {
    console.log(data.user.nickname, '님이 로그인하였습니다.');
    socket.user = data.user;

    nicktoId[data.user.nickname] = socket.id;
    const rep = {
      user: socket.user,
    };
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
      event: 'roomin',
      user: socket.user,
      room: socket.room,
      numberOfPeople: io.sockets.adapter.rooms.get(socket.room.name).size,
    };

    console.log(
      socket.room.name,
      ' 방 인원 :',
      io.sockets.adapter.rooms.get(socket.room.name).size,
    );

    io.sockets.in(socket.room.name).emit('roomin', rep);
  });

  socket.on('leave', (data) => {
    // console.log(
    //   socket.user.nickname,
    //   '님이 ',
    //   //  socket.room이라는 객체가 원래 없다면 변경
    //   socket.room.name,
    //   '에서 퇴장하셨습니다.',
    // );

    const rep = {
      event: 'roomout',
      user: socket.user,
      room: socket.room,
      numberOfPeople: io.sockets.adapter.rooms.get(socket.room.name).size,
    };

    // console.log(
    //   socket.room.name,
    //   ' 방 인원 :',
    //   io.sockets.adapter.rooms.get(socket.room.name).size,
    // );

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
    const res = {
      user: socket.user,
      data: message.data,
    };

    // 모든 namespace ('/') 내 roomId에 해당하는 room에 message를 송신
    io.sockets.in(socket.room.name).emit('message', res);

    const data = {
      _id: mongoose.Types.ObjectId(),
      sender: socket.user.id,
      room: socket.room.name,
      data: message.data,
      user: socket.user,
    };

    console.log('data : ', data);
    // 채팅 내용 저장
    const chat = new Chat(data);

    try {
      await chat.save();
    } catch (e) {
      console.log('Save chat error: ', e);
    }
  });

  // 'message' 이벤트를 받았을 때의 처리
  socket.on('moreMessage', async (message) => {
    // 해당 room 채팅 내용 획득
    try {
      const chats = await Chat.find({ room: socket.room.name })
        .sort({ publishedDate: -1 })
        .limit(200)
        .exec();

      io.to(nicktoId[socket.user.nickname]).emit('moreMessage', chats);
    } catch (e) {
      console.log('Save chat error: ', e);
    }
  });
  /**
   * @brief push 알림 구현
   *
   * 푸쉬 방향 : socket.user.nicname -> data.receiver.nickname
   * 푸쉬 타입 : data.type => post, comment, reply, like, follow
   */
  socket.on('push', async (data) => {
    // console.log(data);
    let res = {
      _id: mongoose.Types.ObjectId(),
      sender: socket.user.nickname,
      receiver: data.receiver.nickname,
      type: data.type,
      Info: data.info,
    };

    if (res.sender != res.receiver) {
      if (Object.keys(nicktoId).includes(data.receiver.nickname)) {
        res = { ...res, publishedDate: new Date() };

        // 수신자가 현재 접속 중일 경우 바로 push
        io.to(nicktoId[data.receiver.nickname]).emit('push', res);
        const push = new Push(res);

        try {
          await push.save();
        } catch (e) {
          console.log('Save push error: ', e);
        }
      } else {
        // 접속 중이지 않을 경우 DB에 해당 내역 삽입
        const push = new Push(res);

        try {
          await push.save();
          console.log('Save push data');
        } catch (e) {
          console.log('Save push error: ', e);
        }
      }
    }
  });
};

export default socketManager;
