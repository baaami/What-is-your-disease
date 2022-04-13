import React, { useEffect, useState, useRef } from 'react'
import {
  ContainerWrap,
  HeaderContainer,
  ProfileContainer,
  ProfileModal,
  HeaderModal,
} from './styles'
// import { Link, useHistory, useLocation } from "react-router-dom";
import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import { useRecoilState, useRecoilValue } from 'recoil'
import API from 'service/api'
import { currentUserInfo } from 'store/userInfo'
import { Container } from 'common.styles'
import logo from '../assets/img/hlogo.svg'
import profile from '../assets/img/profile.svg'
import Image from 'next/link'
import PushNotice from 'components/PushNotice'
import { Button } from 'antd'
import usePushNotice from 'hooks/usePushNotice'

export default function HomeHeader() {
  const location = useRouter()
  const history = useRouter()

  const profile_modal_ref = useRef<HTMLDivElement>(null)

  const [userInfo, setUserInfo] = useRecoilState(currentUserInfo)
  const [border, setBorder] = useState('rgba(255,255,255,0)')
  const [background, setBackground] = useState('transparent')

  const [vis_profile_modal, setVisProfileModal] = useState(false)

  const { removePushList } = usePushNotice()

  const scrollHandler = () => {
    if (window.scrollY < 40) {
      setBackground('transparent')
      setBorder('rgba(255,255,255,0)')
    } else {
      setBackground('#fff')
      setBorder('#ccc')
    }
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

  const logoutHandler = async () => {
    localStorage.removeItem('jwttoken')
    localStorage.removeItem('userInfo')
    localStorage.setItem('is_login', 'false')
    setVisProfileModal(false)
    removePushList()
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

  const clickProfileIcon = () => {
    if (userInfo._id === '') {
      return history.push('/login')
    }
    if (vis_profile_modal) {
      setVisProfileModal(false)
    } else {
      setVisProfileModal(true)
    }
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

    if (location.pathname === '/') {
      window.addEventListener('scroll', scrollHandler)
      setVisProfileModal(false)
    }
  }, [location.pathname])

  /* 클릭시 닫힘 처리  */
  useEffect(() => {
    window.addEventListener('mousedown', onClickInsideDetector)

    return () => {
      window.removeEventListener('mousedown', onClickInsideDetector)
    }
  }, [])

  return (
    <>
      <HeaderContainer
        style={
          history.pathname === '/'
            ? {
                background: background,
                borderBottomWidth: '1px',
                borderBottomStyle: 'solid',
                borderColor: border,
                transition: '0.21s',
              }
            : { background: '#fff', borderBottom: '1px solid #ccc' }
        }
      >
        <Container className="flexWrap headerContainer">
          <Link href="/" passHref>
            <img className="logo" src={logo.src} alt="logo" />
          </Link>
          <ContainerWrap>
            <ProfileContainer onClick={() => clickProfileIcon()}>
              {userInfo._id !== '' ? (
                <button className="headerTxt">
                  <img src={profile.src} alt="profile" />
                </button>
              ) : (
                <a className="headerText">
                  <Link href="/login" passHref>
                    <Button type="primary" style={{ borderRadius: '5px' }}>
                      <span className="fs-18 fw-700">로그인</span>
                    </Button>
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
                    <img
                      width={70}
                      height={70}
                      src={profile.src}
                      alt="profile"
                    />
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
            <PushNotice />
          </ContainerWrap>
        </Container>
      </HeaderContainer>
    </>
  )
}
