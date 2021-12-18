import * as React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { HeaderContainer } from '../styles/Layout.styles'
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
    <BrowserRouter>
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/category" element={<Category />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/infoForm" element={<InfoForm />} />
        <Route path="/posts/lists" element={<PostsLists />} />
        <Route path="/posts/edit" element={<PostsEdit />} />
        <Route path="/posts/detail" element={<PostsDetail />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  )
}
