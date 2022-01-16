import styled from 'styled-components'

export const PostListsContainer = styled.div`
  padding-top: 170px;
`

export const PostListsWrap = styled.div`
  margin-top: 100px;

  .postContainer {
    .post {
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 80px;
      padding: 0 25px;

      .postTitle {
        font-size: 22px;
        color: #333;
      }
      img {
        position: relative;
        right: 10px;
        height: 18px;
        transition: all 0.3s ease-in;
      }

      &:nth-of-type(2n + 1) {
        background: #f4f4f4;
      }

      &:hover img {
        right: 0;
      }
    }
  }
`
