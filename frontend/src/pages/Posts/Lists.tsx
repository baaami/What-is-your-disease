import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PostListsContainer, PostListsWrap } from 'styles/PostLists.styles'
import Search from '../../components/Search'
import arrow from '../../assets/img/arrow_right.png'
import arrowDown from 'assets/img/arrow_drop_down.svg'

interface IPostsListsProps {}

const dropdownOption = ['전체', '최신순', '오래된순']

export default function PostsLists(props: IPostsListsProps) {
  const [is_drop_down, setIsDropDown] = useState(false)
  const [filter, setFilter] = useState('전체')
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])
  return (
    <PostListsContainer>
      <Search />
      <PostListsWrap className="wrap">
        <div className="titleWrap">
          <div className="title">게시글</div>
          <div
            className="dropDown"
            onClick={() => setIsDropDown(!is_drop_down)}
          >
            <div>{filter}</div>
            <img
              src={arrowDown}
              alt="아래화살표"
              className={`${is_drop_down ? 'up' : 'down'}`}
            />
            <ul className={`dropDownLists ${is_drop_down ? 'vis' : ''}`}>
              {dropdownOption.map((item) => {
                return (
                  <>
                    <li
                      style={{
                        backgroundColor: item === filter ? '#E3EDC3' : '',
                      }}
                      onClick={() => setFilter(item)}
                    >
                      {item}
                    </li>
                  </>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="postContainer">
          <Link to="" className="post">
            <div className="postTitle">제목들어갈 부분</div>
            <img src={arrow} alt="화살표 아이콘" />
          </Link>
          <Link to="" className="post">
            <div className="postTitle">제목들어갈 부분</div>
            <img src={arrow} alt="화살표 아이콘" />
          </Link>
          <Link to="" className="post">
            <div className="postTitle">제목들어갈 부분</div>
            <img src={arrow} alt="화살표 아이콘" />
          </Link>
        </div>
      </PostListsWrap>
    </PostListsContainer>
  )
}
