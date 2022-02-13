import React, { useState, useEffect } from 'react'
import {
  InfoSection,
  PostSection,
  ProfilepageContainer,
  TopSection,
} from './styles'
import { RouteComponentProps } from 'react-router-dom'
import { Container, Title } from 'common.styles'
import ProfileCard from 'components/ProfileCard'
import FollowerTab from 'components/FollowerTab'
import InfoCard from 'components/InfoCard'
import MyPostsTable from 'components/MyPostsTable'
import Pagination from 'components/Pagination'
import API from 'service/api'
import { useRecoilState } from 'recoil'
import { currentUserInfo } from 'store/userInfo'
import { PostUserModel } from 'service/model/postModel'

export default function Profilepage({
  match,
}: RouteComponentProps<{ uid: string }>) {
  const [myPosts, setMyPosts] = useState([])
  const [total_cnt, setTotalCnt] = useState(0)
  const [current_page, setCurrentPage] = useState(1)
  const [userInfo, setUserInfo] = useRecoilState(currentUserInfo)
  const [current_profile, setCurrentProfile] = useState<PostUserModel>(
    {} as PostUserModel,
  )

  const getMyPosts = async () => {
    if (userInfo._id) {
      await API.posts
        .getMyPosts(match.params.uid, current_page, 10)
        .then((res) => {
          setTotalCnt(res.data.postTotalCnt)
          setMyPosts(res.data.data.post)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  const getUserProfile = async () => {
    await API.user
      .getUserProfile(match.params.uid)
      .then((res) => {
        setCurrentProfile(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getMyPosts()
    getUserProfile()
  }, [userInfo, current_page])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <ProfilepageContainer>
      <Container>
        <TopSection>
          <ProfileCard
            currentUserId={current_profile._id}
            nickname={current_profile?.info?.nickname}
            followerCnt={current_profile?.followerIds?.length}
            followingCnt={current_profile?.followingIds?.length}
            postsCnt={total_cnt}
          />
          <FollowerTab
            follow_ids={current_profile.followerIds}
            following_ids={current_profile.followingIds}
          />
        </TopSection>
        <InfoSection>
          <Title>{current_profile?.info?.nickname}님의 정보</Title>
          <InfoCard
            name={current_profile?.info?.name}
            age={current_profile?.info?.age}
            gender={current_profile?.info?.gender}
            nickname={current_profile?.info?.nickname}
            bloodtype={current_profile?.info?.bloodtype}
            allergy={current_profile?.info?.allergy}
            medicines={current_profile?.info?.medicines}
          />
        </InfoSection>
        <PostSection>
          <Title>{current_profile?.info?.nickname}님의 게시글</Title>
          <MyPostsTable posts={myPosts} />
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
