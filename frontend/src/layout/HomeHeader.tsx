import React, { useEffect, useState } from 'react'
import { HeaderContainer, ProfileContainer } from './styles'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import API from 'service/api'
import { currentUserInfo } from 'store/userInfo'
import { Container } from 'common.styles'
import logo from '../assets/img/hlogo.svg'
import profile from '../assets/img/profile.svg'
import Routes from './Routes'

export default function HomeHeader() {
  const location = useLocation()
  const history = useHistory()

  const [userInfo, setUserInfo] = useRecoilState(currentUserInfo)
  const [border, setBorder] = useState("rgba(255,255,255,0)")
  const [background, setBackground] = useState("transparent")

  const scrollHandler = () => {
    if (window.scrollY < 40) {
      setBackground("transparent")
      setBorder("rgba(255,255,255,0)")
    } else {
      setBackground("#fff")
      setBorder("#ccc")
    }
  };

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

  useEffect(() => {
    if (
      localStorage.getItem('jwttoken') &&
      !userInfo.info.name &&
      userInfo.info.name !== '' &&
      location.pathname !== '/infoForm'
    ) {
      alert('회원정보 작성 후 이용 바랍니다.')
      history.push('/infoForm')
    } else {
      getUserInfo()
    }

    window.addEventListener("scroll", scrollHandler);    
  }, [location.pathname])

  return (
    <>
      <HeaderContainer 
        style={{
          background: background,
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
          borderColor: border,
        }}
      >
        <Container className="flexWrap">
          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
          </Link>
          <ProfileContainer>
            {userInfo._id !== '' ? (
              <button
                className="headerTxt"
                onClick={() => history.push('/mypage')}
              >
                <img src={profile} alt="profile" />
              </button>
            ) : (
              <Link className="headerTxt" to="/login">
                <img src={profile} alt="profile" />
              </Link>
            )}
          </ProfileContainer>
        </Container>
      </HeaderContainer>
      <Routes/>
    </>
  )
}
