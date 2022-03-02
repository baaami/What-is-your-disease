import React, { useEffect, useRef, useState } from 'react'
import {
  ContainerWrap,
  HeaderContainer,
  NoticeContainer,
  NoticeModal,
  ProfileContainer,
  ProfileModal,
} from './styles'
// import { Link, useHistory, useLocation } from "react-router-dom";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import API from 'service/api'
import { currentUserInfo } from 'store/userInfo'
import { Container } from 'common.styles'
import logo from '../assets/img/hlogo.svg'
import notice from '../assets/img/bell_icon.svg'
import profile from '../assets/img/profile.svg'
import Image from 'next/image'

export default function SubHeader() {
  const location = useRouter()
  const history = useRouter()
  const profile_modal_ref = useRef<HTMLDivElement>(null)
  const notice_modal_ref = useRef<HTMLDivElement>(null)

  const [userInfo, setUserInfo] = useRecoilState(currentUserInfo)
  const [vis_profile_modal, setVisProfileModal] = useState(false)
  const [vis_notice_modal, setVisNoticeModal] = useState(false)

  const clickProfileIcon = () => {
    if (vis_profile_modal) {
      setVisProfileModal(false)
    } else {
      setVisProfileModal(true)
    }
  }

  const clickNoticeIcon = () => {
    if (vis_notice_modal) {
      setVisNoticeModal(false)
    } else {
      setVisNoticeModal(true)
    }
  }

  const logoutHandler = async () => {
    localStorage.removeItem('jwttoken')
    localStorage.removeItem('userInfo')
    setVisProfileModal(false)
    setUserInfo({
      ...userInfo,
      provider: '',
      providerId: '',
      _id: '',
      info: {
        name: '',
        age: '',
        gender: '',
        nickname: '',
        bloodtype: '',
        allergy: [],
        medicines: [],
      },
    })
    history.replace('/')
  }

  const getUserInfo = async () => {
    await API.auth
      .getUserInfo()
      .then((res) => {
        if (res.data === '') {
          return setUserInfo({
            ...userInfo,
            provider: '',
            providerId: '',
            _id: '',
            info: {
              name: '',
              age: '',
              gender: '',
              nickname: '',
              bloodtype: '',
              allergy: [],
              medicines: [],
            },
          })
        }
        setUserInfo({ ...userInfo, ...res.data })
      })
      .catch((e) => {
        console.log(e)
      })
  }
  /* 어딜 클릭했는지 확인 */
  const onClickInsideDetector = (e: any) => {
    if (
      profile_modal_ref.current &&
      profile_modal_ref.current!.contains(e.target)
    ) {
      /** CLICK INSIDE -> DO NOTHING */
    } else {
      if (e.target.alt === 'profile') return
      /* CLICK OUTSIDE -> SELECT CLOSE */
      setVisProfileModal(false)
    }
  }
  /* 클릭시 닫힘 처리  */
  useEffect(() => {
    window.addEventListener('mousedown', onClickInsideDetector)

    return () => {
      window.removeEventListener('mousedown', onClickInsideDetector)
    }
  }, [])
  useEffect(() => {
    if (
      // typeof window !== undefined &&
      // window?.localStorage.getItem("jwttoken") &&
      !userInfo.info.name &&
      userInfo.info.name !== '' &&
      location.pathname !== '/infoForm'
    ) {
      alert('회원정보 작성 후 이용 바랍니다.')
      history.push('/infoForm')
    } else {
      getUserInfo()
    }
  }, [location.pathname])

  return (
    <>
      <HeaderContainer className="sub">
        <Container className="flexWrap">
          <Link href="/" passHref>
            <img className="logo" src={logo.src} alt="logo" />
          </Link>
          <ContainerWrap>
            <ProfileContainer>
              {userInfo._id !== '' ? (
                <button
                  className="headerTxt"
                  onClick={() => clickProfileIcon()}
                >
                  <img src={profile.src} alt="profile" />
                </button>
              ) : (
                <a className="headerText">
                  <Link href="/login" passHref>
                    <img src={profile.src} alt="profile" />
                  </Link>
                </a>
              )}
              <ProfileModal
                ref={profile_modal_ref}
                className={`${vis_profile_modal ? 'vis' : ''}`}
                onClick={(e) => e.stopPropagation()}
              >
                <section className="profileWrap">
                  <div>
                    <img src={profile.src} alt="profile" />
                  </div>
                  <div>
                    <div className="nickname">{userInfo.info.nickname}</div>
                    <div className="buttonWrap">
                      <button onClick={() => history.push('/infoForm')}>
                        회원정보 수정하기
                      </button>
                    </div>
                  </div>
                </section>
                <div className="modalLink">
                  <button onClick={() => history.push('/mypage')}>
                    마이페이지
                  </button>
                </div>
                <div className="modalLink">
                  <button onClick={logoutHandler}>로그아웃</button>
                </div>
              </ProfileModal>
            </ProfileContainer>
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
                      읽지 않은 채팅이 있습니다. 확인해주세요.<span>2일전</span>
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
          </ContainerWrap>
        </Container>
      </HeaderContainer>
    </>
  )
}
