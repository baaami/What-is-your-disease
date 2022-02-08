import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import arrow from 'assets/img/arrow_right.png'

const PostsTable = (props: any) => {
  return (
    <PostTableWrapper>
      <section className="topSection">
        {props.title && <div className="postsTitle">{props?.title}</div>}
        {props.is_more_button && (
          <div>
            <Link to="/posts/lists" className="viewMoreBtn">
              더보기 +
            </Link>
          </div>
        )}
      </section>
      <div className="latestPostContainer">
        {props.posts.map((item: any, index: number) => {
          return (
            <React.Fragment key={index}>
              <Link to={`/posts/detail/${item._id}`} className="latestPost">
                <div className="postTitle">{item.title}</div>
                <div className="commentsCnt">[{item.commentIds?.length}]</div>
                <img src={arrow} alt="화살표 아이콘" />
              </Link>
            </React.Fragment>
          )
        })}
      </div>
    </PostTableWrapper>
  )
}

export default PostsTable

export const PostTableWrapper = styled.div`
  position: relative;

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

  .topSection {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 50px;
    .postsTitle {
      font-size: 28px;
      color: #111;
    }
    .viewMoreBtn {
      font-size: 20px;
      color: #666;

      &:hover {
        color: #000;
      }
    }
  }

  .latestPostContainer {
    .latestPost {
      display: flex;
      /* justify-content: space-between; */
      align-items: center;
      line-height: 80px;
      padding: 0 25px;
      position: relative;

      .postTitle {
        max-width: 90%;
        font-size: 22px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .commentsCnt {
        font-size: 22px;
        color: red;
      }
      img {
        position: absolute;
        right: 20px;
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
