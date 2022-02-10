import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Container } from 'common.styles'
import profileDefault from 'assets/img/profile.svg'

const PostsTable = (props: any) => {
  const [filter, setFilter] = useState({ text: '최신순', key: 'latest' })

  useEffect(() => {
    if (props.getPosts) {
      props.getPosts(filter.key)
    }
  }, [filter])
  return (
    <Container>
      <PostTableHeader>
        <div className="headerTitle">전체</div>
        <div className="filterTab">
          <div
            className={`tab ${filter.text === '최신순' ? 'active' : ''}`}
            onClick={() => setFilter({ text: '최신순', key: 'latest' })}
          >
            최신순
          </div>
          <div
            className={`tab ${filter.text === '오래된순' ? 'active' : ''}`}
            onClick={() => setFilter({ text: '오래된순', key: 'oldest' })}
          >
            오래된순
          </div>
          <div
            className={`tab ${filter.text === '인기순' ? 'active' : ''}`}
            onClick={() => setFilter({ text: '인기순', key: 'hotest' })}
          >
            인기순
          </div>
        </div>
      </PostTableHeader>
      {props.posts.map((item: any, index: number) => {
        return (
          <PostTableBody key={index}>
            <div className="top">
              <div className="left">
                <Link to={'/profilepage'} className="latestPost">
                  <div className="profileImg">
                    <img src={profileDefault} alt="프로필 기본 이미지" />
                  </div>
                </Link>
                <div className="profileDescript">
                  <div className="name">{item.user.info.nickname}</div>
                  <div className="date">{item.publishedDate.split('T')[0]}</div>
                </div>
              </div>
              <div className="right">
                <div className="count">
                  좋아요 <span>{item.likes}</span>
                </div>
                <div className="count">
                  조회수 <span>{item.views}</span>
                </div>
                <div className="count">
                  댓글{' '}
                  <span>
                    {item.commentIds
                      ? item.commentIds.length
                      : item.comments
                      ? item.comments.length
                      : 0}
                  </span>
                </div>
              </div>
            </div>
            <Link to={`/posts/detail/${item._id}`} className="latestPost">
              <div className="bottom">
                <div className="postTitle">{item.title}</div>
                <div className="postContent">
                  본문 내용본문 내용본문 내용본문 내용본문 내용본본문 내용본문
                  내용본문 내용본문 내용본문 내용본문 내용본문 내용본문 내용본문
                  내용본문 내용본문 내용본문 내용본문 내용본문 내용본문 내용본문
                  내용본문 내용본문 내용본문 내용본문 내용본문 내용본문 내용본문
                  내용본문 내용본문 내용본문 내용본문 내용본문 내용본문
                  내용용본문 내용본문 내용본문 내용본문 내용본문 내용본문
                  내용본문 내용본문 내용본문 내용본문 내용본문 내용본본문
                  내용본문 내용본문 내용본문 내용본문 내용본본문 내용본문
                  내용본문 내용본문 내용본문 내용본본문 내용본문 내용본문
                  내용본문 내용본문 내용본본문 내용본문 내용본문 내용본문
                  내용본문 내용본본문 내용본문 내용본문 내용본문 내용본문
                  내용본본문 내용본문 내용본문 내용본문 내용본문 내용본본문
                  내용본문 내용본문 내용본문 내용본문 내용본본문 내용본문
                  내용본문 내용본문 내용본문 내용본본문 내용본문 내용본문
                  내용본문 내용본문 내용본본문 내용본문 내용본문 내용본문
                  내용본문 내용본본문 내용본문 내용본문 내용본문 내용본문
                  내용본본문 내용본문 내용본문 내용본문 내용본문 내용본본문
                  내용본문 내용본문 내용본문 내용본문 내용본
                </div>
              </div>
            </Link>
          </PostTableBody>
        )
      })}
    </Container>
  )
}

export default PostsTable

export const PostTableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #333333;
  border-bottom: 1px solid #333333;

  .headerTitle {
    font-size: 20px;
    font-weight: 700;
  }

  .filterTab {
    display: flex;
    align-items: center;

    .tab {
      margin-left: 40px;
      font-size: 18px;
      font-weight: 500;
      cursor: pointer;

      &.active {
        font-weight: 700;
        color: #1850a3;
      }
    }
  }
`
export const PostTableBody = styled.div`
  padding: 30px 15px;
  border-bottom: 1px solid #cccccc;

  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;

    .left {
      display: flex;
      align-items: center;

      .profileImg {
        margin-right: 10px;

        img {
          width: 70px;
        }
      }

      .profileDescript {
        .name {
          font-size: 20px;
          font-weight: 500;
          color: #000;
        }

        .date {
          font-size: 16px;
          color: #989898;
        }
      }
    }

    .right {
      display: flex;
      align-items: center;

      .count {
        margin-left: 35px;
        font-size: 15px;
        color: #989898;
      }
    }
  }

  .bottom {
    .postTitle {
      margin-bottom: 13px;
      font-size: 17px;
      font-weight: 500;
      color: #000;
    }

    .postContent {
      display: -webkit-box;
      word-wrap: break-word;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 57px;
      line-height: 20px;
      color: #666;
      font-size: 14px;
    }
  }
`
