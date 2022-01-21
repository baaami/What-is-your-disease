import styled from 'styled-components'

export const PostListsContainer = styled.div`
  padding-top: 170px;
`

export const PostListsWrap = styled.div`
  margin-top: 100px;

  .titleWrap {
    display: flex;
    justify-content: space-between;
    .dropDown {
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
        overflow: hidden;

        li {
          padding: 10px 12px;
        }
        &.vis {
          border: 1px solid black;
          max-height: 200px;
        }
      }
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
