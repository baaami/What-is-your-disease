import styled from 'styled-components'

export const PostListsContainer = styled.div`
  padding: 100px 0 200px;
`

export const PostListsWrap = styled.div`
  margin-top: 100px;
  .noData {
    text-align: center;
    font-size: 24px;
    margin-top: 20px;
  }
  .titleWrap {
    font-size: 24px;
    margin-bottom: 20px;
    span {
      color: #1850a3;
      font-weight: 900;
    }
  }
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
