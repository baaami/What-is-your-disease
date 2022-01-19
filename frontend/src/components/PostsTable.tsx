import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import arrow from '../../assets/img/arrow_right.png'

const PostsTable = (props: any) => {
  return (
    <LatestPostBanner className="wrap">
      <div className="title">최신 게시글</div>
      <Link to="/posts/lists" className="viewMoreBtn">
        더보기 +
      </Link>
      <div className="latestPostContainer">
        {props.posts.map((item: any) => {
          return (
            <>
              <Link to="" className="latestPost">
                <div className="postTitle">{item.title}</div>
                <img src={arrow} alt="화살표 아이콘" />
              </Link>
            </>
          )
        })}
      </div>
    </LatestPostBanner>
  )
}

export default PostsTable

export const LatestPostBanner = styled.div`
  position: relative;
  padding: 70px 0 125px;

  @keyframes arrowShaking {
    0% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(8px);
    }

    100% {
      transform: translateX(0);
    }
  }

  .viewMoreBtn {
    position: absolute;
    top: 80px;
    right: 0;
    font-size: 20px;
    color: #666;

    &:hover {
      color: #000;
    }
  }
  .latestPostContainer {
    .latestPost {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 80px;
      padding: 0 25px;

      .postTitle {
        font-size: 22px;
        color: #333;
      }
      img {
        position: relative;
        right: 10px;
        height: 18px;
        transition: all 0.3s ease-in;
      }

      &:nth-of-type(2n + 1) {
        background: #f4f4f4;
      }

      &:hover img {
        animation: arrowShaking 1.5s infinite;
      }
    }
  }
`
