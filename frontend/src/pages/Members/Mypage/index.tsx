import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { currentUserInfo } from 'store/userInfo'
import { useHistory } from 'react-router-dom'
import API from 'service/api'
import MyPostsTable from 'components/MyPostsTable'
import Pagination from 'components/Pagination'
import { Container, Title } from 'common.styles'
import {
  FollowPostsSection,
  InfoSection,
  MyPageContainer,
  MyPostSection,
  TopSection,
} from './styles'
import ProfileCard from 'components/ProfileCard'
import FollowerTab from 'components/FollowerTab'
import InfoCard from 'components/InfoCard'

interface IMypageProps {}

export default function Mypage(props: IMypageProps) {
  const history = useHistory()
  const [userInfo, setUserInfo] = useRecoilState(currentUserInfo)
  const [myPosts, setMyPosts] = useState([])
  const [total_cnt, setTotalCnt] = useState(0)
  const [current_page, setCurrentPage] = useState(1)
  const getArrayToJsx = (arr: Array<string>) => {
    return arr.map((item, index) => {
      if (index === arr.length - 1) {
        return <span>{item}</span>
      } else {
        return <span>{item}, </span>
      }
    })
  }

  const getMyPosts = async () => {
    if (userInfo._id) {
      await API.posts
        .getMyPosts(userInfo._id, current_page, 10)
        .then((res) => {
          setTotalCnt(res.data.postTotalCnt)
          setMyPosts(res.data.data.post)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  const onClickEditButton = () => {
    history.push('/infoForm')
  }

  useEffect(() => {
    getMyPosts()
  }, [userInfo, current_page])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <MyPageContainer>
      <Container>
        <TopSection>
          <ProfileCard />
          <FollowerTab />
        </TopSection>
        <InfoSection>
          <Title>내 정보</Title>
          <InfoCard />
        </InfoSection>
        <MyPostSection>
          <Title>내 게시글</Title>
          <MyPostsTable posts={myPosts} />
          <Pagination
            total_count={total_cnt}
            current_page={current_page}
            per_page={10}
            onChange={setCurrentPage}
            block={5}
          />
        </MyPostSection>
        <FollowPostsSection>
          <Title>팔로우 게시글</Title>
          <MyPostsTable posts={myPosts} />
          <Pagination
            total_count={total_cnt}
            current_page={current_page}
            per_page={10}
            onChange={setCurrentPage}
            block={5}
          />
        </FollowPostsSection>
      </Container>
    </MyPageContainer>
  )
}
