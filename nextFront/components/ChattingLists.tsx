import { useEffect } from 'react'
import styled from 'styled-components'
import { categoryList } from 'static/constant'

interface ChattingListsModel {
  clickEnter: void
}

const ChattingLists = ({ clickEnter }: ChattingListsModel) => {
  return (
    <ChattingListsWrapper>
      {categoryList.map((item, idx) => (
        <ChattingList key={idx}>
          <h3>{item}</h3>
          <EnterButton onClick={() => clickEnter}>입장</EnterButton>
        </ChattingList>
      ))}
    </ChattingListsWrapper>
  )
}

export default ChattingLists

const ChattingListsWrapper = styled.div`
  width: 100%;
  height: 440px;
  overflow-y: scroll;
`
const ChattingList = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 30px);
  height: 70px;
  margin: 15px;
  border-bottom: 1px solid #c4c4c4;
`
const EnterButton = styled.button`
  width: 80px;
  height: calc(100% - 15px);
  background-color: #1850a3;
  border-radius: 5px;
  color: #fff;
  font-weight: 700;

  &:hover {
    border: 1px solid #1850a3;
    color: #1850a3;
    background-color: #fff;
  }
`
