import React, { useEffect } from 'react'
import styled from 'styled-components'
import profileDefault from 'assets/img/profile.svg'
import { Tabs } from 'antd'
import API from 'service/api'
import { PostUserModel } from 'service/model/postModel'
// import { useHistory } from "react-router-dom";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { currentUserInfo } from 'store/userInfo'

const followers = [
  { name: '오렌지좋아' },
  { name: '하이' },
  { name: '구름' },
  { name: '송아지' },
  { name: '초코송이' },
  { name: '초코송이' },
  { name: '오렌지좋아' },
  { name: '오렌지좋아' },
  { name: '초코송이' },
  { name: '오렌지좋아' },
  { name: '오렌지좋아' },
  { name: '오렌지좋아' },
]

const { TabPane } = Tabs

interface FollowerTabModel {
  follow_ids?: string[]
  following_ids?: string[]
  followers?: PostUserModel[]
  followings?: PostUserModel[]
}

const FollowerTab = (props: FollowerTabModel) => {
  const router = useRouter()

  const [userInfo] = useRecoilState(currentUserInfo)

  const onClickFollow = (follow_user: string) => {
    if (follow_user === userInfo._id) {
      router.push('/mypage')
    } else {
      router.push({
        pathname: `/profilepage/${follow_user}`,
      })
    }
  }

  return (
    <FollowerTabWrapper>
      <Tabs defaultActiveKey="1">
        <TabPane tab="팔로워" key="1">
          <div className="profileWrap">
            {props.followers?.map((el, idx) => (
              <div
                key={idx}
                onClick={() => onClickFollow(el._id)}
                style={{ cursor: 'pointer' }}
              >
                <Image
                  src={profileDefault}
                  alt="프로필 사진"
                  width="35px"
                  height="35px"
                />
                <p>{el.info.nickname}</p>
              </div>
            ))}
          </div>
        </TabPane>
        <TabPane tab="팔로잉" key="2">
          <div className="profileWrap">
            {props.followings?.map((el, idx) => (
              <div
                key={idx}
                onClick={() => onClickFollow(el._id)}
                style={{ cursor: 'pointer' }}
              >
                <Image
                  src={profileDefault}
                  alt="프로필 사진"
                  width="35px"
                  height="35px"
                />
                <p>{el.info.nickname}</p>
              </div>
            ))}
          </div>
        </TabPane>
      </Tabs>
    </FollowerTabWrapper>
  )
}

export default FollowerTab

export const FollowerTabWrapper = styled.div`
  width: 580px;

  .profileWrap {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    gap: 20px;

    img {
      width: 35px;
      /* margin: 20px; */
    }

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 70px;
      /* margin: 20px; */
      text-align: center;
      font-size: 15px;

      &:nth-of-type(6n + 1) {
        margin-left: 0;
      }
    }
  }
`
