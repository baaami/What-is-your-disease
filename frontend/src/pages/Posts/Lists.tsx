import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PostListsContainer, PostListsWrap } from 'styles/PostLists.styles'
import Search from '../../components/Search'
import arrow from '../../assets/img/arrow_right.png'
import PostsTable from 'components/PostsTable'
import DropDown from 'components/DropDown'
import API from 'service/api'
import { PostModel } from 'model/postsModel'

interface IPostsListsProps {}

const dropdownOption = ['최신순', '오래된순', '인기순']

export default function PostsLists(props: IPostsListsProps) {
  const [filter, setFilter] = useState('최신순')
  const [state, setstate] = useState()
  const [postsList, setPostsList] = useState<PostModel[]>([])
  const getFilterPosts = async (orderBy: string) => {
    await API.posts
      .getFilterPosts(orderBy)
      .then((res) => {
        setPostsList(res.data.data.post)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  useEffect(() => {
    getFilterPosts(filter)
  }, [filter])
  return (
    <PostListsContainer>
      <Search />
      <PostListsWrap className="wrap">
        <div className="titleWrap">
          <div className="title">게시글</div>
          <DropDown
            now_value={filter}
            filter_data={dropdownOption}
            setFilter={setFilter}
          />
        </div>
        <PostsTable posts={postsList} />
      </PostListsWrap>
    </PostListsContainer>
  )
}
