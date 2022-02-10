import React, { useState, useEffect } from 'react'
import { InfoSection, PostSection, ProfilepageContainer, TopSection } from './styles'
import { Container, Title } from 'common.styles'
import ProfileCard from 'components/ProfileCard'
import FollowerTab from 'components/FollowerTab'
import InfoCard from 'components/InfoCard'
import PostsTable from 'components/PostsTable'
import Pagination from 'components/Pagination'
import API from 'service/api'
import { useRecoilState } from 'recoil'
import { currentUserInfo } from 'store/userInfo'

export default function Profilepage() {
  const [myPosts, setMyPosts] = useState([])
  const [total_cnt, setTotalCnt] = useState(0)
  const [current_page, setCurrentPage] = useState(1)
  const [userInfo, setUserInfo] = useRecoilState(currentUserInfo)

  const getMyPosts = async () => {
    if (userInfo._id) {
      await API.posts
        .getMyPosts(userInfo._id, current_page)
        .then((res) => {
          setTotalCnt(res.data.postTotalCnt)
          setMyPosts(res.data.data.post)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  useEffect(() => {
    getMyPosts()
  }, [userInfo, current_page])

  return (
    <ProfilepageContainer>
      <Container>
        <TopSection>
          <ProfileCard/>
          <FollowerTab/>
        </TopSection>
        <InfoSection>
          <Title>{'Maria'} 정보</Title>
          <InfoCard/>
        </InfoSection>
        <PostSection>
          <Title>{'Maria'} 게시글</Title>
          <PostsTable  posts={myPosts}/>
          <Pagination
            total_count={total_cnt}
            current_page={current_page}
            per_page={10}
            onChange={setCurrentPage}
            block={5}
          />
        </PostSection>
      </Container>
    </ProfilepageContainer>
  )
}
