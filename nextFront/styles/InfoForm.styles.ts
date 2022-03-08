import styled from 'styled-components'

export const FormContainer = styled.div`
  padding: 200px 0;

  & .sectionTitle {
    font-size: 22px;
    margin-bottom: 75px;

    & .textGreen {
      color: #1850a3;
      font-weight: 900;
    }
  }
`
export const ProfileForm = styled.div`
  margin-bottom: 150px;
  text-align: center;
`
export const UserForm = styled.div`
  margin-top: 30px;

  .btnWrap {
    text-align: end;

    .submitButton {
      width: 80px;
      height: 45px;
      margin-top: 30px;
      border: 1px solid #1850a3;
      color: #1850a3;
      font-size: 16px;
      font-weight: 500;
      border-radius: 5px;

      &:hover {
        background-color: #1850a3;
        color: #fff;
      }
    }
  }
`
export const FormRow = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin-bottom: 45px;

  .profileWrap {
    margin: 0 auto;

    .profileImg {
      display: block;
      margin: 0 auto;
    }

    .profileButton {
      display: block;
      width: 250px;
      height: 35px;
      border: 1px solid #1850a3;
      border-radius: 5px;
      color: #1850a3;
      margin-top: 28px;

      &:hover {
        background-color: #1850a3;
        color: #fff;
      }
    }
  }

  .input {
    width: calc(100% - 180px);

    input {
      border: 1px solid #989898;

      &#name {
        width: 200px;
      }
      &#age {
        width: 200px;
      }
      &#allergy {
        width: 100%;
      }
      &#medicines {
        width: 100%;
      }
    }
  }

  .label {
    width: 110px;
    margin-right: 70px;
    font-size: 20px;
  }

  .nicknameWrap {
    margin: 0 auto;

    #nickname {
      width: 300px;
      border: none;
      border-bottom: 1px solid #989898;
      text-align: center;
    }
    .nicknameButton {
      width: 80px;
      height: 35px;
      border: 1px solid #1850a3;
      border-radius: 5px;
      color: #1850a3;
      margin-left: 18px;

      &:hover {
        background-color: #1850a3;
        color: #fff;
      }
    }
  }
`
