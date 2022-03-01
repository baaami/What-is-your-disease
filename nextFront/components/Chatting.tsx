import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Box from 'assets/img/profile.svg'
import CloseIcon from 'assets/img/close_icon.svg'
import Icon from 'assets/img/chat_title_icon.svg'
import styled from 'styled-components'
import ChattingLists from './ChattingLists'
import ChattingRoom from './ChattingRoom'
import socketIOClient, { Socket } from 'socket.io-client'
import { currentUserInfo } from 'store/userInfo'
import { useRecoilState } from 'recoil'

// const manager = new Manager('http://localhost:4000', {
//   autoConnect: false,
// })
// const socket = manager.socket('/')
const Chatting = () => {
  const [userInfo] = useRecoilState(currentUserInfo)
  const [vis_chat, setVisChat] = useState(false)
  const [vis_room, setVisRoom] = useState(false)
  const [current_room, setCurrentRoom] = useState('')
  const [socket, setSocket] = useState<Socket>({} as Socket)
  const chat_box_ref = useRef<HTMLDivElement>(null)
  // /* 어딜 클릭했는지 확인 */
  // const onClickInsideDetector = (e: any) => {
  //   if (chat_box_ref && chat_box_ref!.contains(e.target)) {
  //     /** CLICK INSIDE -> DO NOTHING */
  //   } else {
  //     if (e.target.alt === 'profile') return
  //     /* CLICK OUTSIDE -> SELECT CLOSE */
  //     setVisChat(false)
  //   }
  // }

  // /* 클릭시 닫힘 처리  */
  // useEffect(() => {
  //   window.addEventListener('mousedown', onClickInsideDetector)

  //   return () => {
  //     window.removeEventListener('mousedown', onClickInsideDetector)
  //   }
  // }, [])

  useEffect(() => {
    setSocket(socketIOClient('http://localhost:4000'))

    return () => {
      console.log('component unmount')
      socket.emit('leave')
    }
  }, [])

  const joinRoom = (room_name: string) => {
    console.log(`채팅방 조인 : ${room_name}`)
    setCurrentRoom(room_name)
    socket.emit('join', {
      user: {
        id: userInfo._id,
        nickname: userInfo.info.nickname,
      },
      room: {
        name: room_name,
      },
    })
  }

  return (
    <>
      <OpenChattingBox onClick={() => setVisChat(!vis_chat)}>
        <Image src={Box} width="50px" height="50px" alt="채팅 여는 이미지" />
      </OpenChattingBox>
      <ChattingBox ref={chat_box_ref} is_vis={vis_chat}>
        <ChattingBoxHeader>
          <Title>
            DR.U 채팅방
            <Image src={Icon} alt="아이콘" />
          </Title>
          <CloseButton onClick={() => setVisChat(false)}>
            <Image src={CloseIcon} alt="닫기 버튼" />
          </CloseButton>
        </ChattingBoxHeader>
        {current_room !== '' ? (
          <ChattingRoom socket={socket} current_room={current_room} />
        ) : (
          <ChattingLists clickEnter={(e) => joinRoom(e)} />
        )}
      </ChattingBox>
    </>
  )
}

export default React.memo(Chatting, (p, n) => {
  return p === n
})

const OpenChattingBox = styled.button`
  /*둥둥 떠다니기 애니메이션*/
  @keyframes arrowShaking {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(5px);
    }

    100% {
      transform: translateY(0);
    }
  }
  position: fixed;
  bottom: 20px;
  right: 20px;
  transition: all 0.21s;
  z-index: 10000;
  &:hover {
    animation: arrowShaking 1.5s infinite;
  }
`
const ChattingBox = styled.div<{ is_vis?: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 400px;
  height: 500px;
  background-color: #fff;
  border: 1px solid #1850a3;
  border-radius: 5px;
  transition: all 0.21s;
  z-index: 10001;

  opacity: ${(props) => (props.is_vis ? 1 : 0)};
  transform: ${(props) =>
    props.is_vis ? 'translateY(0px)' : 'translateY(12px)'};
  visibility: ${(props) => (props.is_vis ? 'visible' : 'hidden')};
`
const Title = styled.h3`
  margin-bottom: 0;
  font-weight: 700;
  color: #1850a3;

  img {
    width: 25px !important;
  }
`
const ChattingBoxHeader = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px solid #1850a3;
`
const CloseButton = styled.button`
  transition: all 0.4s ease-in;
  &:hover {
    transform: rotate(360deg);
  }
`
