import * as React from 'react'
import styled from 'styled-components'
import icon from '../assets/img/search.svg'

interface ISearchProps {}

export default function Search(props: ISearchProps) {
  return (
    <SearchContainer className="wrap">
      <input type="text" placeholder="검색어를 입력하세요." />
      <button>
        <img src={icon} alt="search icon" />
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
