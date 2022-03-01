import { useCallback, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Icon from 'assets/img/profile.svg'
import socketIOClient, { Socket } from 'socket.io-client'
import { currentUserInfo } from 'store/userInfo'
import { useRecoilState } from 'recoil'
import { message } from 'antd'
import { callbackify } from 'util'

interface ChattingRoomModel {
  socket: Socket
  current_room: string
}

interface ChattingMessageListModel {
  data: string
  user: {
    id: string
    nickname: string
  }
}

const ChattingRoom = (props: ChattingRoomModel) => {
  const { socket } = props
  // message wrapper ref
  const message_wrap_ref = useRef<HTMLDivElement>(null)

  const [userInfo] = useRecoilState(currentUserInfo)

  // 메세지 리스트 state
  const [message_list, setMessageList] = useState<ChattingMessageListModel[]>(
    [],
  )

  // 채팅 input state
  const [chatting_message, setChattingMessage] = useState('')

  // 채팅 메세지가 갱신되면 스크롤을 bottom으로 보내는 함수
  const scrollToBottom = () => {
    if (message_wrap_ref.current) {
      message_wrap_ref.current.scrollTop =
        message_wrap_ref.current?.scrollHeight -
        message_wrap_ref.current?.clientHeight
    } else {
      const settimeout = setTimeout(() => {
        scrollToBottom()
      }, 1000)

      clearTimeout(settimeout)
    }
  }

  // 메세지 보내기
  const sendMessage = (message: string) => {
    console.log('실행')
    socket.emit('message', {
      data: message,
    })

    setChattingMessage('')
  }

  // 메세지 받음
  const receiveMessage = (data: ChattingMessageListModel) => {
    // console.log(message_list)
    // const nextState = [...message_list, data]
    // console.log(nextState)
    setMessageList((currentMessage) => [...currentMessage, data])
  }

  useEffect(() => {
    socket.on('message', (data: ChattingMessageListModel) => {
      console.log(`message: ${data.data}`)
      console.log(`보낸사람: ${data.user.nickname}`)
      // const nextState = [...message_list, data]
      // console.log(message_list)
      // setMessageList(nextState)

      receiveMessage(data)
    })
  }, [])

  useEffect(() => {
    console.log('sss')
    return () => {
      socket.emit('leave')
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [message_list])

  return (
    <ChattingRoomWrapper>
      <ChattingRoomWrap ref={message_wrap_ref}>
        {message_list.map((item, index) => {
          if (item.user.id === userInfo._id) {
            return (
              <MyChat key={`message_${item.user.id}_${index}`}>
                <Image src={Icon} alt="아이콘" />
                <div>{item.data}</div>
              </MyChat>
            )
          } else {
            return (
              <Chat key={`message_${item.user.id}_${index}`}>
                <Image src={Icon} alt="아이콘" />
                <div>{item.data}</div>
              </Chat>
            )
          }
        })}
        <SendMessageBox>
          <InputBox
            placeholder="메세지를 입력하세요."
            onChange={(e) => setChattingMessage(e.target.value)}
            value={chatting_message}
          ></InputBox>
          <SendButton onClick={() => sendMessage(chatting_message)}>
            전송
          </SendButton>
        </SendMessageBox>
      </ChattingRoomWrap>
    </ChattingRoomWrapper>
  )
}

export default ChattingRoom

const ChattingRoomWrapper = styled.div`
  width: 100%;
  height: 440px;
  padding: 15px;
  padding-right: 0;
`
const ChattingRoomWrap = styled.div`
  height: calc(100% - 100px);
  overflow-y: scroll;
`
const Chat = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  padding-right: 15px;

  img {
    width: 25px !important;
    height: 25px !important;
    padding-right: 5px !important;
  }

  div {
    max-width: calc(100% - 40px);
    padding: 5px;
    background-color: #f4f4f4;
    border-radius: 8px;
  }
`
const MyChat = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row-reverse;
  margin-bottom: 10px;
  padding-right: 15px;

  img {
    width: 25px !important;
    height: 25px !important;
    padding-left: 5px !important;
  }

  div {
    max-width: calc(100% - 40px);
    padding: 5px;
    background-color: #f7e6e8;
    border-radius: 8px;
  }
`
const SendMessageBox = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: aliceblue;
`
const InputBox = styled.textarea`
  width: 80%;
  height: 100%;
  padding: 10px;
  background-color: aliceblue;
  border: none;
  resize: none;

  &:focus {
    outline: none;
  }
`
const SendButton = styled.button`
  position: absolute;
  top: 10px;
  width: 60px;
  height: 35px;
  background-color: #1850a3;
  border-radius: 4px;
  color: #fff;
  font-weight: 700;
`
