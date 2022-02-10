import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import Category from '../pages/Category'
import Mypage from '../pages/Members/Mypage'
import Profilepage from '../pages/Members/Profilepage'
import PostsLists from '../pages/Posts/Lists'
import CategoryPosts from 'pages/Posts/CategoryPosts'
import InfoForm from '../pages/Members/InfoForm'
import PostsEdit from '../pages/Posts/Edit'
import PostsDetail from '../pages/Posts/Detail'
import SearchPosts from 'pages/Posts/SearchPosts'
import Kauth from '../pages/Kauth'
import Nauth from '../pages/Nauth'
import Gauth from '../pages/Gauth'

export default function Routes() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Signup} />
        <Route path="/category" component={Category} />
        <Route path="/mypage" component={Mypage} />
        <Route path="/infoForm" component={InfoForm} />
        <Route path="/profilepage" component={Profilepage} />
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
