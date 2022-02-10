import React from 'react'
import styled from 'styled-components'
import profileDefault from 'assets/img/profile.svg'

const ProfileCard = (props: any) => {
  return (
    <ProfileCardWrapper>
      <div>
        <img src={profileDefault} alt="프로필 기본 이미지" />
      </div>
      <div>
        <h2>{"Maria"}</h2>
        <div className="profileInfo">
          <div>게시글 <span>{39}</span></div>
          <div>팔로워 <span>{39}</span></div>
          <div>팔로잉 <span>{39}</span></div>
        </div>
        <button className='follow'>팔로우</button>
        {/* <button className='unfollow'>언팔로우</button> */}
      </div>
    </ProfileCardWrapper>
  )
}

export default ProfileCard

export const ProfileCardWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 100px;

  img{
    width: 150px;
    margin-right: 30px;
  }

  h2{
    font-size: 28px;
    font-weight: 700;
  }

  .profileInfo{
    display: flex;
    margin-bottom: 15px;

    div{
      margin-right: 20px;
      font-size: 18px;
      font-weight: 500;

      span{
        font-weight: 700;
        margin-left: 5px;
      }
    }
  }

  button{
   width: 100%;
   height: 35px;
   border-radius: 4px;

   &.follow{
     border: 1px solid #0038FF;
     color: #0038FF;
   }
   &.unfollow{
     border: 1px solid #ff0000;
     color: #ff0000;
   }

   &:hover{
     font-weight: 700;
   }
  }
`
