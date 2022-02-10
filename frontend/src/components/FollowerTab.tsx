import React from 'react'
import styled from 'styled-components'
import profileDefault from 'assets/img/profile.svg'
import { Tabs } from 'antd';

const followers = [
  { name: '오렌지좋아' },
  { name: '오렌지좋아' },
  { name: '오렌지좋아' },
  { name: '오렌지좋아' },
  { name: '오렌지좋아' },
  { name: '오렌지좋아' },
  { name: '오렌지좋아' },
  { name: '오렌지좋아' },
  { name: '오렌지좋아' },
  { name: '오렌지좋아' },
  { name: '오렌지좋아' },
  { name: '오렌지좋아' },
]

const { TabPane } = Tabs;

const FollowerTab = (props: any) => {
  return (
    <FollowerTabWrapper>
      <Tabs defaultActiveKey="1">
        <TabPane tab="팔로워" key="1">
          <div className="profileWrap">
            {followers.map((el, idx) => (
              <div key={idx}>
                <img src={profileDefault} alt="프로필 사진" />
                <p>{el.name}</p>
              </div>
            ))}
          </div>
        </TabPane>
        <TabPane tab="팔로잉" key="2">
          <div className="profileWrap">
            {followers.map((el, idx) => (
              <div key={idx}>
                <img src={profileDefault} alt="프로필 사진" />
                <p>{el.name}</p>
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
  .profileWrap{
    display: flex;
    flex-wrap: wrap;
  }
`
