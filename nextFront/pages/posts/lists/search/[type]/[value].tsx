import React, { useEffect, useState } from 'react'
// import { RouteComponentProps } from 'react-router-dom'
import { useRouter } from 'next/router'
import { PostListsContainer, PostListsWrap } from 'styles/SearchPosts.styles'
import PostsTable from 'components/PostsTable'
import API from 'service/api'
import { PostModel } from 'model/postsModel'
import useSearchPage from './hooks/useSearchPage'
import Search from 'components/Search'
import { Container, Title } from 'common.styles'
import Pagination from 'components/Pagination'
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

export default function SearchPosts() {
  const router = useRouter()
  const { type, value } = router.query
  const {
    postsList,
    total_cnt,
    current_page,
    setCurrentPage,
    setPeriod,
    setOrderBy,
  } = useSearchPage(encodeURIComponent(type as string), value as string)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <PostListsContainer>
      <Container>
        <Search />
      </Container>
      <PostListsWrap>
        <Container>
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
          <PostsTable
            posts={postsList}
            setOrderBy={setOrderBy}
            setPeriod={setPeriod}
          />
          {/* {postsList.length === 0 && (
            <div className="noData">조회된 결과가 없습니다.</div>
          )} */}
          <Pagination
            current_page={current_page}
            block={5}
            per_page={10}
            onChange={setCurrentPage}
            total_count={total_cnt}
          />
        </Container>
      </PostListsWrap>
    </PostListsContainer>
  )
}
