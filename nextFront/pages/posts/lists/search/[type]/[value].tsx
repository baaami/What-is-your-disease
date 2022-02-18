import React, { useEffect, useState } from 'react'
// import { RouteComponentProps } from 'react-router-dom'
import { useRouter } from 'next/router'
import { PostListsContainer, PostListsWrap } from 'styles/SearchPosts.styles'
import Search from 'components/Search'
import PostsTable from 'components/PostsTable'
import API from 'service/api'
import { PostModel } from 'model/postsModel'
import useSearchPage from './hooks/useSearchPage'
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

export default function SearchPosts() {
  const router = useRouter()
  const { type, value } = router.query
  // const [type as string, value as string] = router.query.params;
  const { postsList, setPostsList } = useSearchPage(
    // match.params.type,
    // match.params.value,
    encodeURIComponent(type as string),
    value as string,
  )

  useEffect(() => {
    // console.log(value)
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <PostListsContainer>
      <Search />
      <PostListsWrap className="wrap">
        <div className="titleWrap">
          {type === 'hashtag' ? (
            <>
              <span>#{value}</span>에 대한 검색결과 입니다.
            </>
          ) : (
            <>
              <span>{value}</span>에 대한 검색결과 입니다.
            </>
          )}
        </div>
        <PostsTable posts={postsList} />
        {postsList.length === 0 && (
          <div className="noData">조회된 결과가 없습니다.</div>
        )}
      </PostListsWrap>
    </PostListsContainer>
  )
}
