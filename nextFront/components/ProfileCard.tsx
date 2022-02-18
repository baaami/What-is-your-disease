import React from "react";
import styled from "styled-components";
import profileDefault from "assets/img/profile.svg";
// import { useLocation } from 'react-router-dom'
import API from "service/api";
import { useRecoilState } from "recoil";
import { currentUserInfo } from "store/userInfo";
import { useRouter } from "next/router";

interface ProfileCardModel {
  currentUserId?: string;
  nickname: string;
  postsCnt: string | number | undefined;
  followerCnt: string | number | undefined;
  followingCnt: string | number | undefined;
  followerIds?: string[];
  nextCallback?: () => void;
}

const ProfileCard = (props: ProfileCardModel) => {
  const location = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(currentUserInfo);

  const addFollowUser = (follow_id: string) => {
    API.user
      .addFollow(follow_id)
      .then((res) => {
        if (props.nextCallback) {
          props.nextCallback();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const unFollowUser = (un_follow_id: string) => {
    API.user
      .removeFollow(un_follow_id)
      .then((res) => {
        if (props.nextCallback) props.nextCallback();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <ProfileCardWrapper>
      <div>
        <img src={profileDefault.src} alt="프로필 기본 이미지" />
      </div>
      <div>
        <h2>{props.nickname}</h2>
        <div className="profileInfo">
          <div>
            게시글 <span>{props.postsCnt}</span>
          </div>
          <div>
            팔로워 <span>{props.followerCnt ?? 0}</span>
          </div>
          <div>
            팔로잉 <span>{props.followingCnt ?? 0}</span>
          </div>
        </div>
        {location.pathname !== "/mypage" && (
          <>
            {props.followerIds?.includes(userInfo._id as string) ? (
              <button
                className="unfollow"
                onClick={() => unFollowUser(props.currentUserId as string)}
              >
                언팔로우
              </button>
            ) : (
              <button
                className="follow"
                onClick={() => addFollowUser(props.currentUserId as string)}
              >
                팔로우
              </button>
            )}
          </>
        )}
      </div>
    </ProfileCardWrapper>
  );
};

export default ProfileCard;

export const ProfileCardWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 100px;

  img {
    width: 150px;
    margin-right: 30px;
  }

  h2 {
    font-size: 28px;
    font-weight: 700;
  }

  .profileInfo {
    display: flex;
    margin-bottom: 15px;

    div {
      margin-right: 20px;
      font-size: 18px;
      font-weight: 500;

      span {
        font-weight: 700;
        margin-left: 5px;
      }
    }
  }

  button {
    width: 100%;
    height: 35px;
    border-radius: 4px;

    &.follow {
      border: 1px solid #0038ff;
      color: #0038ff;
    }
    &.unfollow {
      border: 1px solid #ff0000;
      color: #ff0000;
    }

    &:hover {
      font-weight: 700;
    }
  }
`;
