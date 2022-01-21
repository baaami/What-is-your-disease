import styled from 'styled-components'

export const MyPageContainer = styled.div`
  padding-top: 170px;

  @media (max-width: 768px) {
    padding-top: 125px;
  }

  .myPageTitle {
    font-size: 22px;
    margin-bottom: 30px;
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

        @media (max-width: 414px) {
          font-size: 18px;
        }
      }
    }
  }

  & .cardWrap {
    display: flex;
    gap: 82px;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 20px;
    }
  }
`
export const UserInfoCard = styled.div`
  padding: 60px;
  flex: 1 1 50%;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

  @media (max-width: 768px) {
    padding: 30px;
    border: 1px solid #ccc;
    box-shadow: none;
  }

  & .cardRow {
    display: flex;
    gap: 75px;
    font-size: 22px;
    margin-bottom: 40px;

    @media (max-width: 414px) {
      margin-bottom: 20px;
      font-size: 18px;
    }

    &:last-child {
      margin-bottom: 0px;
    }
    & .leftCol {
      width: 100.2px;
    }
  }
`
export const MyPostsWrap = styled.div``
export const LogoutButton = styled.button`
  width: 100%;
  height: 60px;
  border: 1px solid rgba(255, 6, 5);
  border-radius: 4px;
  font-size: 18px;
  color: rgba(255, 6, 5);

  @media (max-width: 414px) {
    height: 45px;
    font-size: 15px;
  }

  &:hover {
    font-weight: 900;
  }
`
