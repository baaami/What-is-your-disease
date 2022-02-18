import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import API from 'service/api'
import icon from '../assets/img/search.svg'

interface ISearchProps {}

export default function Search(props: ISearchProps) {
  const router = useRouter()

  const [value, setValue] = useState('')

  const onEnterSearch = async (e: any, click: string) => {
    if (e.key === 'Enter' || click === 'click_event') {
      router.push({
        pathname: `/posts/lists/search/form/${value}`,
        // query: {
        //   value: value,
        //   type: "search",
        // },
      })
    }
  }

  return (
    <SearchContainer>
      <input
        id="searchInput"
        type="text"
        placeholder="검색"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => onEnterSearch(e, '')}
      />
      <button>
        <img
          src={icon.src}
          alt="search icon"
          onClick={(e) => onEnterSearch(e, 'click_event')}
        />
      </button>
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-center;
  margin-bottom: 15px;

  input {
    width: 300px;
    height: 45px;
    line-height: 44px;
    padding: 0 60px 0 25px;
    font-size: 16px;
    border: 1px solid #333;
    border-radius: 45px;
    background: #fff;
    box-shadow: 1px 10px 7px -11px rgba(0, 0, 0, 0.2);

    &::placeholder {
      color: #999;
      font-size: 16px;
    }
    &:focus {
      outline: 1px solid #111;
    }
  }

  button {
    position: absolute;
    top: 10px;
    right: 25px;
    background: transparent;
    border: none;
  }
`
