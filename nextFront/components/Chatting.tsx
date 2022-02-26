import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Box from 'assets/img/profile.svg'
import CloseIcon from 'assets/img/close_icon.svg'
import Icon from 'assets/img/chat_title_icon.svg'
import styled from 'styled-components'
import ChattingLists from './ChattingLists'
import ChattingRoom from './ChattingRoom'

const Chatting = () => {
  const [vis_chat, setVisChat] = useState(false)
  const [vis_room, setVisRoom] = useState(false)
  const chat_box_ref = useRef<HTMLDivElement>(null)

  /* 어딜 클릭했는지 확인 */
  const onClickInsideDetector = (e: any) => {
    if (chat_box_ref.current && chat_box_ref.current!.contains(e.target)) {
      /** CLICK INSIDE -> DO NOTHING */
    } else {
      if (e.target.alt === 'profile') return
      /* CLICK OUTSIDE -> SELECT CLOSE */
      setVisChat(false)
    }
  }

  /* 클릭시 닫힘 처리  */
  useEffect(() => {
    window.addEventListener('mousedown', onClickInsideDetector)

    return () => {
      window.removeEventListener('mousedown', onClickInsideDetector)
    }
  }, [])

  console.log('vis_chat: ', vis_chat)
  console.log('vis_room: ', vis_room)

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
        {vis_room ? (
          <ChattingRoom />
        ) : (
          <ChattingLists clickEnter={setVisRoom(true)} />
        )}
      </ChattingBox>
    </>
  )
}

export default Chatting

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
