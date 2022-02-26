import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Box from 'assets/img/profile.svg'
import CloseIcon from 'assets/img/close_icon.svg'
import Icon from 'assets/img/chat_title_icon.svg'
import styled from 'styled-components'
import { categoryList } from 'static/constant'

const Chatting = () => {
  const router = useRouter()
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
        <ButtonWrap>
          <Title>
            DR.U 채팅방
            <Image src={Icon} alt="아이콘" />
          </Title>
          <CloseButton onClick={() => setVisChat(false)}>
            <Image src={CloseIcon} alt="닫기 버튼" />
          </CloseButton>
        </ButtonWrap>
        {categoryList.map((item, idx) => (
          <ChattingList key={idx}>
            <h3>{item}</h3>
            <EnterButton
              onClick={() =>
                router.push({
                  pathname: `/posts/category/lists/${item}`,
                })
              }
            >
              입장
            </EnterButton>
          </ChattingList>
        ))}
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
  overflow-y: scroll;

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
const ButtonWrap = styled.div`
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
const ChattingList = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 30px);
  height: 70px;
  margin: 15px;
  border-bottom: 1px solid #c4c4c4;
`
const EnterButton = styled.button`
  width: 80px;
  height: calc(100% - 15px);
  background-color: #1850a3;
  border-radius: 5px;
  color: #fff;
  font-weight: 700;
`
