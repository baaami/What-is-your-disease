import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import notice from 'assets/img/bell_icon.svg'
import { Socket } from 'socket.io-client'
import { socketInit } from 'store/socket'
import { useRecoilState, useRecoilValue } from 'recoil'
import API from 'service/api'

interface PushNoticeModel {}

const PushNotice = (props: PushNoticeModel) => {
  const socket = useRecoilValue(socketInit)
  const [vis_notice_modal, setVisNoticeModal] = useState(false)
  const [push_list, setPushList] = useState()
  const notice_modal_ref = useRef<HTMLDivElement>(null)
  const clickNoticeIcon = () => {
    if (vis_notice_modal) {
      setVisNoticeModal(false)
    } else {
      setVisNoticeModal(true)
    }
  }

  /* 어딜 클릭했는지 확인 */
  const onClickInsideDetector = (e: any) => {
    if (
      notice_modal_ref.current &&
      notice_modal_ref.current!.contains(e.target)
    ) {
      /** CLICK INSIDE -> DO NOTHING */
    } else {
      if (e.target.alt === 'notice') return
      /* CLICK OUTSIDE -> SELECT CLOSE */
      setVisNoticeModal(false)
    }
  }

  const handlePushEvent = () => {
    if (Object.keys(socket).length !== 0) {
      console.log('이벤트등록')
      socket.on('push', (data) => {
        console.log(data)
      })
    } else {
      return setTimeout(() => {
        console.log('실행')
        handlePushEvent()
      }, 500)
    }
  }

  const getPushList = async () => {
    await API.user
      .getPushList()
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  /* 클릭시 닫힘 처리  */
  useEffect(() => {
    window.addEventListener('mousedown', onClickInsideDetector)
    // props.socket.on('push', (data) => {
    //   console.log(data)
    // })
    getPushList()
    return () => {
      window.removeEventListener('mousedown', onClickInsideDetector)
    }
  }, [])

  useEffect(() => {
    if (Object.keys(socket).length !== 0 && !socket.hasListeners('push')) {
      console.log('이벤트등록')
      socket.on('push', (data) => {
        console.log(`소켓데이터 ${data}`)
      })
    }
  }, [socket])

  return (
    <NoticeContainer onClick={() => clickNoticeIcon()}>
      <button className="headerTxt">
        <img src={notice.src} alt="notice" />
      </button>
      <NoticeModal
        ref={notice_modal_ref}
        className={`${vis_notice_modal ? 'vis' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <section className="noticeWrap">
          <div className="noticeHeader">
            <div>
              알림 <span>7</span> 건
            </div>
            <div
              style={{
                textDecoration: 'underline',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              모두 읽음
            </div>
          </div>
          <div className="noticeContents">
            <div>
              읽지 않은 채팅이 있습니다. 확인해주세요sssssss.<span>2일전</span>
            </div>
            <div>
              글쓰러간지 일주일이 넘었네요! 글쓰러 가볼까요?
              <span>5일전</span>
            </div>
            <div>
              읽지 않은 채팅이 있습니다. 확인해주세요.<span>7일전</span>
            </div>
            <div>
              읽지 않은 채팅이 있습니다.<span>15일전</span>
            </div>
          </div>
        </section>
      </NoticeModal>
    </NoticeContainer>
  )
}

export default PushNotice

export const NoticeContainer = styled.div``
export const NoticeModal = styled.div`
  position: absolute;
  right: -20px;
  color: white;
  padding: 15px 20px;
  width: 280px;
  height: 600px;
  background-color: #fff;
  border: 1px solid #999;
  border-radius: 4px;
  color: #000;
  transition: all 0.21s;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);

  &.vis {
    visibility: visible;
    opacity: 1;
    transform: translateY(3px);
  }
  .noticeWrap {
    display: block;

    .noticeHeader {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #545454;

      span {
        font-weight: 900;
        color: #e96767;
      }
    }

    .noticeContents {
      margin-top: 20px;

      div {
        margin-bottom: 10px;

        span {
          margin-left: 10px;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
`
