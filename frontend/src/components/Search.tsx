import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import icon from '../assets/img/search.svg'
import API from 'service/api'

interface ISearchProps {}

export default function Search(props: ISearchProps) {
  const history = useHistory()

  const [value, setValue] = useState('')

  const onEnterSearch = async (e: any, click: string) => {
    if (e.key === 'Enter' || click === 'click_event') {
      history.push(`/posts/lists/search/form/${value}`)
    }
  }

  return (
    <SearchContainer className="wrap">
      <input
        id="searchInput"
        type="text"
        placeholder="검색어를 입력하세요."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => onEnterSearch(e, '')}
      />
      <button>
        <img
          src={icon}
          alt="search icon"
          onClick={(e) => onEnterSearch(e, 'click_event')}
        />
      </button>
    </SearchContainer>
  )
}

const SearchContainer = styled.div`
  position: relative;

  input {
    width: 100%;
    padding: 15px 35px;
    font-size: 22px;
    border: 1px solid #ccc;
    border-radius: 55px;
    background: #f9f9f9;
    box-shadow: 1px 10px 7px -11px rgba(0, 0, 0, 0.2);

    @media (max-width: 768px) {
      padding: 10px 25px;
    }

    &::placeholder {
      color: #999;

      @media (max-width: 768px) {
        font-size: 15px;
      }
    }
    &:focus {
      background: #fff;
      outline: 1px solid #333;
    }
  }

  button {
    position: absolute;
    top: 15px;
    right: 35px;
    background: transparent;
    border: none;

    img {
      @media (max-width: 768px) {
        width: 20px;
      }
    }
  }
`
