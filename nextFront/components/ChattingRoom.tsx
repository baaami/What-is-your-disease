import React, { useCallback, useState, useEffect, useRef } from 'react'
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
  setCurrentPeople: (people_cnt: number) => void
}

interface ChattingMessageListModel {
  data?: string
  user: {
    id: string
    nickname: string
  }
  room?: string
  event?: 'roomout' | 'roomin'
  publishedDate?: string
}

interface roomUserModel {
  event: 'roomout' | 'roomin'
  user: {
    id: string
    nickname: string
  }
  room: string
  numberOfPeople: number
}

const ChattingRoom = (props: ChattingRoomModel) => {
  const { socket } = props
  // message wrapper ref
  const message_wrap_ref = useRef<HTMLDivElement>(null)

  const [userInfo] = useRecoilState(currentUserInfo)

  // 메세지 리스트 state
  const [message_list, setMessageList] = useState<
    Array<ChattingMessageListModel>
  >([])

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
    if (message === '') {
      return
    }
    socket.emit('message', {
      data: message,
    })

    setChattingMessage('')
  }

  useEffect(() => {
    socket.on('message', (data: ChattingMessageListModel) => {
      console.log(data)
      setMessageList((currentMessage) => [...currentMessage, data])
    })
    socket.on('roomin', (data: roomUserModel) => {
      setMessageList((currentMessage) => [...currentMessage, data])
      props.setCurrentPeople(data.numberOfPeople)
    })
    socket.on('roomout', (data: roomUserModel) => {
      setMessageList((currentMessage) => [...currentMessage, data])
      props.setCurrentPeople(data.numberOfPeople)
    })
    socket.emit('moreMessage')

    socket.on('moreMessage', (data: ChattingMessageListModel[]) => {
      const sort_date = data.sort((p, n) => {
        return (
          new Date(p.publishedDate as string).getTime() -
          new Date(n.publishedDate as string).getTime()
        )
      })
      setMessageList([...sort_date])
    })
  }, [])

  useEffect(() => {
    // return () => {
    //   socket.emit('leave')
    // }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [message_list])

  return (
    <ChattingRoomWrapper>
      <ChattingRoomWrap ref={message_wrap_ref}>
        {message_list.map((item, index) => {
          if (item.event === 'roomin') {
            return (
              <div className="roomIn">
                {item.user.nickname} 님이 입장 하셨습니다.
              </div>
            )
          } else if (item.event === 'roomout') {
            return (
              <div className="roomOut">
                {item.user.nickname} 님이 퇴장했습니다.
              </div>
            )
          } else if (item.user.id === userInfo._id) {
            return (
              <MyChat key={`message_${item.user.id}_${index}`}>
                <img src={Icon.src} alt="프로필 아이콘" />
                <div className="myMessageBox">{item.data}</div>
              </MyChat>
            )
          } else {
            return (
              <Chat key={`message_${item.user.id}_${index}`}>
                <img src={Icon.src} alt="프로필 아이콘" />
                <section className="otherBox">
                  <div className="">{item.user.nickname}</div>
                  <div className="otherMessageBox">{item.data}</div>
                </section>
              </Chat>
            )
          }
        })}
        <SendMessageBox>
          <InputBox
            placeholder="메세지를 입력하세요."
            onChange={(e) => setChattingMessage(e.target.value)}
            onKeyPress={(e: React.KeyboardEvent<Element>) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                sendMessage(chatting_message)
              }
            }}
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

  .roomIn,
  .roomOut {
    margin-bottom: 10px;
  }
`
const Chat = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  padding-right: 15px;

  img {
    width: 30px !important;
    height: 30px !important;
    padding-right: 5px !important;
  }
  section.otherBox {
    max-width: 100%;
    width: 100%;
    div.otherMessageBox {
      max-width: calc(100% - 40px);
      width: max-content;
      padding: 5px;
      background-color: #f4f4f4;
      border-radius: 8px;
    }
  }
`
const MyChat = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row-reverse;
  margin-bottom: 10px;
  padding-right: 15px;

  img {
    width: 30px !important;
    height: 30px !important;
    padding-left: 5px !important;
  }

  div.myMessageBox {
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
  overflow: hidden;
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
