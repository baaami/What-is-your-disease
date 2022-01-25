import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { PostListsContainer, PostListsWrap } from 'styles/CategoryPosts.styles'
import Search from '../../components/Search'
import arrow from '../../assets/img/arrow_right.png'
import PostsTable from 'components/PostsTable'
import DropDown from 'components/DropDown'
import API from 'service/api'
import { PostModel } from 'model/postsModel'
const categories = [
  { id: '0', imgUrl: '/assets/img/vaccine.svg', name: '백신' },
  { id: '1', imgUrl: '/assets/img/cold.svg', name: '감기' },
  { id: '2', imgUrl: '/assets/img/headache.svg', name: '두통' },
  { id: '3', imgUrl: '/assets/img/tooth.svg', name: '치통' },
  { id: '4', imgUrl: '/assets/img/bug.svg', name: '벌레물림' },
  { id: '5', imgUrl: '/assets/img/muscle.svg', name: '근육통' },
  { id: '6', imgUrl: '/assets/img/virus.svg', name: '바이러스' },
  { id: '7', imgUrl: '/assets/img/stomache.svg', name: '복통' },
]

interface IPostsListsProps {}

const dropdownOption = ['최신순', '오래된순', '인기순']

export default function PostsLists({
  history,
  match,
  location,
}: RouteComponentProps<{ type: string }>) {
  const [filter, setFilter] = useState('최신순')
  const [postsList, setPostsList] = useState<PostModel[]>([])
  const [now_category, setNowCategory] = useState<
    { id: string; imgUrl: string; name: string }[]
  >([])
  const getFilterPosts = async (category: string) => {
    await API.posts
      .getCategoryPosts(category)
      .then((res) => {
        console.log(res.data)
        setPostsList(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    setNowCategory(categories.filter((item) => item.name === match.params.type))
    window.scrollTo({ top: 0 })
  }, [])

  useEffect(() => {
    getFilterPosts(match.params.type)
  }, [match.params.type])

  return (
    <PostListsContainer>
      <Search />
      <PostListsWrap className="wrap">
        <div className="titleWrap">
          <img
            src={now_category?.[0]?.imgUrl}
            alt="카테고리 이미지"
            className="categoryImg"
          />
          <div className="categoryName">{now_category?.[0]?.name}</div>
          {/* <div className="title">게시글</div>
          <DropDown
            now_value={filter}
            filter_data={dropdownOption}
            setFilter={setFilter}
          /> */}
        </div>
        {postsList.length === 0 && (
          <div className="noData">조회된 결과가 없습니다.</div>
        )}
        <PostsTable posts={postsList} />
      </PostListsWrap>
    </PostListsContainer>
  )
}
