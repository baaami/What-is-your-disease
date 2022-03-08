import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
// import { Link } from 'react-router-dom'
import Link from 'next/link'
import { Container } from 'common.styles'

const MyPostsTable = (props: any) => {
  const [filter, setFilter] = useState({ text: '최신순', key: 'latest' })

  useEffect(() => {
    if (props.getPosts) {
      props.getPosts(filter.key)
    }
  }, [filter])
  return (
    <>
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
                <div className="date">{item.publishedDate.split('T')[0]}</div>
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
            <a className="latestPost">
              <Link href={`/posts/detail/${item._id}`} passHref>
                <div className="bottom">
                  <div className="left">
                    <div className="postTitle">{item.title}</div>
                    <div
                      className="postContent"
                      dangerouslySetInnerHTML={{ __html: item.body }}
                    />
                    <div>
                      <span className="category">{item.category}</span>
                      {item.tags.map((el: any, idx: any) => {
                        return (
                          <span className="hashtag" key={idx}>
                            #{el}{' '}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            </a>
          </PostTableBody>
        )
      })}
    </>
  )
}

export default MyPostsTable

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
  padding: 20px 15px;
  border-bottom: 1px solid #cccccc;

  .top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 10px;

    .left {
      display: flex;
      align-items: center;

      .date {
        font-size: 16px;
        color: #989898;
      }
    }

    .right {
      display: flex;
      align-items: center;

      .count {
        margin-left: 15px;
        font-size: 15px;
        color: #989898;
      }
    }
  }

  .bottom {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .left {
      .postTitle {
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
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
        margin-bottom: 15px;
        line-height: 20px;
        color: #666;
        font-size: 14px;
      }

      .category {
        padding: 2px 15px;
        margin-right: 10px;
        background: #1850a3;
        color: #fff;
        border-radius: 50px;
      }

      .hashtag {
        color: #1850a3;
        font-size: 15px;
      }
    }
  }
`
