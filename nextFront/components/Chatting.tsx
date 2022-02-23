import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Box from 'assets/img/profile.svg'
import styled from 'styled-components'

const Chatting = () => {
  const [vis_chat, setVisChat] = useState(false)
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
  return (
    <>
      <OpenChattingBox onClick={() => setVisChat(!vis_chat)}>
        <Image src={Box} width="50px" height="50px" alt="채팅 여는 이미지" />
      </OpenChattingBox>
      <ChattingBox ref={chat_box_ref} is_vis={vis_chat}>
        ss
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
  &:hover 
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
  border: 1px solid #000;
  transition: all 0.21s;

  opacity: ${(props) => (props.is_vis ? 1 : 0)};
  transform: ${(props) =>
    props.is_vis ? 'translateY(0px)' : 'translateY(12px)'};
  visibility: ${(props) => (props.is_vis ? 'visible' : 'hidden')};
`
