import React, { useEffect } from 'react'
import { HeaderContainer } from '../styles/Layout.styles'
import { Link, Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import logo from '../assets/img/hlogo.svg'
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
        <div className="wrap">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <div className="rightArea">
            {userInfo._id !== '' ? (
              <button
                className="headerTxt"
                onClick={() => history.push('/mypage')}
              >
                마이페이지
              </button>
            ) : (
              <Link className="headerTxt" to="/login">
                로그인 / 회원가입
              </Link>
            )}
          </div>
        </div>
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
