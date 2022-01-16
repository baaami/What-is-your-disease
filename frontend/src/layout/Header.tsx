import * as React from 'react'
import { HeaderContainer } from '../styles/Layout.styles'
import { Link, Route, Switch, useHistory } from 'react-router-dom'
import logo from '../assets/img/hlogo.svg'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import Category from '../pages/Category'
import Mypage from '../pages/Members/Mypage'
import PostsLists from '../pages/Posts/Lists'
import InfoForm from '../pages/Members/InfoForm'
import PostsEdit from '../pages/Posts/Edit'
import PostsDetail from '../pages/Posts/Detail'
import Search from '../pages/Search'
import Kauth from '../pages/Kauth'
import Nauth from '../pages/Nauth'
import Gauth from '../pages/Gauth'

interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  const history = useHistory()
  const logoutHandler = async () => {
    localStorage.removeItem('jwttoken')
  }

  return (
    <>
      <HeaderContainer>
        <div className="wrap">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <div className="rightArea">
            {localStorage.getItem('jwttoken') ? (
              <>
                <button
                  className="headerTxt"
                  onClick={() => history.push('/mypage')}
                >
                  마이페이지
                </button>
                <button className="headerTxt" onClick={logoutHandler}>
                  로그아웃
                </button>
              </>
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
        <Route path="/posts/lists" component={PostsLists} />
        <Route path="/posts/edit" component={PostsEdit} />
        <Route path="/posts/detail" component={PostsDetail} />
        <Route path="/search" component={Search} />
        <Route path="/api/auth/callback/kakao" component={Kauth} />
        <Route path="/api/auth/callback/naver" component={Nauth} />
        <Route path="/api/auth/callback/google" component={Gauth} />
      </Switch>
    </>
  )
}
