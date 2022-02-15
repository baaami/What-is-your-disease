import React, { useEffect } from 'react'
import styled from 'styled-components'
import profileDefault from 'assets/img/profile.svg'
import { Tabs } from 'antd'
import API from 'service/api'
import { PostUserModel } from 'service/model/postModel'
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
  return (
    <FollowerTabWrapper>
      <Tabs defaultActiveKey="1">
        <TabPane tab="팔로워" key="1">
          <div className="profileWrap">
            {props.followers?.map((el, idx) => (
              <div key={idx}>
                <img src={profileDefault} alt="프로필 사진" />
                <p>{el.info.nickname}</p>
              </div>
            ))}
          </div>
        </TabPane>
        <TabPane tab="팔로잉" key="2">
          <div className="profileWrap">
            {props.followings?.map((el, idx) => (
              <div key={idx}>
                <img src={profileDefault} alt="프로필 사진" />
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

    img {
      width: 35px;
    }

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 70px;
      margin: 5px 25px 20px;
      text-align: center;
      font-size: 15px;

      &:nth-of-type(6n + 1) {
        margin-left: 0;
      }
    }
  }
`
