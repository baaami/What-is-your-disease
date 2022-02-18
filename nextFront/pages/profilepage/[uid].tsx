import React, { useState, useEffect } from 'react'
import {
  InfoSection,
  PostSection,
  ProfilepageContainer,
  TopSection,
} from './styles'
// import { RouteComponentProps, useHistory } from 'react-router-dom'
import { useRouter } from 'next/router'
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

export default function Profilepage() {
  const router = useRouter()
  const [myPosts, setMyPosts] = useState([])
  const [total_cnt, setTotalCnt] = useState(0)
  const [current_page, setCurrentPage] = useState(1)
  const [userInfo] = useRecoilState(currentUserInfo)
  const [current_profile, setCurrentProfile] = useState<PostUserModel>(
    {} as PostUserModel,
  )

  const getMyPosts = async () => {
    if (userInfo._id) {
      await API.posts
        .getMyPosts(router.query.uid as string, current_page, 10)
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
    console.log(router.query.uid)
    await API.user
      .getUserProfile(router.query.uid as string)
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
  }, [userInfo, current_page, router.query.uid])

  useEffect(() => {
    // if (match.params.uid === userInfo._id) history.push('/mypage')
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
            followerIds={current_profile?.followerIds}
            nextCallback={getUserProfile}
          />
          <FollowerTab
            follow_ids={current_profile.followerIds}
            following_ids={current_profile.followingIds}
            followers={current_profile.followers}
            followings={current_profile.followings}
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
