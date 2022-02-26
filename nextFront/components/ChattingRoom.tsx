import { useEffect } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Icon from 'assets/img/profile.svg'

const ChattingRoom = () => {
  return (
    <ChattingRoomWrapper>
      <ChattingRoomWrap>
        <Chat>
          <Image src={Icon} alt="아이콘" />
          <div>안녕</div>
        </Chat>
        <MyChat>
          <Image src={Icon} alt="아이콘" />
          <div>ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ</div>
        </MyChat>
        <Chat>
          <Image src={Icon} alt="아이콘" />
          <div>
            ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
          </div>
        </Chat>
        <MyChat>
          <Image src={Icon} alt="아이콘" />
          <div>안녕</div>
        </MyChat>
        <Chat>
          <Image src={Icon} alt="아이콘" />
          <div>안녕</div>
        </Chat>
        <Chat>
          <Image src={Icon} alt="아이콘" />
          <div>안녕</div>
        </Chat>
        <Chat>
          <Image src={Icon} alt="아이콘" />
          <div>안녕</div>
        </Chat>
        <Chat>
          <Image src={Icon} alt="아이콘" />
          <div>안녕</div>
        </Chat>
        <Chat>
          <Image src={Icon} alt="아이콘" />
          <div>안녕</div>
        </Chat>
        <Chat>
          <Image src={Icon} alt="아이콘" />
          <div>안녕</div>
        </Chat>
        <Chat>
          <Image src={Icon} alt="아이콘" />
          <div>안녕</div>
        </Chat>
        <MyChat>
          <Image src={Icon} alt="아이콘" />
          <div>안녕</div>
        </MyChat>
        <Chat>
          <Image src={Icon} alt="아이콘" />
          <div>안녕</div>
        </Chat>
        <Chat>
          <Image src={Icon} alt="아이콘" />
          <div>안녕</div>
        </Chat>
        <Chat>
          <Image src={Icon} alt="아이콘" />
          <div>안녕</div>
        </Chat>
        <Chat>
          <Image src={Icon} alt="아이콘" />
          <div>안녕</div>
        </Chat>
        <MyChat>
          <Image src={Icon} alt="아이콘" />
          <div>안녕</div>
        </MyChat>
        <Chat>
          <Image src={Icon} alt="아이콘" />
          <div>
            ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
          </div>
        </Chat>
        <SendMessageBox>
          <InputBox placeholder="메세지를 입력하세요."></InputBox>
          <SendButton>전송</SendButton>
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
