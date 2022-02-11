import styled from 'styled-components'

export const PostEditContainer = styled.div`
  padding: 200px 0;

  .ant-select-selector {
    height: 46px !important;

    span {
      line-height: 46px !important;
      font-size: 18px;
      font-weight: 700;
    }
  }
  .ant-select-arrow {
    color: #333;
  }

  #posts_title {
    margin-top: 20px;
    height: 60px;
  }

  .quill {
    height: 600px;
    margin-bottom: 70px;
    background: #fff;

    & * {
      background: #fff;
    }
  }

  .btnWrap {
    text-align: end;

    button {
      background: #1850a3;
    }
  }
`
export const HashTagSection = styled.div`
  .hashWrap {
    .ant-tag {
      height: 35px;
      line-height: 32px;
      padding: 0 15px;
      font-size: 16px;

      span {
        padding-left: 10px;
      }
    }
  }

  .hashWrap {
    display: flex;
    align-items: center;
    .hashInput {
      width: 200px !important;
      height: 45px;
      padding: 0 15px;

      &::placeholder {
        color: #666;
      }
    }

    .addHashtag {
      width: 80px;
      height: 45px;
      background-color: #fafafa;
      color: #666;
      border: 1px solid #d9d9d9;
    }
  }
`
export const PostsDetailContainer = styled.div`
  padding: 200px 0;

  .commentsBtn{
    width: 180px;
    border: 1px solid #989898;
    background: #fff;
    font-size: 16px;
    color: #555;

    &:hover{
      background: #989898;
      color: #fff;
    }
  }

  .postContents{
    min-height: 350px;
    padding: 20px 0;
    font-size: 18px;
  }

  .buttonRow{
    margin: 30px 0 50px;
  }
`
export const TopSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  .category{
    padding: 4px 25px;
    margin-right: 15px;
    border-radius: 50px;
    background: #1850a3;
    color: #fff;
    font-size: 18px;
  }

  .hashtag{
    span{
      font-size: 18px;
      margin-right: 10px;
    }
  }
`
export const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;

  .postTitle{
    font-size: 24px;
    font-weight: 500;
  }

  .postInfo{
    span{
      font-size: 15px;
      margin-left: 15px;
    }
  }
`
export const CreateComment = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 10px;

  textarea {
    width: 100%;
    height: 80px;
    border-radius: 5px;
    padding: 10px;
    outline: none;
    resize: none;
  }

  button {
    height: 80px;
  }
`

export const CommentsSection = styled.div`
  padding: 0 20px;
  margin: 15px 0 50px;
  border: 1px solid #c4c4c4;
  border-radius: 8px;

  .commentsCnt{
    padding-top: 20px;
  }

  .comment {
    padding: 30px 0;
    border-bottom: 1px solid #ebebeb;

    &:last-of-type {
      border: none;
    }

    span {
      margin-right: 20px;
    }

    .removeComment,
    .removeReply {
      color: red;
    }

    .replyBtn {
      width: fit-content;
      height: fit-content;
      background: transparent;

      img {
        margin-left: 20px;
      }
    }

    .replyWrap {
      margin-top: 20px;
      padding: 5px 20px 20px;
      background: #f4f4f4;
      border-radius: 6px;

      .reply {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;

        img{
          width: 30px;
        }
      }
    }
  }
`
export const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  & .delBtn {
    background-color: #989898;
  }
`
