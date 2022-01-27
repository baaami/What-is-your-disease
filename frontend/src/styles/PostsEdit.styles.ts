import styled from 'styled-components'

export const PostEditContainer = styled.div`
  padding-top: 170px;
  .topWrap {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }

  & section.hashtagArea {
    margin-bottom: 20px;
    .hashtagForm {
      display: flex;
      div {
        display: flex;
        align-items: center;
        input {
          border-radius: 8px 0 0 8px;
          border: 2px solid #333;
          min-height: 40px;
          height: 40px;
        }
        button {
          width: 70px;
          height: 40px;
          background-color: #333;
          color: white;
          border-radius: 0 8px 8px 0;
          font-weight: 900;
        }
      }
    }
    .hashtagList {
      margin-top: 10px;
      display: flex;
      color: #777;
      font-weight: 700;

      div {
        display: flex;
        align-items: center;
        margin-right: 10px;
        cursor: pointer;
        &:hover {
          span {
            opacity: 1;
          }
        }
        span {
          /* font-size: 12px; */
          opacity: 0;
          font-size: 18px;
          font-weight: 900;
          color: red;
        }
      }
    }
  }

  & .buttonRow {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;

    button {
      font-size: 20px;
      width: 100px;
      height: 45px;
    }
  }
`
