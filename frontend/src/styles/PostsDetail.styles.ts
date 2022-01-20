import styled from 'styled-components'

export const PostsDetailContainer = styled.div`
  padding-top: 170px;

  & .postTitle {
    font-size: 22px;
    margin-top: 100px;
    margin-bottom: 30px;
  }

  & .postInfo {
    display: flex;
    gap: 60px;

    & div {
      font-size: 22px;
      margin-bottom: 10px;
    }
  }

  & .postContents {
    padding: 30px;
    font-size: 22px;
  }

  & .buttonRow {
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    & .delBtn {
      background-color: gray;
    }
  }
`
