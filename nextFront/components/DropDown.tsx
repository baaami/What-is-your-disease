import React, { useState } from 'react'
import arrowDown from 'assets/img/arrow_drop_down.svg'
import styled from 'styled-components'

interface DropDownModel {
  filter_data: Array<string>
  setFilter: React.Dispatch<React.SetStateAction<string>>
  now_value: string
  style?: React.CSSProperties
}

const DropDown = (props: DropDownModel) => {
  const [is_drop_down, setIsDropDown] = useState(false)
  return (
    <DropDownStyle
      className="dropDown"
      style={props.style}
      onClick={() => setIsDropDown(!is_drop_down)}
    >
      <div>{props.now_value}</div>
      <img
        style={{}}
        src={arrowDown}
        alt="아래화살표"
        className={`${is_drop_down ? 'up' : 'down'}`}
      />
      <ul className={`dropDownLists ${is_drop_down ? 'vis' : ''}`}>
        {props.filter_data.map((item: any) => {
          return (
            <>
              <li
                style={{
                  backgroundColor: item === props.now_value ? '#E3EDC3' : '',
                }}
                onClick={() => props.setFilter(item)}
              >
                {item}
              </li>
            </>
          )
        })}
      </ul>
    </DropDownStyle>
  )
}

export default DropDown
const DropDownStyle = styled.div`
  position: relative;
  width: 195px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  font-size: 20px;
  border: 1px solid black;
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;

    transition: 0.21s;
    &.up {
      transform: rotate(180deg);
    }
    &.down {
      transform: rotate(360deg);
    }
  }

  ul.dropDownLists {
    position: absolute;
    max-height: 0px;
    transition: all 0.21s;
    z-index: 10;
    left: 0;
    top: 50px;
    background-color: white;
    width: 100%;
    overflow-y: scroll;

    li {
      padding: 10px 12px;
    }
    &.vis {
      border: 1px solid black;
      max-height: 200px;
    }
  }
`
