import * as React from 'react'
import { HeaderContainer } from '../styles/Layout.styles'
import { Link, Route, Switch } from 'react-router-dom'
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

interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  return (
    <>
      <HeaderContainer>
        <div className="wrap">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <Link className="signupTxt" to="/signup">
            로그인 / 회원가입
          </Link>
        </div>
      </HeaderContainer>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/category" component={Category} />
        <Route path="/mypage" component={Mypage} />
        <Route path="/infoForm" component={InfoForm} />
        <Route path="/posts/lists" component={PostsLists} />
        <Route path="/posts/edit" component={PostsEdit} />
        <Route path="/posts/detail" component={PostsDetail} />
        <Route path="/search" component={Search} />
      </Switch>
    </>
  )
}
