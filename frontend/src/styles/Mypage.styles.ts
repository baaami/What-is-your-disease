import styled from 'styled-components'

export const MyPageContainer = styled.div`
  padding-top: 170px;

  .myPageTitle {
    font-size: 22px;
    margin-bottom: 30px;
  }

  & .greeting {
    font-size: 24px;
    margin-bottom: 78px;

    & span {
      color: #3c6d2e;
      font-weight: 900;
    }
  }
`
export const UserInfoWrap = styled.div`
  & .userInfoTitle {
    display: flex;
    justify-content: space-between;
    & div {
      button {
        font-size: 22px;
        border-bottom: 1px solid #3c6d2e;
        color: #3c6d2e;
      }
    }
  }

  & .cardWrap {
    display: flex;
    gap: 82px;
  }
`
export const UserInfoCard = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  padding: 60px;
  flex: 1 1 50%;
  & .cardRow {
    display: flex;
    gap: 75px;
    font-size: 22px;
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 0px;
    }
    & .leftCol {
      width: 100.2px;
    }
  }
`
export const MyPostsWrap = styled.div``
