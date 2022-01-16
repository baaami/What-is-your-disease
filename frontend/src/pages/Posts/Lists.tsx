import * as React from 'react'
import { Link } from 'react-router-dom'
import { PostListsContainer, PostListsWrap } from 'styles/PostLists.styles'
import Search from '../../components/Search'
import arrow from '../../assets/img/arrow_right.png'

interface IPostsListsProps {}

export default function PostsLists(props: IPostsListsProps) {
  return (
    <PostListsContainer>
      <Search />
      <PostListsWrap className="wrap">
        <div className="title">게시글</div>
        <div className="postContainer">
          <Link to="" className="post">
            <div className="postTitle">제목들어갈 부분</div>
            <img src={arrow} alt="화살표 아이콘" />
          </Link>
          <Link to="" className="post">
            <div className="postTitle">제목들어갈 부분</div>
            <img src={arrow} alt="화살표 아이콘" />
          </Link>
          <Link to="" className="post">
            <div className="postTitle">제목들어갈 부분</div>
            <img src={arrow} alt="화살표 아이콘" />
          </Link>
        </div>
      </PostListsWrap>
    </PostListsContainer>
  )
}
