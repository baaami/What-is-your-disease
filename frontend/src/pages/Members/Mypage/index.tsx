import React, { useState, useEffect } from 'react'
import {
  MyPageContainer,
  UserInfoWrap,
  UserInfoCard,
  MyPostsWrap,
  LogoutButton,
} from 'styles/Mypage.styles'
import { LatestPostBanner } from 'styles/Home.styles'
import arrow from 'assets/img/arrow_right.png'
import { useRecoilState } from 'recoil'
import { currentUserInfo } from 'store/userInfo'
import { Link, useHistory } from 'react-router-dom'
import API from 'service/api'

interface IMypageProps {}

export default function Mypage(props: IMypageProps) {
  const history = useHistory()
  const [userInfo, setUserInfo] = useRecoilState(currentUserInfo)
  const [myPosts, setMyPosts] = useState([])
  const getArrayToJsx = (arr: Array<string>) => {
    return arr.map((item, index) => {
      if (index === arr.length - 1) {
        return <span>{item}</span>
      } else {
        return <span>{item}, </span>
      }
    })
  }

  const logoutHandler = async () => {
    localStorage.removeItem('jwttoken')
    localStorage.removeItem('userInfo')
    setUserInfo({
      ...userInfo,
      provider: '',
      providerId: '',
      _id: '',
      info: {
        name: '',
        age: '',
        gender: '',
        nickname: '',
        bloodtype: '',
        allergy: [],
        medicines: [],
      },
    })
    history.replace('/')
  }

  const getMyPosts = async () => {
    if (userInfo._id) {
      await API.posts
        .getMyPosts(userInfo._id)
        .then((res) => {
          setMyPosts(res.data)
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
  }, [userInfo])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <MyPageContainer className="wrap">
      <UserInfoWrap>
        <div className="greeting">
          안녕하세요 <span>"{userInfo.info.name}"</span> 님
        </div>
        <section className="myPageTitle userInfoTitle">
          <div>내 정보</div>
          <div>
            <button onClick={onClickEditButton}>수정하기</button>
          </div>
        </section>
        <section className="cardWrap">
          <UserInfoCard>
            <section className="cardRow">
              <div className="rightCol">이름</div>
              <div>{userInfo.info.name}</div>
            </section>
            <section className="cardRow">
              <div className="rightCol">나이</div>
              <div>{userInfo.info.age}</div>
            </section>
            <section className="cardRow">
              <div className="rightCol">성별</div>
              <div>{userInfo.info.gender}</div>
            </section>
            <section className="cardRow">
              <div className="rightCol">닉네임</div>
              <div>{userInfo.info.nickname}</div>
            </section>
          </UserInfoCard>
          <UserInfoCard>
            <section className="cardRow">
              <div className="leftCol">혈액형</div>
              <div>{userInfo.info.bloodtype}</div>
            </section>
            <section className="cardRow">
              <div className="leftCol">알러지</div>
              <div>{getArrayToJsx(userInfo.info.allergy)}</div>
            </section>
            <section className="cardRow">
              <div className="leftCol">복용중인 약</div>
              <div>{getArrayToJsx(userInfo.info.medicines)}</div>
            </section>
          </UserInfoCard>
        </section>
      </UserInfoWrap>
      <MyPostsWrap>
        <LatestPostBanner>
          <div className="myPageTitle">내 게시글</div>
          <div className="latestPostContainer">
            {myPosts.map((item: any) => {
              return (
                <>
                  <Link to={`/posts/detail/${item._id}`} className="latestPost">
                    <div className="postTitle">{item.title}</div>
                    <img src={arrow} alt="화살표 아이콘" />
                  </Link>
                </>
              )
            })}
          </div>
        </LatestPostBanner>
      </MyPostsWrap>
      <LogoutButton onClick={logoutHandler}>로그아웃</LogoutButton>
    </MyPageContainer>
  )
}
