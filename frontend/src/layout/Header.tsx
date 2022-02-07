import React, { useEffect } from 'react'
import { HeaderContainer, ProfileContainer } from './styles'
import { Link, Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import Category from '../pages/Category'
import Mypage from '../pages/Members/Mypage'
import PostsLists from '../pages/Posts/Lists'
import CategoryPosts from 'pages/Posts/CategoryPosts'
import InfoForm from '../pages/Members/InfoForm'
import PostsEdit from '../pages/Posts/Edit'
import PostsDetail from '../pages/Posts/Detail'
import SearchPosts from 'pages/Posts/SearchPosts'
import Kauth from '../pages/Kauth'
import Nauth from '../pages/Nauth'
import Gauth from '../pages/Gauth'
import API from 'service/api'
import { currentUserInfo } from 'store/userInfo'
import { Container } from 'common.styles'
import logo from '../assets/img/hlogo.svg'
import profile from '../assets/img/profile.svg'

interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  const location = useLocation()
  const history = useHistory()

  const [userInfo, setUserInfo] = useRecoilState(currentUserInfo)

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
      console.log('유저정보가 있을때 실행')
      getUserInfo()
    }
  }, [location.pathname])

  return (
    <>
      <HeaderContainer>
        <Container className='flexWrap'>
          <Link to="/">
            <img className='logo' src={logo} alt="logo" />
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
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Signup} />
        <Route path="/category" component={Category} />
        <Route path="/mypage" component={Mypage} />
        <Route path="/infoForm" component={InfoForm} />
        <Route path="/posts/lists" exact component={PostsLists} />
        <Route path="/posts/category/lists/:type" component={CategoryPosts} />
        <Route
          path="/posts/lists/search/:type/:value"
          component={SearchPosts}
        />
        <Route path="/posts/edit" component={PostsEdit} />
        <Route path="/posts/detail/:postId" component={PostsDetail} />
        <Route path="/api/auth/callback/kakao" component={Kauth} />
        <Route path="/api/auth/callback/naver" component={Nauth} />
        <Route path="/api/auth/callback/google" component={Gauth} />
      </Switch>
    </>
  )
}
